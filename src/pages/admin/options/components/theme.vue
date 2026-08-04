<template>
    <v-card  rounded="lg" elevation="0">

      <v-card-title>
        <span>
          {{ $t('Message.Admin.Options.ApplicationThemeColorParameter') }}
          <v-btn rounded="lg"  @click="OpenLink('https://v2.vuetifyjs.com/zh-Hans/styles/colors/')" icon>
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </span>
      </v-card-title>

      <v-card-text>
        <span>{{ $t('Message.Admin.Options.LightThemeParameter') }}</span>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field color="primary"   hide-details="auto" outlined v-model="theme_data.light.primary" :color="theme_data.light.primary || $vuetify.theme.themes.light.primary.base ||
              'primary'" :label="$t('Message.Admin.Options.ThemeColor')">
              <template v-slot:append-outer>
                <ColorSelect @color="color => {
                  theme_data.light.primary = color; $forceUpdate()
                }" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field color="primary"   hide-details="auto" outlined v-model="theme_data.light.secondary" :color="theme_data.light.secondary || $vuetify.theme.themes.light.secondary.base ||
              'secondary'" :label="$t('Message.Admin.Options.NeutralColor')">
              <template v-slot:append-outer>
                <ColorSelect @color="color => {
                  theme_data.light.secondary = color; $forceUpdate()
                }" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field color="primary"   hide-details="auto" outlined v-model="theme_data.light.accent" :color="theme_data.light.accent || $vuetify.theme.themes.light.accent.base ||
              'accent'" :label="$t('Message.Admin.Options.SecondaryColor')">
              <template v-slot:append-outer>
                <ColorSelect @color="color => {
                  theme_data.light.accent = color; $forceUpdate()
                }" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <span>{{ $t('Message.Admin.Options.DarkThemeParameter') }}</span>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field color="primary"   hide-details="auto" outlined v-model="theme_data.dark.primary" :color="theme_data.dark.primary || $vuetify.theme.themes.dark.primary.base ||
              'primary'" :label="$t('Message.Admin.Options.ThemeColor')">
              <template v-slot:append-outer>
                <ColorSelect @color="color => {
                  theme_data.dark.primary = color; $forceUpdate()
                }" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field color="primary"   hide-details="auto" outlined v-model="theme_data.dark.secondary" :color="theme_data.dark.secondary || $vuetify.theme.themes.dark.secondary.base ||
              'secondary'" :label="$t('Message.Admin.Options.NeutralColor')">
              <template v-slot:append-outer>
                <ColorSelect @color="color => {
                  theme_data.dark.secondary = color; $forceUpdate()
                }" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field color="primary"   hide-details="auto" outlined v-model="theme_data.dark.accent" :color="theme_data.dark.accent || $vuetify.theme.themes.dark.accent.base ||
              'accent'" :label="$t('Message.Admin.Options.SecondaryColor')">
              <template v-slot:append-outer>
                <ColorSelect @color="color => {
                  theme_data.dark.accent = color; $forceUpdate()
                }" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-card-actions>
          <v-btn rounded="lg"  depressed :loading="is_loading_1" color="primary" @click="DirectSaveThemeColorParamJson">{{
            $t('Message.Admin.Options.Save')
          }}</v-btn>

          <v-btn rounded="lg"  depressed color="accent" @click="ResetThemeColorParamJsonAsMD1">{{ $t('Message.Components.Account.Reset') }}
            MD1</v-btn>

          <v-btn rounded="lg"  depressed color="accent" @click="ResetThemeColorParamJsonAsMD2">{{ $t('Message.Components.Account.Reset') }}
            MD2</v-btn>

          <v-btn rounded="lg"  depressed color="accent" @click="ResetThemeColorParamJsonAsMD3">{{ $t('Message.Components.Account.Reset') }}
            MD3</v-btn>

          <!-- <v-btn rounded="lg"  depressed color="accent" v-show="is_dev_localhost" @click="ResetThemeColorParamJsonAsDEMOTHEME">{{
            $t('Message.Components.Account.Reset') }}
            DEMO-THEME</v-btn>


          <v-btn rounded="lg"  depressed color="accent" v-show="is_dev_localhost" @click="ResetThemeColorParamJsonAsAsphalt9">{{
            $t('Message.Components.Account.Reset') }}
            Asphalt9</v-btn>

          <v-btn rounded="lg"  depressed color="accent" v-show="is_dev_localhost" @click="ResetThemeColorParamJsonAsAsphaltALU">{{
            $t('Message.Components.Account.Reset')
          }}
            AsphaltALU</v-btn> -->

        </v-card-actions>
      </v-card-text>

    </v-card>
</template>
<script>
// import ReturnButton from '@/components/return-button/index.vue'
import ColorSelect from '@/components/md-editor/components/color-select/index.vue'
import {
  SetThemeColorParamJson,
  GetThemeColorParamJson,
  // SetThemeTypedParamJson,
  // GetThemeTypedParamJson,
} from '@/api/global.js'
export default {
  name: 'admin-page-options-theme-vuetify2',
  props: {
    submit: {
      type: Number,
      default: 0
    }
  },
  components: {
    // ReturnButton,
    ColorSelect,
  },
  data: () => ({
    is_loading_1: false,
    is_loading_2: false,
    theme_data: {
      light: {
        primary: '',
        secondary: '',
        accent: '',
      },
      dark: {
        primary: '',
        secondary: '',
        accent: '',
      },
      // name: '',
    },
  }),
  computed: {
    commaSeparatedRule() {
      return (value) => {
        // 使用正则表达式验证输入是否符合要求
        if (!/^[\s\S]+(,[\s\S]+)*$/.test(value)) {
          return this.$t('Message.Admin.Options.ExmpleABCMustBeSeparatedByCommasInEnglish');
        } else {
          return true;  // 返回true表示验证通过
        }
      };
    },
    is_dev_localhost() {
      // console.log(window.location.host)
      return window.location.host == 'localhost:8080'
    }
  },
  methods: {
    OpenLink(url) {
      window.open(url, '_blank')
    },
    DirectSaveThemeColorParamJson() {
      // this.theme_data.name = ''
      this.$forceUpdate()
      this.SetThemeColorParamJson()
    },
    async SetThemeColorParamJson() {
      this.is_loading_1 = true
      var user_token = this.$G_GetUserToken()
      //先将对象转换为json字符串
      const data = JSON.stringify(this.theme_data)
      // console.log(data)
      const res = await SetThemeColorParamJson({
        json_text: data,
        user_token: user_token
      })
      if (res.data.is_set) {
        this.is_loading_1 = false
        this.$forceUpdate()
        this.$vuetify.theme.themes.light.primary = this.theme_data.light.primary
        this.$vuetify.theme.themes.light.secondary = this.theme_data.light.secondary
        this.$vuetify.theme.themes.light.accent = this.theme_data.light.accent
        this.$vuetify.theme.themes.dark.primary = this.theme_data.dark.primary
        this.$vuetify.theme.themes.dark.secondary = this.theme_data.dark.secondary
        this.$vuetify.theme.themes.dark.accent = this.theme_data.dark.accent
        this.$forceUpdate()
      } else {
        this.is_loading_1 = false
      }
    },
    async GetThemeColorParamJson() {
      var user_token = this.$G_GetUserToken()
      const res = await GetThemeColorParamJson({
        user_token: user_token
      })
      if (res.data.is_get) {
        //将res.data.theme_data转换为json对象
        // const data = JSON.parse(res.data.json_text)
        const data = res.data.json_text
        this.theme_data.light.primary = data.light.primary
        this.theme_data.light.secondary = data.light.secondary
        this.theme_data.light.accent = data.light.accent
        this.theme_data.dark.primary = data.dark.primary
        this.theme_data.dark.secondary = data.dark.secondary
        this.theme_data.dark.accent = data.dark.accent
        this.$forceUpdate()
      }
    },
    ResetThemeColorParamJsonAsMD1() {
      // this.theme_data.light.primary = '#009688'//teal
      // this.theme_data.light.secondary = '#009688'//orange
      // this.theme_data.light.accent = '#00695c'//pink
      // this.theme_data.dark.primary = '#009688'
      // this.theme_data.dark.secondary = '#009688'
      // this.theme_data.dark.accent = '#00695c'
      this.theme_data.light.primary = '#009688'//teal
      this.theme_data.light.secondary = '#009688'
      this.theme_data.light.accent = '#e91e63'//pink
      this.theme_data.dark.primary = '#009688'//teal
      this.theme_data.dark.secondary = '#009688'
      this.theme_data.dark.accent = '#e91e63'//pink

      // this.theme_data.name = 'md1'

      this.$forceUpdate()
      this.SetThemeColorParamJson()
    },
    ResetThemeColorParamJsonAsMD2() {
      // this.theme_data.light.primary = '#02a8f3'//blue
      // this.theme_data.light.secondary = '#02a8f3'//orange
      // this.theme_data.light.accent = '#1b39a8'//pink
      // this.theme_data.dark.primary = '#02a8f3'//orange
      // this.theme_data.dark.secondary = '#02a8f3'//cyan
      // this.theme_data.dark.accent = '#1b39a8'//green

      // this.theme_data.light.primary = '#2196f3'//blue
      // this.theme_data.light.secondary = '#ff9800'//orange
      // this.theme_data.light.accent = '#e91e63'//pink

      // this.theme_data.dark.primary = '#2196f3'//blue
      // this.theme_data.dark.secondary = '#ff9800'//orange
      // this.theme_data.dark.accent = '#e91e63'//pink

      // this.theme_data.dark.primary = '#ff9800'//orange
      // this.theme_data.dark.secondary = '#00bcd4'//cyan
      // this.theme_data.dark.accent = '#4caf50'//green



      this.theme_data.light.primary = '#2196F3'//blue
      this.theme_data.light.secondary = '#FF9800'//orange
      this.theme_data.light.accent = '#E91E63'//pink


      this.theme_data.dark.primary = '#2196F3'//blue
      this.theme_data.dark.secondary = '#FF9800'//orange
      this.theme_data.dark.accent = '#E91E63'//pink

      // this.theme_data.dark.primary = '#FF9800'//orange
      // this.theme_data.dark.secondary = '#2196F3'//blue
      // this.theme_data.dark.accent = '#009688'//teal

      // this.theme_data.name = 'md2'

      this.$forceUpdate()
      this.SetThemeColorParamJson()
    },
    ResetThemeColorParamJsonAsMD3() {
      //定义为图标取色
      // this.theme_data.light.primary = '#8eace3'
      // this.theme_data.light.secondary = '#d6e3ff'
      // this.theme_data.light.accent = '#415f91'
      // this.theme_data.dark.primary = '#8eace3'
      // this.theme_data.dark.secondary = '#d6e3ff'
      // this.theme_data.dark.accent = '#415f91'

      // this.theme_data.light.primary = '#415f91'
      // this.theme_data.light.secondary = '#d6e3ff'
      // this.theme_data.light.accent = '#8eace3'
      // this.theme_data.dark.primary = '#415f91'
      // this.theme_data.dark.secondary = '#d6e3ff'
      // this.theme_data.dark.accent = '#8eace3'

      // this.theme_data.light.primary = '#415f91'
      // this.theme_data.light.secondary = '#415f91'
      // this.theme_data.light.accent = '#8eace3'
      // this.theme_data.dark.primary = '#415f91'
      // this.theme_data.dark.secondary = '#415f91'
      // this.theme_data.dark.accent = '#8eace3'

      // this.theme_data.light.primary = '#ac8f55'
      // this.theme_data.light.secondary = '#ac8f55'
      // this.theme_data.light.accent = '#c6b089'
      // this.theme_data.dark.primary = '#ac8f55'
      // this.theme_data.dark.secondary = '#ac8f55'
      // this.theme_data.dark.accent = '#c6b089'

      this.theme_data.light.primary = '#7e57c2'
      this.theme_data.light.secondary = '#7e57c2'
      this.theme_data.light.accent = '#b39ddb'
      this.theme_data.dark.primary = '#7e57c2'
      this.theme_data.dark.secondary = '#7e57c2'
      this.theme_data.dark.accent = '#b39ddb'

      // this.theme_data.name = 'md3'

      this.$forceUpdate()
      this.SetThemeColorParamJson()
    },
    ResetThemeColorParamJsonAsDEMOTHEME() {

      this.theme_data.light.primary = '#ac8f55'
      this.theme_data.light.secondary = '#ac8f55'
      this.theme_data.light.accent = '#c6b089'
      this.theme_data.dark.primary = '#ac8f55'
      this.theme_data.dark.secondary = '#ac8f55'
      this.theme_data.dark.accent = '#c6b089'
      // this.theme_data.name = ''

      this.$forceUpdate()
      this.SetThemeColorParamJson()
    },
    ResetThemeColorParamJsonAsAsphalt9() {
      //定义为图标取色
      this.theme_data.light.primary = '#fc095b'
      this.theme_data.light.secondary = '#fadf2b'
      this.theme_data.light.accent = '#baee13'
      this.theme_data.dark.primary = '#fc095b'
      this.theme_data.dark.secondary = '#fadf2b'
      this.theme_data.dark.accent = '#baee13'
      this.$forceUpdate()
      this.SetThemeColorParamJson()
    },
    ResetThemeColorParamJsonAsAsphaltALU() {
      //定义为图标取色
      this.theme_data.light.primary = '#c800fe'
      this.theme_data.light.secondary = '#61d626'
      this.theme_data.light.accent = '#ffd200'
      this.theme_data.dark.primary = '#c800fe'
      this.theme_data.dark.secondary = '#61d626'
      this.theme_data.dark.accent = '#ffd200'
      this.$forceUpdate()
      this.SetThemeColorParamJson()
    },
  },
  created() {
    this.GetThemeColorParamJson()
  },
}
</script>