<template>
  <div id="loading" :style="{
    'margin-bottom': mainStore.getScrollValue != 0 && need_margin_bottom
      ?
      (
        mainStore.getMobile && need_margin_bottom
          ?
          '176px'
          :
          (need_margin_bottom) ? '120px' : '0px'
      )
      :
      (
        mainStore.getMobile && need_margin_bottom
          ?
          '176px'
          :
          (need_margin_bottom) ? '0px' : '0px'
      ),
  }
    ">
    <Empty v-if="show_empty_icon" :show="!loading && empty && pagination.total == 0" :headline="empty_headline"
      :title="empty_title" :text="empty_text" :image="empty_image" :btn_text="empty_btn_text"
      @btn_click="$emit('empty_btn_click')"
      >
      <!-- <template v-slot:empty>
        <slot name="empty">

        </slot>
      </template> -->
    </Empty>

    <!-- :headline="empty_headline"
      :title="empty_title" :text="empty_text" :image="empty_image" -->

    <Loaded :show="!loading" />
    <LoadingRing ref="loading_ring" :show="pagination.next != null && (loading || !empty)" />

    <!-- v-if="(pagination.next!=null&&pagination.next!=0)"
    :show="loading" /> -->


    <!-- :show="pagination.next!=null&&pagination.next!=0&&loading&&!empty" /> -->
  </div>
</template>
<script>
// import debounce from 'lodash/debounce';
import Empty from '@/components/empty/index.vue';
import Loaded from '@/components/loaded/index.vue';
import LoadingRing from '@/components/loading-ring/index.vue';

import { useMainStore } from '@/stores/main';
export default {
  name: 'loading',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    show_text: {
      type: Boolean,
      default: true,
    },
    show_ring: {
      type: Boolean,
      default: true,
    },
    show_empty_icon: {
      type: Boolean,
      default: true,
    },
    // data: {
    //   type: Array,
    //   default: null,
    // },
    empty: {
      type: Boolean,
      default: true,
    },
    // empty_type: {
    //   type: String,
    //   default: 'default',
    // },
    empty_btn_text: {
      type: String,
      default: '',
    },
    empty_headline: {
      required: false,
      type: String,
      default: '',
    },
    empty_title: {
      type: String,
      default: '',
    },
    empty_text: {
      type: String,
      default: '',
    },
    empty_image: {
      type: String,
      default: '',
    },
    pagination: {
      type: Object,
      default: () => ({
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }),
    },
    need_margin_bottom: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    // empty_title() {
    //   switch (this.empty_type) {
    //     case 'default':
    //       return '暂无1数据'
    //     case 'loading':
    //       return '加载1中'
    //     default:
    //       return ''
    //   }
    // },
    // empty_text() {
    //   return this.empty_type == 'default' ? '暂无1数据' : '1加载中'
    // },
  },
  data() {
    return {
      mainStore: useMainStore(),
      // empty_headline: '',
      // empty_title: '',
      // empty_text: '',
      // empty_image: '',
    }
  },
  components: {
    Empty,
    Loaded,
    LoadingRing,
  },
  mounted() {
    const options = {
      root: null,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(this.handleIntersection, options);
    // observer.observe(this.$el);
    observer.observe(this.$refs.loading_ring.$el);
  },
  created() {
    this.$emit('autoload')
  },
  methods: {
    async handleIntersection(entries) {
      // console.log('handleIntersection')
      // console.log(this.pagination)
      this.$forceUpdate()
      const _this = this
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          // console.log('handleIntersection')
          // this.pagination == null ||
          if (_this.pagination.next == null || _this.loading
          ) {
            return
          }
          // console.log('autoload')
          _this.$emit('autoload')
        }
      });
    },
  },
  watch: {
    loading(val) {
      // console.log('loading-loading', val)
    },
    pagination(val) {
      // console.log('loading-pagination', val)
    },
  }
}
</script>