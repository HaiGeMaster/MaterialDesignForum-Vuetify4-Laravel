<template>
  <div class="mc-answers-page" v-if="question != null">
    <ListHeader v-if="question != null && answer == null"
      :title="$t('Message.Client.Question.NAnswers', { value: pagination.total })" type="topics"
      @menu_order_item_select="menu_order_item_select" @OnInit="(val) => { order = val }" />

    <v-btn rounded="lg" v-show="answer != null && question.answer_count != 1" block style="margin-top: 16px;"
      color="primary" depressed :href="`${$G_UrlHeaderLang()}/questions/${question.question_id}`">
      {{
        $t('Message.Client.Question.LookAllNAnswers', { value: question.answer_count })
      }}
    </v-btn>

    <v-card rounded="lg" color="surface-variant" :class="[
      'answers',
    ]" :rounded="$G_Rounded()" variant="outlined">
      <!-- :style="{
      'margin-top': $vuetify.breakpoint.name != 'xs' ? '20px' : '10px',
    }" -->

      <template v-for="(item, index) in data">
        <v-divider v-if="index != 0"></v-divider>
        <AnswersItem :answer="item" :question="question" />
      </template>
      <AnswersItem v-if="answer != null" :answer="answer" :question="question" />
      <!-- <Empty :show="data == null && answer==null"/> -->
      <Loading :empty="data == null" :loading="is_loading" :pagination="pagination" :need_margin_bottom="false"
        @autoload="GetAnswers" 
        />
    </v-card>

    <!-- v-if="data!=null" -->
  </div>
</template>
<script>
import AnswersItem from '@/components/answers/components/item/index.vue'
import ListHeader from '@/components/list-header/index.vue'
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
    ListHeader,
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