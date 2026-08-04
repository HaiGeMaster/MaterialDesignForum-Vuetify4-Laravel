<template>
  <v-card rounded="lg" :loading="is_loading">

    <v-data-table disabled v-model="selected" :headers="Headers" :items="data != null ? data : []" hide-default-footer
      :mobile="mainStore.getMobile" :item-value="itemValue" :show-select="userStore.getUser.user_group.is_admin"
      color="primary" :no-data-text="$t('Message.Components.DataTable.NoDataText')"
      :items-per-page="Number(pagination.per_page)" :loading-text="$t('Message.Components.Loaded.Loading')"
      :header-props="{
        'sort-by-text': $t('Message.Components.DataTable.SortBy'),
      }" :sort-by-text="$t('Message.Components.DataTable.SortBy')">

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title v-show="selected.length == 0 && !mainStore.getMobile">
            <!-- <v-icon color="medium-emphasis" icon="mdi-database" size="x-small" start></v-icon> -->

            {{ titleText }}
          </v-toolbar-title>

          <!-- <v-spacer></v-spacer> -->

          <template v-slot:prepend>

            <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.BatchDeleteSelectedItems')">
              <template v-slot:activator="{ props }">
                <v-expand-x-transition>
                  <v-btn v-bind="props" color="secondary" icon v-show="selected.length >= 1 && type != 'users'"
                    @click="OnDelete(selected)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-expand-x-transition>

              </template>
              <!-- <span>{{ $t('Message.Components.DataTable.BatchDeleteSelectedItems') }}</span> -->
            </v-tooltip>

            <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.DisableSelectedUser')">
              <template v-slot:activator="{ props }">
                <v-expand-x-transition>
                  <v-btn v-bind="props" color="red" icon v-show="selected.length >= 1 && type == 'users'"
                    @click="SetUsersDisableTime(selected, Math.floor(Date.now() / 1000))">
                    <v-icon>mdi-account-off-outline</v-icon>
                  </v-btn>
                </v-expand-x-transition>

              </template>
              <!-- <span>{{ $t('Message.Components.DataTable.DisableSelectedUser') }}</span> -->
            </v-tooltip>

            <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.UnDisableSelectedUser')">
              <template v-slot:activator="{ props }">
                <v-expand-x-transition>
                  <v-btn v-bind="props" color="green" icon v-show="selected.length >= 1 && type == 'users'"
                    @click="SetUsersDisableTime(selected, 0)">
                    <v-icon>mdi-account-check-outline</v-icon>
                  </v-btn>
                </v-expand-x-transition>

              </template>
              <!-- <span>{{ $t('Message.Components.DataTable.UnDisableSelectedUser') }}</span> -->
            </v-tooltip>

            <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.EditSelectedItems')">
              <template v-slot:activator="{ props }">
                <v-expand-x-transition>
                  <v-btn v-bind="props" color="primary" icon v-show="selected.length >= 1" @click="OnEdit(
                    selected[0]
                  )" :disabled="selected.length > 1 || type == 'reports'">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-expand-x-transition>
              </template>
              <!-- <span>{{ $t('Message.Components.DataTable.EditSelectedItems') }}</span> -->
            </v-tooltip>

            <!-- 用户组移动选项暂时有问题 -->
            <!-- 这里是在用户页选中 多 个用户更新用户组的 -->
            <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.ChangeSelectedItemsUserGroup')">
              <template v-slot:activator="{ props }">
                <v-expand-x-transition>
                  <v-btn v-bind="props" color="secondary" icon v-show="selected.length >= 1 && type == 'users'"
                    @click="OnSetUsersUseGroup(selected)">
                    <v-icon>mdi-account-switch-outline</v-icon>
                  </v-btn>
                </v-expand-x-transition>
              </template>
            </v-tooltip>

            <!-- 这个是在用户组页选中 单 个用户更新用户组的 -->
            <v-tooltip location="bottom" :text="$t('Message.Components.UserGroupSwitchDialog.UserGroupUserMove')">
              <template v-slot:activator="{ props }">
                <v-expand-x-transition>
                  <v-btn v-bind="props" color="secondary" :disabled="selected.length > 1" icon
                    v-show="selected.length >= 1 && type == 'user_groups'"
                    @click="OnSetUserGroupToNewUserGroup(selected[0])">
                    <v-icon>mdi-account-switch-outline</v-icon>
                  </v-btn>
                </v-expand-x-transition>
              </template>
            </v-tooltip>

          </template>

          <template v-slot:append>
            <v-expand-x-transition>
              <!-- <div style="max-width: 550px;" -->
              <!-- v-show="(selected.length == 0 && mainStore.getMobile) || mainStore.getTablet || mainStore.getDesktop"> -->

              <v-text-field color="primary"   rounded="pill" v-model="search" prepend-inner-icon="mdi-reload"
                append-inner-icon="mdi-magnify" @click:prepend-inner="ResetLoadingData()" :label="`(${data != null ? data.length : 0}/${pagination.total})` + $t('Message.Components.DataTable.SearchFromDatabase')

                  " style="width: 250px;min-width: 150px;max-width: 250px;margin-right: 8px;"
                @click:append-inner="ResetLoading" variant="outlined" density="compact" hide-details="auto"
                @keydown="(e) => { e.keyCode == 13 ? ResetLoading() : null }" />
              <!-- </div> -->
            </v-expand-x-transition>


            <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.PreviousPage')"
              v-if="pagination.previous != 0 && pagination.previous != null">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon :disabled="pagination.previous == 0 || pagination.previous == null"
                  @click="PreviousLoading">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
              </template>
              <!-- <span>{{ $t('Message.Components.DataTable.PreviousPage') }}</span> -->
            </v-tooltip>

            <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.NextPage')"
              v-if="pagination.next != 0 && pagination.next != null">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon :disabled="pagination.next == 0 || pagination.next == null"
                  @click="NextLoading">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </template>
              <!-- <span>{{ $t('Message.Components.DataTable.NextPage') }}</span> -->
            </v-tooltip>


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
                    <v-list-item v-for="(item, index) in toggle_exclusive_item" :key="index"
                      @click="toggle_exclusive = item.value" :title="item.text">
                    </v-list-item>
                  </v-list>


                </v-menu>
              </template>
              <!-- <span>{{ $t('Message.Components.DataTable.MoreScreeningOptions') }}</span> -->
            </v-tooltip>

          </template>

          <!-- <v-btn  class="me-2" prepend-icon="mdi-plus" rounded="lg" text="Add a Book" border @click="add"></v-btn> -->
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn-toggle v-if="userStore.getUser.user_group.is_admin" border divided size="x-small">
          <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.Edit')">
            <template v-slot:activator="{ props }">
              <v-btn @click="OnEdit(item)" v-bind="props" :disabled="type == 'reports'">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <!-- <span>{{ $t('Message.Components.DataTable.Edit') }}</span> -->
          </v-tooltip>

          <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.Delete')" v-if="type != 'users'">
            <template v-slot:activator="{ props }">
              <v-btn @click="OnDelete([item])" v-bind="props">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <!-- <span>{{ $t('Message.Components.DataTable.Delete') }}</span> -->
          </v-tooltip>

          <!-- color="red" -->
          <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.DisableUser')"
            v-if="type == 'users' && item.disable_time == 0">
            <template v-slot:activator="{ props }">
              <v-btn @click="SetUsersDisableTime([item], 1)" v-bind="props">
                <v-icon small>mdi-account-off-outline</v-icon>
              </v-btn>
            </template>
            <!-- <span>{{ $t('Message.Components.DataTable.DisableUser') }}</span> -->
          </v-tooltip>

          <!-- color="green" -->
          <v-tooltip location="bottom" :text="$t('Message.Components.DataTable.UnDisableUser')"
            v-if="type == 'users' && item.disable_time != 0">
            <template v-slot:activator="{ props }">
              <v-btn @click="SetUsersDisableTime([item], 0)" v-bind="props">
                <v-icon small>mdi-account-check-outline</v-icon>
              </v-btn>
            </template>
            <!-- <span>{{ $t('Message.Components.DataTable.UnDisableUser') }}</span> -->
          </v-tooltip>
        </v-btn-toggle>
        <NoPermissions v-else />
      </template>

      <template v-slot:item.user="{ item }">
        <v-tooltip location="top" :text="$t('Message.Components.DataTable.FrontDeskViewing') + item.user.username"
          v-if="item.user != null">
          <template v-slot:activator="{ props }">

            <!-- <v-chip variant="outlined" v-bind="props" :href="`${$G_UrlHeaderLang()}/users/${item.user.user_id}`"
              :target="item.user.user_id != 0 ? '_blank' : ''">
              <v-avatar start v-if="item.user.avatar.small != null && item.user.avatar.small != undefined">
                <v-img :src="$G_ImgHandle(item.user.avatar.small)">
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </v-avatar>
              {{ item.user.username }}
            </v-chip> -->
            <UserPopover :user="item.user" :slotname="'chip'" :chip_variant="'outlined'"/>

          </template>
        </v-tooltip>
      </template>

      <template v-slot:item.localuser="{ item }">
        <v-tooltip location="top" :text="$t('Message.Components.DataTable.FrontDeskViewing') + item.username"
          v-if="item != null">
          <template v-slot:activator="{ props }">

            <!-- <v-chip variant="outlined" v-bind="props" :href="`${$G_UrlHeaderLang()}/users/${item.user_id}`"
              :target="item.user_id != 0 ? '_blank' : ''">
              <v-avatar start v-if="item.avatar.small != null && item.avatar.small != undefined">
                <v-img :src="$G_ImgHandle(item.avatar.small)">
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </v-avatar>
              {{ item.username }}
            </v-chip> -->
            
            <UserPopover :user="item" :slotname="'chip'" :chip_variant="'outlined'"/>

          </template>
        </v-tooltip>
      </template>

      <template v-slot:item.replyable_user="{ item }">
        <v-tooltip location="top" :text="$t('Message.Components.DataTable.FrontDeskViewing') + item.user.username"
          v-if="item.user != null">
          <template v-slot:activator="{ props }">

            <!-- <v-chip variant="outlined" v-bind="props" :href="`${$G_UrlHeaderLang()}/users/${item.user.user_id}`"
              :target="item.user.user_id != 0 ? '_blank' : ''">
              <v-avatar start v-if="item.user.avatar.small != null && item.user.avatar.small != undefined">
                <v-img :src="$G_ImgHandle(item.user.avatar.small)">
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </v-avatar>
              {{ item.user.username }}
            </v-chip> -->

            
            <UserPopover :user="item.user" :slotname="'chip'" :chip_variant="'outlined'"/>

          </template>
        </v-tooltip>
      </template>

      <template v-slot:item.create_time="{ item }">
        <RollDataText :text="$G_AdminTimeStampToDateTime(item.create_time)" />
      </template>

      <template v-slot:item.update_time="{ item }">
        <RollDataText :text="$G_AdminTimeStampToDateTime(item.update_time)" />
      </template>

      <template v-slot:item.delete_time="{ item }">
        <RollDataText :text="item.delete_time == 0 ? 0 : $G_AdminTimeStampToDateTime(item.delete_time)" />
      </template>

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

      <template v-slot:item.disable_time="{ item }">
        <!-- <RollDataText :text="item.disable_time == 0 ? '启用' : $G_AdminTimeStampToDateTime(item.disable_time)"/> -->
        <!-- <RollDataText :text="item.disable_time == 0 ? $t('Message.Components.DataTable.NotDisabled') : `${$t('Message.Components.DataTable.Disabled')}(${$G_AdminTimeStampToDateTime(item.disable_time)})`"/> -->
        <RollDataText
          :text="item.disable_time == 0 ? $t('Message.Components.DataTable.NotDisabled') : $G_AdminTimeStampToDateTime(item.disable_time)" />
      </template>

      <template v-slot:item.reason="{ item }">
        <span>
          {{ $t(item.reason) }}
        </span>
      </template>

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
      <template v-slot:item.is_admin="{ item }">
        <v-checkbox v-model="item.is_admin" disabled></v-checkbox>
      </template>
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
      <template v-slot:item.ability_delete_own_article="{ item }">
        <v-checkbox v-model="item.ability_delete_own_article" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_own_question="{ item }">
        <v-checkbox v-model="item.ability_delete_own_question" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_own_answer="{ item }">
        <v-checkbox v-model="item.ability_delete_own_answer" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_own_comment="{ item }">
        <v-checkbox v-model="item.ability_delete_own_comment" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_own_reply="{ item }">
        <v-checkbox v-model="item.ability_delete_own_reply" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_own_topic="{ item }">
        <v-checkbox v-model="item.ability_delete_own_topic" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_article_only_no_comment="{ item }">
        <v-checkbox v-model="item.ability_edit_article_only_no_comment" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_question_only_no_answer="{ item }">
        <v-checkbox v-model="item.ability_edit_question_only_no_answer" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_answer_only_no_comment="{ item }">
        <v-checkbox v-model="item.ability_edit_answer_only_no_comment" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_question_only_no_comment="{ item }">
        <v-checkbox v-model="item.ability_edit_question_only_no_comment" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_comment_only_no_reply="{ item }">
        <v-checkbox v-model="item.ability_edit_comment_only_no_reply" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_topic_only_no_article_or_question="{ item }">
        <v-checkbox v-model="item.ability_edit_topic_only_no_article_or_question" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_reply_only_no_reply="{ item }">
        <v-checkbox v-model="item.ability_edit_reply_only_no_reply" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_article_only_no_comment="{ item }">
        <v-checkbox v-model="item.ability_delete_article_only_no_comment" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_question_only_no_answer="{ item }">
        <v-checkbox v-model="item.ability_delete_question_only_no_answer" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_answer_only_no_comment="{ item }">
        <v-checkbox v-model="item.ability_delete_answer_only_no_comment" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_question_only_no_comment="{ item }">
        <v-checkbox v-model="item.ability_delete_question_only_no_comment" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_comment_only_no_reply="{ item }">
        <v-checkbox v-model="item.ability_delete_comment_only_no_reply" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_reply_only_no_reply="{ item }">
        <v-checkbox v-model="item.ability_delete_reply_only_no_reply" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_delete_topic_only_no_article_or_question="{ item }">
        <v-checkbox v-model="item.ability_delete_topic_only_no_article_or_question" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_edit_own_info="{ item }">
        <v-checkbox v-model="item.ability_edit_own_info" disabled></v-checkbox>
      </template>
      <template v-slot:item.ability_vote="{ item }">
        <v-checkbox v-model="item.ability_vote" disabled></v-checkbox>
      </template>

      <!-- 用户组 ↑ -->

      <!-- 提问文章标题 -->
      <template v-slot:item.title="{ item }">
        <RollDataText :text="item.title" />
      </template>

      <!-- 话题名称 -->

      <template v-slot:item.name="{ item }">
        <v-tooltip top v-if="item.name != null">
          <template v-slot:activator="{ props }">

            <v-chip variant="outlined" v-bind="props" :href="`${$G_UrlHeaderLang()}/topics/${item.topic_id}`"
              :target="item.topic_id != 0 ? '_blank' : ''">
              <v-avatar start v-if="item.cover.small != null && item.cover.small != undefined">
                <v-img :src="$G_ImgHandle(item.cover.small)">
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </v-avatar>
              {{ item.name }}
            </v-chip>

          </template>
          <span>{{ $t('Message.Components.DataTable.FrontDeskViewing') }}{{ item.name }}</span>
        </v-tooltip>
      </template>

      <!-- <template v-slot:item.name="{ item }">
        <RollDataText :text="item.name"/>
      </template> -->

      <!-- 话题简介 -->
      <template v-slot:item.description="{ item }">
        <RollDataText :text="item.description" />
      </template>

      <!-- 内容mk -->
      <template v-slot:item.content_markdown="{ item }">
        <RollDataText :text="item.content_markdown" />
      </template>

      <!-- 内容 -->
      <template v-slot:item.content="{ item }">
        <RollDataText :text="item.content" />
      </template>

      <!-- 邮箱 -->
      <template v-slot:item.email="{ item }">
        <SensitiveDataText :text="item.email" />
      </template>
      <template v-slot:item.create_ip="{ item }">
        <SensitiveDataText :text="item.create_ip" />
      </template>
      <template v-slot:item.create_location="{ item }">
        <SensitiveDataText :text="item.create_location" />
      </template>

      <template v-slot:item.last_login_time="{ item }">
        <!-- <RollDataText :text="$G_AdminTimeStampToDateTime(item.last_login_time)"/> -->
        <SensitiveDataText :text="$G_AdminTimeStampToDateTime(item.last_login_time)" />
      </template>
      <template v-slot:item.last_login_ip="{ item }">
        <SensitiveDataText :text="item.last_login_ip" />
      </template>
      <template v-slot:item.last_login_location="{ item }">
        <SensitiveDataText :text="item.last_login_location" />
      </template>

      <!-- 评论对象类型 -->
      <template v-slot:item.commentable_type="{ item }">
        <RollDataText :text="item.commentable_type == 'question' ?
          $t('Message.Components.DrawerNavigation.Questions') :
          item.commentable_type == 'article' ?
            $t('Message.Components.DrawerNavigation.Articles') :
            item.commentable_type == 'answer' ?
              $t('Message.Components.DrawerNavigation.Answers') :
              item.commentable_type" />
        <!-- <span>
          {{
            item.commentable_type == 'question' ?
            $t('Message.Components.DrawerNavigation.Questions') :
            item.commentable_type == 'article' ?
              $t('Message.Components.DrawerNavigation.Articles') :
              item.commentable_type == 'answer' ?
                $t('Message.Components.DrawerNavigation.Answers') :
                item.commentable_type
          }}
        </span> -->
      </template>

      <!-- 回复对象类型 -->
      <template v-slot:item.replyable_type="{ item }">
        <RollDataText :text="item.replyable_type == 'comment' ?
          $t('Message.Components.DrawerNavigation.Comments') :
          item.replyable_type == 'reply' ?
            $t('Message.Components.DrawerNavigation.Replts') :
            item.replyable_type" />
        <!-- <span>
          {{
            item.replyable_type == 'comment' ?
            $t('Message.Components.DrawerNavigation.Comments') :
            item.replyable_type == 'reply' ?
              $t('Message.Components.DrawerNavigation.Replts') :
              item.replyable_type
          }}
        </span> -->
      </template>

      <!-- 举报对象类型 -->
      <template v-slot:item.reportable_type="{ item }">
        <RollDataText :text="item.reportable_type == 'question' ?
          $t('Message.Components.NewDataStats.Question') :
          item.reportable_type == 'article' ?
            $t('Message.Components.NewDataStats.Article') :
            item.reportable_type == 'answer' ?
              $t('Message.Components.NewDataStats.Answer') :
              item.reportable_type == 'comment' ?
                $t('Message.Components.NewDataStats.Comment') :
                item.reportable_type == 'reply' ?
                  $t('Message.Components.NewDataStats.Reply') :
                  item.reportable_type == 'user' ?
                    $t('Message.Components.NewDataStats.User') :
                    item.reportable_type" />
        <!-- <span>
          {{
            item.reportable_type == 'question' ?
            $t('Message.Components.NewDataStats.Question') :
            item.reportable_type == 'article' ?
              $t('Message.Components.NewDataStats.Article') :
              item.reportable_type == 'answer' ?
                $t('Message.Components.NewDataStats.Answer') :
                item.reportable_type == 'comment' ?
                  $t('Message.Components.NewDataStats.Comment') :
                  item.reportable_type == 'reply' ?
                    $t('Message.Components.NewDataStats.Reply') :
                    item.reportable_type == 'user' ?
                      $t('Message.Components.NewDataStats.User') :
                      item.reportable_type
          }}
        </span> -->
      </template>

    </v-data-table>
  </v-card>
</template>
<script>

// import UserGroupSwitchDialog from '@/components/dialog/usergroup-switch-dialog/index.vue'
import NoPermissions from '@/components/no-permissions/index.vue'
import SensitiveDataText from './components/sensitive-data-text/index.vue'
import RollDataText from './components/roll-data-text/index.vue'
import UserPopover from '@/components/user-popover/index.vue'
import {
  GetDatas,
  DeleteDatas,
  SetUsersDisableTime,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog'
import { useFabDialogStore } from '@/stores/fab-dialog'
import { useUserStore } from '@/stores/user'
import { useUpdateStore } from '@/stores/update'
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: '',
    },
    order: {
      type: String,
      default: '-update_time',// create_time, update_time, delete_time, user_id, topic_id, article_id, question_id, answer_id, comment_id, reply_id, report_id, user_group_id
    },
    toggle_exclusive_item: {
      type: Array,
      default: function () {
        return [
          {
            text: '1',
            value: 1,
          },
          {
            text: '5',
            value: 5,
          },
          {
            text: '10',
            value: 10,
          },
          {
            text: '25',
            value: 25,
          },
          {
            text: '50',
            value: 50,
          },
          {
            text: '100',
            value: 100,
          },
          {
            text: '500',
            value: 500,
          },
          {
            text: '1000',
            value: 1000,
          },
        ];
      }
    },
    reset: {
      type: Number,
      default: 0,
    },
  },
  components: {
    RollDataText,
    UserPopover,
  },
  data: () => ({
    mainStore: useMainStore(),
    dialogStore: useDialogStore(),
    fabDialogStore: useFabDialogStore(),
    userStore: useUserStore(),
    updateStore: useUpdateStore(),
    // items: [
    // {
    //   name: 'African Elephant',
    //   species: 'Loxodonta africana',
    //   diet: 'Herbivore',
    //   habitat: 'Savanna, Forests',
    // },
    // ],
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
    },
  }),
  computed: {
    ReturnUpdateGetDataTableUpdate() {
      return this.updateStore.getDataTableUpdate
    },
    Headers() {
      var headers = this.headers
      //在this.headers的最前面添加actions
      // headers.unshift({
      //   title: this.$t('Message.Components.DataTable.Actions'),
      //   value: 'actions',
      //   sortable: false,
      // })
      return headers
    },
    titleText() {
      // 定义类型到国际化键的映射
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
      };
      // 根据类型返回对应的国际化文本
      return this.$t(titleMap[this.type]);
    },
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
    },
  },
  methods: {
    async GetData() {
      // console.log('GetData')
      try {
        var token = this.$G_GetUserToken()
        this.is_loading = true
        var data = {
          type: '',
          question_id: '',
          commentable_id: '',
          commentable_type: '',
          replyable_comment_id: '',
          order: this.order,
          following: false,
          page: this.pagination.next,
          per_page: this.toggle_exclusive,
          search_keywords: this.search,
          is_admin: true,
          user_token: token,
        }
        const response = await GetDatas(this.type, data)
        if (response.data.is_get == true) {
          var keyid = this.type == 'topics' ? 'topic_id' :
            this.type == 'articles' ? 'article_id' :
              this.type == 'questions' ? 'question_id' :
                this.type == 'answers' ? 'answer_id' :
                  this.type == 'comments' ? 'comment_id' :
                    this.type == 'users' ? 'user_id' :
                      this.type == 'replys' ? 'reply_id' :
                        this.type == 'reports' ? 'report_id' :
                          this.type == 'user_groups' ? 'user_group_id' :
                            'id';
          this.data == null ? this.data = response.data.data : this.$G_FilterSameItems(keyid, this.data, response.data.data)
          this.pagination = response.data.pagination
          if (response.data.pagination.total == 0 || response.data.pagination.total == null) {
            this.IsEmpty = true
            // this.$emit('OnIsEmpty', true)
          } else {
            this.IsEmpty = false
            // this.$emit('OnIsEmpty', false)
          }
          this.is_loading = false

        } else {
          this.is_loading = false
          this.IsEmpty = true
        }
      } catch (error) {
        this.is_loading = false
        //this.$G_SAlert(this.$t('Message.Components.Account.RequestFailure'))
      }
    },
    OnEdit(select) {
      let item = null
      //如果select是数字
      if (typeof select == 'number') {
        select = this.data.find(item => item[this.itemValue] == select)
        // console.log(select)
        item = select
      } else {
        item = select
      }
      // this.fabDialogStore.setEditorFabDialog({ model: 'close' })
      this.fabDialogStore.setNewEditorFabDialog({model:false})
      switch (this.type) {
        case 'topics':
          this.dialogStore.setTopicDialog({
            model: true,
            mode: 'edit',
            edit_topic: select,
          })
          break;
        case 'articles':
          // this.fabDialogStore.setEditorFabDialog({
          //   md_title: item.title,
          //   md_topics: item.topics,
          //   md_content: item.content_rendered,
          //   edit_mode_id: item.article_id,
          //   title: this.$t('Message.Components.Editor.EditArticle'),
          //   icon: 'mdi-file-document',
          //   has_title: true,
          //   has_topic: true,
          //   submit_text: this.$t('Message.Components.Editor.Release'),
          //   edit_type: 'article',
          //   edit_mode: 'edit',
          //   model: 'maximize',
          // })
          this.fabDialogStore.setNewEditorFabDialog({
            title: this.$t('Message.Components.Editor.EditArticle'),
            icon: 'mdi-file-document',
            showTitle: true,
            showTopics: true,
            submitText: this.$t('Message.Components.Editor.Release'),
            editType: 'article',
            editMode: 'edit',
            editItem: item,
            editItemId: item.article_id,
            mdTitle: item.title,
            mdTopics: item.topics,
            mdContent: item.content_rendered,
            model: true,
          })
          break;
        case 'questions':
          // this.fabDialogStore.setEditorFabDialog({
          //   md_title: item.title,
          //   md_topics: item.topics,
          //   md_content: item.content_rendered,
          //   edit_mode_id: item.question_id,
          //   title: this.$t('Message.Components.Editor.EditQuestion'),
          //   icon: 'mdi-forum',
          //   has_title: true,
          //   has_topic: true,
          //   submit_text: this.$t('Message.Components.Editor.Release'),
          //   edit_type: 'question',
          //   edit_mode: 'edit',
          //   model: 'maximize',
          // })
          this.fabDialogStore.setNewEditorFabDialog({
            title: this.$t('Message.Components.Editor.EditQuestion'),
            icon: 'mdi-forum',
            showTitle: true,
            showTopics: true,
            submitText: this.$t('Message.Components.Editor.Release'),
            editType: 'question',
            editMode: 'edit',
            editItem: item,
            editItemId: item.question_id,
            mdTitle: item.title,
            mdTopics: item.topics,
            mdContent: item.content_rendered,
            model: true,
          })
          break;
        case 'answers':
          // this.fabDialogStore.setEditorFabDialog({
          //   md_content: item.content_rendered,
          //   edit_mode_id: item.answer_id,
          //   title: this.$t('Message.Components.Editor.EditAnswer'),
          //   icon: 'mdi-message-reply',
          //   has_title: false,
          //   has_topic: false,
          //   submit_text: this.$t('Message.Components.Editor.Release'),
          //   edit_type: 'answer',
          //   edit_mode: 'edit',
          //   answer_to_question_id: 0,
          //   model: 'maximize',
          // })
          this.fabDialogStore.setNewEditorFabDialog({
            title: this.$t('Message.Components.Editor.EditAnswer'),
            icon: 'mdi-message-reply',
            showTitle: false,
            showTopics: false,
            submitText: this.$t('Message.Components.Editor.Release'),
            editType: 'answer',
            editMode: 'edit',
            editItem: item,
            editItemId: item.answer_id,
            mdTitle: item.title,
            mdTopics: item.topics,
            mdContent: item.content_rendered,
            model: true,
          })
          break;
        case 'comments':
          this.dialogStore.setCommentReplyEditDialog({
            model: true,
            title: this.$t('Message.Components.OptionsButton.EditComment'),
            type: 'comment',
            edit_id: item.comment_id,
            content: item.content,
          })
          break;
        case 'replys':
          this.dialogStore.setCommentReplyEditDialog({
            model: true,
            title: this.$t('Message.Components.OptionsButton.EditReply'),
            type: 'reply',
            edit_id: item.reply_id,
            content: item.content,
          })
          break;
        case 'user_groups':
          this.dialogStore.setUserGroupEditDialog({
            mode: 'edit',
            edit_user_group: item,
            model: true,
          })
          break;
        case 'users':
          this.dialogStore.setEditInfoDialog({
            model: true,
            user: item,
          })
          break;
        case 'reports':
          break;
        default:
          break;
      }
    },
    // OnDelete(select_ids) {
    //   // 定义类型映射
    //   const typeMap = {
    //     topics: { id: 'topic_id', text: 'name' },
    //     articles: { id: 'article_id', text: 'title' },
    //     questions: { id: 'question_id', text: 'title' },
    //     answers: { id: 'answer_id', text: 'content_markdown' },
    //     comments: { id: 'comment_id', text: 'content' },
    //     users: { id: 'user_id', text: 'username' },
    //     replys: { id: 'reply_id', text: 'content' },
    //     reports: { id: 'report_id', text: 'reason', isI18n: true },
    //     user_groups: { id: 'user_group_id', text: 'user_group_name' }
    //   };

    //   // 获取当前类型的映射
    //   const map = typeMap[this.type];
    //   // 提取数据ID
    //   const data_ids =  select_ids //select_ids.map(x => x[map.id]);
    //   // 提取预览文本
    //   const delete_preview_text_arr = map.isI18n
    //     ? select.map(x => this.$t(x[map.text]))
    //     : select.map(x => x[map.text]);
    //   // 转换类型名称（去掉末尾的's'）
    //   const type = this.type.replace(/s$/, '');

    //   this.dialogStore.setDeleteDialog({
    //     type,
    //     item: this.item,
    //     item_ids: data_ids,
    //     delete_preview_text: delete_preview_text_arr,
    //     model: true,
    //   });
    // },

    OnDelete(select_ids) {
      // var data_item = this.data
      var data_ids = select_ids
      var delete_preview_text_arr = []
      switch (this.type) {
        case 'topics':
          // data_ids = select.map(x => x.topic_id)
          delete_preview_text_arr = this.data.filter(x => select_ids.includes(x.topic_id)).map(x => x.name)
          break;
        case 'articles':
          // data_ids = select.map(x => x.article_id)
          delete_preview_text_arr = this.data.filter(x => select_ids.includes(x.article_id)).map(x => x.title)
          break;
        case 'questions':
          // data_ids = select.map(x => x.question_id)
          delete_preview_text_arr = this.data.filter(x => select_ids.includes(x.question_id)).map(x => x.title)
          break;
        case 'answers':
          // data_ids = select.map(x => x.answer_id)
          delete_preview_text_arr = this.data.filter(x => select_ids.includes(x.answer_id)).map(x => x.content_markdown)
          break;
        case 'comments':
          // data_ids = select.map(x => x.comment_id)
          delete_preview_text_arr = this.data.filter(x => select_ids.includes(x.comment_id)).map(x => x.content)
          break;
        case 'users':
          // data_ids = select.map(x => x.user_id)
          delete_preview_text_arr = this.data.filter(x => select_ids.includes(x.user_id)).map(x => x.username)
          break;
        case 'replys':
          // data_ids = select.map(x => x.reply_id)
          delete_preview_text_arr = this.data.filter(x => select_ids.includes(x.reply_id)).map(x => x.content)
          break;
        case 'reports':
          // data_ids = select.map(x => x.report_id)
          delete_preview_text_arr = this.$t(this.data.filter(x => select_ids.includes(x.report_id)).map(x => x.reason))
          break;
        case 'user_groups':
          // data_ids = select.map(x => x.user_group_id)
          delete_preview_text_arr = this.data.filter(x => select_ids.includes(x.user_group_id)).map(x => x.user_group_name)
          break;
      }
      //把this.type最后面的s去掉
      var type = this.type.substring(0, this.type.length - 1)

      this.dialogStore.setDeleteDialog({
        type: type,
        item: this.item,
        item_ids: data_ids,
        delete_preview_text: delete_preview_text_arr,
        model: true,
      })
    },
    async SetUsersDisableTime(user_ids, disable_time) {
      // console.log(user_ids)
      // console.log(disable_time)
      var user_token = this.$G_GetUserToken()
      var data = {
        // user_ids: user_ids.map(x => x.user_id),
        user_ids: user_ids,
        disable_time: disable_time,
        user_token: user_token
      }
      const res = await SetUsersDisableTime(data)
      if (res.data.is_delete == true) {
        // this.$G_SAlert(this.$t('Message.Components.DataTable.DeletedSuccessfully'))
        this.ResetLoadingData()
      }
    },
    //这里是在用户页选中多个用户更新用户组的
    OnSetUsersUseGroup(user_ids) {
      // console.log(user_ids)

      // this.ugs_selector_user_ids = user_ids.map(x => x.user_id)
      // console.log(this.ugs_selector_user_ids)
      // this.ugs_model = true

      // console.log(user_ids)
      //从this.data中根据user_ids获取用户组ID
      // const user_group_ids = this.data.filter(x => user_ids.map(x => x.user_id).includes(x.user_id)).map(x => x.user_group_id)
      // console.log(user_group_ids)
      // return

      this.dialogStore.setUserGroupSwitchDialog({
        model: !this.dialogStore.getUserGroupSwitchDialog.model,
        user_ids: user_ids,
        // selector_user_group_id: 0,
      })
    },
    OnSetUserGroupToNewUserGroup(user_group_id) {
      // console.log(user_group)
      // const user_group_id = user_group.user_group_id
      // if (user_group_id) {
      //   this.ugs_selector_user_group_id = user_group_id
      //   this.$forceUpdate()
      //   // console.log(this.ugs_selector_user_group_id)
      //   this.ugs_model = true
      // }

      // alert("暂未实现")

      this.dialogStore.setUserGroupSwitchDialog({
        model: !this.dialogStore.getUserGroupSwitchDialog.model,
        user_group_id: user_group_id,
      })
    },
    //刷新数据
    ResetLoadingData() {
      this.selected = []
      this.data = null
      this.pagination.next = this.pagination.previous + 1

      this.$forceUpdate()
      this.GetData()
    },
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
    PreviousLoading() {
      this.data = null
      var pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: this.pagination.previous
      }
      this.pagination = pagination
      this.GetData()
    },
    NextLoading() {
      this.data = null
      var pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: this.pagination.next
      }
      this.pagination = pagination
      this.GetData()
    },
  },
  created() {
    this.GetData()
  },
  watch: {
    toggle_exclusive(val) {
      this.ResetLoading()
    },
    search(val) {
      this.ResetLoading()
    },
    selected(val) {
      // console.table(val)
    },
    reset(val) {
      if (val > 0) {
        this.ResetLoadingData()
      }
    },
    ReturnUpdateGetDataTableUpdate(val) {
      this.ResetLoadingData()
    },
  },
}
</script>
