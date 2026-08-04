import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 i18n-keys.json
const i18nKeysPath = path.join(__dirname, 'i18n-keys.json');
const localizationPath = path.join(__dirname, 'localization.js');
const outputPath = path.join(__dirname, 'newlang.js');

// 读取并解析 i18n-keys.json
const i18nKeysContent = fs.readFileSync(i18nKeysPath, 'utf-8');
const i18nKeys = JSON.parse(i18nKeysContent);

// 读取 localization.js
let localizationContent = fs.readFileSync(localizationPath, 'utf-8');

// 移除 export default 前缀，使其成为有效的 JSON
localizationContent = localizationContent.replace(/^export\s+default\s*/, '');

// 处理 JavaScript 对象中的注释
localizationContent = localizationContent.replace(/\/\/.*$/gm, '');
localizationContent = localizationContent.replace(/\/\*[\s\S]*?\*\//g, '');

// 解析 localization.js
let localizationData;
try {
  // 使用 eval 来解析 JavaScript 对象
  localizationData = eval('(' + localizationContent + ')');
} catch (e) {
  console.error('解析 localization.js 失败:', e.message);
  process.exit(1);
}

// 收集所有唯一的 key
const uniqueKeys = new Set();
for (const filePath in i18nKeys) {
  const keys = i18nKeys[filePath];
  for (const item of keys) {
    uniqueKeys.add(item.key);
  }
}

// 获取嵌套对象的值
function getNestedValue(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[key];
  }
  return current;
}

// 生成嵌套结构
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
  }
}

// 创建结果对象
const result = {};

// 遍历每个语言
for (const langCode in localizationData) {
  result[langCode] = {};
  const langData = localizationData[langCode];
  
  // 遍历每个唯一的 key
  for (const key of uniqueKeys) {
    const value = getNestedValue(langData, key);
    if (value !== undefined) {
      // 设置嵌套值
      setNestedValue(result[langCode], key, value);
    }
  }
}

// 将对象转换为不带双引号的 JavaScript 字面量
function objToLiteral(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  if (typeof obj !== 'object' || obj === null) {
    if (typeof obj === 'string') {
      return `"${obj.replace(/"/g, '\\"')}"`;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(item => objToLiteral(item, indent + 1)).join(',\n');
    return `[\n${items}\n${spaces}]`;
  }
  // 对键名进行 A-Z 排序
  const keys = Object.keys(obj).sort();
  if (keys.length === 0) return '{}';
  const pairs = keys.map(key => {
    const value = objToLiteral(obj[key], indent + 1);
    return `${spaces}  ${key}: ${value}`;
  }).join(',\n');
  return `{\n${pairs}\n${spaces}}`;
}

// 生成输出内容
const outputContent = `export default ${objToLiteral(result)};\n`;

// 写入文件
fs.writeFileSync(outputPath, outputContent, 'utf-8');

console.log(`处理完成！`);
console.log(`共找到 ${uniqueKeys.size} 个唯一 key`);
console.log(`涉及 ${Object.keys(localizationData).length} 种语言`);
console.log(`结果已保存到: ${outputPath}`);

// 显示统计信息
for (const langCode in result) {
  // 计算键值数量
  function countKeys(obj) {
    let count = 0;
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        count += countKeys(obj[key]);
      } else {
        count++;
      }
    }
    return count;
  }
  const keyCount = countKeys(result[langCode]);
  console.log(`  ${langCode}: ${keyCount} 个键值`);
}

// 从 localization.js 中提取 i18n-keys.json 中的 key 对应的值，然后写入 newlang.js 中
// node extract-i18n.js