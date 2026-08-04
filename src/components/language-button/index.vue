<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="lg"
        v-if="slotname == 'btn'"
        v-show="show && LanguageList.length >= 2"
        :loading="is_loading"
        v-bind="activatorProps"
        variant="text"
        style="margin: 4px"
        :block="mainStore.getMobile"
      >
        <v-icon start> mdi-translate </v-icon>
        {{ $t("Message.langInfo.langname") }}
      </v-btn>
      <v-btn
        v-if="slotname == 'icon'"
        v-show="show && LanguageList.length >= 2"
        :loading="is_loading"
        v-bind="activatorProps"
        icon
        variant="text"
        style="-webkit-app-region: no-drag; margin: 4px"
      >
        <v-icon> mdi-translate </v-icon>
        <v-tooltip activator="parent" location="bottom"
          >Language: {{ $t("Message.langInfo.langname") }}</v-tooltip
        >
      </v-btn>
      <v-list-item
        v-else-if="slotname == 'list'"
        v-show="show && LanguageList.length >= 2"
        v-bind="activatorProps"
        prepend-icon="mdi-translate"
        :title="$t('Message.langInfo.langname')"
        append-icon="mdi-dots-vertical"
      ></v-list-item>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card rounded="lg">
        <v-toolbar :title="$t('Message.langInfo.langname')">
          <template v-slot:append>
            <v-btn icon @click="isActive.value = false">
              <v-icon> mdi-close </v-icon>
              <v-tooltip activator="parent" location="left">{{
                $t("Message.Components.DialogClass.Close")
              }}</v-tooltip>
            </v-btn>
          </template>
        </v-toolbar>

        <v-card-text>
          <v-card-subtitle>
            <!-- 选择您偏好的语言 -->
            {{
              $t(
                "Message.Components.SettingNaviagtionDrawer.SelectLanguagePreference",
              )
            }}
          </v-card-subtitle>
          <v-list rounded="lg" lines="two">
            <v-list-item
              rounded="lg"
              v-for="(item, i) in LanguageList"
              color="primary"
              :disabled="!item.usability"
              :key="`LanguageButton_${i}`"
              @click="
                SetLanguage(item.locale, true);
                isActive.value = false;
              "
              :title="item.text"
            >
              <template v-slot:prepend>
                <v-icon v-if="$i18n.locale != 'zh_CN'">
                  <span :class="`langicon fi fi-${item.flagicon}`"></span>
                </v-icon>
              </template>

              <!-- <template v-slot:append>
                <v-icon v-if="$i18n.locale == item.locale">mdi-check</v-icon>
              </template> -->

              <template v-slot:append="{ isSelected, select }">
                <v-list-item-action start>
                  <v-radio
                    readonly
                    :model-value="$i18n.locale == item.locale"
                  ></v-radio>
                </v-list-item-action>
                <!-- @update:model-value="select" -->
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import "/node_modules/flag-icons/css/flag-icons.min.css";
import messages from "@/assets/language/language.js";
import { useUserStore } from "@/stores/user";
import { useLocalDataStore } from "@/stores/local-data";
import {
  // GetLocaleInfoList,
  SetCookie,
  SetUserLanguage,
  GetLanguage,
} from "@/api/global.js";
import { useMainStore } from "@/stores/main";
export default {
  name: "language-button",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    slotname: {
      type: String,
      default: "icon", // btn icon list
    },
  },
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      localDataStore: useLocalDataStore(),
      vmodel: null,
      LanguageMenu: false,
      LanguageList: [],
      IsMounted: false,
      is_loading: false,
      Messages: null,
      translate_icon: "mdi-translate",
      translate_type: "mdi",
    };
  },
  methods: {
    async getLocaleInfoList() {
      //应该要有一个可以控制的变量，来控制是否显示
      // const langpack = this.$store.getters.GetAppAllowUseLangpack;//['zh_CN','en_US']

      // const langpack = this.mainStore.getAppAllowUseLangpack //['zh_CN','en_US']

      const langpack = [
        "zh_CN",
        "en_US",
        "zh_TW",
        "en_GB",
        "ru_RU",
        "fr_FR",
        "de_DE",
        "ja_JP",
        "ko_KR",
      ];

      // const res = await GetLocaleInfoList()
      // if (res.data != null) {

      //   this.Messages = res.data
      this.Messages = this.mainStore.getAppBaseInfo.lang_locale_list;
      // this.$store.dispatch('Set_LangMessages', res.data)
      this.mainStore.setLangMessages(this.Messages);
      // console.log('this.Messages',this.Messages)
      this.LanguageList = [];
      for (let langCode in this.Messages) {
        // if (this.Messages[langCode].Message.langInfo.show) {
        //   //与允许使用的语言包进行比对，如果没有存在于允许使用的语言包中，则跳过
        //   // console.log('langCode',langCode)
        //   // console.log('langpack',langpack)
        //   if (langpack.indexOf(langCode) == -1) {
        //     continue;
        //   }
        //   // console.log('can use lang',langCode)

        //   const langName = this.Messages[langCode].Message.langInfo.langname
        //   const usabilitys = this.Messages[langCode].Message.langInfo.usability
        //   const flagicon = this.Messages[langCode].Message.langInfo.flagicon
        //   const langinfo = messages[langCode].Message.langInfo

        if (this.Messages[langCode].Message.langInfo.show) {
          //与允许使用的语言包进行比对，如果没有存在于允许使用的语言包中，则跳过
          // console.log('langCode',langCode)
          // console.log('langpack',langpack)

          // console.log(this.LanguageList.length)
          if (langpack.indexOf(langCode) == -1) {
            continue;
          }
          // console.log('can use lang',langCode)

          const langName = this.Messages[langCode].Message.langInfo.langname;
          const usabilitys = this.Messages[langCode].Message.langInfo.usability;
          const flagicon = this.Messages[langCode].Message.langInfo.flagicon;
          const langinfo = messages[langCode].Message.langInfo;
          this.LanguageList.push({
            text: langName,
            locale: langCode,
            usability: usabilitys,
            flagicon: flagicon,
            langinfo: langinfo,
          });
        }
      }

      this.SetLanguageAsLocale();

      // }
    },
    SetLocaleCode(val) {
      if (this.ValForLanguageList(val)) {
        document.querySelector("html").setAttribute("lang", val);
        this.localDataStore.setLang(val);
        SetCookie("lang", val);

        this.$i18n.locale = val;

        // const _this = this;
        // // document.documentElement.style.setProperty('--x', event.clientX + 'px')
        // // document.documentElement.style.setProperty('--y', event.clientY + 'px')
        // //获取当前实例组件的位置
        // const rect = _this.$el.getBoundingClientRect();
        // const x = rect.left;
        // const y = rect.top;
        // document.documentElement.style.setProperty('--x', x + 'px')
        // document.documentElement.style.setProperty('--y', y + 'px')
        // if (document.startViewTransition) {
        //   document.startViewTransition(() => {
        //     this.$i18n.locale = val
        //   });
        // } else {
        //   this.$i18n.locale = val
        // }
      }
    },
    SetLanguage(val, UpdateRoute = false) {
      if (val == this.$i18n.locale) {
        return;
      }
      if (UpdateRoute && this.ValForLanguageList(val)) {
        this.SetRouteLang(val);
        this.SetUserLanguage(val);
      }
    },
    async SetUserLanguage(val) {
      // if (this.$store.getters['User/GetIsLogin'] == false) {
      if (!this.userStore.getIsLogin) {
        return;
      }
      // if (this.localDataStore.getLang == val) {
      //   return
      // }
      const response = await SetUserLanguage({
        user_token: this.$G_GetUserToken(),
        lang: val,
      });
      if (response.data.is_set) {
        this.SetLocaleCode(val);

        // this.LoadLanguage(val)
      }
    },
    async LoadLanguage(lang) {
      // 防止重复加载
      // if (this.is_loading) return;  // 添加此行
      // if (this.$i18n.messages[lang]) return;  // 如果已加载过，直接返回

      this.is_loading = true;
      try {
        if (this.ValForLanguageList(lang)) {
          const response = await GetLanguage(lang);
          if (response.data.hasOwnProperty("Message")) {
            this.$i18n.setLocaleMessage(lang, response.data);
            this.SetLocaleCode(lang);
            this.is_loading = false;
          }
        }
      } catch (error) {
        // console.error("Failed to load language file:", error);
        this.is_loading = false;
      }
    },
    SetRouteLang(lang) {
      var pathArray = this.$route.path.split("/");
      var hash = this.$route.hash;
      if (this.$route.params.hasOwnProperty("lang")) {
        if (pathArray.length == 5) {
          this.$router.push({
            path: `/${lang}/${pathArray[2]}/${pathArray[3]}/${pathArray[4]}${hash}`,
          });
        } else if (pathArray.length == 4) {
          this.$router.push({
            path: `/${lang}/${pathArray[2]}/${pathArray[3]}${hash}`,
          });
        } else if (pathArray.length == 3) {
          this.$router.push({ path: `/${lang}/${pathArray[2]}${hash}` });
        } else {
          this.$router.push({ path: `/${lang}/` });
        }
      } else {
        if (pathArray.length == 4) {
          this.$router.push({
            path: `/${lang}/${pathArray[1]}/${pathArray[2]}/${pathArray[3]}${hash}`,
          });
        } else if (pathArray.length == 3) {
          this.$router.push({
            path: `/${lang}/${pathArray[1]}/${pathArray[2]}${hash}`,
          });
        } else if (pathArray.length == 2) {
          this.$router.push({ path: `/${lang}/${pathArray[1]}${hash}` });
        } else {
          this.$router.push({ path: `/${lang}/` });
        }
      }
    },
    ValForLanguageList(val) {
      for (let i = 0; i < this.LanguageList.length; i++) {
        if (this.LanguageList[i].locale == val) {
          return true;
        }
      }
      return false;
    },
    SetLanguageAsLocale() {
      if (this.$route.params.hasOwnProperty("lang")) {
        var lang = this.$route.params.lang;
        if (this.ValForLanguageList(lang)) {
          this.LoadLanguage(lang);
        }
      } else {
        var locale =
          this.localDataStore.getLang ||
          document.querySelector("html").getAttribute("lang") ||
          this.$i18n.fallbackLocale;
        if (this.ValForLanguageList(locale)) {
          this.LoadLanguage(locale);
        }
      }
    },
    SetTranslateIcon() {
      setInterval(() => {
        if (this.translate_type == "mdi") {
          this.translate_type = "fi";
        } else {
          this.translate_type = "mdi";
        }
      }, 5000);
    },
  },
  mounted() {
    // this.SetLanguageList()
  },
  created() {
    this.SetTranslateIcon();

    this.getLocaleInfoList();

    // if (this.ReturnGetAppAllowUseLangpack != null) {
    //   this.getLocaleInfoList()
    // }
  },
  computed: {
    ReturnUserGetUser() {
      // return this.$store.getters['User/GetUser']
      return this.userStore.getUser;
    },
    ReturnGetAppAllowUseLangpack() {
      // return this.$store.getters.GetAppAllowUseLangpack
      return this.mainStore.getAppAllowUseLangpack;
    },
    ReturnGetAppBaseInfo() {
      // console.log('ReturnGetAppBaseInfo.lang_locale_list', this.mainStore.getAppBaseInfo.lang_locale_list)
      return this.mainStore.getAppBaseInfo;
    },
  },
  watch: {
    "$route.params": {
      handler() {
        var locale =
          this.$route.params.lang ||
          this.localDataStore.getLang ||
          document.querySelector("html").getAttribute("lang") ||
          this.$i18n.fallbackLocale;
        if (this.$i18n.locale != locale) {
          this.SetLanguageAsLocale();
        }
        if (this.$route.params.hasOwnProperty("lang")) {
        } else {
        }

        // console.log(this.mainStore.getAppBaseInfo.lang_locale_list)
        // console.log(this.LanguageList.length)

        if (
          this.mainStore.getAppBaseInfo.lang_locale_list != null &&
          this.LanguageList.length == 0
        ) {
          this.getLocaleInfoList();
        }
      },
      immediate: true,
    },
    ReturnGetAppAllowUseLangpack(val) {
      // console.log('ReturnGetAppAllowUseLangpack', val)
      if (val == null) {
        return;
      }
      this.getLocaleInfoList();
    },
    ReturnGetAppBaseInfo: {
      handler(val) {
        // console.log('ReturnGetAppBaseInfo', val)
        if (val == null) {
          return;
        }
        this.getLocaleInfoList();
      },
      deep: true,
    },
  },
};
</script>
<style lang="less">
.langicon {
  border: 1px solid #ccc;
}
</style>
