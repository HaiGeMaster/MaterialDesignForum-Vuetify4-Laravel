import fs from 'fs';
import path from 'path';

// 递归遍历目录，找到所有 .vue 文件
function findVueFiles(dir) {
  let vueFiles = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // 递归遍历子目录
      vueFiles = vueFiles.concat(findVueFiles(fullPath));
    } else if (path.extname(file) === '.vue') {
      // 找到 .vue 文件
      vueFiles.push(fullPath);
    }
  }
  
  return vueFiles;
}

// 从 .vue 文件中提取 template 标签内容
function extractTemplateContent(fileContent) {
  const templateRegex = /<template[\s\S]*?>([\s\S]*?)<\/template>/i;
  const match = fileContent.match(templateRegex);
  return match ? match[1] : '';
}

// 查找内容中的中文字符
function findChineseCharacters(content) {
  const chineseRegex = /[\u4e00-\u9fa5]+/g;
  return content.match(chineseRegex) || [];
}

// 主函数
function main() {
  // 处理 Windows 路径问题
  const __filename = new URL(import.meta.url).pathname;
  // 移除开头的 / 并修复 Windows 路径
  const normalizedPath = __filename.startsWith('/') ? __filename.slice(1) : __filename;
  const __dirname = path.dirname(normalizedPath);
  const projectRoot = path.resolve(__dirname);
  const srcDir = path.join(projectRoot, 'src');
  console.log(`开始查找 ${srcDir} 目录下的 .vue 文件...`);
  
  const vueFiles = findVueFiles(srcDir);
  console.log(`找到 ${vueFiles.length} 个 .vue 文件\n`);
  
  vueFiles.forEach(filePath => {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const templateContent = extractTemplateContent(fileContent);
      
      if (templateContent) {
        const chineseChars = findChineseCharacters(templateContent);
        
        if (chineseChars.length > 0) {
          console.log(`文件: ${filePath}`);
          console.log(`找到的中文字符: ${chineseChars.join(', ')}`);
          // console.log(`文件: ${filePath} 找到的中文字符: ${chineseChars.join(', ')}`);
          console.log('---');
        }
      }
    } catch (error) {
      console.error(`处理文件 ${filePath} 时出错: ${error.message}`);
    }
  });
  
  console.log('查找完成！');
}

// 执行主函数
main();

// 查找所有 .vue 文件中的 template 标签内容中的中文字符
// node find-chinese-in-template.js