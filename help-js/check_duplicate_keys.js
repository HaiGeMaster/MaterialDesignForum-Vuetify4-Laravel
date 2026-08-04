import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取语言文件
const localizationPath = path.join(__dirname, 'src', 'assets', 'language', 'localization.js');
const localizationContent = fs.readFileSync(localizationPath, 'utf8');

// 解析语言文件内容
function parseLocalizationContent(content) {
  // 移除 export default 语句
  const cleanedContent = content.replace('export default ', '');
  // 尝试解析为JSON
  try {
    return eval(`(${cleanedContent})`);
  } catch (error) {
    console.error('解析语言文件失败:', error);
    return null;
  }
}

// 检查对象中的重复值
function findDuplicateValues(obj, path = '') {
  const valueMap = new Map(); // 存储值到路径数组的映射
  
  function traverse(currentObj, currentPath) {
    if (typeof currentObj === 'object' && currentObj !== null) {
      Object.keys(currentObj).forEach(key => {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        traverse(currentObj[key], newPath);
      });
    } else if (typeof currentObj === 'string' && currentObj.length > 0) {
      // 只处理非空字符串
      if (valueMap.has(currentObj)) {
        valueMap.get(currentObj).push(currentPath);
      } else {
        valueMap.set(currentObj, [currentPath]);
      }
    }
  }
  
  traverse(obj, path);
  
  // 提取有重复值的条目
  const duplicates = [];
  valueMap.forEach((paths, value) => {
    if (paths.length > 1) {
      duplicates.push({ value, paths });
    }
  });
  
  return duplicates;
}

// 主函数
function main() {
  const localizationData = parseLocalizationContent(localizationContent);
  
  if (!localizationData) {
    console.error('无法解析语言文件');
    return;
  }
  
  console.log('开始检查重复键值...');
  
  // 遍历每种语言
  Object.keys(localizationData).forEach(lang => {
    console.log(`\n检查语言: ${lang}`);
    
    const duplicateValues = findDuplicateValues(localizationData[lang]);
    
    if (duplicateValues.length > 0) {
      console.log('发现重复翻译字符串:');
      duplicateValues.forEach(({ value, paths }) => {
        console.log(`  字符串: "${value}"`);
        console.log(`  出现路径:`);
        paths.forEach(path => {
          console.log(`    - ${path}`);
        });
        console.log('');
      });
    } else {
      console.log('未发现重复翻译字符串');
    }
  });
  
  console.log('\n检查完成！');
}

// 运行主函数
main();