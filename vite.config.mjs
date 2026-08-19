// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import VueDevTools from 'vite-plugin-vue-devtools'
// import obfuscator from 'rollup-plugin-obfuscator'
// import compression from 'vite-plugin-compression'; // 导入插件

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import path from 'path'

// 生成打包日期版本号，格式：YYYY.MM.DD
const getBuildVersion = () => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 开发环境配置
  const isDev = mode === 'development';
  // 生产环境配置
  const isProd = mode === 'production';

  const buildVersion = getBuildVersion()

  // 基础配置
  const config = {

    plugins: [
      Layouts(),
      Vue({ template: { transformAssetUrls } }),
      VueDevTools(),

      // // Gzip 压缩配置
      // compression({
      //   algorithm: 'gzip', // 压缩算法：gzip 或 brotliCompress（Brotli）
      //   ext: '.gz', // 生成的压缩文件后缀（如 main.js → main.js.gz）
      //   threshold: 10240, // 文件大小阈值（单位：字节），≥10KB 的文件才压缩（避免小文件压缩后体积变大）
      //   minRatio: 0.8, // 压缩比率阈值（默认 0.8，即压缩后体积 ≤ 原体积的 80% 才保留）
      //   deleteOriginFile: false, // 是否删除源文件（建议 false，保留原文件备用）
      //   verbose: true, // 是否在控制台输出压缩日志（调试用）
      // }),
      // // （可选）同时启用 Brotli 压缩（压缩率比 Gzip 高 15%-25%，但兼容性稍差）
      // compression({
      //   algorithm: 'brotliCompress',
      //   ext: '.br',
      //   threshold: 10240,
      //   minRatio: 0.8,
      //   deleteOriginFile: false,
      // }),

      Vuetify({
        autoImport: true,
        styles: { configFile: 'src/styles/settings.scss' }
      }),
      Components(),
      Fonts({
        google: {
          families: [{
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900'
          }]
        },
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          { pinia: ['defineStore', 'storeToRefs'] }
        ],
        eslintrc: { enabled: true },
        vueTemplate: false //true
      }),
      // 构建时写入 theme.json 和 package.json，自动更新版本号
      {
        name: 'write-build-version',
        apply: 'build',
        writeBundle() {
          const themePath = path.resolve(__dirname, 'public/theme.json')
          if (fs.existsSync(themePath)) {
            const theme = JSON.parse(fs.readFileSync(themePath, 'utf-8'))
            theme.version = buildVersion
            fs.writeFileSync(themePath, JSON.stringify(theme, null, 2) + '\n')
          }
          const pkgPath = path.resolve(__dirname, 'package.json')
          if (fs.existsSync(pkgPath)) {
            const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
            pkg.version = buildVersion
            fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
          }
        },
      },
    ],
    optimizeDeps: {
      exclude: [
        'vuetify',
        'vue-router'
      ]
    },
    define: {
      'process.env': {},
      __BUILD_VERSION__: JSON.stringify(buildVersion),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url))
      },
      extensions: [
        '.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'
      ]
    },
    server: {
      port: 3000
    },


    // css: { extract: false } // 生产环境也内联 CSS

    // css: {
    //   postcss: {
    //     plugins: [
    //       {
    //         postcssPlugin: 'delete-font-inherit',
    //         Rule(rule) {
    //           // 检查规则的选择器是否为 "button, input, optgroup, select, textarea"
    //           if (rule.selector === 'button, input, optgroup, select, textarea') {
    //             // 检查并删除包含 `font: inherit` 的声明
    //             rule.walkDecls('font', (decl) => {
    //               if (decl.value === 'inherit') {
    //                 decl.remove();
    //               }
    //             });
    //           }
    //         }
    //       }
    //     ]
    //   }
    // }
  };

  // 检测是否为 Tauri 打包（通过 package.json scripts 中注入的 TAURI_BUILD 环境变量）
  const isTauriBuild = process.env.TAURI_BUILD === '1';

  // 生产环境特定配置
  if (isProd) {
    if (isTauriBuild) {
      config.base = './'; // 打包 tauri、electron、mobileapp 专用
    } else {
      config.base = '/themes/MaterialDesignForum-Vuetify4/'; // 打包 web 专用
      config.build = {
        sourcemap: false,
        outDir: '../MaterialDesignForum-Laravel/public/themes/MaterialDesignForum-Vuetify4', // 打包 web 专用
      };
    }

    // 读取 src/components 和 src/pages 下的子目录，用于分包
    function getSubDirs(dirPath) {
      return fs.existsSync(dirPath)
        ? fs.readdirSync(dirPath, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name)
        : []
    }
    const componentNames = getSubDirs(path.resolve(__dirname, 'src/components'))
    const pageNames = getSubDirs(path.resolve(__dirname, 'src/pages'))

    // pages 二级子目录：如 admin/answers、client/home 等
    const nestedPageNames = []
    for (const page of pageNames) {
      const subDirs = getSubDirs(path.resolve(__dirname, 'src/pages', page))
      for (const sub of subDirs) {
        nestedPageNames.push(`${page}/${sub}`)
      }
    }

    // components 多级子目录：扫描到 3 级
    // lv1: components/<name>/       — 单个 .vue 或子目录
    // lv2: components/<name>/<sub>/ — 二级子目录
    // lv3: components/<name>/<sub>/<subsub>/ — 三级子目录
    const cmpPaths2 = []  // 如 dialog/delete-dialog
    const cmpPaths3 = []  // 如 fab-dialog/search-fab-dialog/v1
    for (const name of componentNames) {
      const subs = getSubDirs(path.resolve(__dirname, 'src/components', name))
      for (const sub of subs) {
        cmpPaths2.push(`${name}/${sub}`)
        const subSubs = getSubDirs(path.resolve(__dirname, 'src/components', name, sub))
        for (const subSub of subSubs) {
          cmpPaths3.push(`${name}/${sub}/${subSub}`)
        }
      }
    }

    const existingBuild = config.build ?? {}
    existingBuild.rollupOptions = existingBuild.rollupOptions ?? {}
    existingBuild.rollupOptions.output = existingBuild.rollupOptions.output ?? {}

    // 保留已存在的 manualChunks 或创建新的
    const prevManualChunks = existingBuild.rollupOptions.output.manualChunks

    existingBuild.rollupOptions.output.manualChunks = (id, { getModuleInfo }) => {
      // 先检查之前已有的 manualChunks 逻辑
      if (typeof prevManualChunks === 'function') {
        const result = prevManualChunks(id, { getModuleInfo })
        if (result) return result
      }

      // 三级组件：components/<name>/<sub>/<subsub>/
      for (const path of cmpPaths3) {
        if (id.includes(`/components/${path}/`)) {
          return `component-${path.replace(/\//g, '-')}`
        }
      }

      // 二级组件：components/<name>/<sub>/
      for (const path of cmpPaths2) {
        if (id.includes(`/components/${path}/`)) {
          return `component-${path.replace('/', '-')}`
        }
      }

      // 一级组件：components/<name>/
      for (const name of componentNames) {
        if (id.includes(`/components/${name}/`)) {
          return `component-${name}`
        }
      }

      // 二级页面：pages/<page>/<sub>/
      for (const name of nestedPageNames) {
        if (id.includes(`/pages/${name}/`)) {
          return `page-${name.replace('/', '-')}`
        }
      }

      // 一级页面：pages/<name>/
      for (const name of pageNames) {
        if (id.includes(`/pages/${name}/`)) {
          return `page-${name}`
        }
      }
    }

    config.build = existingBuild
  }

  return config;
})
