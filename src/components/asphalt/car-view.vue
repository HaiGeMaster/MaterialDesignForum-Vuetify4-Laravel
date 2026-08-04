<template>
  <v-container fluid>
    <v-card>
      <v-toolbar extended>
        <v-toolbar-title text="车辆查询"></v-toolbar-title>

        <template v-slot:extension>
          <v-tabs v-model="serverTab" color="primary" align-tabs="center" grow>
            <v-tab value="al">国服</v-tab>
            <v-tab value="gl">国际服</v-tab>
          </v-tabs>
        </template>

        <template v-slot:append>
          <v-btn rounded="lg"  icon="mdi-magnify"></v-btn>
        </template>
      </v-toolbar>

      <v-divider></v-divider>
      <v-tabs v-model="carClassTab" color="primary" align-tabs="center" grow>
        <v-tab value="D">D</v-tab>
        <v-tab value="C">C</v-tab>
        <v-tab value="B">B</v-tab>
        <v-tab value="A">A</v-tab>
        <v-tab value="S">S</v-tab>
        <v-tab value="R" v-if="serverTab === 'al'">R</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-row gap="comfortable" justify="center">
        <v-col v-for="(car, i) in filteredCars" :key="i" cols="12" sm="6" md="4" lg="3" class="pa-2">
          <carItem :car="car" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import carItem from './car-item.vue'
import { carData } from './data.js'
export default {
  name: 'car-view',
  components: {
    carItem,
  },
  data() {
    return {
      serverTab: 'al',
      carClassTab: 'D',
      loading: false,
      search: '',
    }
  },
  computed: {
    filteredCars() {

      // let H = {
      //   "user": { // 用户信息对象，包含用户基本资料、设置、身份等核心数据
      //     "id": "46e110a6-880b-11f0-a34a-b76ddb1c626b", // 用户唯一标识符（UUID格式）
      //     "isAdmin": false, // 是否为管理员（false表示普通用户）
      //     "role": "user", // 用户角色（此处为普通用户角色）
      //     "name": "HaiGeMaster", // 用户显示名称
      //     "shortid": "WNCqRRVY", // 用户短标识符（用于简化展示）
      //     "picture": "https://avatars.githubusercontent.com/u/54298304?v=4", // 用户头像链接（GitHub头像）
      //     "settings": { // 用户个性化设置对象，包含界面、功能偏好等
      //       "one": { // "one"相关设置子对象（可能为特定模块或版本的设置分组）
      //         "ads": { // 广告相关设置
      //           "house": false, // 是否显示房屋类广告（false不显示）
      //           "enabled": true // 广告功能总开关（true启用广告）
      //         }, // 结束广告设置
      //         "sync": true, // 数据同步功能开关（true启用同步）
      //         "suits": { // 界面套装/元素设置（控制UI组件组合）
      //           "suit": "", // 当前选中的套装名称（空表示未选择套装）
      //           "enabled": false, // 套装功能开关（false禁用套装）
      //           "elements": [ // 启用的界面元素数组
      //             "app-bar" // 已启用的元素：应用栏（顶部导航栏）
      //           ] // 结束启用的界面元素列表
      //         }, // 结束套装设置
      //         "theme": "system", // 界面主题（system表示跟随系统主题）
      //         "avatar": "", // 自定义头像标识（空表示未设置自定义头像）
      //         "colors": { // 主题颜色配置
      //           "primary": "surface-light" // 主色调（surface-light表示浅色表面风格）
      //         }, // 结束颜色设置
      //         "banners": { // 横幅通知设置
      //           "last": "2026-03-17T01:13:59.867Z", // 上次查看横幅的时间（ISO 8601格式）
      //           "read": [ // 已读横幅通知的ID数组
      //             "vuetify-snips-all", // 已读横幅：Vuetify代码片段合集
      //             "bitterbrains-placeholder-53115cc0-7940-11f0-9a1c-037f6308bfe7", // 已读横幅：BitterBrains占位符相关
      //             "september-2025-update", // 已读横幅：2025年9月更新
      //             "october-2025-update", // 已读横幅：2025年10月更新
      //             "black-friday-sale", // 已读横幅：黑色星期五促销
      //             "vuetify-4-alpha", // 已读横幅：Vuetify 4 Alpha版
      //             "vue-school-end-of-year-sale", // 已读横幅：Vue School年终促销
      //             "vuetify-4-documentation", // 已读横幅：Vuetify 4文档
      //             "vuetify-4-is-here" // 已读横幅：Vuetify 4发布
      //           ], // 结束已读横幅ID列表
      //           "enabled": true // 横幅通知功能开关（true启用）
      //         }, // 结束横幅设置
      //         "command": {}, // 命令相关设置（空对象，未配置具体命令）
      //         "devmode": true, // 开发者模式开关（true启用开发者工具）
      //         "direction": "ltr", // 界面文本方向（ltr表示从左到右）
      //         "ecosystem": { // 生态系统相关设置（如插件、集成服务）
      //           "seen": true, // 是否已查看生态系统内容（true已查看）
      //           "pinned": [] // 固定的生态系统项目ID数组（空表示无固定项）
      //         }, // 结束生态系统设置
      //         "quicklinks": true, // 快速链接功能开关（true启用常用链接快捷入口）
      //         "notifications": { // 通知相关设置
      //           "last": "", // 上次查看通知的时间（空表示从未查看）
      //           "read": [ // 已读通知的ID数组
      //             "vuetify-may-2025-update-now-live", // 已读通知：2025年5月Vuetify更新上线
      //             "april-update-mcp-theming-and-more", // 已读通知：4月更新（MCP主题等）
      //             "vuetify-snips-a-tool-for-web-design", // 已读通知：Vuetify代码片段（网页设计工具）
      //             "v36-nebula-release", // 已读通知：v3.6 Nebula版本发布
      //             "get-help-with-your-vuetify-project", // 已读通知：获取Vuetify项目帮助
      //             "test-a131fa00-e17e-11ee-9280-49b546ba7588", // 已读通知：测试通知（含UUID）
      //             "2024-component-roadmap-announced", // 已读通知：2024组件路线图公布
      //             "update-for-vuetify-one-subscribers", // 已读通知：Vuetify One订阅者更新
      //             "slides-from-vueconf-toronto-2023", // 已读通知：2023多伦多VueConf幻灯片
      //             "vuetify-link", // 已读通知：Vuetify链接
      //             "github-open-source-friday" // 已读通知：GitHub开源周五
      //           ], // 结束已读通知ID列表
      //           "enabled": true // 通知功能开关（true启用通知）
      //         } // 结束通知设置
      //       }, // 结束"one"设置子对象
      //       "version": 7, // 用户设置数据结构版本号（当前为第7版）
      //       "ecosystem": { // 生态系统全局配置对象（跨模块共享设置）
      //         "bin": { // 工具箱（bin）相关设置（如实用工具入口）
      //           "wordWrap": true, // 工具箱内容自动换行开关（true启用）
      //           "dashboard": { // 仪表盘配置
      //             "sortBy": [], // 仪表盘项目排序依据（空数组表示默认排序）
      //             "itemsPerPage": 10 // 仪表盘每页显示项目数量（10个）
      //           } // 结束仪表盘配置
      //         }, // 结束工具箱设置
      //         "mcp": { // MCP（可能为某服务/模块）设置
      //           "seen": false // 是否已查看MCP相关内容（false未查看）
      //         }, // 结束MCP设置
      //         "docs": { // 文档相关设置
      //           "api": "inline", // API文档展示模式（inline表示内联在页面中）
      //           "pins": { // 文档固定项配置
      //             "pinned": [], // 已固定的文档项ID数组（空表示无固定项）
      //             "enabled": false // 文档固定功能开关（false禁用）
      //           }, // 结束文档固定项配置
      //           "favorites": [], // 收藏的文档项ID数组（空表示无收藏）
      //           "mixedTheme": true, // 是否使用混合主题（true启用深浅色混合）
      //           "railDrawer": false, // 是否显示侧边抽屉（false隐藏）
      //           "composition": "options", // 组合式API代码风格（options表示选项式API）
      //           "slashSearch": false // 是否启用斜杠快捷搜索（false禁用）
      //         }, // 结束文档设置
      //         "link": {}, // 链接相关设置（空对象，未配置具体链接）
      //         "play": { // Play环境（代码沙箱）配置
      //           "wordWrap": false, // 代码自动换行开关（false不换行）
      //           "autoFormat": true, // 代码自动格式化开关（true启用）
      //           "showErrors": true // 显示代码错误开关（true显示错误提示）
      //         }, // 结束Play环境设置
      //         "studio": {} // Studio（工作室）相关设置（空对象，未配置）
      //       } // 结束生态系统全局配置
      //     }, // 结束用户个性化设置
      //     "identities": [ // 用户关联的身份认证源数组（支持多平台登录）
      //       { // GitHub身份认证信息对象
      //         "id": "46e11b82-880b-11f0-a34a-b74459c95380", // 该身份记录在系统中的唯一ID（UUID）
      //         "provider": "github", // 身份认证提供商（GitHub）
      //         "userId": "54298304", // GitHub账号的用户ID
      //         "userHandle": "HaiGeMaster", // GitHub账号用户名（handle）
      //         "primary": true, // 是否为主身份认证源（true表示优先使用此身份）
      //         "emails": [ // 关联的邮箱地址数组
      //           "2652549974@qq.com", // 关联邮箱1：QQ邮箱
      //           "54298304+HaiGeMaster@users.noreply.github.com" // 关联邮箱2：GitHub noreply邮箱（防垃圾邮件）
      //         ] // 结束关联邮箱列表
      //       } // 结束GitHub身份认证信息
      //     ], // 结束身份认证源列表
      //     "sponsorships": [], // 用户赞助记录数组（空表示无赞助行为）
      //     "team": null // 用户所属团队（null表示未加入任何团队）
      //   }, // 结束用户信息对象
      //   "access": [] // 用户访问权限列表（空数组表示无特殊权限）
      // };

      // H.user.settings.one.ads.enabled = false//禁用广告功能
      // H.user.isAdmin = true//设置为管理员用户
      // H.user.role = 'admin'//设置为管理员角色
      // H.user.settings.one.suits.enabled = true//启用suit功能
      


      const data = this.serverTab === 'al' ? carData.al : carData.gl
      return data.filter(car => car.carClass === this.carClassTab)


    }
  }
}
</script>