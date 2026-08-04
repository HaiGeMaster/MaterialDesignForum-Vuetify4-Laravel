<template>
  <v-card  rounded="lg" elevation="0" :title="$t('Message.Admin.Options.IndexTypewriterParameters')">


    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card rounded="md" outlined>

            <img :src="$G_ImgHandle('/assets/fixed_content/typed_pad_pc.png')" width="240" />
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card rounded="md" outlined>

            <img :src="$G_ImgHandle('/assets/fixed_content/typed_mobile.png')" width="240" />
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field color="primary"   hide-details="auto" outlined v-model="typed_data.header" label="header">
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <!-- <v-text-field color="primary"   hide-details="auto" outlined v-model="typed_data.body"
            :hint="$t('Message.Admin.Options.ExmpleABCMustBeSeparatedByCommasInEnglish')" label="body"
            :rules="[commaSeparatedRule]">
          </v-text-field> -->
          <v-textarea 
            rows="1" outlined :rules="[commaSeparatedRule]"
            v-model="typed_data.body"
            :hint="$t('Message.Admin.Options.ExmpleABCMustBeSeparatedByCommasInEnglish')" label="body">
          </v-textarea>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field color="primary"   hide-details="auto" outlined v-model="typed_data.footer_header" label="footer_header">
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field color="primary"   hide-details="auto" outlined v-model="typed_data.footer_tail" label="footer_tail">
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <!-- <v-card-text> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded="lg"  color="warning" variant="tonal" @click="ResetThemeTypedParamJson">{{ $t('Message.Components.Account.Reset') }}</v-btn>

        <v-btn rounded="lg"  variant="flat" :loading="is_loading_2" color="primary" @click="SetThemeTypedParamJson">{{
          $t('Message.Admin.Options.Save')
          }}</v-btn>

      </v-card-actions>
    <!-- </v-card-text> -->

  </v-card>
</template>
<script>
import {
  // SetThemeTypedParamJson,
  // GetThemeTypedParamJson,
  SetAppBaseInfo,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main.js'
import { useSnackbarStore } from '@/stores/snackbar.js'
export default {
  name: 'admin-page-options-theme-typed',
  components: {
  },
  data: () => ({
    is_loading_1: false,
    is_loading_2: false,
    typed_data: {
      header: '',
      body: [],
      footer_header: '',
      footer_tail: '',
    },
    mainStore: useMainStore(),
    snackbarStore: useSnackbarStore(),
  }),
  computed: {
  },
  computed: {
    ReturnGetAppBaseInfo() {
      return this.mainStore.getAppBaseInfo;
    },
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
  watch: {
    ReturnGetAppBaseInfo(val) {
      // this.GetThemeCarouselParamJson()
    }
  },
  methods: {
    OpenLink(url) {
      window.open(url, '_blank')
    },
    async SetThemeTypedParamJson() {
      this.is_loading_2 = true
      var user_token = this.$G_GetUserToken()
      const data = {
        option_list: {
          theme_typed_param: JSON.stringify(this.typed_data)
        }
      }

      //先将this.typed_data.body根据逗号分隔符转换为数组
      // this.typed_data.body = this.typed_data.body.split(',')
      // console.log(typeof this.typed_data.body);  // 输出变量类型
      // console.log(this.typed_data.body);         // 输出变量的具体内容

      // 添加断言确保 this.typed_data.body 是一个字符串
      // console.assert(typeof this.typed_data.body === 'string', 'this.typed_data.body 不是一个字符串');

      // 确保使用 split 方法前，this.typed_data.body 是一个合法的字符串
      if (typeof this.typed_data.body === 'string') {
        let parts = this.typed_data.body.split(',');
        // console.log(parts);  // 输出分割后的数组
      } else {
        // console.error('this.typed_data.body 不是一个字符串，无法使用 split 方法。');
      }
      this.$forceUpdate()


      //先将对象转换为json字符串
      // const data = JSON.stringify(this.typed_data)
      // console.log(data)
      const res = await SetAppBaseInfo({
        user_token: user_token,
        app_base_info: data,
      })
      if (res.data.is_set) {
        this.snackbarStore.addMessage({ text: this.$t('Message.Components.Snackbar.Updated'), color: 'success' })
        // this.mainStore.getAppBaseInfo.option_list.theme_typed_param = JSON.stringify(this.typed_data)
        this.mainStore.setAppBaseInfo(res.data.data)
        this.is_loading_2 = false

        this.$forceUpdate()
      } else {
        this.is_loading_2 = false
      }
    },
    async GetThemeTypedParamJson() {
      // var user_token = this.$G_GetUserToken()
      // const res = await GetThemeTypedParamJson({
      //   user_token: user_token
      // })
      // if (res.data.is_get) {
        //将res.data.theme_data转换为json对象
        // const data = JSON.parse(res.data.json_text)
        // let data = res.data.json_text
      let data = this.mainStore.getAppBaseInfo.option_list.theme_typed_param
        // console.log('theme_typed_param', data)
        //data转换为json对象
        const data_json = JSON.parse(data)
        // console.log(data_json)
        this.typed_data.header = data_json.header
        this.typed_data.body = data_json.body
        this.typed_data.footer_header = data_json.footer_header
        this.typed_data.footer_tail = data_json.footer_tail
        this.$forceUpdate()
      // }
    },
    ResetThemeTypedParamJson() {
      //{"header": "Message.Components.TextPlay.With","body": ["Message.Components.TextPlay.MaterialDesign","Message.Components.TextPlay.VueAsTheCore","Message.Components.TextPlay.ImplementedByVuetify","Message.Components.TextPlay.MoreElegant","Message.Components.TextPlay.UnlimitedDistance","Message.Components.TextPlay.CrossPlatform","Message.Components.TextPlay.DynamicResponsive"],"footer_header": "Message.Components.TextPlay.TheWay","footer_tail": "Message.Components.TextPlay.EnjoyCommunication"}
      this.typed_data.header = 'Message.Components.TextPlay.With'
      this.typed_data.body = [
        'Message.Components.TextPlay.MaterialDesign',
        'Message.Components.TextPlay.VueAsTheCore',
        // 'Message.Components.TextPlay.ImplementedByVuetify',
        'Message.Components.TextPlay.MoreElegant',
        'Message.Components.TextPlay.UnlimitedDistance',
        'Message.Components.TextPlay.CrossPlatform',
        'Message.Components.TextPlay.DynamicResponsive'
      ]
      this.typed_data.footer_header = 'Message.Components.TextPlay.TheWay'
      this.typed_data.footer_tail = 'Message.Components.TextPlay.EnjoyCommunication'
      this.$forceUpdate()
      this.SetThemeTypedParamJson()
    }
  },
  async mounted() {
    await this.GetThemeTypedParamJson();
  },
}
</script>