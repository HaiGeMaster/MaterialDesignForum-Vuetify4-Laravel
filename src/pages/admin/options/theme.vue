<template>
  <v-container style="max-width: 830px;" v-if="userStore.getUser.user_group.ability_admin_manage_option">
    <v-card rounded="lg" class="mx-auto" v-if="userStore.getIsLogin">
      <v-toolbar :title="$t('Message.Admin.Options.Theme')">
        <template v-slot:prepend>
          <v-btn  icon @click="$router.back()">
            <v-icon>
              mdi-arrow-left
            </v-icon>
            <v-tooltip activator="parent" location="right">{{ $t('Message.Components.BackButton.Back') }}</v-tooltip>
          </v-btn>
        </template>

        
      </v-toolbar>

      <v-card-text>

        <v-select v-if="form_data" v-model="CurrentTheme" :items="form_data" :label="$t('Message.Admin.Options.Theme')"
          item-disabled="disabled" item-value="name" item-title="name" />

        <v-textarea v-show="CurrentThemeColorConfig != ''" v-model="CurrentThemeColorConfig" :label="$t('Message.Admin.Options.ThemeColorConfig')" />

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded="lg"  variant="flat" :loading="is_loading" @click="SetData" color="primary">{{
          $t('Message.Admin.Options.Save')
        }}</v-btn>
      </v-card-actions>

      
      <v-divider></v-divider>
      <Carousel />

      <v-divider></v-divider>
      <Typed />
      
    </v-card>
  </v-container>
</template>
<script>
// import ReturnButton from '@/components/return-button/index.vue'
import {
  // GetThemeData,
  // GetCurrentTheme,
  // SetCurrentTheme,
  // GetThemeSettingColor,
  // SetThemeSettingColor,
  SetAppBaseInfo,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main';
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar.js'
import Carousel from './components/carousel.vue';
import Typed from './components/typed.vue';
export default {
  name: 'admin-page-options-theme',
  components: {
    // ReturnButton,
    Carousel,
    Typed,
  },
  data: () => ({
    mainStore: useMainStore(),
    userStore: useUserStore(),
    snackbarStore: useSnackbarStore(),
    form_data: null,
    is_loading: false,
    CurrentTheme: '',
    CurrentThemeColorConfig: '',
  }),
  methods: {
    async GetCurrentTheme() {
      // const res = await GetCurrentTheme()
      // if (res.data.is_get) {
      //   this.CurrentTheme = res.data.theme
      //   // this.$forceUpdate()
      // }
      this.CurrentTheme = this.mainStore.getAppBaseInfo.option_list.theme
    },
    async SetData() {
      // this.SetThemeSettingColor()
      this.is_loading = true
      var user_token = this.$G_GetUserToken()
      const data = {
        option_list: {
          theme: this.CurrentTheme,
        },
        theme_color: JSON.parse(this.CurrentThemeColorConfig),
      }
      const res = await SetAppBaseInfo({
        user_token: user_token,
        app_base_info: data,
      })
      if (res.data.is_set) {
        this.snackbarStore.addMessage({ text: this.$t('Message.Components.Snackbar.Updated'), color: 'success' })
        this.mainStore.setAppBaseInfo(res.data.data)
        this.is_loading = false
        this.GetListData()
      } else {
        this.is_loading = false
      }
    },
    async GetListData() {
      // var user_token = this.$G_GetUserToken()
      // const res = await GetThemeData({
      //   user_token: user_token
      // })
      // if (res.data.is_get) {
      //   // console.log(res.data.form_data)
      //   this.form_data = res.data.form_data
      //   //去掉属性disabled为true的项
      //   this.form_data = this.form_data.filter(item => {
      //     return !item.disabled
      //   })
      //   // console.log(this.form_data)
      //   // this.$forceUpdate()
      // }

      this.form_data = this.mainStore.getAppBaseInfo.theme_list
    },
    async GetThemeSettingColor() {
      // var user_token = this.$G_GetUserToken()
      // const res = await GetThemeSettingColor({
      //   user_token: user_token,
      //   theme_name: this.CurrentTheme,
      // })
      // if (res.data.is_get) {
      //   let CurrentThemeColorConfig = res.data.theme_color
      //   //转成字符串，漂亮的格式化输出
      //   this.CurrentThemeColorConfig = JSON.stringify(CurrentThemeColorConfig, null, 2)
      //   // this.$forceUpdate()
      // } else {
      //   this.CurrentThemeColorConfig = ''
      // }

      // this.CurrentThemeColorConfig = JSON.stringify(this.mainStore.getAppBaseInfo.theme_list[this.CurrentTheme].setting.theme_color, null, 2)

      //在this.mainStore.getAppBaseInfo.theme_list里面循环查找name为this.CurrentTheme的项
      let theme = this.mainStore.getAppBaseInfo.theme_list.find(item => item.name === this.CurrentTheme)
      if (theme) {
        this.CurrentThemeColorConfig = JSON.stringify(theme.setting.theme_color, null, 2)
      } else {
        this.CurrentThemeColorConfig = ''
      }
    },
    // async SetThemeSettingColor() {
    //   this.is_loading = true
    //   var user_token = this.$G_GetUserToken()
    //   const res = await SetThemeSettingColor({
    //     // theme_color: this.CurrentThemeColorConfig,
    //     theme_color: JSON.parse(this.CurrentThemeColorConfig),
    //     theme_name: this.CurrentTheme,
    //     user_token: user_token
    //   })
    //   if (res.data.is_set) {
    //     this.snackbarStore.addMessage({ text: this.$t('Message.Components.Snackbar.Updated'), color: 'success' })
    //     this.is_loading = false
    //     // this.GetListData()
    //   } else {
    //     this.is_loading = false
    //   }
    // }
  },
  watch: {
    CurrentTheme(newVal, oldVal) {
      // console.log(newVal, oldVal)
      if (newVal !== oldVal) {
        this.GetThemeSettingColor()
      }
    }
  },
  async mounted() {
    await this.GetListData()
    await this.GetCurrentTheme()
    // this.GetThemeSettingColor()
  },

}
</script>