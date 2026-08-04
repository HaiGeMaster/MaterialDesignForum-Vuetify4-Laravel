<template>

  <v-list rounded="lg" nav color="primary" style="-webkit-app-region: no-drag;">

    <template v-for="item in filteredNavItems" :key="item.id">
      <v-divider v-if="item.type === 'divider'" />
      <v-list-item rounded="lg" v-else-if="item.type === 'item'" :prepend-icon="item.icon"
        :to="`${$G_UrlHeaderLang()}${item.to}`">
        <span>{{ $t(item.title) }}</span>
      </v-list-item>
    </template>
  </v-list>

</template>



<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
// import { GetInfoData } from '@/api/global.js'
export default {
  name: 'NavigationDrawer',
  props: {
    admin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
      clientNavItemsOnCSD: [
        {
          id: 'home',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Home',
          icon: 'mdi-home',
          to: '/',
          requiresLogin: false
        },
        {
          id: 'topics',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Topics',
          icon: 'mdi-book',
          to: '/topics',
          requiresLogin: false
        },
        {
          id: 'questions',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Questions',
          icon: 'mdi-forum',
          to: '/questions',
          requiresLogin: false
        },
        {
          id: 'articles',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Articles',
          icon: 'mdi-file-document',
          to: '/articles',
          requiresLogin: false
        },
      ],
      clientNavItems: [
        {
          id: 'home',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Home',
          icon: 'mdi-home',
          to: '/',
          requiresLogin: false
        },
        {
          id: 'topics',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Topics',
          icon: 'mdi-book-variant',
          to: '/topics',
          requiresLogin: false
        },
        {
          id: 'questions',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Questions',
          icon: 'mdi-forum',
          to: '/questions',
          requiresLogin: false
        },
        {
          id: 'articles',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Articles',
          icon: 'mdi-file-document',
          to: '/articles',
          requiresLogin: false
        },
        { id: 'divider1', type: 'divider' },
        {
          id: 'personal',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.PersonalData',
          icon: 'mdi-account-circle',
          to: '/users/{user_id}',
          requiresLogin: true
        },
        {
          id: 'users',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Users',
          icon: 'mdi-account-multiple',
          to: '/users',
          requiresLogin: false
        },
        {
          id: 'notifications',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Notice',
          icon: 'mdi-bell',
          to: '/notifications',
          requiresLogin: true
        }
      ],
      adminNavItems: [
        {
          id: 'admin-dashboard',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.DashBoard',
          icon: 'mdi-view-dashboard',
          to: '/admin',
          requiresLogin: true,
          permission: 'ability_admin_login'
        },
        { id: 'divider1', type: 'divider' },
        {
          id: 'admin-topics',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Topics',
          icon: 'mdi-book-variant',
          to: '/admin/topics',
          requiresLogin: true,
          permission: 'ability_admin_manage_topic'
        },
        {
          id: 'admin-questions',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Questions',
          icon: 'mdi-forum',
          to: '/admin/questions',
          requiresLogin: true,
          permission: 'ability_admin_manage_question'
        },
        {
          id: 'admin-answers',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Answers',
          icon: 'mdi-message-reply',
          to: '/admin/answers',
          requiresLogin: true,
          permission: 'ability_admin_manage_answer'
        },
        {
          id: 'admin-articles',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Articles',
          icon: 'mdi-file-document',
          to: '/admin/articles',
          requiresLogin: true,
          permission: 'ability_admin_manage_article'
        },
        {
          id: 'admin-comments',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Comments',
          icon: 'mdi-message-reply-text',
          to: '/admin/comments',
          requiresLogin: true,
          permission: 'ability_admin_manage_comment'
        },
        {
          id: 'admin-replys',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Replts',
          icon: 'mdi-reply-all',
          to: '/admin/replys',
          requiresLogin: true,
          permission: 'ability_admin_manage_reply'
        },

        { id: 'divider2', type: 'divider' },

        {
          id: 'admin-usergroup',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.UserGroup',
          icon: 'mdi-account-group',
          to: '/admin/usergroup',
          requiresLogin: true,
          permission: 'ability_admin_manage_user_group'
        },
        {
          id: 'admin-users',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.User',
          icon: 'mdi-account-multiple',
          to: '/admin/users',
          requiresLogin: true,
          permission: 'ability_admin_manage_user'
        },
        {
          id: 'admin-reports',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Reports',
          icon: 'mdi-flag',
          to: '/admin/reports',
          requiresLogin: true,
          permission: 'ability_admin_manage_report'
        },

        { id: 'divider3', type: 'divider' },

        {
          id: 'admin-options',
          type: 'item',
          title: 'Message.Components.DrawerNavigation.Options',
          icon: 'mdi-cog',
          to: '/admin/options',
          requiresLogin: true,
          permission: 'ability_admin_manage_option'
        }
      ],
    }
  },

  computed: {
    // 根据登录状态和权限过滤导航项
    filteredNavItems() {
      if (this.admin) {
        // 处理管理员导航项
        return this.adminNavItems.map(item => {
          if (item.type === 'divider') return item

          const newItem = { ...item }
          return newItem
        }).filter(item => {
          if (item.type === 'divider') return true
          if (!item.requiresLogin) return true
          if (!this.userStore?.getIsLogin) return false
          // 检查权限
          return this.checkUserGroup(item.permission)
        })
      } else {
        // 处理客户端导航项
        if (this.mainStore.getPageLayout === 'csd') {
          return this.clientNavItemsOnCSD.map(item => {
            if (item.type === 'divider') return item

            const newItem = { ...item }
            return newItem
          }).filter(item => {
            if (item.type === 'divider') return true
            if (!item.requiresLogin) return true
            return this.userStore?.getIsLogin
          })
        } else {

          // 处理客户端导航项
          return this.clientNavItems.map(item => {
            if (item.type === 'divider') return item

            const newItem = { ...item }

            // 统一在 computed 中处理所有替换
            if (newItem.to.includes('{user_id}')) {
              const userId = this.userStore?.getUser?.user_id
              newItem.to = userId
                ? newItem.to.replace('{user_id}', userId)
                : newItem.to // 保持原样或设置为其他路径
            }

            return newItem
          }).filter(item => {
            if (item.type === 'divider') return true
            if (!item.requiresLogin) return true
            return this.userStore?.getIsLogin
          })
        }

      }
    },

    // // 版权信息
    // copyrightInfo() {
    //   const currentYear = new Date().getFullYear()
    //   // 提取公安备案号中的数字
    //   const gwNumber = this.mainStore.getInfoData.site_gongan_beian ? this.mainStore.getInfoData.site_gongan_beian.match(/\d+/)[0] : ''
    //   return {
    //     startYear: 2022,
    //     currentYear,
    //     icpText: this.mainStore.getInfoData.site_icp_beian,
    //     gwText: this.mainStore.getInfoData.site_gongan_beian,
    //     gwNumber: gwNumber,
    //     poweredBy: [
    //       { name: 'Vuetify', url: 'https://vuetifyjs.com/' },
    //       { name: 'Material Design Forum', url: 'https://www.xbedrock.com/info' }
    //     ]
    //   }
    // }
  },

  created() {
    // 初始化导航项
    this.initializeNavItems()
  },
  methods: {
    // 检查用户权限
    checkUserGroup(permission) {
      // 检查用户是否登录且有权限
      return this.userStore?.getIsLogin && this.userStore?.getUser.user_group[permission] === true
    },
    // 初始化导航项数据
    initializeNavItems() {
      // 重置个人资料链接
      const personalItem = this.clientNavItems.find(item => item.id === 'personal')
      if (personalItem) {
        personalItem.to = '/users/{user_id}'
      }
    }
  },
}
</script>