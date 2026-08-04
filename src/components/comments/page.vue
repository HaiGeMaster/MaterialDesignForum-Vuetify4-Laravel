<template>

  <div class="mc-comments-page" style="margin-top: 20px;" elevation="0" variant="outlined">
    
    <ListHeader
      :title="list_header_title"
      type="topics"
      @menu_order_item_select="
      (name,_order)=>{
        order=_order
      }
      "
      @OnInit="(val)=>{order=val}"
    />

    <Comments
      :order="order"
      :show_new_comment="false"
      :external_loading="external_loading"
      :need_glass_container="true"
      item_classes="layout-colourless"
      :commentable_id="commentable_id"
      :commentable_type="commentable_type"
      @return_update_comments="(comment) => { $emit('return_update_comments', comment) }" 
      />
    <div class="new-comment-fixed" :style="{
        'transition': 'transform 0.3s ease, opacity 0.3s ease',
      'margin-bottom': mainStore.getMobile ? '56px' : '0px',
  'margin-left': mainStore.getDrawer ? '256px' : '0px',
      
        'transform': mainStore.getScrollMode == 'down'  ? 'translateY(200%)' : 'none',
        // 'opacity': mainStore.getScrollMode == 'down'  ? '0' : '',
    }
      ">
      <!-- 'margin-bottom': getMobile ? '56px' : '0px',
      'margin-left': getDrawer ? '256px' : '0px', -->


      <!-- <div style="max-width: 846px;"> -->
      <div class="new-comment-container">
        <NewCommentOrReply
          :new_comment_reply_elevation="'10'"
          :label="$t(
            'Message.Components.Comments.NewCommentOrReply.WriteYourComment'
          )"
          @return_update_comments="
            (comment) => { 
              $emit('return_update_comments', comment); 
          }"
          :commentable_id="commentable_id"
          :commentable_type="commentable_type"
          :show="true"
          card_list_elevation="10"
        />
        
          <!-- @on_focus="$store.dispatch('NewCommentReply/Set_Select', true)"
          @on_blur="$store.dispatch('NewCommentReply/Set_Select', false)" -->
      </div>
    </div>
  </div>
</template>
<script>
import Comments from './index.vue'
import NewCommentOrReply from './components/new-comment/index.vue'
import ListHeader from '@/components/list-header/index.vue'
import { useMainStore } from '@/stores/main'
import { useUpdateStore } from '@/stores/update'
export default {
  props: {
    external_loading: {
      type: Boolean,
      default: false,
    },
    commentable_type: {
      type: String,
      default: 'question',
    },
    commentable_id: {
      type: Number,
      default: 0,
    },
    list_header_title: {
      type: String,
      default: '',
    },
  },
  components: {
    Comments,
    ListHeader,
    NewCommentOrReply,
  },
  data: () => ({
    mainStore: useMainStore(),
    updateStore: useUpdateStore(),
    show_self_new_comment: false,
    order: '-update_time',
  }),
  watch: {
    '$route.path': {
      handler(newVal, oldVal) {
        // this.$store.dispatch('Set_ScrollMode', 'up')
      },
      immediate: true
    }
  }
}
</script>
<style lang="less">
@import './page.less';
</style>
