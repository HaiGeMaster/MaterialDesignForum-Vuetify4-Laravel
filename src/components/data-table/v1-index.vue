<template>
  <v-card rounded="lg" :loading="is_loading">
    <v-data-table 
      disabled 
      v-model="selected" 
      :headers="Headers" 
      :items="data || []" 
      hide-default-footer
      :mobile="mainStore.getMobile" 
      :item-value="itemValue" 
      :show-select="userStore.getUser.user_group.is_admin"
      color="primary" 
      :no-data-text="$t('Message.Components.DataTable.NoDataText')"
      :items-per-page="Number(pagination.per_page)" 
      :loading-text="$t('Message.Components.Loaded.Loading')"
      :header-props="{
        'sort-by-text': $t('Message.Components.DataTable.SortBy'),
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title v-show="selected.length == 0 && !mainStore.getMobile">
            {{ titleText }}
          </v-toolbar-title>

          <template v-slot:prepend>
            <!-- 批量删除按钮 -->
            <ActionButton 
              v-if="selected.length >= 1 && type != 'users'" 
              icon="mdi-delete" 
              color="secondary"
              tooltip="Message.Components.DataTable.BatchDeleteSelectedItems"
              @click="OnDelete(selected)"
            />

            <!-- 禁用用户按钮 -->
            <ActionButton 
              v-if="selected.length >= 1 && type == 'users'" 
              icon="mdi-account-off-outline" 
              color="red"
              tooltip="Message.Components.DataTable.DisableSelectedUser"
              @click="SetUsersDisableTime(selected, Math.floor(Date.now() / 1000))"
            />

            <!-- 启用用户按钮 -->
            <ActionButton 
              v-if="selected.length >= 1 && type == 'users'" 
              icon="mdi-account-check-outline" 
              color="green"
              tooltip="Message.Components.DataTable.UnDisableSelectedUser"
              @click="SetUsersDisableTime(selected, 0)"
            />

            <!-- 编辑按钮 -->
            <ActionButton 
              v-if="selected.length >= 1" 
              icon="mdi-pencil" 
              color="primary"
              tooltip="Message.Components.DataTable.EditSelectedItems"
              :disabled="selected.length > 1 || type == 'reports'"
              @click="OnEdit(selected[0])"
            />

            <!-- 更改用户组按钮（用户页） -->
            <ActionButton 
              v-if="selected.length >= 1 && type == 'users'" 
              icon="mdi-account-switch-outline" 
              color="secondary"
              tooltip="Message.Components.DataTable.ChangeSelectedItemsUserGroup"
              @click="OnSetUsersUseGroup(selected)"
            />

            <!-- 移动用户组按钮（用户组页） -->
            <ActionButton 
              v-if="selected.length >= 1 && type == 'user_groups'" 
              icon="mdi-account-switch-outline" 
              color="secondary"
              :disabled="selected.length > 1"
              tooltip="Message.Components.UserGroupSwitchDialog.UserGroupUserMove"
              @click="OnSetUserGroupToNewUserGroup(selected[0])"
            />
          </template>

          <template v-slot:append>
            <v-expand-x-transition>
              <!-- 搜索框 -->
              <v-text-field color="primary"   
                rounded="pill" 
                v-model="search" 
                prepend-inner-icon="mdi-reload"
                append-inner-icon="mdi-magnify" 
                @click:prepend-inner="ResetLoadingData()" 
                :label="`(${data?.length || 0}/${pagination.total})` + $t('Message.Components.DataTable.SearchFromDatabase')"
                style="width: 250px;min-width: 150px;max-width: 250px;margin-right: 8px;"
                @click:append-inner="ResetLoading" 
                variant="outlined" 
                density="compact" 
                hide-details="auto"
                @keydown="(e) => { e.keyCode == 13 ? ResetLoading() : null }" 
              />
            </v-expand-x-transition>

            <!-- 上一页按钮 -->
            <PaginationButton 
              v-if="pagination.previous != 0 && pagination.previous != null"
              icon="mdi-chevron-left"
              :disabled="pagination.previous == 0 || pagination.previous == null"
              tooltip="Message.Components.DataTable.PreviousPage"
              @click="PreviousLoading"
            />

            <!-- 下一页按钮 -->
            <PaginationButton 
              v-if="pagination.next != 0 && pagination.next != null"
              icon="mdi-chevron-right"
              :disabled="pagination.next == 0 || pagination.next == null"
              tooltip="Message.Components.DataTable.NextPage"
              @click="NextLoading"
            />

            <!-- 更多选项菜单 -->
            <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.MoreScreeningOptions')">
              <template v-slot:activator="{ props: props1 }">
                <v-menu rounded="xl" offset-y bottom transition="scroll-y-transition">
                  <template v-slot:activator="{ props: props2 }">
                    <v-btn v-bind="Object.assign({}, props1, props2)" icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list rounded="lg">
                    <v-list-subheader>{{ $t('Message.Components.DataTable.PullQuantityPerPage') }}</v-list-subheader>
                    <v-list-item 
                      v-for="(item, index) in toggle_exclusive_item" 
                      :key="index"
                      @click="toggle_exclusive = item.value" 
                      :title="item.text"
                    />
                  </v-list>
                </v-menu>
              </template>
            </v-tooltip>
          </template>
        </v-toolbar>
      </template>

      <!-- 操作列 -->
      <template v-slot:item.actions="{ item }">
        <v-btn-toggle v-if="userStore.getUser.user_group.is_admin" border divided size="x-small">
          <!-- 编辑按钮 -->
          <ActionButton 
            icon="mdi-pencil" 
            size="small"
            tooltip="Message.Components.DataTable.Edit"
            :disabled="type == 'reports'"
            @click="OnEdit(item)"
          />

          <!-- 删除按钮 -->
          <ActionButton 
            v-if="type != 'users'"
            icon="mdi-delete" 
            size="small"
            tooltip="Message.Components.DataTable.Delete"
            @click="OnDelete([item])"
          />

          <!-- 禁用用户按钮 -->
          <ActionButton 
            v-if="type == 'users' && item.disable_time == 0"
            icon="mdi-account-off-outline" 
            size="small"
            tooltip="Message.Components.DataTable.DisableUser"
            @click="SetUsersDisableTime([item], 1)"
          />

          <!-- 启用用户按钮 -->
          <ActionButton 
            v-if="type == 'users' && item.disable_time != 0"
            icon="mdi-account-check-outline" 
            size="small"
            tooltip="Message.Components.DataTable.UnDisableUser"
            @click="SetUsersDisableTime([item], 0)"
          />
        </v-btn-toggle>
        <NoPermissions v-else />
      </template>

      <!-- 用户列 -->
      <template v-slot:item.user="{ item }">
        <UserChip v-if="item.user != null" :user="item.user" />
      </template>

      <!-- 本地用户列 -->
      <template v-slot:item.localuser="{ item }">
        <UserChip v-if="item != null" :user="item" :isLocal="true" />
      </template>

      <!-- 回复用户列 -->
      <template v-slot:item.replyable_user="{ item }">
        <UserChip v-if="item.user != null" :user="item.user" />
      </template>

      <!-- 时间列 -->
      <template v-slot:item.create_time="{ item }">
        <RollDataText :text="$G_AdminTimeStampToDateTime(item.create_time)" />
      </template>

      <template v-slot:item.update_time="{ item }">
        <RollDataText :text="$G_AdminTimeStampToDateTime(item.update_time)" />
      </template>

      <template v-slot:item.delete_time="{ item }">
        <RollDataText :text="item.delete_time == 0 ? 0 : $G_AdminTimeStampToDateTime(item.delete_time)" />
      </template>

      <!-- 文本列 -->
      <template v-slot:item.location="{ item }">
        <RollDataText :text="item.location" />
      </template>
      <template v-slot:item.headline="{ item }">
        <RollDataText :text="item.headline" />
      </template>
      <template v-slot:item.bio="{ item }">
        <RollDataText :text="item.bio" />
      </template>
      <template v-slot:item.blog="{ item }">
        <RollDataText :text="item.blog" />
      </template>
      <template v-slot:item.company="{ item }">
        <RollDataText :text="item.company" />
      </template>

      <!-- 禁用时间列 -->
      <template v-slot:item.disable_time="{ item }">
        <RollDataText 
          :text="item.disable_time == 0 ? $t('Message.Components.DataTable.NotDisabled') : $G_AdminTimeStampToDateTime(item.disable_time)" 
        />
      </template>

      <!-- 原因列 -->
      <template v-slot:item.reason="{ item }">
        <span>{{ $t(item.reason) }}</span>
      </template>

      <!-- 用户组列 -->
      <template v-slot:item.user_group_name="{ item }">
        <RollDataText :text="$t(item.user_group_name)" />
      </template>

      <template v-slot:item.user_group_description="{ item }">
        <RollDataText :text="$t(item.user_group_description)" />
      </template>

      <template v-slot:item.user_group_icon="{ item }">
        <v-icon>{{ item.user_group_icon }}</v-icon>
      </template>

      <template v-slot:item.user_group_icon_show="{ item }">
        <v-checkbox v-model="item.user_group_icon_show" disabled></v-checkbox>
      </template>

      <template v-slot:item.user_group_color="{ item }">
        <v-chip variant="outlined" :color="item.user_group_color">
          {{ item.user_group_color }}
        </v-chip>
      </template>

      <!-- 权限列 -->
      <template v-slot:item.is_admin="{ item }">
        <v-checkbox v-model="item.is_admin" disabled></v-checkbox>
      </template>

      <!-- 能力列 -->
      <template v-slot:item.ability_normal_login="{ item }">
        <v-checkbox v-model="item.ability_normal_login" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_login="{ item }">
        <v-checkbox v-model="item.ability_admin_login" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_manage_user_group="{ item }">
        <v-checkbox v-model="item.ability_admin_manage_user_group" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_manage_user="{ item }">
        <v-checkbox v-model="item.ability_admin_manage_user" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_manage_topic="{ item }">
        <v-checkbox v-model="item.ability_admin_manage_topic" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_manage_question="{ item }">
        <v-checkbox v-model="item.ability_admin_manage_question" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_manage_article="{ item }">
        <v-checkbox v-model="item.ability_admin_manage_article" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_manage_comment="{ item }">
        <v-checkbox v-model="item.ability_admin_manage_comment" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_manage_answer="{ item }">
        <v-checkbox v-model="item.ability_admin_manage_answer" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_manage_reply="{ item }">
        <v-checkbox v-model="item.ability_admin_manage_reply" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_manage_report="{ item }">
        <v-checkbox v-model="item.ability_admin_manage_report" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_admin_manage_option="{ item }">
        <v-checkbox v-model="item.ability_admin_manage_option" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_create_article="{ item }">
        <v-checkbox v-model="item.ability_create_article" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_create_question="{ item }">
        <v-checkbox v-model="item.ability_create_question" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_create_answer="{ item }">
        <v-checkbox v-model="item.ability_create_answer" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_create_comment="{ item }">
        <v-checkbox v-model="item.ability_create_comment" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_create_reply="{ item }">
        <v-checkbox v-model="item.ability_create_reply" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_create_topic="{ item }">
        <v-checkbox v-model="item.ability_create_topic" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_own_article="{ item }">
        <v-checkbox v-model="item.ability_edit_own_article" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_own_question="{ item }">
        <v-checkbox v-model="item.ability_edit_own_question" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_own_answer="{ item }">
        <v-checkbox v-model="item.ability_edit_own_answer" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_own_comment="{ item }">
        <v-checkbox v-model="item.ability_edit_own_comment" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_own_reply="{ item }">
        <v-checkbox v-model="item.ability_edit_own_reply" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_own_topic="{ item }">
        <v-checkbox v-model="item.ability_edit_own_topic" disabled></v-checkbox>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog'
import { useFabDialogStore } from '@/stores/fab-dialog'
import { useUserStore } from '@/stores/user'
import { useUpdateStore } from '@/stores/update'
import { GetDatas, SetUsersDisableTime as ApiSetUsersDisableTime } from '@/api/global'
import RollDataText from './components/roll-data-text/index.vue'
import NoPermissions from '../no-allow-use/index.vue'

// 子组件：操作按钮
const ActionButton = {
  name: 'ActionButton',
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    tooltip: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  template: `
    <v-tooltip location="bottom" :text="$t(tooltip)">
      <template v-slot:activator="{ props }">
        <v-expand-x-transition>
          <v-btn 
            v-bind="props" 
            :color="color" 
            :icon="size === 'small' ? true : undefined"
            :disabled="disabled"
            @click="$emit('click')"
          >
            <v-icon :small="size === 'small'">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-expand-x-transition>
      </template>
    </v-tooltip>
  `
}

// 子组件：分页按钮
const PaginationButton = {
  name: 'PaginationButton',
  props: {
    icon: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: String,
      required: true
    }
  },
  template: `
    <v-tooltip location="bottom" :text="$t(tooltip)">
      <template v-slot:activator="{ props }">
        <v-btn 
          v-bind="props" 
          icon 
          :disabled="disabled"
          @click="$emit('click')"
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  `
}

// 子组件：用户芯片
const UserChip = {
  name: 'UserChip',
  props: {
    user: {
      type: Object,
      required: true
    },
    isLocal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    userId() {
      return this.isLocal ? this.user.user_id : this.user.user_id
    },
    username() {
      return this.isLocal ? this.user.username : this.user.username
    },
    avatar() {
      return this.isLocal ? this.user.avatar : this.user.avatar
    }
  },
  template: `
    <v-tooltip location="top" :text="$t('Message.Components.DataTable.FrontDeskViewing') + username">
      <template v-slot:activator="{ props }">
        <v-chip 
          variant="outlined" 
          v-bind="props" 
          :href="'" + $G_UrlHeaderLang() + "/users/" + userId + "'"
          :target="userId != 0 ? '_blank' : ''"
        >
          <v-avatar start v-if="avatar && avatar.small">
            <v-img :src="$G_ImgHandle(avatar.small)">
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
          </v-avatar>
          {{ username }}
        </v-chip>
      </template>
    </v-tooltip>
  `
}

export default {
  name: 'DataTable',
  components: {
    RollDataText,
    NoPermissions,
    ActionButton,
    PaginationButton,
    UserChip
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
    order: {
      type: String,
      default: '-update_time' // create_time, update_time, delete_time, user_id, topic_id, article_id, question_id, answer_id, comment_id, reply_id, report_id, user_group_id
    },
    toggle_exclusive_item: {
      type: Array,
      default: function () {
        return [
          { text: '1', value: 1 },
          { text: '5', value: 5 },
          { text: '10', value: 10 },
          { text: '25', value: 25 },
          { text: '50', value: 50 },
          { text: '100', value: 100 },
          { text: '500', value: 500 },
          { text: '1000', value: 1000 }
        ]
      }
    },
    reset: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    mainStore: useMainStore(),
    dialogStore: useDialogStore(),
    fabDialogStore: useFabDialogStore(),
    userStore: useUserStore(),
    updateStore: useUpdateStore(),
    is_loading: false,
    search: '',
    selected: [],
    toggle_exclusive: 100,
    data: null,
    pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    }
  }),
  computed: {
    // 获取更新状态
    ReturnUpdateGetDataTableUpdate() {
      return this.updateStore.getDataTableUpdate
    },
    // 处理表头
    Headers() {
      return this.headers
    },
    // 生成标题文本
    titleText() {
      const titleMap = {
        topics: 'Message.Components.DataTable.TopicsDataTables',
        articles: 'Message.Components.DataTable.ArticlesDataTables',
        questions: 'Message.Components.DataTable.QuestionsDataTables',
        answers: 'Message.Components.DataTable.AnswersDataTables',
        comments: 'Message.Components.DataTable.CommentsDataTables',
        users: 'Message.Components.DataTable.UsersDataTables',
        replys: 'Message.Components.DataTable.ReplysDataTables',
        reports: 'Message.Components.DataTable.ReportsDataTables',
        user_groups: 'Message.Components.DataTable.UserGroupsDataTables'
      }
      return this.$t(titleMap[this.type] || 'Message.Components.DataTable.DataTable')
    },
    // 获取项目值字段
    itemValue() {
      const typeMap = {
        topics: 'topic_id',
        articles: 'article_id',
        questions: 'question_id',
        answers: 'answer_id',
        comments: 'comment_id',
        users: 'user_id',
        replys: 'reply_id',
        reports: 'report_id',
        user_groups: 'user_group_id'
      }
      return typeMap[this.type] || 'id'
    }
  },
  methods: {
    // 获取数据
    async GetData() {
      try {
        const token = this.$G_GetUserToken()
        this.is_loading = true
        const data = {
          type: this.type,
          order: this.order,
          following: false,
          page: this.pagination.next,
          per_page: this.toggle_exclusive,
          search_keywords: this.search,
          is_admin: true,
          user_token: token
        }
        const response = await GetDatas(this.type, data)
        if (response.data.is_get) {
          const keyid = this._getKeyId()
          this.data = this.data ? this.$G_FilterSameItems(keyid, this.data, response.data.data) : response.data.data
          this.pagination = response.data.pagination
          this.is_loading = false
        } else {
          this.is_loading = false
        }
      } catch (error) {
        this.is_loading = false
      }
    },
    
    // 获取类型对应的主键字段
    _getKeyId() {
      const typeMap = {
        topics: 'topic_id',
        articles: 'article_id',
        questions: 'question_id',
        answers: 'answer_id',
        comments: 'comment_id',
        users: 'user_id',
        replys: 'reply_id',
        reports: 'report_id',
        user_groups: 'user_group_id'
      }
      return typeMap[this.type] || 'id'
    },
    
    // 编辑项目
    OnEdit(select) {
      const item = typeof select === 'number' ? this.data.find(item => item[this.itemValue] === select) : select
      if (!item) return
      
      this.fabDialogStore.setEditorFabDialog({ model: 'close' })
      
      switch (this.type) {
        case 'topics':
          this.dialogStore.setTopicDialog({
            model: true,
            mode: 'edit',
            edit_topic: select
          })
          break
        case 'articles':
          this.fabDialogStore.setEditorFabDialog({
            md_title: item.title,
            md_topics: item.topics,
            md_content: item.content_rendered,
            edit_mode_id: item.article_id,
            title: this.$t('Message.Components.Editor.EditArticle'),
            icon: 'mdi-file-document',
            has_title: true,
            has_topic: true,
            submit_text: this.$t('Message.Components.Editor.Release'),
            edit_type: 'article',
            edit_mode: 'edit',
            model: 'maximize'
          })
          break
        case 'questions':
          this.fabDialogStore.setEditorFabDialog({
            md_title: item.title,
            md_topics: item.topics,
            md_content: item.content_rendered,
            edit_mode_id: item.question_id,
            title: this.$t('Message.Components.Editor.EditQuestion'),
            icon: 'mdi-forum',
            has_title: true,
            has_topic: true,
            submit_text: this.$t('Message.Components.Editor.Release'),
            edit_type: 'question',
            edit_mode: 'edit',
            model: 'maximize'
          })
          break
        case 'answers':
          this.fabDialogStore.setEditorFabDialog({
            md_content: item.content_rendered,
            edit_mode_id: item.answer_id,
            title: this.$t('Message.Components.Editor.EditAnswer'),
            icon: 'mdi-message-reply',
            has_title: false,
            has_topic: false,
            submit_text: this.$t('Message.Components.Editor.Release'),
            edit_type: 'answer',
            edit_mode: 'edit',
            answer_to_question_id: 0,
            model: 'maximize'
          })
          break
        case 'comments':
          this.dialogStore.setCommentReplyEditDialog({
            model: true,
            title: this.$t('Message.Components.OptionsButton.EditComment'),
            type: 'comment',
            edit_id: item.comment_id,
            content: item.content
          })
          break
        case 'replys':
          this.dialogStore.setCommentReplyEditDialog({
            model: true,
            title: this.$t('Message.Components.OptionsButton.EditReply'),
            type: 'reply',
            edit_id: item.reply_id,
            content: item.content
          })
          break
        case 'user_groups':
          this.dialogStore.setUserGroupEditDialog({
            mode: 'edit',
            edit_user_group: item,
            model: true
          })
          break
        case 'users':
          this.dialogStore.setEditInfoDialog({
            model: true,
            user: item
          })
          break
        case 'reports':
          break
        default:
          break
      }
    },
    
    // 删除项目
    OnDelete(select_ids) {
      const delete_preview_text_arr = this._getDeletePreviewText(select_ids)
      const type = this.type.slice(0, -1) // 去掉末尾的's'
      
      this.dialogStore.setDeleteDialog({
        type,
        item: this.item,
        item_ids: select_ids,
        delete_preview_text: delete_preview_text_arr,
        model: true
      })
    },
    
    // 获取删除预览文本
    _getDeletePreviewText(select_ids) {
      const keyid = this._getKeyId()
      const filteredItems = this.data.filter(item => select_ids.includes(item[keyid]))
      
      switch (this.type) {
        case 'topics':
          return filteredItems.map(item => item.name)
        case 'articles':
          return filteredItems.map(item => item.title)
        case 'questions':
          return filteredItems.map(item => item.title)
        case 'answers':
          return filteredItems.map(item => item.content_markdown)
        case 'comments':
          return filteredItems.map(item => item.content)
        case 'users':
          return filteredItems.map(item => item.username)
        case 'replys':
          return filteredItems.map(item => item.content)
        case 'reports':
          return filteredItems.map(item => this.$t(item.reason))
        case 'user_groups':
          return filteredItems.map(item => item.user_group_name)
        default:
          return []
      }
    },
    
    // 设置用户禁用时间
    async SetUsersDisableTime(user_ids, disable_time) {
      const user_token = this.$G_GetUserToken()
      const data = {
        user_ids: user_ids,
        disable_time: disable_time,
        user_token: user_token
      }
      const res = await ApiSetUsersDisableTime(data)
      if (res.data.is_delete) {
        this.ResetLoadingData()
      }
    },
    
    // 设置用户组（用户页）
    OnSetUsersUseGroup(user_ids) {
      this.dialogStore.setUserGroupSwitchDialog({
        model: !this.dialogStore.getUserGroupSwitchDialog.model,
        user_ids: user_ids
      })
    },
    
    // 设置用户组到新用户组（用户组页）
    OnSetUserGroupToNewUserGroup(user_group_id) {
      this.dialogStore.setUserGroupSwitchDialog({
        model: !this.dialogStore.getUserGroupSwitchDialog.model,
        user_group_id: user_group_id
      })
    },
    
    // 刷新数据
    ResetLoadingData() {
      this.selected = []
      this.data = null
      this.pagination.next = this.pagination.previous + 1
      this.$forceUpdate()
      this.GetData()
    },
    
    // 重置加载
    ResetLoading() {
      this.data = null
      this.pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      this.$forceUpdate()
      this.GetData()
    },
    
    // 加载上一页
    PreviousLoading() {
      this.data = null
      this.pagination = {
        ...this.pagination,
        next: this.pagination.previous
      }
      this.GetData()
    },
    
    // 加载下一页
    NextLoading() {
      this.data = null
      this.pagination = {
        ...this.pagination,
        next: this.pagination.next
      }
      this.GetData()
    }
  },
  created() {
    this.GetData()
  },
  watch: {
    // 监听每页数量变化
    toggle_exclusive() {
      this.ResetLoading()
    },
    
    // 监听搜索变化
    search() {
      this.ResetLoading()
    },
    
    // 监听重置信号
    reset(val) {
      if (val > 0) {
        this.ResetLoadingData()
      }
    },
    
    // 监听数据更新
    ReturnUpdateGetDataTableUpdate() {
      this.ResetLoadingData()
    }
  }
}
</script>