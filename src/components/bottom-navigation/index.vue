
<template>
  <v-bottom-navigation grow :active="show">
    <v-btn   
      v-for="item in filteredNavItems" 
      :key="item.id" 
      color="primary" 
      :to="`${$G_UrlHeaderLang()}${item.to}`"
    >
      <v-icon>{{ item.icon }}</v-icon>
      {{ $t(item.title) }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { useUserStore } from '@/stores/user'
// import { useMainStore } from '@/stores/main'

export default {
  name: 'BottomNavigation',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userStore: useUserStore(),
      // mainStore: useMainStore(),
      clientNavItems: [
        {
          id: 'home',
          title: 'Message.Components.DrawerNavigation.Home',
          icon: 'mdi-home',
          to: '/',
          requiresLogin: false
        },
        {
          id: 'topics',
          title: 'Message.Components.DrawerNavigation.Topics',
          icon: 'mdi-book',
          to: '/topics',
          requiresLogin: false
        },
        {
          id: 'questions',
          title: 'Message.Components.DrawerNavigation.Questions',
          icon: 'mdi-forum',
          to: '/questions',
          requiresLogin: false
        },
        {
          id: 'users',
          title: 'Message.Components.DrawerNavigation.Users',
          icon: 'mdi-account-multiple',
          to: '/users',
          requiresLogin: false,
          showWhenLoggedIn: false
        },
        {
          id: 'personal',
          title: 'Message.Components.DrawerNavigation.PersonalData',
          icon: 'mdi-account',
          to: '/users/{user_id}',
          requiresLogin: true,
          showWhenLoggedIn: true
        }
      ],
      adminNavItems: [
        {
          id: 'admin-dashboard',
          title: 'Message.Components.DrawerNavigation.DashBoard',
          icon: 'mdi-view-dashboard',
          to: '/admin',
          requiresLogin: true,
          permission: 'ability_normal_login'
        },
        {
          id: 'admin-topics',
          title: 'Message.Components.DrawerNavigation.Topics',
          icon: 'mdi-book-variant',
          to: '/admin/topics',
          requiresLogin: true,
          permission: 'ability_admin_manage_topic'
        },
        {
          id: 'admin-questions',
          title: 'Message.Components.DrawerNavigation.Questions',
          icon: 'mdi-forum',
          to: '/admin/questions',
          requiresLogin: true,
          permission: 'ability_admin_manage_question'
        },
        {
          id: 'admin-answers',
          title: 'Message.Components.DrawerNavigation.Answers',
          icon: 'mdi-message-reply',
          to: '/admin/answers',
          requiresLogin: true,
          permission: 'ability_admin_manage_answer'
        },
        {
          id: 'admin-articles',
          title: 'Message.Components.DrawerNavigation.Articles',
          icon: 'mdi-file-document',
          to: '/admin/articles',
          requiresLogin: true,
          permission: 'ability_admin_manage_article'
        },
        {
          id: 'admin-comments',
          title: 'Message.Components.DrawerNavigation.Comments',
          icon: 'mdi-message-reply-text',
          to: '/admin/comments',
          requiresLogin: true,
          permission: 'ability_admin_manage_comment'
        },
        {
          id: 'admin-replys',
          title: 'Message.Components.DrawerNavigation.Replts',
          icon: 'mdi-reply-all',
          to: '/admin/replys',
          requiresLogin: true,
          permission: 'ability_admin_manage_reply'
        },
        {
          id: 'admin-usergroup',
          title: 'Message.Components.DrawerNavigation.UserGroup',
          icon: 'mdi-account-group',
          to: '/admin/usergroup',
          requiresLogin: true,
          permission: 'ability_admin_manage_user_group'
        },
        {
          id: 'admin-users',
          title: 'Message.Components.DrawerNavigation.User',
          icon: 'mdi-account-multiple',
          to: '/admin/users',
          requiresLogin: true,
          permission: 'ability_admin_manage_user'
        },
        {
          id: 'admin-reports',
          title: 'Message.Components.DrawerNavigation.Reports',
          icon: 'mdi-alert-octagon',
          to: '/admin/reports',
          requiresLogin: true,
          permission: 'ability_admin_manage_report'
        },
        {
          id: 'admin-options',
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
    filteredNavItems() {
      const maxItems = 4
      
      if (this.admin) {
        // 处理管理员导航项
        const processedItems = this.adminNavItems.map(item => {
          const newItem = { ...item }
          return newItem
        })
        
        // 首先尝试获取所有符合条件的项（包括权限检查）
        let allowedItems = processedItems.filter(item => {
          if (item.requiresLogin) {
            // 检查登录状态
            if (!this.userStore.getIsLogin) return false
            // 尝试权限检查，如果权限检查方法不存在或失败，对于管理员面板首页给予特殊处理
            if (item.id === 'admin-dashboard') {
              // 管理员面板首页即使权限检查失败也应该显示
              return true
            }
            return this.checkUserGroup(item.permission)
          }
          return true
        })
        
        // 如果没有任何项（可能是权限检查全部失败），至少显示管理员面板首页
        if (allowedItems.length === 0) {
          const dashboardItem = processedItems.find(item => item.id === 'admin-dashboard')
          if (dashboardItem) {
            allowedItems = [dashboardItem]
          }
        }
        
        // 如果项不足4个，添加其他管理员导航项（不考虑权限）
        // if (allowedItems.length < maxItems) {
        //   const additionalItems = processedItems.filter(item => {
        //     // 排除已在允许列表中的项
        //     if (allowedItems.some(allowed => allowed.id === item.id)) return false
        //     // 对于管理员模式，即使权限不够也显示一些项
        //     return true
        //   })
          
        //   // 合并列表，优先显示已允许的项
        //   allowedItems = [...allowedItems, ...additionalItems].slice(0, maxItems)
        // }
        
        return allowedItems.slice(0, maxItems)
      } else {
        // 处理客户端导航项
        const processedItems = this.clientNavItems.map(item => {
          const newItem = { ...item }

          // 处理用户ID替换
          if (newItem.to.includes('{user_id}')) {
            const userId = this.userStore?.getUser?.user_id
            newItem.to = userId
              ? newItem.to.replace('{user_id}', userId)
              : newItem.to
          }

          return newItem
        })
        
        // 根据登录状态过滤
        const allowedItems = processedItems.filter(item => {
          if (item.showWhenLoggedIn !== undefined) {
            return item.showWhenLoggedIn === this.userStore.getIsLogin
          }
          if (item.requiresLogin) {
            return this.userStore.getIsLogin
          }
          return true
        })
        
        // 如果显示的项不足4个，尝试添加其他项
        if (allowedItems.length < maxItems) {
          const additionalItems = processedItems.filter(item => {
            // 排除已在允许列表中的项
            if (allowedItems.some(allowed => allowed.id === item.id)) return false
            // 添加其他未显示的项（不需要登录的项）
            if (!item.requiresLogin) return true
            return false
          })
          
          // 合并列表，优先显示符合条件的项
          return [...allowedItems, ...additionalItems].slice(0, maxItems)
        }
        
        return allowedItems.slice(0, maxItems)
      }
    },
  },
  methods: {
    // 检查用户权限
    checkUserGroup(permission) {
      // 检查用户是否登录且有权限
      return this.userStore?.getIsLogin && this.userStore?.getUser.user_group[permission] === true
    },
  }
}
</script>