<template>
  <!-- class="pt-12" -->
  <v-container style="width: 100%;margin: 0;padding: 0;max-width: 100% !important;">
    <div v-if="InfoShowRule">
      <v-tabs v-model="tab" grow :color="tab == 'vuetify2' ? 'blue' : '#715caa'" show-arrows>
        <v-tab value="#vuetify2">
          MDForum-Vuetify2-MaterialDesign2
        </v-tab>
        <v-tab value="#mdui2">
          MDForum-MDUI2-MaterialDesign3
        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab" style="padding-top: 48px;">
        <v-tabs-window-item value="#vuetify2">
          <div style="padding: 8px;">
            <v-row align="center" justify="center">
              <v-col cols="auto">
                <v-img :src="$G_ImgHandle('/assets/info_content/md2/MDF192.png')" />
              </v-col>
              <v-col cols="auto" class="text-center text-lg-start">
                <h1 :class="display.mdAndDown ? 'text-h4' : 'text-h2'" class="font-weight-black mb-3 ms-n1">
                  Material Design Forum
                </h1>

                <p class="mb-10 mx-auto ms-lg-0" style="max-width: 568px;">
                  {{
                    $t('Message.Client.Info.DownloadProductsFromTheFollowingDifferentChannelsAsWellAsTheHelpFolderForProductUsage')
                  }}
                </p>

                <p>
                  <small class="mb-10 mx-auto ms-lg-0 text--secondary" style="max-width: 568px;">
                    {{
                      $t('Message.Client.Info.WhenClickingOnTheLinkBelowTheCorrespondingExtractionCodeWillBeAutomaticallyCopiedToYourClipboardPastingBoard')
                    }}
                  </small>
                </p>
                <v-row :justify="display.mdAndDown ? 'center' : undefined">
                  <v-col cols="auto" v-for="link in links" :key="link.text">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn depressed v-bind="attrs" v-on="on" :color="link.md2_color" rounded
                          :outlined="link.outlined" :class="[
                            link.classes,
                            `${link.btn_text_color}--text`
                          ]" :href="link.href" :target="link.target">
                          <!-- @click="CopyPassText(link.pass)" -->
                          <v-icon left :color="link.btn_text_color">{{ link.icon }}</v-icon>
                          {{
                            $t(link.text)
                          }}
                          <!-- +`(${link.pass})` -->
                        </v-btn>
                      </template>
                      <span>{{ link.pass }}</span>
                    </v-tooltip>
                  </v-col>
                </v-row>


              </v-col>

              <v-col cols="auto" :style="{
                'max-width': mainStore.getDesktop && display.name == 'xxl'
                  ? '568px' : ''
              }">
                <small class="mb-10 mx-auto ms-lg-0 text--secondary">
                  {{
                    $t('Message.Client.Info.InfoText1')
                  }}
                  {{
                    $t('Message.Client.Info.SupportMultipleLanguagesAndYouCanAlsoTranslateLanguageFilesAndCreateNewLanguageSupportByYourself')
                  }}
                </small>


              </v-col>

              <v-col cols="auto">
                <v-img :src="mainStore.getIsDark
                  ? $G_ImgHandle('/assets/info_content/md2/device_info_template_dark.png')
                  : $G_ImgHandle('/assets/info_content/md2/device_info_template_light.png')
                  " />
              </v-col>
              <v-col cols="auto">
                <v-img :src="$G_ImgHandle('/assets/info_content/md2/device_info_template_auto.png')" />
              </v-col>
              <v-col cols="auto">
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-card rounded="xxl" outlined color="blue lighten-2">
                      <!-- <v-subheader>{{ $t('Message.App.QQ_Reward') }}</v-subheader> -->
                      <v-img max-width="150px" :src="$G_ImgHandle('/assets/info_content/qq_pay.png')" />
                    </v-card>
                  </v-col>

                  <v-col cols="auto">
                    <v-card rounded="xxl" outlined color="green darken-1">
                      <!-- <v-subheader>{{ $t('Message.App.Wechat_Reward') }}</v-subheader> -->
                      <v-img max-width="150px" :src="$G_ImgHandle('/assets/info_content/wx_pay.png')" />
                    </v-card>

                  </v-col>

                  <v-col cols="auto">
                    <v-card rounded="xxl" outlined color="blue darken-2">
                      <!-- <v-subheader>{{ $t('Message.App.Alipay_Reward') }}</v-subheader> -->
                      <v-img max-width="150px" :src="$G_ImgHandle('/assets/info_content/al_pay.png')" />
                    </v-card>

                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="auto">
                <v-img :src="$G_ImgHandle('/assets/info_content/md2/MDF-BG-1024-768-BTM.png')
                  " />
              </v-col>

            </v-row>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="#mdui2">
          <div style="padding: 8px;">
            <v-row align="center" justify="center">
              <v-col cols="auto">
                <v-img :src="$G_ImgHandle('/assets/info_content/md3/MDF192.png')" />
              </v-col>
              <v-col cols="auto" class="text-center text-lg-start">
                <h1 :class="display.mdAndDown ? 'text-h4' : 'text-h2'" class="font-weight-black mb-3 ms-n1">
                  Material Design Forum
                </h1>

                <p class="mb-10 mx-auto ms-lg-0" style="max-width: 568px;">
                  {{
                    $t('Message.Client.Info.DownloadProductsFromTheFollowingDifferentChannelsAsWellAsTheHelpFolderForProductUsage')
                  }}
                </p>

                <p>
                  <small class="mb-10 mx-auto ms-lg-0 text--secondary" style="max-width: 568px;">
                    {{
                      $t('Message.Client.Info.WhenClickingOnTheLinkBelowTheCorrespondingExtractionCodeWillBeAutomaticallyCopiedToYourClipboardPastingBoard')
                    }}
                  </small>
                </p>
                <v-row :justify="display.mdAndDown ? 'center' : undefined">
                  <v-col cols="auto" v-for="link in links" :key="link.text">
                    <!-- <v-tooltip bottom disabled> -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn depressed v-bind="attrs" v-on="on" :color="link.md3_color" rounded
                          :outlined="link.outlined" :class="[
                            link.classes,
                            `${link.btn_text_color}--text`
                          ]" :href="link.href" :target="link.target">
                          <!-- @click="CopyPassText(link.pass)" -->
                          <v-icon left :color="link.btn_text_color">{{ link.icon }}</v-icon>
                          {{
                            $t(link.text)
                          }}
                          <!-- +`(${link.pass})` -->
                        </v-btn>
                      </template>
                      <span>{{ link.pass }}</span>
                    </v-tooltip>
                  </v-col>
                </v-row>


              </v-col>

              <v-col cols="auto" :style="{
                'max-width': mainStore.getDesktop && display.name == 'xxl'
                  ? '568px' : ''
              }">
                <small class="mb-10 mx-auto ms-lg-0 text--secondary">
                  {{
                    $t('Message.Client.Info.InfoText1')
                  }}
                  {{
                    $t('Message.Client.Info.SupportMultipleLanguagesAndYouCanAlsoTranslateLanguageFilesAndCreateNewLanguageSupportByYourself')
                  }}
                </small>


              </v-col>

              <v-col cols="auto">
                <v-img :src="mainStore.getIsDark
                  ? $G_ImgHandle('/assets/info_content/md3/device_info_template_dark.png')
                  : $G_ImgHandle('/assets/info_content/md3/device_info_template_light.png')
                  " />
              </v-col>
              <v-col cols="auto">
                <v-img :src="$G_ImgHandle('/assets/info_content/md3/device_info_template_auto.png')" />
              </v-col>
              <v-col cols="auto">
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-card rounded="xxl" outlined color="blue lighten-2">
                      <!-- <v-subheader>{{ $t('Message.App.QQ_Reward') }}</v-subheader> -->
                      <v-img max-width="150px" :src="$G_ImgHandle('/assets/info_content/qq_pay.png')" />
                    </v-card>
                  </v-col>

                  <v-col cols="auto">
                    <v-card rounded="xxl" outlined color="green darken-1">
                      <!-- <v-subheader>{{ $t('Message.App.Wechat_Reward') }}</v-subheader> -->
                      <v-img max-width="150px" :src="$G_ImgHandle('/assets/info_content/wx_pay.png')" />
                    </v-card>

                  </v-col>

                  <v-col cols="auto">
                    <v-card rounded="xxl" outlined color="blue darken-2">
                      <!-- <v-subheader>{{ $t('Message.App.Alipay_Reward') }}</v-subheader> -->
                      <v-img max-width="150px" :src="$G_ImgHandle('/assets/info_content/al_pay.png')" />
                    </v-card>

                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="auto">
                <v-img :src="$G_ImgHandle('/assets/info_content/md3/MDF-BG-1024-768-BTM.png')
                  " />
              </v-col>

            </v-row>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>


      <v-tabs v-model="tab" color="primary">
        <v-tab value="#vuetify2">Vuetify2</v-tab>
        <v-tab value="#mdui2">MDUI2</v-tab>
      </v-tabs>

      <v-divider></v-divider>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="#vuetify2">
          <v-sheet class="pa-5" color="purple">Vuetify2</v-sheet>
        </v-tabs-window-item>
        <v-tabs-window-item value="#mdui2"> 
          <v-sheet class="pa-5" color="orange">MDUI2</v-sheet>
        </v-tabs-window-item>
      </v-tabs-window>

    </div>
    <NotFound v-else />
  </v-container>
</template>
<script>
import {
  IsTauri,
  IsElectron,
  IsMobileApp,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main.js'

import { useDisplay } from 'vuetify'
// import NotFound from '@/views/404/index.vue'
import NotFound from '@/pages/404/index.vue'
export default {
  name: 'Download',
  data: () => ({
    mainStore: useMainStore(),
    display: useDisplay(),
    tab: null,
    pay_tab: null,
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
    links: [
      // {
      //   md2_color: '#2196F3',//primary
      //   md3_color: '#715caa',
      //   btn_text_color: 'white',
      //   outlined: false,
      //   href: 'https://disk.x bedrock.com/s/nlU6',
      //   target: '_blank',
      //   // pass: 'n3bp7w',
      //   text: 'Message.Client.Info.OfficialDownload',
      //   icon: 'mdi-check-decagram',//check-decagram mdi-check-outline
      //   classes: '',
      // },
      // {
      //   md2_color: '#FF9800',//secondary
      //   md3_color: '#715caa',
      //   outlined: true,
      //   href: 'https://www.123684.com/s/VFB9-QEnsd',
      //   target: '_blank',
      //   // pass: '7uds',
      //   text: 'Message.Client.Info.OneTwoThreeCloudDisk',
      //   icon: 'mdi-cloud-download',
      //   classes: '',
      // },
      // // {
      // //   color: 'primary',
      // //   outlined: true,
      // //   href: '',
      // //   target: '_blank',
      // //   pass: '',
      // //   text: 'Message.Client.Info.AliYunDisk',
      // //   icon: 'mdi-cloud-download',
      // //   classes: '',
      // // },
      // {
      //   md2_color: '#FF9800',//secondary
      //   md3_color: '#715caa',
      //   outlined: true,
      //   href: 'https://pan.baidu.com/s/1k8N5lKfk_dNJdp2jJd900A?pwd=az4b',
      //   target: '_blank',
      //   pass: 'az4b',
      //   text: 'Message.Client.Info.BaiduYunDisk',
      //   icon: 'mdi-cloud-download',
      //   classes: '',
      // },
      {
        md2_color: 'grey darken-3',
        md3_color: 'grey darken-3',
        outlined: false,
        href: 'https://github.com/HaiGeMaster',
        // href: 'https://github.com/HaiGeMaster/MaterialDesignForum-Initial',
        //'https://github.com/HaiGeMaster/MaterialDesignForum',
        target: '_blank',
        pass: 'Github',
        text: 'Message.Client.Info.Github',
        icon: 'mdi-github',
        classes: 'white--text',
      },
      {
        md2_color: '#E91E63',//accent
        md3_color: '#715caa',
        outlined: true,
        href: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=4jMRY6ticQxL5G5MBfRcUBpfD42aRLzt&authKey=sRG2QR9fCqvfSbxLDtXG2KZuB%2FxBVAD1ZmFjkIrVqO4S1pJsNweXCI670npDZeVq&noverify=0&group_code=891100027',
        target: '_blank',
        pass: '891100027',
        text: 'Message.Client.Info.QQGroup',
        icon: 'mdi-qqchat',
        classes: '',
      },
    ],
  }),
  components: {
    NotFound,
  },
  computed: {
    InfoShowRule() {
      return true
      //如果是本地协议file://则显示
      if (window.location.protocol == 'file:') {
        return true
      }
      //如果域名是www.xbedrock.com则显示
      return window.location.hostname == 'www.xbedrock.com' ||
        IsTauri() ||
        IsElectron() ||
        IsMobileApp() ||
        window.location.hostname == 'localhost';
    },
  },
  mounted() {
    // this.UpdateWebTitleAndAppbarSubTitle()
  },
  methods: {
    CopyPassText(v) {
      this.$G_CopyText(v)
    },
    // UpdateWebTitleAndAppbarSubTitle() {
    //   if (this.$route.name == 'info' || this.$route.name == 'lang-info') {
    //     this.$G_UpdateWebTitleAndAppbarSubTitle(
    //       this.$t('Message.Client.Info.ProductIntroduction'),
    //       this.$t('Message.Client.Info.ProductIntroduction')
    //     )
    //   }
    // },
  },
  watch: {
    '$route'(to, from) {
      // this.UpdateWebTitleAndAppbarSubTitle()
    },
    '$i18n.locale'(val) {
      // this.UpdateWebTitleAndAppbarSubTitle()
    }
  },
}
</script>