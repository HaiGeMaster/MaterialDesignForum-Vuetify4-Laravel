import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 newlang.js
const newlangPath = path.join(__dirname, 'newlang.js');
const outputPath = path.join(__dirname, 'newlang-nested.js');

// 直接读取并处理文件内容
const content = fs.readFileSync(newlangPath, 'utf-8');

// 提取语言数据
function extractLanguageData(content) {
  // 移除 export default 前缀和最后的分号
  const jsonString = content.replace(/^export\s+default\s*/, '').replace(/;$/, '');
  return JSON.parse(jsonString);
}

// 转换扁平化结构为嵌套结构
function convertToNested(obj) {
  const result = {};
  
  for (const key in obj) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k] = obj[key];
      } else {
        if (!current[k]) {
          current[k] = {};
        }
        current = current[k];
      }
    }
  }
  
  return result;
}

try {
  // 提取数据
  const data = extractLanguageData(content);
  
  // 处理每种语言
  const nestedData = {};
  for (const langCode in data) {
    console.log(`处理语言: ${langCode}`);
    nestedData[langCode] = convertToNested(data[langCode]);
  }
  
  // 生成输出内容
  const outputContent = `export default ${JSON.stringify(nestedData, null, 2)};\n`;
  
  // 写入文件
  fs.writeFileSync(outputPath, outputContent, 'utf-8');
  
  console.log(`转换完成！`);
  console.log(`结果已保存到: ${outputPath}`);
  
} catch (e) {
  console.error('处理失败:', e.message);
  console.error('错误堆栈:', e.stack);
  process.exit(1);
}
