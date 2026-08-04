<template>
  <!-- fluid class="pa-6" -->
  <v-container style="max-width: 1080px;margin-bottom: 160px;">

    <div v-if="userStore.getIsLogin">

      <!-- 页面标题 -->
      <v-row class="mb-6">
        <v-col cols="12">
          <h1 class="text-h4 font-weight-bold mb-2">{{ $t('Message.Client.SignIn.DailySignIn') }}</h1>
          <p class="text-grey-darken-1">{{ $t('Message.Client.SignIn.SignInDescription') }}</p>
        </v-col>
      </v-row>

      <!-- 签到卡片区域 -->
      <v-row>
        <!-- 主要签到卡片 -->
        <v-col cols="12" md="8">
          <v-card class="sign-in-card" hover rounded="lg">
            <!-- 签到状态头部 -->
            <v-card-title class="pb-0">
              <div class="d-flex align-center justify-space-between w-100">
                <div class="d-flex align-center">
                  <v-icon color="primary" size="32" class="mr-3">
                    mdi-calendar-check
                  </v-icon>
                  <div>
                    <div class="text-h6 font-weight-bold">{{ $t('Message.Client.SignIn.TodaySignIn') }}</div>
                    <div class="text-caption text-grey-darken-1">
                      {{ todayDate }}
                    </div>
                  </div>
                </div>
                <v-chip :color="isSignedToday ? 'success' : 'primary'" variant="elevated" size="large">
                  <v-icon start>
                    {{ isSignedToday ? 'mdi-check-circle' : 'mdi-clock-outline' }}
                  </v-icon>
                  {{ isSignedToday ? $t('Message.Client.SignIn.SignedIn') : $t('Message.Client.SignIn.NotSignedIn') }}
                </v-chip>
              </div>
            </v-card-title>

            <v-divider class="my-4"></v-divider>

            <!-- 连续签到展示 -->
            <v-card-text class="pt-0">
              <div class="text-center mb-6">
                <div class="text-headline-large font-weight-black text-primary mb-2">
                  {{ signInData.consecutive_days }}
                </div>
                <div class="text-subtitle-1 text-grey-darken-1">{{ $t('Message.Client.SignIn.ConsecutiveDays') }}</div>
              </div>

              <!-- 签到日历视图 -->
              <div class="mb-6">
                <div class="d-flex align-center justify-space-between mb-3">
                  <span class="text-subtitle-1 font-weight-medium">{{ $t('Message.Client.SignIn.MonthlySignIn')
                  }}</span>
                  <span class="text-caption text-grey-darken-1">
                    {{ $t('Message.Client.SignIn.SignedCountPrefix') }} {{ signedDaysCount }} {{
                      $t('Message.Client.SignIn.DaysSuffix') }}
                  </span>
                </div>
                <v-calendar type="month" :value="new Date()" :events="calendarEvents" :event-color="'green'" hide-header
                  class="rounded-lg overflow-hidden">
                  <template v-slot:day-body="{ date, events }">
                    <div class="d-flex align-center justify-center h-full">
                      <span class="text-sm font-medium">{{ date.day }}</span>
                    </div>
                    <v-icon v-if="events.length > 0" size="16" color="white"
                      class="absolute bottom-1 left-1/2 -translate-x-1/2">
                      mdi-check-circle
                    </v-icon>
                  </template>
                </v-calendar>
              </div>

              <!-- 签到按钮 -->
              <v-btn block size="x-large" :color="isSignedToday ? '' : 'primary'" :disabled="isSignedToday || loading"
                rounded="pill" hover class="sign-btn" @click="AddUserSignIn()">
                <v-icon start size="24">
                  {{ isSignedToday ? 'mdi-check' : 'mdi-calendar-plus' }}
                </v-icon>
                {{ loading ? $t('Message.Client.SignIn.SigningIn') : (isSignedToday ?
                  $t('Message.Client.SignIn.SignedToday') :
                  $t('Message.Client.SignIn.SignInNow')) }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- 右侧统计卡片 -->
        <v-col cols="12" md="4">
          <v-card class="stats-card mb-4" hover rounded="lg" >
            <v-card-title class="pb-2">
              <v-icon color="amber" class="mr-2">mdi-seal-variant</v-icon>
               <!-- <v-icon class="mr-2">
                <v-img :src="$G_ImgHandle('/assets/fixed_content/signin_points.png')" width="34" height="34"/>
               </v-icon> -->
              {{ $t('Message.Client.SignIn.MySignInPoints') }}
            </v-card-title>
            <v-card-text>
              <div class="text-center">
                <div class="text-headline-large font-weight-black text-amber-darken-2 mb-2">
                  {{ formattedTotalPoints }}
                </div>
                <div class="text-caption text-grey-darken-1">{{ $t('Message.Client.SignIn.TotalPoints') }}</div>
              </div>
              <v-divider class="my-4"></v-divider>
              <div class="d-flex justify-space-between align-center">
                <span class="text-body-2">{{ $t('Message.Client.SignIn.SignInCount') }}</span>
                <span class="text-h6 font-weight-bold">
                  {{ signInData.consecutive_days }} {{ $t('Message.Client.SignIn.TimesSuffix') }}
                </span>
              </div>
              <div class="d-flex justify-space-between align-center mt-2">
                <span class="text-body-2">{{ $t('Message.Client.SignIn.LastSignIn') }}</span>
                <span class="text-caption text-grey-darken-1">
                  {{ signInData.last_sign_in_date }}
                </span>
              </div>
            </v-card-text>
          </v-card>

          <!-- 签到规则说明 -->
          <v-card class="rules-card" hover rounded="lg">
            <v-card-title class="pb-2">
              <v-icon color="info" class="mr-2">mdi-information</v-icon>
              {{ $t('Message.Client.SignIn.SignInRules') }}
            </v-card-title>
            <v-card-text>
              <v-list density="compact" class="pa-0">
                <v-list-item prepend-icon="mdi-check-circle" :title="$t('Message.Client.SignIn.DailySignInRule')">
                  <template v-slot:subtitle> {{ $t('Message.Client.SignIn.DailySignInReward') }} </template>
                  <v-tooltip activator="parent" location="start">{{ $t('Message.Client.SignIn.DailySignInReward')
                  }}</v-tooltip>
                </v-list-item>
                <v-list-item prepend-icon="mdi-fire" :title="$t('Message.Client.SignIn.ConsecutiveReward')">
                  <template v-slot:subtitle>
                    {{ $t('Message.Client.SignIn.MilestoneReward') }}
                  </template>
                  <v-tooltip activator="parent" location="start">
                    {{ $t('Message.Client.SignIn.MilestoneReward') }}
                  </v-tooltip>
                </v-list-item>
                <v-list-item prepend-icon="mdi-crown" :title="$t('Message.Client.SignIn.BonusReward')">
                  <template v-slot:subtitle> {{ $t('Message.Client.SignIn.BonusRewardDescription') }} </template>
                  <v-tooltip activator="parent" location="start">
                    {{ $t('Message.Client.SignIn.BonusRewardDescription') }}
                  </v-tooltip>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- 无权限提示 -->
    <!-- <NoPermissions v-else :message="$t('Message.App.YouNeedToLogInToAccessThisPage')" /> -->
    <!-- <Pages404 v-else /> -->
    <Empty v-else 
    :text="$t('Message.App.YouNeedToLogInToAccessThisPage')"
    :title="$t('Message.Client.YouDoNotHavePermissionToAccessThisPage')"
    :btn_text="$t('Message.Components.Empty.Login')" @btn_click="dialogStore.setLoginDialog(true)"
    />

    <!-- 签到成功提示 -->
    <v-snackbar v-model="showSuccessSnackbar" color="success" timeout="3000" location="bottom">
      <template v-slot:actions>
        <v-btn variant="text" @click="showSuccessSnackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        <span>{{ $t('Message.Client.SignIn.SignInSuccess') }} {{ earnedPoints }} {{ $t('Message.Client.SignIn.Points')
        }}
          🎉</span>
      </div>
    </v-snackbar>
  </v-container>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
import { useMainStore } from '@/stores/main'
import {
  // AddUserSignIn,
  // GetUserSignIn
} from '@/api/global.js'
// import NoPermissions from '@/components/no-permissions/index.vue'
// import Pages404 from '@/pages/404/index.vue'
import Empty from '@/components/empty/index.vue'

export default {
  name: 'SignIn',
  components: {
    // Pages404,
    Empty
  },
  data() {
    return {
      mainStore: useMainStore(),
      dialogStore: useDialogStore(),
      userStore: useUserStore(),
      loading: false,
      showSuccessSnackbar: false,
      earnedPoints: 0,
      signInData: {
        consecutive_days: 0,//连续签到天数
        last_sign_in_time: '',//最后签到时间
        last_sign_in_date: '',//最后签到日期
        total_count: 0,//签到次数
        total_points: 0,//总签到点数
      },
    }
  },
  computed: {
    // 今日日期格式化
    todayDate() {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}${this.$t('Message.Client.SignIn.YearSuffix')}${month}${this.$t('Message.Client.SignIn.MonthSuffix')}${day}${this.$t('Message.Client.SignIn.DaySuffix')}`
    },
    // 判断今天是否已签到
    isSignedToday() {
      const today = new Date().toISOString().split('T')[0]
      return this.signInData.last_sign_in_date === today
    },
    // 日历事件（用于 v-calendar 显示签到日期）
    calendarEvents() {
      const events = []
      const consecutiveDays = this.signInData.consecutive_days || 0
      const lastSignInDate = this.signInData.last_sign_in_date

      if (consecutiveDays > 0 && lastSignInDate) {
        // 从最后签到日期往前推 consecutiveDays 天，生成已签到日期
        const lastDate = new Date(lastSignInDate)
        for (let i = 0; i < consecutiveDays; i++) {
          const date = new Date(lastDate)
          date.setDate(date.getDate() - i)
          const dateStr = date.toISOString().split('T')[0]
          events.push({
            name: this.$t('Message.Client.SignIn.SignedEventName'),
            start: dateStr,
            color: 'green'
          })
        }
      }
      return events
    },
    // 本月已签到天数（显示连续签到天数）
    signedDaysCount() {
      // 使用服务器返回的连续签到天数
      return this.signInData.consecutive_days || 0
    },
    // 格式化总签到点数（带千分符）
    formattedTotalPoints() {
      return this.signInData.total_points.toLocaleString()
    },
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    }
  },
  created() {
    // this.GetUserSignIn()
  },
  methods: {
    async AddUserSignIn() {

      if (!this.userStore.getIsLogin) {
        this.dialogStore.setLoginDialog(true)
        return
      }

      this.loading = true
      const response = await AddUserSignIn({
        user_token: this.userStore.userToken
      })
      // console.log(response)
      if (response.data.is_set) {
        // 计算获得的签到点数
        const oldPoints = this.signInData.total_points
        this.signInData = response.data.data
        this.earnedPoints = this.signInData.total_points - oldPoints
        // 显示成功提示
        this.showSuccessSnackbar = true
        // console.log(this.signInData)
      }
      this.loading = false
    },
    async GetUserSignIn() {
      const response = await GetUserSignIn({
        user_token: this.userStore.userToken
      })
      // console.log(response)
      if (response.data.is_get) {
        this.signInData = response.data.data
        // console.log(this.signInData)
      }
    },
  },
  watch: {
    // $route(newRoute, oldRoute) {
    //   if (newRoute.name == 'signin' || newRoute.name == 'lang-signin') {
    //     this.GetUserSignIn()
    //   }
    // },
    // ReturnUserIsLogin(newVal, oldVal) {
    //   if (newVal) {
    //     this.GetUserSignIn()
    //   }
    // }
  }
}
</script>

<style scoped>
.sign-in-card {}

.sign-in-card .v-card-title {
  /* color: white; */
}

.sign-in-card .text-grey-darken-1 {
  /* color: rgba(255, 255, 255, 0.7) !important; */
}

.sign-btn {
  font-size: 18px;
  font-weight: 600;
  padding: 16px 24px;
  transition: all 0.3s ease;
}

.sign-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.stats-card,
.rules-card {
  /* background-color: white; */
}

/* 响应式调整 */
@media (max-width: 960px) {
  .calendar-grid {
    gap: 4px;
  }

  .day-number {
    font-size: 12px;
  }
}
</style>
