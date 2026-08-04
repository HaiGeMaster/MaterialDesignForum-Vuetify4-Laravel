import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 递归查找目录下的所有 .vue 文件
function findVueFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findVueFiles(filePath, fileList);
    } else if (file.endsWith('.vue')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 提取 $t() 中的字符串字面量和 "Message.*" 形式的字符串
function extractI18nKeys(content) {
  const keys = [];
  const keySet = new Set(); // 用于去重
  
  // 匹配 $t('xxx') 或 $t("xxx") 格式，但不匹配 $t(变量)
  // 这个正则表达式会匹配：
  // - $t('string')
  // - $t("string")
  // - $t('string', ...)
  // - $t("string", ...)
  const tRegex = /\$t\(\s*['"]([^'"]+)['"]/g;
  
  let match;
  while ((match = tRegex.exec(content)) !== null) {
    const key = match[1];
    if (!keySet.has(key)) {
      keySet.add(key);
      keys.push({
        key: key,
        fullMatch: match[0]
      });
    }
  }
  
  // 匹配 "Message.*" 形式的字符串
  // 这个正则表达式会匹配：
  // - "Message.Some.Key"
  // - 'Message.Another.Key'
  const messageRegex = /['"](Message\.[^'"]+)['"]/g;
  
  while ((match = messageRegex.exec(content)) !== null) {
    const key = match[1];
    if (!keySet.has(key)) {
      keySet.add(key);
      keys.push({
        key: key,
        fullMatch: match[0]
      });
    }
  }
  
  return keys;
}

// 主函数
function main() {
  const srcDir = path.join(__dirname, 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error('src 目录不存在');
    process.exit(1);
  }
  
  console.log('正在扫描 src 目录下的 .vue 文件...');
  const vueFiles = findVueFiles(srcDir);
  console.log(`找到 ${vueFiles.length} 个 .vue 文件\n`);
  
  const result = {};
  
  vueFiles.forEach(filePath => {
    const relativePath = path.relative(__dirname, filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const keys = extractI18nKeys(content);
    
    if (keys.length > 0) {
      result[relativePath] = keys;
    }
  });
  
  // 输出为 JSON 文件
  const outputPath = path.join(__dirname, 'i18n-keys.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
  
  console.log(`\n找到的 i18n keys 已保存到: ${outputPath}`);
  console.log(`\n统计信息:`);
  console.log(`- 扫描文件数: ${vueFiles.length}`);
  console.log(`- 包含 $t() 的文件数: ${Object.keys(result).length}`);
  console.log(`- 总共找到的 key 数: ${Object.values(result).reduce((sum, keys) => sum + keys.length, 0)}`);
}

main();

// 查找所有 .vue 文件中的 $t() 调用
// node find-i18n-keys.js