#!/usr/bin/env node
// 请在打包前调用命令：node new-lang-output.js
// 生成的文件在 public/language/ 目录下，供 PHP 调用

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  source: {
    localization: "./src/assets/language/localization.js"
  },
  output: {
    // php: "../MaterialDesignForum-Server/public/locale/json",
    // php: "../MaterialDesignForum-Laravel/public/locale/json",
    php: "../MaterialDesignForum-Laravel/lang",
    jsMain: "./src/assets/language",
    jsMDUI: "../MaterialDesignForum-MDUI2-Laravel/src/assets/language",
    // jsVuetify: "../MaterialDesignForum-Vuetify2/src/assets/language"
  },
  fullLanguages: ["zh_CN", "en_US"],
};

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFileSafe(filePath, content) {
  try {
    ensureDirectoryExists(path.dirname(filePath));
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  } catch (error) {
    console.error(`写入失败 ${filePath}:`, error.message);
    return false;
  }
}

// 将 JSON 对象转换为 PHP 数组格式的字符串
function jsonToPhpArray(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  const nextSpaces = '  '.repeat(indent + 1);

  if (typeof obj === 'string') {
    // 转义特殊字符
    const escaped = obj.replace(/'/g, "\\'")
                       .replace(/\n/g, "\\n")
                       .replace(/\r/g, "\\r")
                       .replace(/\t/g, "\\t");
    return `'${escaped}'`;
  }

  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    return String(obj);
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const elements = obj.map(item => jsonToPhpArray(item, indent + 1)).join(',\n');
    return `[\n${elements}\n${spaces}]`;
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '[]';
    const pairs = keys.map(key => {
      const escapedKey = key.replace(/'/g, "\\'");
      const value = jsonToPhpArray(obj[key], indent + 1);
      return `${nextSpaces}'${escapedKey}' => ${value}`;
    }).join(',\n');
    return `[\n${pairs}\n${spaces}]`;
  }

  return 'null';
}

async function main() {
  try {
    // ✅ 关键修复：使用 pathToFileURL
    const localizationPath = path.resolve(__dirname, config.source.localization);
    const localizationUrl = pathToFileURL(localizationPath).href;

    console.log(`加载语言文件: ${localizationUrl}`);
    const localizationModule = await import(localizationUrl);
    const localization = localizationModule.default || localizationModule;

    const languages = Object.keys(localization);
    console.log(`发现 ${languages.length} 种语言\n`);

    // ... 其余代码保持不变 ...

    // // 生成 PHP 语言包
    // console.log("生成 PHP 语言包...");
    // for (const lang of languages) {
    //   const outputPath = path.join(config.output.php, `${lang}.json`);
    //   if (writeFileSafe(outputPath, JSON.stringify(localization[lang], null, 0))) {
    //     console.log(`✓ PHP: ${lang}.json`);
    //   }
    // }

    // 生成 PHP blade 语言包
    console.log("生成 PHP blade 语言包...");
    for (const lang of languages) {
      const outputPath = path.join(config.output.php, lang, 'Message.php');
      const phpArray = `<?php\nreturn ${jsonToPhpArray(localization[lang].Message, 0)};`;
      if (writeFileSafe(outputPath, phpArray)) {
        console.log(`✓ PHP blade: ${lang}/Message.php`);
      }
    }


    // 生成 JS 语言包
    console.log("\n生成 JS 语言包...");
    const imports = [];

    for (const lang of languages) {
      const isFullLang = config.fullLanguages.includes(lang);
      const langData = isFullLang
        ? localization[lang]
        : { Message: { langInfo: localization[lang]?.Message?.langInfo } };

      const content = `export default ${JSON.stringify(langData, null, 0)};`;

      // 写入主项目
      writeFileSafe(path.join(config.output.jsMain, `${lang}.js`), content);

      // 写入 MDUI 项目
      writeFileSafe(path.join(config.output.jsMDUI, `${lang}.js`), content);

      // 写入 Vuetify 项目
      // writeFileSafe(path.join(config.output.jsVuetify, `${lang}.js`), content);

      imports.push(`import ${lang} from './${lang}.js';`);
      console.log(`✓ JS: ${lang}.js ${isFullLang ? '(完整)' : '(简略)'}`);
    }

    // 生成汇总文件
    console.log("\n生成汇总文件...");
    const summaryContent = `${imports.join("\n")}\n\nexport default {\n  ${languages.join(",\n  ")}\n};`;

    writeFileSafe(path.join(config.output.jsMain, "language.js"), summaryContent);
    writeFileSafe(path.join(config.output.jsMDUI, "language.js"), summaryContent);
    // writeFileSafe(path.join(config.output.jsVuetify, "language.js"), summaryContent);

    console.log("\n语言文件导出脚本：：✅ 所有语言包生成完成！");
    console.log(`总计：${languages.length} 种语言`);

  } catch (error) {
    console.error("语言文件导出脚本：：❌ 执行失败:", error.message);
    process.exit(1);
  }
}

main();
