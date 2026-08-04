
//  node sort-localization.js
/**
 * 递归按 A-Z 排序对象 key
 */
function sortObjectKeys(obj) {
  if (typeof obj !== 'object' || obj === null) return obj

  return Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = sortObjectKeys(obj[key])
      return acc
    }, {})
}

/**
 * 转为 JS 字面量（key 无引号，value 全部双引号）
 */
function objectToJsString(obj, indent = 0) {
  const pad = ' '.repeat(indent)

  if (obj === null) return 'null'
  if (typeof obj !== 'object') {
    return typeof obj === 'string'
      ? `"${obj.replace(/"/g, '\\"')}"`
      : String(obj)
  }

  if (Array.isArray(obj)) {
    const items = obj.map(v => objectToJsString(v, indent + 2)).join(', ')
    return `[${items}]`
  }

  const entries = Object.entries(obj).map(([k, v]) => {
    const value = objectToJsString(v, indent + 2)
    return `${pad}  ${k}: ${value}`
  })

  return `{\n${entries.join(',\n')}\n${pad}}`
}

/* ------------------ main ------------------ */
import fs from 'fs'
import path from 'path'

const inputPath = path.resolve('src/assets/language/localization.old.js')
const outputPath = path.resolve('src/assets/language/localization.js')

try {
  const content = fs.readFileSync(inputPath, 'utf-8')

  const jsBody = content.replace(/export\s+default/, '').trim()
  const data = new Function(`return ${jsBody}`)()

  const sortedData = sortObjectKeys(data)

  const output = `export default ${objectToJsString(sortedData, 0)}\n`
  fs.writeFileSync(outputPath, output, 'utf-8')

  console.log('语言文件排序脚本：：✅ 排序完成：key 无引号，value 全双引号')
} catch (err) {
  console.error('语言文件排序脚本：：❌ 处理失败：', err.message)
}