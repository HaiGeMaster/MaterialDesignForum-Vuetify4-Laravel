<template>
  <!-- Toggle between Light / Dark -->
  <v-btn style="-webkit-app-region: no-drag;"  @click="SwitchTheme" icon>

    <v-icon>
      {{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
    </v-icon>

    <v-tooltip activator="parent" location="bottom">{{ !isDark ?
      $t('Message.Components.ThemeButton.LightTheme') :
      $t('Message.Components.ThemeButton.DarkTheme')
    }}</v-tooltip>
  </v-btn>
</template>

<script>
import { useTheme } from 'vuetify'
import { useMainStore } from '@/stores/main';

// const theme = useTheme()

export default {
  name: 'ThemeButton',
  data() {
    return {
      mainStore: useMainStore(),
      // theme: useTheme(),
    }
  },
  computed: {
    theme() {
      return useTheme()
    },
    isDark() {
      return this.theme.global.current.value.dark
    }
  },
  methods: {
    SwitchTheme(event) {
      // this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      const _this = this;
      document.documentElement.style.setProperty('--x', event.clientX + 'px')
      document.documentElement.style.setProperty('--y', event.clientY + 'px')
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          _this.theme.toggle()
          // _this.theme.global.current.value.dark = !_this.theme.global.current.value.dark

        });
      } else {
          _this.theme.toggle()
          // _this.theme.global.current.value.dark = !_this.theme.global.current.value.dark
      }
    },

    updateThemeColorMeta() {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--v-theme-surface')
        .trim()
      if (!color) return

      let el = document.querySelector('meta[name="theme-color"]')
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', 'theme-color')
        document.head.appendChild(el)
      }
      el.setAttribute('content', `rgb(${color})`)
    },
  },
  mounted() {
    this.updateThemeColorMeta()
  },
  watch: {
    theme: {
      handler(newVal, oldVal) {
        //获取其当前主题名称
        // console.log(newVal.global.name.value)
        const theme_name = newVal.global.name.value
        if (theme_name === 'dark') {
          this.mainStore.setIsDark(true)
          // this.$vuetify.theme.dark = true
          //在body上添加类名v-theme--dark
          document.body.classList.add('v-theme--dark')


          //设置html标签的背景颜色
          // const html = document.querySelector('html')
          // html.style.backgroundColor = '#212121'
        } else {
          this.mainStore.setIsDark(false)
          // this.$vuetify.theme.dark = false
          //在body上移除类名v-theme--dark
          document.body.classList.remove('v-theme--dark')


          //设置html标签的背景颜色
          // const html = document.querySelector('html')
          // html.style.backgroundColor = '#ffffff'
        }
        // console.log(this.$vuetify.theme.dark )

        this.updateThemeColorMeta()
        // this.$nextTick(() => this.updateThemeColorMeta())
      },
      deep: true,
      immediate: true,
    },
  }
}


</script>
