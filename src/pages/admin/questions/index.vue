<template>
  <v-container fluid v-if="userStore.getUser.user_group.ability_admin_manage_question">
    <!-- <v-card v-if="$G_AppIsCanUse()"  rounded="lg" :outlined="$vuetify.theme.dark||$store.getters.GetMobile"> -->
      <DataTable v-if="$G_AppIsCanUse()&&userStore.getIsLogin"  :headers="headers" type="questions" @edit_item="OnEdit" />
    <!-- </v-card> -->
      <NoAllowUse v-else/>
    <Loading :show_empty_icon="false" :need_margin_bottom="true" :show_text="false"/>
  </v-container>
</template>
<script>
import DataTable from '@/components/data-table/index.vue'
import Loading from '@/components/loading/index.vue'
import NoAllowUse from '@/components/no-allow-use/index.vue'
import {
  IsTauri,
  IsElectron,
  IsMobileApp,
  GetBaseUrl,
} from '@/api/global.js'
import { useUserStore } from '@/stores/user'
export default {
  name: 'admin-page-questions',
  components: {
    DataTable,
    Loading,
    NoAllowUse,
  },
  data: () => ({
    userStore: useUserStore(),
    dialog: false,
  }),
  computed: {
    headers() {
      return [
        {
          title: this.$t('Message.Admin.Questions.QuestionID'),
          align: 'start',
          key: 'question_id',
        },
        // {
        //   title: this.$t('Message.Admin.Questions.UserID'),
        //   key: 'user_id',
        // },
        {
          title: this.$t('Message.Admin.Questions.User'),
          key: 'user',
        },
        {
          title: this.$t('Message.Admin.Questions.Title'),
          key: 'title',
        },
        // {
        //   title: this.$t('Message.Admin.Questions.ContentMarkdown'),
        //   key: 'content_markdown',
        // },
        // {
        //   title: this.$t('Message.Admin.Questions.ContentRendered'),
        //   key: 'content_rendered',
        // },
        {
          title: this.$t('Message.Admin.Questions.CommentCount'),
          key: 'comment_count',
        },
        {
          title: this.$t('Message.Admin.Questions.AnswerCount'),
          key: 'answer_count',
        },
        {
          title: this.$t('Message.Admin.Questions.FollowerCount'),
          key: 'follower_count',
        },
        {
          title: this.$t('Message.Admin.Questions.VoteCount'),
          key: 'vote_count',
        },
        {
          title: this.$t('Message.Admin.Questions.VoteUpCount'),
          key: 'vote_up_count',
        },
        {
          title: this.$t('Message.Admin.Questions.VoteDownCount'),
          key: 'vote_down_count',
        },
        {
          title: this.$t('Message.Admin.Questions.CreateTime'),
          key: 'create_time',
        },
        {
          title: this.$t('Message.Admin.Questions.UpdateTime'),
          key: 'update_time',
        },
        // {
        //   title: this.$t('Message.Admin.Questions.DeleteTime'),
        //   key: 'delete_time',
        // },
      ]
    },
  },
  methods: {
    OnEdit(item) {

      if(IsTauri()||IsMobileApp()){//适配
        //把 item.content_rendered 里面的GetBaseUrl() + '/public/static/'替换为 /public/static/
          const regex = '/public/static/';
          const newBaseUrl = GetBaseUrl() + '/public/static/';
          // 执行替换
          item.content_rendered = item.content_rendered.replaceAll(regex, newBaseUrl);
        // console.log('item.content_rendered', item.content_rendered)
      }

      this.$store.dispatch('FabDialog/Set_EditorFabDialog', {
        md_title:item.title,
        md_topics:item.topics,
        md_content:item.content_rendered,
        edit_mode_id:item.question_id,
        title:this.$t('Message.Components.Editor.EditQuestion'),
        icon:'mdi-forum',
        has_title:true,
        has_topic:true,
        submit_text:this.$t('Message.Components.Editor.Release'),
        edit_type:'question',
        edit_mode:'edit',
        model:'maximize',
      })

      // this.$G_CallEditorEdit(
      //   'maximize',
      //   'Message.Components.Editor.EditQuestion',
      //   true,
      //   true,
      //   'Message.Components.Editor.EditQuestion',
      //   'question',
      //   'mdi-forum',
      //   item.question_id,
      //   item.title,
      //   item.topics,
      //   item.content_rendered
      // )
    },
  },
}
</script>