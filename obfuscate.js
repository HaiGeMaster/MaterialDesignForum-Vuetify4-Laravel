import pkg from 'javascript-obfuscator';
const { obfuscate } = pkg;
import fs from 'fs';
import path from 'path';

// 构建输出目录
const outputDir = '../MaterialDesignForum-Server/public/themes/MaterialDesignForum-Vuetify4/assets';

// 读取目录中的所有 JS 文件
fs.readdir(outputDir, (err, files) => {
  if (err) {
    console.error('读取目录失败:', err);
    return;
  }

  // 过滤出 JS 文件
  const jsFiles = files.filter(file => path.extname(file) === '.js');

  // 对每个 JS 文件进行混淆
  jsFiles.forEach(file => {
    const filePath = path.join(outputDir, file);
    console.log(`正在混淆文件: ${file}`);

    // 读取文件内容
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        console.error(`读取文件失败: ${file}`, err);
        return;
      }

      // 混淆配置
      const options = {
        compact: true, // 压缩代码
        // controlFlowFlattening: true, // 控制流扁平化（增加代码复杂度）
        // controlFlowFlatteningThreshold: 0.75, // 控制流扁平化阈值
        // deadCodeInjection: true, // 注入死代码
        // deadCodeInjectionThreshold: 0.4, // 死代码注入阈值
        // debugProtection: false, // 调试保护
        // debugProtectionInterval: 0, // 调试保护间隔
        // disableConsoleOutput: true, // 禁用控制台输出
        // domainLock: [], // 域名锁定
        identifierNamesGenerator: 'mangled', // 标识符生成器 hexadecimal, mangled, or dictionary
        // identifiersPrefix: '', // 标识符前缀
        // inputFileName: '', // 输入文件名
        // log: false, // 日志
        // numbersToExpressions: true, // 将数字转换为表达式
        // renameGlobals: false, // 重命名全局变量
        // renameProperties: false, // 重命名属性
        // renamePropertiesMode: 'safe', // 重命名属性模式
        // reservedNames: [], // 保留的名称
        // reservedStrings: [], // 保留的字符串
        // rotateStringArray: true, // 旋转字符串数组
        // seed: 0, // 种子
        // selfDefending: true, // 自我保护
        simplify: true, // 简化代码
        splitStrings: true, // 分割字符串
        splitStringsChunkLength: 10, // 分割字符串块长度
        stringArray: true, // 字符串数组
        stringArrayEncoding: ['base64'], // 字符串数组编码
        // stringArrayIndexesType: ['hexadecimal-number'], // 字符串数组索引类型
        // stringArrayWrappersCount: 1, // 字符串数组包装器数量
        // stringArrayWrappersChainedCalls: true, // 字符串数组包装器链式调用
        // stringArrayWrappersParametersMaxCount: 2, // 字符串数组包装器参数最大数量
        // stringArrayWrappersType: 'variable', // 字符串数组包装器类型
        // stringArrayThreshold: 0.75, // 字符串数组阈值
        // target: 'browser', // 目标环境
        transformObjectKeys: true, // 转换对象键
        unicodeEscapeSequence: true // Unicode 转义序列
      };

      // 混淆代码
      try {
        const obfuscatedCode = obfuscate(content, options).getObfuscatedCode();

        // 写回文件
        fs.writeFile(filePath, obfuscatedCode, 'utf8', (err) => {
          if (err) {
            console.error(`写入文件失败: ${file}`, err);
            return;
          }
          console.log(`混淆完成: ${file}`);
        });
      } catch (error) {
        console.error(`混淆失败: ${file}`, error);
      }
    });
  });
});
