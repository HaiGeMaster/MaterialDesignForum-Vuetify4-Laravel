<template>
  <v-container id="page-index" style="max-width: 1280px;" v-if="userStore.getUser.user_group.ability_admin_login">
    <!-- variant="outlined" rounded="lg" color="surface-variant" -->
    <v-card  rounded="lg"  v-if="$G_AppIsCanUse()" :loading="loading"
    class="total-number " :title="$t('Message.Admin.Index.DataCount')">
      <!-- <v-card-title>
        {{ $t('Message.Admin.Index.DataCount') }}
      </v-card-title> -->
      <v-card-text class="text--primary">
        <!-- cols="12" sm="3" md="2" -->
        <v-container>
          <v-row>
            <!-- color="surface-variant"    -->
            <v-col cols="12" sm="6" md="4" lg="2" v-show="checkUserGroup('ability_admin_manage_topic')">
              <v-card  variant="tonal" rounded="lg" :color="MD_OBJECT_COLORS.topic" :to="`${$G_UrlHeaderLang()}/admin/topics`">
                <v-card-text>
                  <span class="label grey--text lighten-2">{{ $t('Message.Admin.Index.TopicCount') }}</span>
                </v-card-text>
                <v-card-title>
                  <div class="number">
                    {{ data_count.topic_count }}
                  </div>
                </v-card-title>
                <!-- <template v-slot:append>
                  <v-btn variant="text" size="small" icon class="add" @click.prevent.stop="dialogStore.setTopicSelectorDialog(true)"
                    :title="$t('Message.Components.Editor.ClickToAddATopic')">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template> -->
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2" v-show="checkUserGroup('ability_admin_manage_question')">
              <v-card variant="tonal" rounded="lg" :color="MD_OBJECT_COLORS.question"
                :to="`${$G_UrlHeaderLang()}/admin/questions`">
                <v-card-text>
                  <span class="label grey--text lighten-2">{{ $t('Message.Admin.Index.QuestionCount') }}</span>
                </v-card-text>
                <v-card-title>
                  <div class="number">
                    {{ data_count.question_count }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2" v-show="checkUserGroup('ability_admin_manage_answer')">
              <v-card variant="tonal" rounded="lg" :color="MD_OBJECT_COLORS.answer" :to="`${$G_UrlHeaderLang()}/admin/answers`">
                <v-card-text>
                  <span class="label grey--text lighten-2">{{ $t('Message.Admin.Index.AnswerCount') }}</span>
                </v-card-text>
                <v-card-title>
                  <div class="number">
                    {{ data_count.answer_count }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2" v-show="checkUserGroup('ability_admin_manage_article')">
              <v-card variant="tonal" rounded="lg" :color="MD_OBJECT_COLORS.article"
                :to="`${$G_UrlHeaderLang()}/admin/articles`">
                <v-card-text>
                  <span class="label grey--text lighten-2">{{ $t('Message.Admin.Index.ArticleCount') }}</span>
                </v-card-text>
                <v-card-title>
                  <div class="number">
                    {{ data_count.article_count }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2" v-show="checkUserGroup('ability_admin_manage_comment')">
              <v-card variant="tonal" rounded="lg" :color="MD_OBJECT_COLORS.comment"
                :to="`${$G_UrlHeaderLang()}/admin/comments`">
                <v-card-text>
                  <span class="label grey--text lighten-2">{{ $t('Message.Admin.Index.CommentCount') }}</span>
                </v-card-text>
                <v-card-title>
                  <div class="number">
                    {{ data_count.comment_count }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2" v-show="checkUserGroup('ability_admin_manage_reply')">
              <v-card variant="tonal" rounded="lg" :color="MD_OBJECT_COLORS.reply" :to="`${$G_UrlHeaderLang()}/admin/replys`">
                <v-card-text>
                  <span class="label grey--text lighten-2">{{ $t('Message.Admin.Index.ReplyCount') }}</span>
                </v-card-text>
                <v-card-title>
                  <div class="number">
                    {{ data_count.reply_count }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2" v-show="checkUserGroup('ability_admin_manage_user_group')">
              <v-card variant="tonal" rounded="lg" :color="MD_OBJECT_COLORS.user_group"
                :to="`${$G_UrlHeaderLang()}/admin/usergroup`">
                <v-card-text>
                  <span class="label grey--text lighten-2">{{ $t('Message.Admin.Index.UserGroupCount') }}</span>
                </v-card-text>
                <v-card-title>
                  <div class="number">
                    {{ data_count.user_group_count }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2" v-show="checkUserGroup('ability_admin_manage_user')">
              <v-card variant="tonal" rounded="lg" :color="MD_OBJECT_COLORS.user" :to="`${$G_UrlHeaderLang()}/admin/users`">
                <v-card-text>
                  <span class="label grey--text lighten-2">{{ $t('Message.Admin.Index.UserCount') }}</span>
                </v-card-text>
                <v-card-title>
                  <div class="number">
                    {{ data_count.user_count }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2" v-show="checkUserGroup('ability_admin_manage_report')">
              <v-card variant="tonal" rounded="lg" :color="MD_OBJECT_COLORS.report" :to="`${$G_UrlHeaderLang()}/admin/reports`">
                <v-card-text>
                  <span class="label grey--text lighten-2">{{ $t('Message.Admin.Index.ReportCount') }}</span>
                </v-card-text>
                <v-card-title>
                  <div class="number">
                    {{ data_count.report_count }}
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>

        </v-container>
      </v-card-text>
    </v-card>
      <NoAllowUse v-else/>
    <div v-if="$G_AppIsCanUse()" style="margin-top: 16px;">

      <!-- <ServerInfoDataStats />
      <br> -->
      <v-row v-if="new_data_stats!=null">
        <!-- <v-col cols="12" sm="12" md="6" v-for="m in model_type">
          <NewDataStats :model_type="m"></NewDataStats>
        </v-col> -->
        <!-- <v-col cols="12" sm="12" md="6">
        </v-col> -->

        <v-col cols="12" sm="12" md="6" >
          <ServerInfoDataStats />
        </v-col>

        <v-col cols="12" sm="12" md="6" v-show="checkUserGroup('ability_admin_manage_topic')">
          <NewDataStats :init_data="new_data_stats.topic" model_type="topic" :color="MD_OBJECT_COLORS.topic" @onclick="(model_type,color)=>OpenNDSDialog(model_type,color)"></NewDataStats>
        </v-col>
        <v-col cols="12" sm="12" md="6" v-show="checkUserGroup('ability_admin_manage_question')">
          <NewDataStats :init_data="new_data_stats.question" model_type="question" :color="MD_OBJECT_COLORS.question" @onclick="(model_type,color)=>OpenNDSDialog(model_type,color)"></NewDataStats>
        </v-col>
        <v-col cols="12" sm="12" md="6" v-show="checkUserGroup('ability_admin_manage_answer')">
          <NewDataStats :init_data="new_data_stats.answer" model_type="answer" :color="MD_OBJECT_COLORS.answer" @onclick="(model_type,color)=>OpenNDSDialog(model_type,color)"></NewDataStats>
        </v-col>
        <v-col cols="12" sm="12" md="6" v-show="checkUserGroup('ability_admin_manage_article')">
          <NewDataStats :init_data="new_data_stats.article" model_type="article" :color="MD_OBJECT_COLORS.article" @onclick="(model_type,color)=>OpenNDSDialog(model_type,color)"></NewDataStats>
        </v-col>
        <v-col cols="12" sm="12" md="6" v-show="checkUserGroup('ability_admin_manage_comment')">
          <NewDataStats :init_data="new_data_stats.comment" model_type="comment" :color="MD_OBJECT_COLORS.comment" @onclick="(model_type,color)=>OpenNDSDialog(model_type,color)"></NewDataStats>
        </v-col>
        <v-col cols="12" sm="12" md="6" v-show="checkUserGroup('ability_admin_manage_reply')">
          <NewDataStats :init_data="new_data_stats.reply" model_type="reply" :color="MD_OBJECT_COLORS.reply" @onclick="(model_type,color)=>OpenNDSDialog(model_type,color)"></NewDataStats>
        </v-col>
        <v-col cols="12" sm="12" md="6" v-show="checkUserGroup('ability_admin_manage_user_group')">
          <NewDataStats :init_data="new_data_stats.user_group" model_type="user_group" :color="MD_OBJECT_COLORS.user_group" @onclick="(model_type,color)=>OpenNDSDialog(model_type,color)"></NewDataStats>
        </v-col>
        <v-col cols="12" sm="12" md="6" v-show="checkUserGroup('ability_admin_manage_user')">
          <NewDataStats :init_data="new_data_stats.user" model_type="user" :color="MD_OBJECT_COLORS.user" @onclick="(model_type,color)=>OpenNDSDialog(model_type,color)"></NewDataStats>
        </v-col>
        <v-col cols="12" sm="12" md="6" v-show="checkUserGroup('ability_admin_manage_report')">
          <NewDataStats :init_data="new_data_stats.report" model_type="report" :color="MD_OBJECT_COLORS.report" @onclick="(model_type,color)=>OpenNDSDialog(model_type,color)"></NewDataStats>
        </v-col>
      </v-row>
    </div>
    <Loading :show_empty_icon="false" :need_margin_bottom="true" :show_text="false" />
    <NewDataStatsDialog :model="nds_dialog" :type="nds_dialog_type" :color="nds_dialog_color" @model="nds_dialog=false"></NewDataStatsDialog>
  </v-container>
</template>
<script>
import NewDataStats from '@/components/new-data-stats/index.vue'
import ServerInfoDataStats from '@/components/server-info-data-stats/index.vue'
import Loading from '@/components/loading/index.vue'
import NoAllowUse from '@/components/no-allow-use/index.vue'
import NewDataStatsDialog from '@/components/dialog/new-data-stats-dialog/index.vue'
import {
  GetDataCount,
  GetDataBetweenTimestampsAll,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { MD_OBJECT_COLORS } from '@/plugins/vuetify'
export default {
  name: 'admin-page-index',
  components: {
    NewDataStats,
    ServerInfoDataStats,
    Loading,
    NoAllowUse,
    NewDataStatsDialog,
  },
  data: () => ({
    mainStore: useMainStore(),
    userStore: useUserStore(),
    MD_OBJECT_COLORS: MD_OBJECT_COLORS,
    loading: false,
    nds_dialog: false,
    nds_dialog_type: '',
    nds_dialog_color: '',
    data_count: {
      user_count: 0,
      user_group_count: 0,
      report_count: 0,
      topic_count: 0,
      question_count: 0,
      answer_count: 0,
      article_count: 0,
      comment_count: 0,
      reply_count: 0,
    },
    model_type: [
      'user',
      'user_group',
      'report',
      'topic',
      'question',
      'answer',
      'article',
      'comment',
      'reply',
    ],
    new_data_stats: null,
  }),
  methods: {
    OpenNDSDialog(model_type,color) {
      this.nds_dialog = true
      this.nds_dialog_type = model_type
      this.nds_dialog_color = color
    },
    async GetDataCount() {
      this.loading = true
      const user_token = this.$G_GetUserToken()
      const res = await GetDataCount({
        user_token: user_token,
      })
      if (res.data.is_get == true) {
        this.data_count = res.data.data
        this.loading = false
      }else{
        this.loading = false
      }
    },
    //权限组鉴定
    checkUserGroup(userGroup) {
      const user = this.userStore.getUser
      // console.log(user)
      if(user == null){
        return false
      }
      return user.user_group[userGroup]
    },
    async GetDataBetweenTimestampsAll() {
      const user_token = this.$G_GetUserToken()
      const res = await GetDataBetweenTimestampsAll({
        user_token: user_token,
        time_type: 'last_7_days',//分别有 last_7_days, this_month, last_month, last_30_days, this_year, last_year, last_1_year
      })
      if (res.data.is_get == true) {
        this.new_data_stats = res.data.data
        this.$forceUpdate()
        // console.log(this.new_data_stats)
      }else{
        this.loading = false
      }
    },
  },
  mounted() {
    this.GetDataCount()
    this.GetDataBetweenTimestampsAll()
  },
  watch: {
    'userStore.isLogin'(val) {
      if (val && this.userStore.getUser?.user_group?.ability_admin_login) {
        this.GetDataCount()
        this.GetDataBetweenTimestampsAll()
      }
    },
  },
}
</script>
