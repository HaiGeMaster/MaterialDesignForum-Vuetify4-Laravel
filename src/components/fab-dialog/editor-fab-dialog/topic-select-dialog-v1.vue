<template>
  <v-autocomplete color="primary" variant="underlined" v-model="select" :disabled="isUpdating" :items="data"
    item-title="name" item-value="topic_id" :placeholder="$t('Message.Components.Editor.ClickToAddATopic')" chips
    closable-chips multiple single-line autocomplete="off" :rules="[
              v => !!v || $t('Message.Components.Account.CannotBeEmpty'),
            ]">
            
              <!-- v => (v || '').length <= 40 || $t('Message.Components.Account.MaxLengthExceeded') -->
    <!-- density="comfortable" hide-details
        single-line -->
    <template v-slot:chip="{ props, item }">
      <!-- 超过 maxChips 不显示 -->
      <v-chip v-if="select.indexOf(item.topic_id) < maxChips" v-bind="props"
        :prepend-avatar="$G_ImgHandle(item.cover.small)" :text="item.name" />

      <!-- 最后一个显示为 +N -->
      <v-chip v-else-if="select.indexOf(item.topic_id) === maxChips" v-bind="props"
        :text="`+${select.length - maxChips}`" />
    </template>

    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :prepend-avatar="$G_ImgHandle(item.cover.small)" :subtitle="item.description"
        :title="item.name"></v-list-item>


    </template>
  </v-autocomplete>
</template>

<script>
import Loading from '@/components/loading/index.vue'
import {
  GetTopics
} from '@/api/global.js'

import { useDialogStore } from '@/stores/dialog.js'
import { useMainStore } from '@/stores/main';
export default {
  props: {
    topics: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      maxChips: 3,
      autoUpdate: true,
      select: [],//选中的 topic_id
      isUpdating: false,
      name: 'Midnight Crew',
      people: [
        // TODO: https://github.com/vuetifyjs/vuetify/issues/15721
        // { header: 'Group 1' },
        // { name: 'Sandra Adams', description: 'Group 1', cover: {small} },
        // { divider: true },
      ],
      title: 'The summer breeze',
      timeout: null,

      searchFieldShow: false,
      // model: false,
      dialogStore: useDialogStore(),
      mainStore: useMainStore(),
      // selector_indexs: [],
      // selector_topics: [],
      is_loading: false,
      pre_selected_topics: [],//预选中的 topics
      search_keywords: '',
      search_text: '',
      data: [],
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

  watch: {
    topics(newVal, oldVal) {
      // console.log(newVal, oldVal)
      if (newVal.length > 0) {
        this.pre_selected_topics = newVal //.map(item => item.topic_id)
        this.select = this.pre_selected_topics
        // console.log(this.pre_selected_topics)
        this.GetTopics()
      }
    },
    isUpdating(val) {
      clearTimeout(this.timeout)

      if (val) {
        this.timeout = setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
    // recommended to use debounce here
    search_text(val) {
      if (!val) {
        setTimeout(() => this.items = [], 300)
      } else {
        // val !== this.select && querySelections(val)
        this.search_keywords = val
        val !== this.select && this.GetTopics()
      }
    },
    select(val) {
      // console.log(val)
      this.$emit('topics', val)
    }
  },
  methods: {
    remove(item) {
      const index = this.select.indexOf(item.name)
      if (index >= 0) this.select.splice(index, 1)
    },
    async GetTopics() {
      try {
        this.is_loading = true
        const response = await GetTopics({
          search_keywords: this.search_keywords,
          order: '-update_time',
          following: false,
          page: this.pagination.next,
          user_token: this.$G_GetUserToken(),
        })
        if (response.data.is_get == true) {
          // console.table(response.data.data)
          this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('topic_id', this.data, response.data.data)
          this.pagination = response.data.pagination

          // 初始化选中的 topic_id
          // this.select = this.pre_selected_topics.map(item => item.topic_id)
          this.select = this.pre_selected_topics



          // if (this.pre_selected_topics.length > 0) {
          //   for (var i = 0; i < this.pre_selected_topics.length; i++) {
          //     for (var j = 0; j < this.data.length; j++) {
          //       if (this.pre_selected_topics[i].topic_id == this.data[j].topic_id) {
          //         // console.log('j:' + j)
          //         this.data[j].isSelected = true
          //         // this.selector_indexs.push(j)
          //         this.selector_indexs.push(this.data[j].topic_id)
          //         break
          //       }
          //     }
          //   }
          //   this.$forceUpdate()
          //   console.table(this.selector_indexs)
          // }

        }

        this.is_loading = false
      } catch (error) {
        this.is_loading = false
      }
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
      // this.selector_indexs = []
      // this.selector_topics = []
    },
  },
  created() {
    this.GetTopics()
  }
}
</script>
