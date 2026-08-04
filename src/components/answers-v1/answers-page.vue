<template>
  <v-card class="mt-8" :rounded="$G_Rounded()" :elevation="mainStore.getMobile ? '0' : '1'">

    <ListHeaderV1 :title="answer != null ?
        $t('Message.Client.Question.LookSpecifyAnswer')
        : $t('Message.Client.Question.NAnswers', { value: pagination.total })"
        :show_menu="answer != null ?false : true"

        type="topics"
      @menu_order_item_select="menu_order_item_select" @OnInit="(val) => { order = val }" />
    <!-- <v-divider></v-divider> -->
    <!--
    :style="{
      paddingLeft: !mainStore.getDesktop ? '1rem' : '4rem',
      paddingRight: !mainStore.getDesktop ? '1rem' : '4rem',
    }"
    -->

    <!-- style="max-height: calc(100vh - 400px); overflow-y: auto;" -->
    <v-card-text class="py-2" >


      <!-- <v-list > -->

      <AnswersItem v-for="(item, index) in data" :key="index" :answer="item" :question="question" />


      <AnswersItem v-if="answer != null" :answer="answer" :question="question" />


      <!-- </v-list> -->
      <Loading v-show="answer == null" :empty="data == null" :loading="is_loading" :pagination="pagination"
        :need_margin_bottom="false" @autoload="GetAnswers"
        :empty_title="$t('Message.Components.Empty.Answer')"
        :empty_text="$t('Message.Components.Empty.NoAnswersYet')"
        />
    </v-card-text>

    <v-card-actions>
      <v-btn rounded="lg" v-show="answer != null && question.answer_count != 1" block color="primary" variant="flat"
        :href="`${$G_UrlHeaderLang()}/questions/${question.question_id}`">
        {{
          $t('Message.Client.Question.LookAllNAnswers', { value: question.answer_count })
        }}
      </v-btn>
    </v-card-actions>

  </v-card>
</template>
<script>
import AnswersItem from './components/item/index.vue'
import ListHeaderV1 from '@/components/list-header/index-v1.vue'
import Loading from '@/components/loading/index.vue'
import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/main'
import { useUpdateStore } from '@/stores/update'
import {
  GetAnswers,
  GetAnswer,
  Get_G_QUESTION_ANSWERS,
} from '@/api/global.js'
export default {
  name: 'answers-page',
  components: {
    AnswersItem,
    ListHeaderV1,
    Loading,
    // Empty,
  },
  props: {
    question: {
      type: Object,
      default: null,
    }
  },
  data: () => ({
    userStore: useUserStore(),
    mainStore: useMainStore(),
    updateStore: useUpdateStore(),
    is_loading: false,
    is_empty: false,
    data: null,
    pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
    order: '-update_time',
    answer: null,
  }),
  methods: {
    menu_order_item_select(item, order) {
      this.order = order
      this.ResetData()
      this.GetAnswers()
    },
    ResetData() {
      this.data = null
      this.pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
    },
    async GetAnswers() {
      const QUESTION_ANSWERS = Get_G_QUESTION_ANSWERS()
      // console.log('QUESTION_ANSWERS', QUESTION_ANSWERS)
      if (QUESTION_ANSWERS !== null) {
        this.data = QUESTION_ANSWERS.data
        this.pagination = QUESTION_ANSWERS.pagination
        return
      }

      if (this.$route.params.answer_id != null) {
        return
      }
      if (this.is_loading) {
        return
      }
      this.is_loading = true
      const response = await GetAnswers({
        question_id: this.question.question_id,
        order: this.order,
        page: this.pagination.next,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('answer_id', this.data, response.data.data)
        this.pagination = response.data.pagination
      }
      this.is_loading = false
    },
    async GetAnswer() {
      if (this.is_loading) {
        return
      }
      this.is_loading = true
      const response = await GetAnswer({
        answer_id: this.$route.params.answer_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        this.answer = response.data.answer
      }
      this.is_loading = false
      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })
    },
    StartEvent() {
      if (this.$route.params.answer_id != null) {
        this.GetAnswer()
      } else {
        this.ResetData()
        this.GetAnswers()
      }
    }
  },
  computed: {
    ReturnUpdateGetAnswerUpdate() {
      return this.updateStore.getAnswerUpdate
    }
  },
  created() {
    this.StartEvent()
  },
  watch: {
    ReturnUpdateGetAnswerUpdate(val) {
      // console.log('ReturnUpdateGetAnswerUpdate', val)
      if (this.$route.params.answer_id != null) {
        this.$router.push(`${$G_UrlHeaderLang()}/questions/${this.question.question_id}`)
        return
      }
      this.ResetData()
      this.GetAnswers()

      //从data中寻找是否有对应的answer_id，如果有则更新，没有则添加
      // if (this.data != null) {
      //   for (var i = 0; i < this.data.length; i++) {
      //     if (this.data[i].answer_id == val.answer_id) {
      //       this.data[i] = val
      //       this.$forceUpdate()
      //       return
      //     }
      //   }
      //   // this.data.unshift(val)
      // }else{

      //   this.ResetData()
      //   this.GetAnswers()
      // }
    },
    question(val) {
      this.StartEvent()
    }
  }
}
</script>
