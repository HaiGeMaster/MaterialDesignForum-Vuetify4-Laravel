<template>
  <v-navigation-drawer v-model="mainStore.drawer" :temporary="mainStore.getMobile" style="-webkit-app-region: drag;">

    <!-- <v-list rounded="lg" nav color="primary" style="-webkit-app-region: no-drag;"
    >

      <template v-for="item in filteredNavItems" :key="item.id">
        <v-divider v-if="item.type === 'divider'" />
        <v-list-item rounded="lg" v-else-if="item.type === 'item'" :prepend-icon="item.icon"
          :to="`${$G_UrlHeaderLang()}${item.to}`">
          <span>{{ $t(item.title) }}</span>
        </v-list-item>
      </template>
    </v-list> -->

    <NavList :admin="admin" />

    <template v-slot:append>
      <div class="copyright">
        <div class="copyright-components" style="-webkit-app-region: no-drag;">
          <!-- Cookie 管理 -->
          <p style="cursor: pointer;">
            <a @click="dialogStore.setCookieUseDialog(!dialogStore.getCookieUseDialog)">
              {{ $t('Message.Components.UseCookieDialog.cookieConsent.manage') }}
            </a>|
            <a @click="mainStore.setRightDrawer(!mainStore.getRightDrawer)">
              {{ $t('Message.Components.DevDialog.Setting') }}
            </a>|
            <a>
              {{ mainStore.getAppVersion }}
            </a>
          </p>

          <!-- 版本信息 -->
          <!-- <p>
            Version {{ appVersion }}
          </p> -->

          <!-- 版权信息 -->
          <p>
            <a href="https://github.com/HaiGeMaster" target="_blank">
              Copyright © {{ copyrightInfo.startYear }} - {{ copyrightInfo.currentYear }}
            </a>
          </p>

          <!-- 技术支持 -->
          <p>
            Powered by
            <template v-for="(tech, index) in copyrightInfo.poweredBy" :key="tech.name">
              <a :href="tech.url" target="_blank">
                {{ tech.name }}{{ index < copyrightInfo.poweredBy.length - 1 ? ' & ' : '' }} </a>
                  <br>
            </template>
          </p>

          <!-- ICP备案 -->
          <p v-if="copyrightInfo.icpText != ''">
            <a href="http://beian.miit.gov.cn" target="_blank">
              <img :src="$G_ImgHandle('/assets/fixed_content/icpbeian.png')" alt="ICP备案">
              {{ copyrightInfo.icpText }}
            </a>
          </p>

          <!-- 公安备案 -->
          <p v-if="copyrightInfo.gwText != ''">
            <a :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${copyrightInfo.gwNumber}`"
              target="_blank">
              <img :src="$G_ImgHandle('/assets/fixed_content/gwbeian.png')" alt="公安备案">
              {{ copyrightInfo.gwText }}
            </a>
          </p>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
import {
  // GetInfoData,
  GetAppBaseInfo
} from '@/api/global.js'
import NavList from './nav-list.vue'
export default {
  name: 'NavigationDrawer',
  props: {
    admin: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NavList
  },
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
      GonWang_NUM: '',
    }
  },

  computed: {

    // 版权信息
    copyrightInfo() {
      const currentYear = new Date().getFullYear()
      // 提取公安备案号中的数字
      const gwNumber = this.mainStore.getInfoData.site_gongan_beian ? this.mainStore.getInfoData.site_gongan_beian.match(/\d+/)[0] : ''
      return {
        startYear: 2022,
        currentYear,
        icpText: this.mainStore.getInfoData.site_icp_beian,
        gwText: this.mainStore.getInfoData.site_gongan_beian,
        gwNumber: gwNumber,
        poweredBy: [
          { name: 'Vuetify', url: 'https://vuetifyjs.com/' },
          { name: 'Material Design Forum', url: 'https://www.xbedrock.com/info' }
        ]
      }
    }
  },

  created() {
    // 获取应用基本信息
    this.GetAppBaseInfoData()
  },
  mounted() {
    // 获取应用基本信息
    // this.GetAppBaseInfoData()
  },
  methods: {
    async GetAppBaseInfoData() {
      const response = await GetAppBaseInfo({
        user_token: this.userStore?.getUser?.user_token
      })
      // console.log(response)
      if (response.data.is_get) {
        this.mainStore.setAppBaseInfo({
          ...response.data.data,
        })
        this.mainStore.setInfoData({
          ...response.data.data.option_list,
        })

        // console.log(this.mainStore.getAppBaseInfo)
        //获取title标签
        document.title = this.mainStore.getInfoData.site_name
        //获取keywords标签
        document.querySelector('meta[name="keywords"]').content = this.mainStore.getInfoData.site_keywords
        //获取description标签
        document.querySelector('meta[name="description"]').content = this.mainStore.getInfoData.site_description
      }
    },
  },
}
</script>


<style lang="less">
.copyright {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 16px;

  p {
    margin: 0;
    overflow: hidden;
    // color: rgba(0, 0, 0, 0.38) !important;
    color: rgb(var(--v-theme-surface-variant));
    font-size: 13px;
    line-height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;

    // .v-theme--dark & {
    //   color: rgba(255, 255, 255, .38) !important;
    // }
  }

  a {
    padding: 2px;
    font-size: 13px;
    // color: rgba(0, 0, 0, 0.52) !important;
    color: rgb(var(--v-theme-surface-variant));
    text-decoration: none;

    // .v-theme--dark & {
    //   color: rgba(255, 255, 255, .52) !important;
    // }

    &:hover {
      text-decoration: underline;
    }

    img {
      width: 16px;
      height: 16px;
      margin-right: 4px;
      float: left;
    }
  }
}
</style>
