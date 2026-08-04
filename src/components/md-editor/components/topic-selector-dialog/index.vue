<template>

  <v-dialog v-model="model" persistent :fullscreen="mainStore.getMobile" max-width="530px" scrollable>
    <v-card rounded="lg">
      <v-toolbar :title="!searchFieldShow ? $t('Message.Components.TopicSelectDialog.TopicSelect') : ''">


        <template v-slot:prepend>
          <v-fade-transition hide-on-leave>
            <v-btn v-show="!searchFieldShow" icon @click="model = !model">
              <v-icon>
                mdi-close
              </v-icon>
              <v-tooltip activator="parent" location="right">{{ $t('Message.Components.DialogClass.Close')
                }}</v-tooltip>
            </v-btn>
          </v-fade-transition>


        </template>





        <template v-slot:append>




          <v-fade-transition hide-on-leave>
            <v-btn v-show="!searchFieldShow" icon variant="text" @click="OnTopicSelectorDialogClose()">
              <v-icon>
                mdi-check
              </v-icon>
              <v-tooltip activator="parent" location="left">确认</v-tooltip>
            </v-btn>
          </v-fade-transition>

        </template>

      </v-toolbar>
      <v-card-text id="topic-dialog-list" :style="{
        'height': !mainStore.getMobile ? '652px' : 'auto',
        'padding': '0',
      }">

        <v-text-field color="primary"    style="margin-left: 24px;margin-right: 24px;margin-top: 12px;" variant="outlined"
          :label="$t('Message.Components.Search.Search')" hide-details single-line append-inner-icon="mdi-magnify"
          v-model="search_text" @keydown="">
        </v-text-field>

        <v-list rounded="lg" v-if="selector_indexs.length > 0 || data != null" v-model:selected="selector_indexs"
          select-strategy="leaf">
          <v-list-item v-for="topic in data" :key="topic.topic_id" active-class="primary" lines="two"
            :value="topic.topic_id">
            <v-list-item-title>{{ topic.name }}</v-list-item-title>

            <v-list-item-subtitle>{{ topic.description }}</v-list-item-subtitle>


            <template v-slot:prepend>

              <v-avatar color="grey-lighten-1">
                <v-img :src="$G_ImgHandle(topic.cover.small)">

                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                  </template>

                </v-img>
              </v-avatar>
            </template>

            <template v-slot:append="{ isSelected, select }">
              <v-list-item-action start>
                <v-checkbox-btn :model-value="isSelected" @update:model-value="select"></v-checkbox-btn>
              </v-list-item-action>
            </template>

          </v-list-item>
        </v-list>

        <Loading :empty="data == null" :loading="is_loading" :pagination="pagination" :need_margin_bottom="false"
          @autoload="GetTopics" />
      </v-card-text>

    </v-card>
  </v-dialog>
</template>
<script>
import Loading from '@/components/loading/index.vue'
import {
  GetTopics
} from '@/api/global.js'

import { useDialogStore } from '@/stores/dialog.js'
import { useMainStore } from '@/stores/main';
export default {
  name: 'topic-selector-dialog',
  props: {
    pre_selected_topics: {
      Array,
      default: () => []
    },
  },
  components: {
    Loading,
  },
  computed: {
    model: {
      get() {
        return this.dialogStore.getTopicSelectorDialog
      },
      set(val) {
        // console.log(val)
        this.dialogStore.setTopicSelectorDialog(val)
      }
    }
  },
  data: () => ({
    searchFieldShow: false,
    // model: false,
    dialogStore: useDialogStore(),
    mainStore: useMainStore(),
    selector_indexs: [],
    selector_topics: [],
    is_loading: false,
    search_keywords: '',
    search_text: '',
    data: null,
    pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
  }),
  methods: {
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
          console.table(response.data.data)
          this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('topic_id', this.data, response.data.data)
          this.pagination = response.data.pagination

          if (this.pre_selected_topics.length > 0) {
            for (var i = 0; i < this.pre_selected_topics.length; i++) {
              for (var j = 0; j < this.data.length; j++) {
                if (this.pre_selected_topics[i].topic_id == this.data[j].topic_id) {
                  // console.log('j:' + j)
                  this.data[j].isSelected = true
                  // this.selector_indexs.push(j)
                  this.selector_indexs.push(this.data[j].topic_id)
                  break
                }
              }
            }
            this.$forceUpdate()
            console.table(this.selector_indexs)
          }

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
      this.selector_indexs = []
      this.selector_topics = []
    },
    OnTopicSelectorDialogClose() {
      this.selector_topics = []
      // for (var i = 0; i < this.selector_indexs.length; i++) {
      //   this.selector_topics.push(this.data[this.selector_indexs[i]])
      // }


      // this.data.forEach(item => {
      //   if (this.selector_indexs.includes(item.topic_id)) {
      //     this.selector_topics.push(item)
      //   }
      // })

      for (var i = 0; i < this.data.length; i++) {
        if (this.selector_indexs.includes(this.data[i].topic_id)) {
          this.selector_topics.push(this.data[i])
        }
      }

      console.table(this.selector_topics)
      this.$emit('selector_topics', this.selector_topics)
      this.model = false
    },
  },
  created() {
  },
  watch: {
    search_text(val) {
      this.search_keywords = val
      this.ResetData()
      this.GetTopics()
    },
    selector_indexs(val) {
      this.selector_topics = []
      console.table(val)//此时val是topic_id数组，需要根据topic_id获取topic对象

      // this.data.forEach(item => {
      //   if (val.includes(item.topic_id)) {
      //     this.selector_topics.push(item)
      //   }
      // })

      if (this.data == null) {
        return
      }

      for (var i = 0; i < this.data.length; i++) {
        if (val.includes(this.data[i].topic_id)) {
          this.selector_topics.push(this.data[i])
        }
      }

      // for (var i = 0; i < val.length; i++) {
      //   // this.selector_topics.push(this.data[val[i]])
      //   //去重复复制
      //   if (!this.selector_topics.includes(this.data[val[i]])) {
      //     this.selector_topics.push(this.data[val[i]])//监听其值给出最终选定的话题数组
      //   }
      // }


    },
    // model(val) {
    //   this.model = val
    // },
    model(val) {
      if (!val) {
        // console.table(this.selector_topics)
        // this.$emit('model', val, this.selector_topics)
      } else {
        this.ResetData()
        this.GetTopics()
      }
    },
  },
}
</script>
