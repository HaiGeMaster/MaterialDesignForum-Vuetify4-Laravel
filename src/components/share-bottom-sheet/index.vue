<template>
  <v-bottom-sheet v-model="sheet" inset>
    <v-card class="rounded-t-lg">
      <!-- <v-toolbar :title="`${$t('Message.Components.ShareBottomSheet.Share')}(${shareTitle},${shareDesc},${shareUrl})`
        "> -->
      <v-toolbar :title="`${$t('Message.Components.ShareBottomSheet.Share')} (${shareTitle})`
        ">

        <template v-slot:append>
          <v-btn icon @click="sheet = !sheet">
            <v-icon>
              mdi-close
            </v-icon>
            <v-tooltip activator="parent" location="start">{{ $t('Message.Components.DialogClass.Close') }}</v-tooltip>
          </v-btn>
        </template>

      </v-toolbar>


      <v-card-text class="pa-4">

        <!-- <div v-if="showInternational" class="mb-4">
          <div class="text-subtitle-2 mb-2 d-flex align-center" v-show="showInternational && showChinese">
            <v-icon icon="mdi-earth" size="small" class="mr-2"></v-icon>
            {{ $t('Message.Components.ShareBottomSheet.International') }}
          </div>
          <v-row>
            <v-col v-for="platform in filteredInternationalPlatforms" :key="platform.title" cols="4" sm="3" md="2">
              <v-btn :color="platform.color" icon block variant="flat" @click="handleShare(platform)"
                :title="$t(platform.title)">
                <v-icon color="white">{{ platform.icon }}</v-icon>

                <v-tooltip activator="parent" location="top">{{ $t(platform.title) }}</v-tooltip>

              </v-btn>
              <div class="text-caption text-center mt-1">
                {{ $t(platform.title) }}
              </div>
            </v-col>
          </v-row>
        </div>

        <div v-if="showChinese" class="mb-4" >
          <div class="text-subtitle-2 mb-2 d-flex align-center" v-show="showInternational && showChinese">
            <v-icon icon="mdi-map-marker" size="small" class="mr-2"></v-icon>
            {{ $t('Message.Components.ShareBottomSheet.ChinesePlatforms') }}
          </div>
          <v-row>
            <v-col v-for="platform in filteredChinesePlatforms" :key="platform.title" cols="4" sm="3" md="2">
              <v-btn :color="platform.color" icon block variant="flat" @click="handleShare(platform)"
                :title="$t(platform.title)">
                <v-icon color="white">{{ platform.icon }}</v-icon>

                <v-tooltip activator="parent" location="top">{{ $t(platform.title) }}</v-tooltip>
              </v-btn>
              <div class="text-caption text-center mt-1" >
                {{ $t(platform.title) }}
              </div>
            </v-col>
          </v-row>
        </div> -->

        <div class="" >
          <v-row>
            <v-col v-if="showInternational" v-for="platform in filteredInternationalPlatforms" :key="platform.title" cols="4" sm="3" md="2">
              <v-btn :color="platform.color" icon block variant="flat" @click="handleShare(platform)"
                :title="$t(platform.title)">
                <v-icon color="white">{{ platform.icon }}</v-icon>

                <!-- <v-tooltip activator="parent" location="top">{{ $t(platform.title) }}</v-tooltip> -->

              </v-btn>
              <div class="text-caption text-center mt-1">
                {{ $t(platform.title) }}
              </div>
            </v-col>

            <v-col v-if="showChinese" v-for="platform in filteredChinesePlatforms" :key="platform.title" cols="4" sm="3" md="2">
              <v-btn :color="platform.color" icon block variant="flat" @click="handleShare(platform)"
                :title="$t(platform.title)">
                <v-icon color="white">{{ platform.icon }}</v-icon>

                <!-- <v-tooltip activator="parent" location="top">{{ $t(platform.title) }}</v-tooltip> -->
              </v-btn>
              <div class="text-caption text-center mt-1" >
                {{ $t(platform.title) }}
              </div>
            </v-col>
          </v-row>
        </div>

      </v-card-text>

      <!-- 微信分享提示 -->
      <v-dialog v-model="wechatDialog" max-width="400">
        <v-card title="微信分享指引" rounded="lg">
          <!-- <v-card-title class="text-h6">微信分享指引</v-card-title> -->
          <v-card-text>
            <p>由于微信安全限制，请按以下步骤操作：</p>
            <ol class="mt-2">
              <li>点击右上角菜单</li>
              <li>选择"复制链接"</li>
              <li>打开微信发送给朋友或朋友圈</li>
            </ol>
          </v-card-text>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-btn rounded="lg" color="green" @click="wechatDialog = false" variant="flat" block>{{ $t('Message.Components.DialogClass.Ok') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-card>
  </v-bottom-sheet>
</template>


<script>
import { useSheetStore } from '@/stores/sheet'
import { useMainStore } from '@/stores/main'
import { useSnackbarStore } from '@/stores/snackbar';
import copy from 'copy-to-clipboard';
export default {
  name: 'SocialShareSheet',

  props: {
    slotname: {
      type: String,
      default: 'list',//btn icon
    },
  },

  data: () => ({
    sheetStore: useSheetStore(),
    mainStore: useMainStore(),
    snackbarStore: useSnackbarStore(),
    // sheet: true,

    shareUrl: '',
    shareTitle: '',
    shareDesc: '',
    shareImage: '',
    // title: '分享至',
    showInternational: false,
    showChinese: false,
    customPlatforms: [],
    onShareComplete: null,

    wechatDialog: false,

    // 默认国际平台配置
    defaultInternationalPlatforms: [
      {
        title: 'Message.Components.ShareBottomSheet.Facebook',
        icon: 'mdi-facebook',
        color: '#1877F2',
        type: 'link',
        url: 'https://www.facebook.com/sharer/sharer.php?u=',
      },
      {
        title: 'Message.Components.ShareBottomSheet.Twitter',
        icon: 'mdi-twitter',
        color: '#000000',
        type: 'link',
        url: 'https://twitter.com/intent/tweet?url=',
      },
      {
        title: 'Message.Components.ShareBottomSheet.LinkedIn',
        icon: 'mdi-linkedin',
        color: '#0A66C2',
        type: 'link',
        url: 'https://www.linkedin.com/sharing/share-offsite/?url=',
      },
      {
        title: 'Message.Components.ShareBottomSheet.WhatsApp',
        icon: 'mdi-whatsapp',
        color: '#25D366',
        type: 'link',
        url: 'https://api.whatsapp.com/send?text=',
      },
      {
        title: 'Message.Components.ShareBottomSheet.Telegram',
        icon: 'mdi-send',
        color: '#26A5E4',
        type: 'link',
        url: 'https://t.me/share/url?url=',
      },
      {
        title: 'Message.Components.ShareBottomSheet.Reddit',
        icon: 'mdi-reddit',
        color: '#FF5700',
        type: 'link',
        url: 'https://reddit.com/submit?url=',
      },
      {
        title: 'Message.Components.ShareBottomSheet.Pinterest',
        icon: 'mdi-pinterest',
        color: '#E60023',
        type: 'link',
        url: 'https://pinterest.com/pin/create/button/?url=',
      },
      {
        title: 'Message.Components.ShareBottomSheet.Email',
        icon: 'mdi-email',
        color: '#777777',
        type: 'email',
        url: 'mailto:?subject=',
      },
    ],

    // 默认国内平台配置
    defaultChinesePlatforms: [
      { title: 'Message.Components.ShareBottomSheet.WeChat', icon: 'mdi-wechat', color: '#07c160', type: 'wechat' },
      {
        title: 'Message.Components.ShareBottomSheet.Weibo',
        icon: 'mdi-sina-weibo',
        color: '#e6162d',
        type: 'link',
        url: 'https://service.weibo.com/share/share.php?url=',
      },
      {
        title: 'Message.Components.ShareBottomSheet.QQ',
        icon: 'mdi-qqchat',
        color: '#12b7f5',
        type: 'link',
        url: 'https://connect.qq.com/widget/shareqq/index.html?url=',
      },
      {
        title: 'Message.Components.ShareBottomSheet.QQSpace',
        icon: 'mdi-star-circle',
        color: '#ffce00',
        type: 'link',
        url: 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=',
        textColor: 'black',
      },
      {
        title: 'Message.Components.ShareBottomSheet.Douban',
        icon: 'mdi-book-open-variant',
        color: '#2e963d',
        type: 'link',
        url: 'https://www.douban.com/share/service?href=',
      },
      {
        title: 'Message.Components.ShareBottomSheet.CopyLink',
        icon: 'mdi-content-copy',
        color: '#666666',
        type: 'copy',
      },
    ],
  }),

  computed: {
    sheet: {
      get() {
        const data = this.sheetStore.getShareSheet
        this.shareUrl = data.shareUrl
        this.shareTitle = data.shareTitle
        this.shareDesc = data.shareDesc
        this.shareImage = data.shareImage
        // this.title = data.title
        this.showInternational = data.showInternational
        this.showChinese = data.showChinese
        // this.showInternational = this.$i18n.locale != 'zh_CN'
        // this.showChinese = this.$i18n.locale == 'zh_CN'
        this.customPlatforms = data.customPlatforms
        this.onShareComplete = data.onShareComplete
        return data.model
      },
      set(value) {
        this.sheetStore.setShareSheet({
          model: value,
        })
      }
    },
    internationalPlatforms() {
      const custom = this.customPlatforms.filter(
        p => p.region === 'international',
      )
      return custom.length ? custom : this.defaultInternationalPlatforms
    },

    chinesePlatforms() {
      const custom = this.customPlatforms.filter(p => p.region === 'chinese')
      return custom.length ? custom : this.defaultChinesePlatforms
    },

    // 过滤掉不需要的平台（如果需要）
    filteredInternationalPlatforms() {
      return this.internationalPlatforms
    },

    filteredChinesePlatforms() {
      return this.chinesePlatforms
    },

    // 编码后的分享参数
    encodedUrl() {
      return encodeURIComponent(this.shareUrl)
    },

    encodedTitle() {
      return encodeURIComponent(this.shareTitle)
    },

    encodedDesc() {
      return encodeURIComponent(this.shareDesc)
    },

    encodedImage() {
      return encodeURIComponent(this.shareImage)
    },
  },

  methods: {
    handleShare(platform) {
      let shareUrl = ''

      switch (platform.type) {
        case 'link':
          // 根据不同平台构建不同的URL
          if (platform.title === 'Pinterest' && this.shareImage) {
            shareUrl = `${platform.url}${this.encodedUrl}&media=${this.encodedImage}&description=${this.encodedTitle}`
          } else if (platform.title === '微博' && this.shareImage) {
            shareUrl = `${platform.url}${this.encodedUrl}&title=${this.encodedTitle}&pic=${this.encodedImage}`
          } else if (platform.title === 'QQ' && this.shareImage) {
            shareUrl = `${platform.url}${this.encodedUrl}&title=${this.encodedTitle}&summary=${this.encodedDesc}&pics=${this.encodedImage}`
          } else {
            shareUrl = `${platform.url}${this.encodedUrl}&title=${this.encodedTitle}`
          }
          window.open(shareUrl, '_blank')
          break

        case 'email':
          window.location.href = `mailto:?subject=${this.encodedTitle}&body=${this.encodedDesc}%20${this.encodedUrl}`
          break

        case 'wechat':
          this.wechatDialog = true
          break

        case 'copy':
          const text = this.shareUrl
          if (copy(text)) {
            this.snackbarStore.addMessage({ text: this.$t('Message.Client.Topic.Topic.Copied') + ' ' + text })
          }
          break
      }

      // 调用回调函数
      if (this.onShareComplete) {
        this.onShareComplete(platform)
      }

      // 可选：关闭底部表单
      // this.sheet = false;
    },
    // 手动打开分享面板
    open() {
      this.sheet = true
    },

    // 手动关闭分享面板
    close() {
      this.sheet = false
    },
  },
}
</script>

<style scoped>
.v-btn {
  height: 56px !important;
  width: 56px !important;
  /* 补充宽度 */
  min-width: 56px !important;
  /* 防止被压缩 */
  margin: auto;
}

.text-caption {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
