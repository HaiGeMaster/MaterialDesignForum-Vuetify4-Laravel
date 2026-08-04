<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item v-bind="activatorProps" prepend-icon="mdi-palette" title="配色"
        append-icon="mdi-dots-vertical"></v-list-item>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card rounded="lg" >
        <v-toolbar title="材质选择">


          <template v-slot:append>
            <v-btn  icon @click="isActive.value = false">
              <v-icon>
                mdi-close
              </v-icon>
              <v-tooltip activator="parent" location="left">关闭</v-tooltip>
            </v-btn>
          </template>
        </v-toolbar>

        <v-card-text>
          <v-card-subtitle>
            选择您喜欢的主题材质
          </v-card-subtitle>
          <v-list rounded="lg"  v-model:selected="settingsSelection" lines="two" select-strategy="single-leaf">
            <!-- <v-list-subheader>选择您喜欢的主题配色</v-list-subheader> -->
            <v-list-item rounded="lg" v-for="item in Themes" :key="item" :title="item" active-class="primary" :value="item" @click="SwitchTheme($event)">
              <template v-slot:append="{ isSelected, select }">
                <v-list-item-action start>
                  <v-radio readonly :model-value="isSelected" @update:model-value="select"></v-radio>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>

      </v-card>


    </template>
  </v-dialog>

</template>

<script>
import { useTheme } from 'vuetify'

export default {
  data() {
    return {
      currentTheme: '',
      mediaQueryListener: null,
      theme: useTheme(), // 获取主题对象

      settingsSelection: ['system'],
      settingsItems: [
        { value: 'notifications', title: 'Notifications', subtitle: 'Notify me about updates to apps or games that I downloaded' },
        { value: 'sound', title: 'Sound', subtitle: 'Auto-update apps at any time. Data charges may apply' },
        { value: 'widgets', title: 'Auto-add widgets', subtitle: 'Automatically add home screen widgets when downloads complete' },
      ],
    }
  },
  methods: {
    SwitchTheme(event = null) {

      if (event) {
        document.documentElement.style.setProperty('--x', event.clientX + 'px')
        document.documentElement.style.setProperty('--y', event.clientY + 'px')
      } else {
        document.documentElement.style.setProperty('--x', '0px')
        document.documentElement.style.setProperty('--y', '0px')
      }
      // console.log(this.currentTheme)
      switch (this.currentTheme) {
        case 'system':
          // 系统主题模式
          this.AddSystemTheme(event)
          break;
        default:

          // console.log(this.mediaQueryListener)

          //移除系统主题变化监听器
          if (this.mediaQueryListener) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            mediaQuery.removeEventListener('change', this.mediaQueryListener)
          }
          break;
      }
    },
    AddSystemTheme(event = null) {
      if (event) {
        document.documentElement.style.setProperty('--x', event.clientX + 'px')
        document.documentElement.style.setProperty('--y', event.clientY + 'px')
      } else {
        document.documentElement.style.setProperty('--x', '0px')
        document.documentElement.style.setProperty('--y', '0px')
      }

      //监听系统主题变化
      const _this = this;
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      this.mediaQueryListener = (e) => {
        // theme.global.name.value = e.matches ? 'dark' : 'light'
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            _this.theme.change(e.matches ? 'dark' : 'light')
          });
        }
      }
      mediaQuery.addEventListener('change', this.mediaQueryListener)

      //立即应用系统主题变化
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          _this.theme.change(mediaQuery.matches ? 'dark' : 'light')
        });
      }
    },
    InitTheme() {
      // 初始化主题
      let localStorageTheme = localStorage.getItem('themeColor') || 'system'
      this.currentTheme = localStorageTheme
      this.settingsSelection = [localStorageTheme]
      this.theme.change(localStorageTheme)
    }
  },
  watch: {
    currentTheme(newVal, oldVal) {
      if (newVal !== oldVal) {
        localStorage.setItem('themeColor', newVal)
        const _this = this;
        // document.documentElement.style.setProperty('--x', event.clientX + 'px')
        // document.documentElement.style.setProperty('--y', event.clientY + 'px')
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            // _this.theme.toggle()
            _this.theme.change(_this.currentTheme)

          });
        } else {
          // _this.theme.toggle()
          _this.theme.change(_this.currentTheme)
        }
      }
    },
    settingsSelection(newVal, oldVal) {
      // console.log(newVal)
      //禁止等于空数组
      if (newVal.length === 0) {
        this.settingsSelection = oldVal
        this.currentTheme = oldVal[0]
      } else {
        this.currentTheme = newVal[0]
      }
      // console.log(this.currentTheme)
      // console.log(oldVal)
    }
  },
  computed: {
    Themes() {
      // return this.theme.themes


      //只返回第一级的对象键名称
      var themes = Object.keys(this.theme.themes)
      //加入一个系统主题模式
      themes.unshift('system')
      // console.log(themes)
      return themes
    }
  },
  mounted() {
    this.InitTheme()
    // console.log(this.theme.themes)
  }
}
</script>
