<template>
  <div>
    <v-bottom-sheet v-model="sheet" persistent class="" :inset="mainStore.getDesktop">
      <v-sheet class="text-center px-4 py-3 " height="auto">
        <v-card flat class="mx-auto rounded-t-lg" max-width="100%" >
          <v-card-text>
            <p class="text-body-1 mb-4">

              {{ $t('Message.Components.UseCookieDialog.cookieConsent.description') }}
            </p>

            <div class="d-flex flex-column flex-sm-row justify-center align-center mt-6">


              <v-btn rounded="lg"  color="primary" variant="flat" @click="acceptOptional" :block="mainStore.getMobile"
                style="margin: 4px;">

                {{ $t('Message.Components.UseCookieDialog.cookieConsent.accept') }}
                <v-icon small right v-if="isOptionalAcceptSelected">mdi-check</v-icon>
              </v-btn>

              <v-btn rounded="lg"  variant="tonal" @click="rejectOptional" :block="mainStore.getMobile" style="margin: 4px;">

                {{ $t('Message.Components.UseCookieDialog.cookieConsent.reject') }}
                <v-icon small right v-if="isOptionalRejectSelected">mdi-check</v-icon>
              </v-btn>

              <v-btn rounded="lg"  variant="outlined" @click="manageCookies" :block="mainStore.getMobile" style="margin: 4px;">

                {{ $t('Message.Components.UseCookieDialog.cookieConsent.manage') }}
              </v-btn>

              <v-spacer v-show="!mainStore.getMobile"></v-spacer>

              <LanguageButton :slotname="!mainStore.getMobile ? 'icon' : 'btn'"/>


              <!-- <v-btn rounded="lg"  variant="text" icon @click="mainStore.setRightDrawer(!mainStore.getRightDrawer)">
                <v-icon>
                  mdi-account-cog
                </v-icon>
                <v-tooltip activator="parent" location="bottom">{{ $t('Message.Components.DevDialog.Setting')
                  }}</v-tooltip>
              </v-btn> -->


            </div>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
    <v-dialog v-model="dialog" max-width="600px" persistent :fullscreen="mainStore.getMobile" scrollable>
      <v-card :title="$t('Message.Components.UseCookieDialog.cookieConsent.dialogTitle')">
        <!-- <v-card-title class="headline">

          {{ $t('Message.Components.UseCookieDialog.cookieConsent.dialogTitle') }}
        </v-card-title> -->
        <v-card-text style="height: 650px;">
          <p>


            {{ $t('Message.Components.UseCookieDialog.cookieConsent.dialogIntro', {
              domain: GetMainDomain
            }) }}
          </p>

          <v-divider class="my-4"></v-divider>

          <div>
            <h3 class="text-h6 font-weight-medium">

              {{ $t('Message.Components.UseCookieDialog.cookieConsent.requiredTitle') }}
            </h3>
            <p>


              {{ $t('Message.Components.UseCookieDialog.cookieConsent.requiredDesc') }}
            </p>
            <p>

              {{ $t('Message.Components.UseCookieDialog.cookieConsent.requiredCookies') }}
            </p>
            <table>
              <thead>
                <tr>
                  <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_name') }}</th>
                  <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_desc') }}</th>
                  <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_source') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>theme</strong></td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.theme') }}</td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.self_site') }}</td>
                </tr>
                <tr>
                  <td><strong>user_token</strong></td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.user_token') }}</td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.self_site') }}</td>
                </tr>
                <tr>
                  <td><strong>lang</strong></td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.lang') }}</td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.self_site') }}</td>
                </tr>
                <tr>
                  <td><strong>cf_clearance</strong></td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.cf_clearance') }}</td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.cloudflare') }}</td>
                </tr>
                <tr>
                  <td><strong>_clsk</strong></td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields._clsk') }}</td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.cloudflare') }}</td>
                </tr>
                <tr>
                  <td><strong>_clck</strong></td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields._clck') }}</td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.cloudflare') }}</td>
                </tr>
              </tbody>
            </table>

            <div class="d-flex flex-wrap mt-3 ">
              <v-btn rounded="lg"  variant="flat" color="primary" @click="acceptRequired">

                {{ $t('Message.Components.UseCookieDialog.cookieConsent.accept') }}
                <v-icon small right v-if="requiredAccepted">mdi-check</v-icon>
              </v-btn>

              <v-btn rounded="lg"  variant="tonal" disabled style="margin-left: 8px;">

                {{ $t('Message.Components.UseCookieDialog.cookieConsent.reject') }}
              </v-btn>
            </div>
          </div>

          <v-divider class="my-4"></v-divider>

          <div>
            <h3 class="text-h6 font-weight-medium">

              {{ $t('Message.Components.UseCookieDialog.cookieConsent.analyticsTitle') }}
            </h3>
            <p>

              {{ $t('Message.Components.UseCookieDialog.cookieConsent.analyticsDesc', {
                domain: GetMainDomain
              }) }}
            </p>
            <p>

              {{ $t('Message.Components.UseCookieDialog.cookieConsent.analyticsCookies') }}
            </p>
            <p>

              {{ $t('Message.Components.UseCookieDialog.cookieConsent.exampleCookies') }}
            </p>
            <table>
              <thead>
                <tr>
                  <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_name') }}</th>
                  <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_desc') }}</th>
                  <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_source') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>MUID</strong></td>

                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.MUID') }}</td>
                  <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.microsoft') }}</td>
                </tr>
              </tbody>
            </table>

            <div class="d-flex flex-wrap mt-3">
              <v-btn rounded="lg"  variant="flat" color="primary" @click="acceptAnalytics">

                {{ $t('Message.Components.UseCookieDialog.cookieConsent.accept') }}
                <v-icon small right v-if="analyticsAccepted">mdi-check</v-icon>
              </v-btn>
              <v-btn rounded="lg"  variant="tonal" @click="rejectAnalytics" style="margin-left: 8px;">

                {{ $t('Message.Components.UseCookieDialog.cookieConsent.reject') }}
                <v-icon small right v-if="!analyticsAccepted">mdi-check</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded="lg"  variant="tonal"  text @click="closeDialog" :outlined="mainStore.getMobile">

            {{ $t('Message.Components.UseCookieDialog.cookieConsent.close') }}
          </v-btn>
          <v-btn rounded="lg"  variant="flat" color="primary" @click="savePreferences">

            {{ $t('Message.Components.UseCookieDialog.cookieConsent.save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import {
//   AddClarityScript,
// } from '@/api/global.js'
import { useMainStore } from '@/stores/main';
import { useDialogStore } from '@/stores/dialog';
import { useLocalDataStore } from '@/stores/local-data'
import LanguageButton from '@/components/language-button/index.vue'
export default {
  name: 'UseCookieDialog',
  // props: {
  //   model: {
  //     type: Boolean,
  //     default: true,
  //   }
  // },
  components: {
    LanguageButton,
  },
  data() {
    return {
      mainStore: useMainStore(),
      dialogStore: useDialogStore(),
      localDataStore: useLocalDataStore(),
      sheet: false, // 控制底部工作表的显示状态
      dialog: false, // 默认显示对话框
      requiredAccepted: true,  // 必需Cookie是否被接受
      analyticsAccepted: true, // 分析Cookie是否被接受
      // socialAccepted: false,  // 社交媒体Cookie是否被接受
      // adsAccepted: false,     // 广告Cookie是否被接受
    }
  },
  computed: {
    model: {
      get() {
        return this.dialogStore.getCookieUseDialog
      },
      set(val) {
        this.dialogStore.setCookieUseDialog(val)
      }
    },
    // 计算底部工作表接受按钮是否应该显示勾选图标
    isOptionalAcceptSelected() {
      return this.requiredAccepted && this.analyticsAccepted;
    },
    // 计算底部工作表拒绝按钮是否应该显示勾选图标
    isOptionalRejectSelected() {
      return this.requiredAccepted && !this.analyticsAccepted;
    },
    //获取主域名
    GetMainDomain() {
      const hostname = window.location.hostname;
      const parts = hostname.split('.');
      let mainDomain = '';
      if (parts.length > 2) {
        // 取最后两部分（适用于大多数 .com/.org/.net 等情况）
        mainDomain = parts.slice(-2).join('.');
      } else {
        mainDomain = hostname;
      }
      return mainDomain
    },
  },
  methods: {
    // 保存所有Cookie偏好
    savePreferences() {
      const preferences = {
        required: this.requiredAccepted,
        analytics: this.analyticsAccepted,
        // social: this.socialAccepted,
        // ads: this.adsAccepted,
      };
      this.localDataStore.setCookiePreferences(preferences)
      // console.log('Cookie偏好已保存:', preferences);
      this.loadPreferences()
      this.dialog = false
    },
    // 加载Cookie偏好
    loadPreferences() {
      const savedPreferences = this.localDataStore.getCookiePreferences
      if (savedPreferences) {
        try {
          const preferences = JSON.parse(savedPreferences);
          this.requiredAccepted = preferences.required !== undefined ? preferences.required : true; // 必需Cookie默认启用
          this.analyticsAccepted = preferences.analytics || false;
          // this.socialAccepted = preferences.social || false;
          // this.adsAccepted = preferences.ads || false;
          // console.log('已加载保存的Cookie偏好:', preferences);
          if (this.analyticsAccepted) {
            // console.log('用户同意 analyticsAccepted 添加Clarity脚本用来分析')
            // AddClarityScript()//添加Clarity脚本用来分析！！！
          } else if (window.location.origin = 'https://www.xbedrock.com') {
            // console.log('官方网站开启分析')
            // AddClarityScript()//添加Clarity脚本用来分析！！！
          } else {
            // console.log('非官方网站，不开启分析')
            // AddClarityScript()//添加Clarity脚本用来分析！！！
          }
        } catch (e) {
          //console.error('解析保存的Cookie偏好失败:', e);
          // 如果解析失败，使用默认值
          this.resetToDefaults();
        }
      } else {
        // 如果没有保存的偏好，使用默认值
        // this.resetToDefaults();
        this.sheet = true
      }
    },
    // 重置为默认值（必需Cookie启用，其他禁用）
    resetToDefaults() {
      this.requiredAccepted = true;  // 必需Cookie总是启用的
      this.analyticsAccepted = true;
    },
    acceptRequired() {//接受对话框里的必需Cookie
      // console.log('用户接受了必需Cookie')
      this.requiredAccepted = true;
      this.savePreferences(); // 保存设置
    },
    rejectRequired() {//拒绝对话框里的必需Cookie
      // 注意：必需Cookie不应该被拒绝，因为它们对网站功能至关重要
      // 这个方法可能只是为了完整性而保留
      // console.log('用户尝试拒绝必需Cookie - 这通常不应该发生')
      this.requiredAccepted = true; // 仍然保持启用状态，因为必需Cookie不能被拒绝
    },
    acceptAnalytics() {//接受对话框里的分析Cookie
      // console.log('用户接受了分析Cookie')
      this.analyticsAccepted = true;
    },
    rejectAnalytics() {//拒绝对话框里的分析Cookie
      // console.log('用户拒绝了分析Cookie')
      this.analyticsAccepted = false;
    },
    closeDialog() {
      this.dialog = false;
    },
    acceptOptional() {//接受所有Cookie
      // 处理接受可选Cookie的逻辑
      // console.log('用户接受了可选Cookie');
      // 接受可选Cookie意味着接受必需和分析Cookie
      this.requiredAccepted = true;
      this.analyticsAccepted = true;
      this.savePreferences(); // 保存设置
      this.sheet = false; // 关闭底部工作表
    },
    rejectOptional() {//拒绝所有Cookie
      // 处理拒绝可选Cookie的逻辑
      // console.log('用户拒绝了可选Cookie');
      // 拒绝可选Cookie意味着只使用必需的Cookie
      this.requiredAccepted = true; // 必需Cookie总是启用的
      this.analyticsAccepted = false; // 拒绝分析Cookie
      this.savePreferences(); // 保存设置
      this.sheet = false; // 关闭底部工作表
    },
    manageCookies() {
      // console.log('用户点击了管理Cookie');
      this.dialog = true;
    }
  },
  mounted() {
    this.loadPreferences();
  },
  watch: {
    model(val) {
      this.sheet = val
    },
    sheet(val) {
      if (!val) {
        this.$emit('model', val)
      }
    },
  }
}
</script>

<style lang="less" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #80808080;
  padding: 10px;
  text-align: left;
}

th {
  // background-color: #f2f2f2;
}

tr:nth-child(even) {
  // background-color: #f9f9f9;
}
</style>
