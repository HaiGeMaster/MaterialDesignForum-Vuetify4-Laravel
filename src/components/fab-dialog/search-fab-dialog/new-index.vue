<template>
  <TemplateFabDialog :model="model" @model="model = $event"
    :title="$t('Message.Components.Search.SearchTooltop') + `(${pagination.total})`" :appbar_extended="true" icon="mdi-magnify">
    <template v-slot:appbar_extension>
      <v-tabs v-model="tab" color="primary" show-arrows grow>
        <v-tab v-for="(item, i) in tab_items" :key="i" :value="i">
          <v-icon size="small" style="padding-right: 8px;">{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-tab>
      </v-tabs>
    </template>
    <template v-slot:content>
      <v-card-text>

        <v-text-field v-show="!mainStore.getDesktop" color="primary"
          :label="$t('Message.Components.Search.SearchTooltop')" variant="outlined" v-model="value"></v-text-field>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item>
            <v-list rounded="lg" lines="two" style="margin-bottom: 48px;">

              <v-list-item rounded="lg" v-if="topics != null" v-for="(item, i) in topics" :key="`topics_${i}`"
                :to="`${$G_UrlHeaderLang()}/topics/${item.topic_id}`">



                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="$G_ImgHandle(item.cover.middle)">

                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular indeterminate></v-progress-circular>
                        </div>
                      </template>

                    </v-img>
                  </v-avatar>



                </template>

                <v-list-item-title>
                  {{
                    item.name
                  }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    item.description
                  }}
                </v-list-item-subtitle>

              </v-list-item>

              <Empty :show="!topics" />
            </v-list>
          </v-tabs-window-item>
          <v-tabs-window-item>
            <v-list rounded="lg" lines="two" style="margin-bottom: 48px;">

              <v-list-item rounded="lg" v-if="questions != null" v-for="(item, i) in questions" :key="`questions_${i}`"
                :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="$G_ImgHandle(item.user.avatar.small)">

                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular indeterminate></v-progress-circular>
                        </div>
                      </template>

                    </v-img>
                  </v-avatar>
                </template>

                <v-list-item-title>
                  {{
                    item.title
                  }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    item.content_markdown
                  }}
                </v-list-item-subtitle>
              </v-list-item>

              <Empty :show="!questions" />
            </v-list>
          </v-tabs-window-item>
          <v-tabs-window-item>
            <v-list rounded="lg" lines="two" style="margin-bottom: 48px;">

              <v-list-item rounded="lg" v-if="articles != null" v-for="(item, i) in articles" :key="`articles_${i}`"
                :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`
                  ">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="$G_ImgHandle(item.user.avatar.small)">

                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular indeterminate></v-progress-circular>
                        </div>
                      </template>

                    </v-img>
                  </v-avatar>
                </template>

                <v-list-item-title>
                  {{
                    item.title
                  }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    item.content_markdown
                  }}
                </v-list-item-subtitle>
              </v-list-item>

              <Empty :show="!articles" />
            </v-list>
          </v-tabs-window-item>
          <v-tabs-window-item>
            <v-list rounded="lg" lines="two" style="margin-bottom: 48px;">

              <v-list-item rounded="lg" v-if="answers != null" v-for="(item, i) in answers" :key="`answers_${i}`" :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.answer_id}`
                ">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="$G_ImgHandle(item.user.avatar.small)">

                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular indeterminate></v-progress-circular>
                        </div>
                      </template>

                    </v-img>
                  </v-avatar>
                </template>

                <v-list-item-title>
                  {{
                    item.content_markdown
                  }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    item.user.username
                  }}
                </v-list-item-subtitle>
              </v-list-item>

              <Empty :show="!answers" />
            </v-list>
          </v-tabs-window-item>
          <v-tabs-window-item>
            <v-list rounded="lg" lines="two" style="margin-bottom: 48px;">

              <v-list-item rounded="lg" v-if="comments != null" v-for="(item, i) in comments" :key="`comments_${i}`"
                :to="item.commentable_type == 'question' ?
                  `${$G_UrlHeaderLang()}/questions/${item.commentable_id}` :
                  item.commentable_type == 'answer' ?
                    `${$G_UrlHeaderLang()}/questions/${item.commentable_id}/answers/${item.commentable_id}` :
                    item.commentable_type == 'article' ?
                      `${$G_UrlHeaderLang()}/articles/${item.commentable_id}` :
                      ''
                  ">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="$G_ImgHandle(item.user.avatar.small)">

                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular indeterminate></v-progress-circular>
                        </div>
                      </template>

                    </v-img>
                  </v-avatar>
                </template>

                <v-list-item-title>
                  {{
                    item.content
                  }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    item.user.username
                  }}
                </v-list-item-subtitle>
              </v-list-item>

              <Empty :show="!comments" />
            </v-list>
          </v-tabs-window-item>
          <v-tabs-window-item>
            <v-list rounded="lg" lines="two" style="margin-bottom: 48px;">

              <v-list-item rounded="lg" v-if="replys != null" v-for="(item, i) in replys" :key="`replys_${i}`" :to="item.replyable_parent_type == 'question' ?
                `${$G_UrlHeaderLang()}/questions/${item.replyable_parent_id}` :
                item.replyable_parent_type == 'article' ?
                  `${$G_UrlHeaderLang()}/articles/${item.replyable_parent_id}` :
                  ''
                ">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="$G_ImgHandle(item.user.avatar.small)">

                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular indeterminate></v-progress-circular>
                        </div>
                      </template>

                    </v-img>
                  </v-avatar>
                </template>

                <v-list-item-title>
                  {{
                    item.content
                  }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    item.user.username
                  }}
                </v-list-item-subtitle>
              </v-list-item>

              <Empty :show="!replys" />
            </v-list>
          </v-tabs-window-item>
          <v-tabs-window-item>
            <v-list rounded="lg" lines="two" style="margin-bottom: 48px;">

              <v-list-item rounded="lg" v-if="users != null" v-for="(item, i) in users" :key="`users_${i}`"
                :to="`${$G_UrlHeaderLang()}/users/${item.user_id}`">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="$G_ImgHandle(item.avatar.small)">

                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular indeterminate></v-progress-circular>
                        </div>
                      </template>

                    </v-img>
                  </v-avatar>
                </template>

                <v-list-item-title>
                  {{
                    item.username
                  }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    item.headline
                  }}
                </v-list-item-subtitle>
              </v-list-item>

              <Empty :show="!users" />
            </v-list>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </template>
  </TemplateFabDialog>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useFabDialogStore } from '@/stores/fab-dialog'
import {
  GetDatas
} from '@/api/global.js'

import TemplateFabDialog from '@/components/fab-dialog/template-fab-dialog/index.vue'
import Empty from '@/components/empty/index.vue'
export default {
  components: {
    TemplateFabDialog,
    Empty
  },
  data() {
    return {
      loading: false,
      mainStore: useMainStore(),
      fabDialogStore: useFabDialogStore(),


      isDragging: false,
      startX: 0,
      startY: 0,
      startLeft: 0,
      startTop: 0,

      tab: 'topics',
      // vmodel: 'close',
      value: '',
      topics: null,
      questions: null,
      articles: null,
      answers: null,
      comments: null,
      replys: null,
      users: null,
      is_loading: false,
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
  computed: {
    model: {
      get() {
        this.value = this.fabDialogStore.getNewSearchFabDialog.value
        return this.fabDialogStore.getNewSearchFabDialog.model
      },
      set(val) {
        this.fabDialogStore.setNewSearchFabDialog({ model: val })
      }
    },
    tab_items() {
      return [
        {
          text: this.$t('Message.Components.DrawerNavigation.Topics'),
          icon: 'mdi-book-variant',
          value: 'topics'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.Questions'),
          icon: 'mdi-forum',
          value: 'questions'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.Articles'),
          icon: 'mdi-file-document',
          value: 'articles'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.Answers'),
          icon: 'mdi-message-reply',
          value: 'answers'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.Comments'),
          icon: 'mdi-message-reply-text',
          value: 'comments'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.Replts'),
          icon: 'mdi-reply-all',
          value: 'replys'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.User'),
          icon: 'mdi-account-multiple',
          value: 'users'
        },
      ]
    }
  },
  // mounted() {
  //   // 初始化位置到右下角
  //   this.setInitialPosition();
  //   // 添加鼠标移动和释放事件监听器
  //   document.addEventListener('mousemove', this.onDrag);
  //   document.addEventListener('mouseup', this.stopDrag);
  //   // 添加触摸事件监听器
  //   document.addEventListener('touchmove', this.onDrag);
  //   document.addEventListener('touchend', this.stopDrag);
  // },
  // beforeUnmount() {
  //   // 移除事件监听器
  //   document.removeEventListener('mousemove', this.onDrag);
  //   document.removeEventListener('mouseup', this.stopDrag);
  //   // 移除触摸事件监听器
  //   document.removeEventListener('touchmove', this.onDrag);
  //   document.removeEventListener('touchend', this.stopDrag);
  // },
  methods: {
    async GetData(type) {
      try {
        this.is_loading = true
        var token = this.$G_GetUserToken()
        const response = await GetDatas(type, {
          order: '-update_time',
          page: this.pagination.next,
          type: '',
          question_id: '',
          commentable_id: '',
          commentable_type: '',
          replyable_comment_id: '',
          user_token: token != '' ? token : '',
          search_keywords: this.value
        })
        if (response.data.is_get == true) {
          var keys = type == 'articles' ?
            'article_id' : type == 'questions' ?
              'question_id' : type == 'answers' ?
                'answer_id' : type == 'messages' ?
                  'message_id' : type == 'users' ?
                    'user_id' : ''
          switch (type) {
            case 'topics':
              this.topics = response.data.data
              break
            case 'questions':
              this.questions = response.data.data
              break
            case 'articles':
              this.articles = response.data.data
              break
            case 'answers':
              this.answers = response.data.data
              break
            case 'comments':
              this.comments = response.data.data
              break
            case 'replys':
              this.replys = response.data.data
              break
            case 'users':
              this.users = response.data.data
              break
          }
          this.pagination.total = response.data.pagination.total
          this.pagination.pages = response.data.pagination.pages
          this.pagination.previous = response.data.pagination.previous
          this.pagination.next = response.data.pagination.next
          this.pagination.page = response.data.pagination.page
          this.pagination.per_page = response.data.pagination.per_page
          this.$forceUpdate()
          this.is_loading = false
        } else {
          this.is_loading = false
        }
      } catch (error) {
        this.is_loading = false
      }
    },
    StartSearch() {
      if (this.value == '') {
        // this.vmodel = 'close'
        return
      }
      this.pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      // console.log(this.tab)
      // console.log(this.tab_items[this.tab].value)
      switch (this.tab_items[this.tab].value) {
        case 'topics':
          this.topics = null
          this.GetData('topics')
          break
        case 'questions':
          this.questions = null
          this.GetData('questions')
          break
        case 'articles':
          this.articles = null
          this.GetData('articles')
          break
        case 'answers':
          this.answers = null
          this.GetData('answers')
          break
        case 'comments':
          this.comments = null
          this.GetData('comments')
          break
        case 'replys':
          this.replys = null
          this.GetData('replys')
          break
        case 'users':
          this.users = null
          this.GetData('users')
          break
      }
    },
    // setInitialPosition() {
    //   const card = this.$refs.draggableCard;
    //   if (card) {
    //     const cardEl = card.$el || card;
    //     cardEl.style.bottom = '16px';
    //     cardEl.style.right = '16px';
    //   }
    // },
    // startDrag(event) {
    //   // 只有点击卡片本身（非按钮区域）才开始拖动 v-toolbar__content
    //   if (event.target.closest('.v-btn')) return;

    //   this.isDragging = true;
    //   // 处理触摸事件和鼠标事件
    //   const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    //   const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    //   this.startX = clientX;
    //   this.startY = clientY;

    //   const card = this.$refs.draggableCard;
    //   if (card) {
    //     const cardEl = card.$el || card;
    //     const rect = cardEl.getBoundingClientRect();
    //     this.startLeft = rect.left;
    //     this.startTop = rect.top;
    //   }
    // },
    // onDrag(event) {
    //   if (!this.isDragging) return;

    //   // 阻止触摸事件的默认行为，避免页面滚动
    //   if (event.touches) {
    //     event.preventDefault();
    //   }

    //   const card = this.$refs.draggableCard;
    //   if (card) {
    //     const cardEl = card.$el || card;
    //     // 处理触摸事件和鼠标事件
    //     const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    //     const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    //     const dx = clientX - this.startX;
    //     const dy = clientY - this.startY;

    //     cardEl.style.left = `${this.startLeft + dx}px`;
    //     cardEl.style.top = `${this.startTop + dy}px`;
    //     // 清除bottom和right属性，避免冲突
    //     cardEl.style.bottom = 'auto';
    //     cardEl.style.right = 'auto';
    //   }
    // },
    // stopDrag() {
    //   this.isDragging = false;
    // }
  },
  watch: {
    value(val) {
      if (val == '') {
        // this.vmodel = 'close'
        return
      }
      // console.log(val)
      this.StartSearch()
    },
    tab(val) {
      this.StartSearch()
    }
  }
}
</script>
