<template>
  <v-card class="mt-8" :rounded="$G_Rounded()" :elevation="mainStore.getMobile ? '0' : '1'">
    <ListHeaderV1 
    :title="list_header_title" 
    type="topics" 
    @menu_order_item_select="
      (name, _order) => {
        order = _order
      }
    " @OnInit="(val) => { order = val }" />
    <!-- <v-divider></v-divider> -->
<!--      
    :style="{
      paddingLeft: !mainStore.getDesktop ? '1rem' : '4rem',
      paddingRight: !mainStore.getDesktop ? '1rem' : '4rem',
    }" 
    -->

    
    <!-- style="max-height: calc(100vh - 400px); overflow-y: auto;" -->
    <v-card-text class="py-2" 
    >
      <CommentsV1 
      :order="order"
      :show_new_comment="false"
      :external_loading="external_loading"
      :need_glass_container="true"
      item_classes="layout-colourless"
      :commentable_id="commentable_id"
      :commentable_type="commentable_type"
      @return_update_comments="(comment) => { $emit('return_update_comments', comment) }" 
      />
      <!-- <NewCommentOrReply />
      <Empty /> -->

    </v-card-text>

    <!-- class="bg-surface-light" -->
    <v-card-actions >
      
      <!-- <NewCommentOrReplyV1 
      field_variant="solo-filled"
          :new_comment_reply_elevation="'10'"
          :label="$t(
            'Message.Components.Comments.NewCommentOrReply.WriteYourComment'
          )"
          @return_update_comments="
            (comment) => { 
              updateStore.setCommentUpdate(comment)
          }"
          :commentable_id="commentable_id"
          :commentable_type="commentable_type"
          :show="true"
          card_list_elevation="10"
        /> -->
    </v-card-actions>
  </v-card>
</template>
<script>
import CommentsV1 from './index.vue'
// import NewCommentOrReplyV1 from './components/new-comment/index.vue'
import ListHeaderV1 from '@/components/list-header/index-v1.vue'
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
    CommentsV1,
    ListHeaderV1,
    // NewCommentOrReplyV1,
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
//@import './page.less';

</style>
