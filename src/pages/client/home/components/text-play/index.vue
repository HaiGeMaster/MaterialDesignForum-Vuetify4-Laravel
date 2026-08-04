<template>
  <h1 v-if="typed_show" :style="!mainStore.getMobile ? 'padding:8px;' : 'padding:16px;'
    ">
    {{ header }}
    <span class="text-plays text-primary"></span>
    {{
      !mainStore.getMobile ?
        `${footer_header} ${footer_tail}` :
        `${footer_header}`
    }}
    <p v-show="mainStore.getMobile"><span>{{
      footer_tail }}</span></p>
  </h1>
</template>
<script>
import {
  // GetThemeTypedParamJson,
  Get_G_INDEX_TEXT_PLAYERS,
} from '@/api/global.js'
import Typed from 'typed.js';
import { useMainStore } from '@/stores/main';
export default {
  name: 'text-play',
  props: {
    text: {
      type: Object,
      default: null,
    }
  },
  data: () => ({
    mainStore: useMainStore(),
    local_text: null,
    header: '',
    body: [],
    footer_header: '',
    footer_tail: '',
    typed: null,
    typed_show: true,
  }),
  methods: {
    UpdateText() {
      // const a = {"header":"","body":[],"footer_header":"","footer_tail":""}
      if (this.text != null || this.local_text != null) {
        try {
          const _text = this.text || this.local_text
          var _body_arr = []

          if (_text.header == '' || _text.body == '' || _text.footer_header == '' || _text.footer_tail == '') {
            this.typed_show = false
            return
          } else {
            this.typed_show = true
          }

          //如果_text.body不是数组，那么就是字符串，需要转换为数组
          if (!Array.isArray(_text.body)) {
            //先将_text.body转换为数组，根据,分割
            const _body_arr_str = _text.body.split(',')
            for (let i = 0; i < _body_arr_str.length; i++) {
              _body_arr.push(this.$t(_body_arr_str[i]))
            }
          } else {
            for (let i = 0; i < _text.body.length; i++) {
              _body_arr.push(this.$t(_text.body[i]))
            }
          }
          this.header = this.$t(_text.header)
          this.body = _body_arr
          this.footer_header = this.$t(_text.footer_header)
          this.footer_tail = this.$t(_text.footer_tail)
          this.$forceUpdate()
        } catch (e) {
          // console.log(e)
        }

      } else {
        // const a = {"header": "Message.Components.TextPlay.With","body": ["Message.Components.TextPlay.MaterialDesign","Message.Components.TextPlay.VueAsTheCore","Message.Components.TextPlay.ImplementedByVuetify","Message.Components.TextPlay.MoreElegant","Message.Components.TextPlay.UnlimitedDistance","Message.Components.TextPlay.CrossPlatform","Message.Components.TextPlay.DynamicResponsive"],"footer_header": "Message.Components.TextPlay.TheWay","footer_tail": "Message.Components.TextPlay.EnjoyCommunication"}
        this.header = this.$t("Message.Components.TextPlay.With")
        this.body = [
          this.$t('Message.Components.TextPlay.MaterialDesign'),
          // this.$t('Message.Components.TextPlay.VueAsTheCore'),
          // this.$t('Message.Components.TextPlay.ImplementedByVuetify'),
          // this.$t('Message.Components.TextPlay.MoreElegant'),
          // this.$t('Message.Components.TextPlay.UnlimitedDistance'),
          // this.$t('Message.Components.TextPlay.CrossPlatform'),
          // this.$t('Message.Components.TextPlay.DynamicResponsive')
        ]
        this.footer_header = this.$t('Message.Components.TextPlay.TheWay')
        this.footer_tail = this.$t('Message.Components.TextPlay.EnjoyCommunication')
      }
      if (this.$route.name == 'home' || this.$route.name == 'lang-home') {
        this.SpawnText()
      }
    },
    /**
     * 生成文本
     * @param {*} typeSpeed 打字速度 100
     * @param {*} backSpeed 退格速度 30
     * @param {*} loop 是否循环
     */
    SpawnText(typeSpeed = 100, backSpeed = 30, loop = true) {
      if (this.typed != null) {
        this.typed.destroy();
      }
      const options = {
        strings: this.body,
        typeSpeed: typeSpeed,
        backSpeed: backSpeed,
        loop: loop
      };
      this.typed = new Typed('.text-plays', options);
    },
    // async GetThemeTypedParamJson(){

    //   //SEO优化，如果是预渲染，那么直接使用预渲染的数据
    //   const TEXT_PLAYERS = Get_G_INDEX_TEXT_PLAYERS()
    //   // console.log('TEXT_PLAYERS', TEXT_PLAYERS)
    // if(TEXT_PLAYERS!==null){
    //   // this.local_text = TEXT_PLAYERS
    //   const data = JSON.parse(TEXT_PLAYERS.json_text)
    //   this.local_text = data
    //   this.$forceUpdate()
    //   this.UpdateText()
    //   return
    // }

    //   var user_token = this.$G_GetUserToken()
    //   const res = await GetThemeTypedParamJson({
    //     user_token: user_token
    //   })
    //   if (res.data.is_get) {
    //     //将res.data.theme_data转换为json对象
    //     const data = JSON.parse(res.data.json_text)
    //     // console.log(data)
    //     this.local_text = data
    //     this.$forceUpdate()
    //     this.UpdateText()
    //   }
    // },
    async GetThemeTypedParamJson() {
      const TEXT_PLAYERS = Get_G_INDEX_TEXT_PLAYERS()
      if (TEXT_PLAYERS !== null) {
        // this.local_text = TEXT_PLAYERS
        const data = TEXT_PLAYERS.json_text
        this.local_text = data
        this.$forceUpdate()
        this.UpdateText()
        return
      }

      // var user_token = this.$G_GetUserToken()
      // const res = await GetThemeTypedParamJson({
      //   user_token: user_token
      // })
      // if (res.data.is_get) {
      // const data = res.data.json_text
      const data = this.mainStore.getAppBaseInfo.option_list.theme_typed_param
      // console.log('theme_typed_param', data)
      //data转换为json对象
      const data_json = JSON.parse(data)
      // console.log('theme_typed_param_json', data_json)
      this.local_text = data_json
      this.$forceUpdate()
      this.UpdateText()
      // }
    }
  },
  mounted() {
    this.UpdateText()
    // this.GetThemeTypedParamJson()
  },
  computed: {
    ReturnGetAppBaseInfo() {
      return this.mainStore.getAppBaseInfo
    }
  },
  watch: {
    ReturnGetAppBaseInfo(val) {
      if (val) {
        // console.log('ReturnGetAppBaseInfo', val)
        this.GetThemeTypedParamJson()
      }
    },
    '$route'() {
      this.UpdateText()
      // this.GetThemeTypedParamJson()
    },
    '$i18n.locale'() {
      // console.log('locale')
      this.UpdateText()
      // this.GetThemeTypedParamJson()
    },
    text: {
      handler(val) {
        this.UpdateText()
        // this.GetThemeTypedParamJson()
      },
      deep: true,
    }
  }
}
</script>