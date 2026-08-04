<template>

  <v-list lines="three">
    <!-- 6
    <v-btn @click="GetComments">刷新</v-btn> -->
    <!-- <template > -->
    <CommentItemV1 v-for="(item, index) in data" :classes="item_classes" :comment="item"
      @update_comment_reply_count="(count) => { data[index].reply_count = count }" :key="index" />
    <!-- </template> -->

    <Loading :empty="data == null" :loading="is_loading" :pagination="pagination" @autoload="GetComments" :need_margin_bottom="false" 
        :empty_text="$t('Message.Components.Empty.NoCommentsYet')"/>
  </v-list>

</template>
<script>
import CommentItemV1 from './components/item/index.vue'
import Loading from '@/components/loading/index.vue'
import {
  GetComments,
  Get_G_ARTICLE_COMMENTS,
} from '@/api/global.js'
import { useUpdateStore } from '@/stores/update'

export default {
  name: 'comments',
  props: {
    show_new_comment: {
      type: Boolean,
      default: true,
    },
    external_loading: {
      type: Boolean,
      default: false,
    },
    need_glass_container: {
      type: Boolean,
      default: true,
    },
    need_rounded: {
      type: Boolean,
      default: true,
    },
    need_outlined: {
      type: Boolean,
      default: true,
    },
    new_comment_reply_need_glass_container: {
      type: Boolean,
      default: true,
    },
    new_comment_reply_rounded_t_or_b: {
      type: String,
      default: 't',
    },
    item_classes: {
      type: String,
      default: ''
    },
    commentable_type: {
      type: String,
      default: 'question',
    },
    commentable_id: {
      type: Number,
      default: 0,
    },
    order: {
      type: String,
      default: '-update_time',
    },
    card_list_elevation: {
      type: String,
      default: '0',
    },
    dialog_mode: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CommentItemV1,
    Loading,
  },
  computed: {
    ReturnUpdateGetCommentUpdate() {
      return this.updateStore.getCommentUpdate
    },
    // ReturnUpdateGetCommentOrderUpdate(){
    //   return this.u66pdate666Store.getCommentOrderUpdate()
    // }
  },
  data() {
    return {
      updateStore: useUpdateStore(),
      is_loading: false,
      data: null,
      pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
    }
  },
  methods: {
    async GetComments() {
      const ARTICLE_COMMENTS = Get_G_ARTICLE_COMMENTS()
      // console.log('ARTICLE_COMMENTS', ARTICLE_COMMENTS)
      if (ARTICLE_COMMENTS !== null) {
        this.data = ARTICLE_COMMENTS.data
        this.pagination = ARTICLE_COMMENTS.pagination
        return
      }

      if (this.is_loading || this.commentable_id == 0) {
        return
      }
      this.is_loading = true
      const response = await GetComments({
        commentable_id: this.commentable_id,
        commentable_type: this.commentable_type,
        order: this.order,
        page: this.pagination.next,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('comment_id', this.data, response.data.data)
        this.pagination = response.data.pagination
        this.is_loading = false
      } else {
        this.is_loading = false
      }
    },
    return_update_comments(comment) {
      this.ResetData()
      this.GetComments()
      // if (this.data == null) {
      //   this.GetComments()
      // } else {
      //   this.data.unshift(comment)
      // }
      this.$emit('return_update_comments', comment)
      this.$forceUpdate()
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
  },
  created() {
    // this.GetComments()
    if (window.G_ARTICLE_COMMENTS != null) {
      this.data = window.G_ARTICLE_COMMENTS.data
      this.pagination = window.G_ARTICLE_COMMENTS.pagination
    } else {
      this.GetComments()
    }
  },
  watch: {
    order(val) {
      if (val != '') {
        this.ResetData()
        this.GetComments()
      }
    },
    commentable_id(val) {
      if (val != 0) {
        this.ResetData()
        this.GetComments()
      }
    },
    commentable_type(val) {
      if (val != '') {
        this.ResetData()
        this.GetComments()
      }
    },
    ReturnUpdateGetCommentUpdate(val) {

      this.ResetData()
      this.GetComments()
      //从data中查找是否有对应的comment_id，如果有则更新
      // if(this.data!=null){
      //   for(var i=0;i<this.data.length;i++){
      //     if(this.data[i].comment_id == val.comment_id){
      //       this.data[i] = val
      //       break
      //     }
      //   }
      //   this.$forceUpdate()
      // }else{
      //   this.ResetData()
      //   this.GetComments()
      // }
    },
    // ReturnUpdateGetCommentOrderUpdate(val){
    //   this.ResetData()
    //   this.
    //   this.GetComments()
    // }
  }
}
</script>
<style lang="less">
//@import './index.less';
// </style>
