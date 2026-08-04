<template>
  <v-dialog v-model="model" :fullscreen="mainStore.getMobile" max-width="530px" scrollable>
    <v-card rounded="lg">
      <v-toolbar :title="(store_user_group_id != null ?
        $t('Message.Components.UserGroupSwitchDialog.UserGroupUserMove') :
        $t('Message.Components.UserGroupSwitchDialog.UserGroupSwitchDescriptionN', {
          value: user_ids_count
        })
      ) || $t('Message.Components.DrawerNavigation.UserGroup')">
      <!-- value: store_user_ids==[]?0:store_user_ids.length -->
        <template v-slot:prepend>
          <v-btn  icon @click="model = !model">
            <v-icon>
              mdi-close
            </v-icon>
            <v-tooltip activator="parent" location="right">{{ $t('Message.Components.DialogClass.Close') }}</v-tooltip>
          </v-btn>
        </template>
        <template v-slot:append>
          <v-btn  icon variant="text" :loading="is_loading" @click="OnSelect()" :disabled="selector_index.length == 0">
            <v-icon>
              mdi-check
            </v-icon>
            <v-tooltip activator="parent" location="left">{{ $t('Message.Admin.Options.Save') }}</v-tooltip>
          </v-btn>
        </template>
      </v-toolbar>
      <v-card-text>
        <v-text-field color="primary"   :label="$t('Message.Components.Search.Search')" hide-details variant="outlined"
          append-inner-icon="mdi-magnify" v-model="search_text" @keydown="">
        </v-text-field>
        <v-list rounded="lg" v-model:selected="selector_index" select-strategy="single-leaf" color="primary">
          <v-list-item v-for="(item, i) in data" :title="$t(item.user_group_name)" rounded="lg" :key="i"
            :value="item.user_group_id" :subtitle="item.user_group_id">
            <template v-slot:prepend>
              <v-icon>{{ item.user_group_icon }}</v-icon>
            </template>
          </v-list-item>
        </v-list>
        <Loading :empty="data == null" :loading="is_loading" :pagination="pagination" :need_margin_bottom="false"
          @autoload="GetUserGroups" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  GetUserGroups,
  SetUsersUserGroup,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog';
import { useUpdateStore } from '@/stores/update';
export default {
  name: 'usergroup-selector-dialog',
  props: {
  },
  components: {
  },
  computed: {
    model: {
      get() {
        this.store_user_ids = this.dialogStore.getUserGroupSwitchDialog.user_ids
        this.store_user_group_id = this.dialogStore.getUserGroupSwitchDialog.user_group_id
        return this.dialogStore.getUserGroupSwitchDialog.model
      },
      set(val) {
        this.dialogStore.setUserGroupSwitchDialog({
          model: val,
        })
      }
    },
    user_ids_count() {
      try {
        return this.store_user_ids.length??0
      } catch (error) {
        return 0
      }
    }
  },
  data: () => ({
    mainStore: useMainStore(),
    dialogStore: useDialogStore(),
    updateStore: useUpdateStore(),
    store_user_ids: [], 
    store_user_group_id: null, 
    is_loading: false,
    search_text: '',
    selector_index: [],
    search_keywords: '',
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
    async GetUserGroups() {
      try {
        this.is_loading = true
        const response = await GetUserGroups({
          search_keywords: this.search_keywords,
          order: '-update_time',
          page: this.pagination.next,
          user_token: this.$G_GetUserToken(),
        })
        if (response.data.is_get == true) {
          this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('user_group_id', this.data, response.data.data)
          this.pagination = response.data.pagination
        }
        this.is_loading = false
      } catch (error) {
        this.is_loading = false
      }
    },
    async SetUsersUserGroup(usergroup_id) {
      try {
        this.is_loading = true
        const response = await SetUsersUserGroup({
          user_ids: this.store_user_ids,
          user_group_id: usergroup_id,
          old_user_group_id: this.store_user_group_id,
          user_token: this.$G_GetUserToken(),
        })
        if (response.data.is_set == true) {
          this.$emit('select', this.selector_index[0])
          this.model = false
        } else {
          this.model = true
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
      this.usergroup_id = 0
      this.selector_index = []
    },
    OnSelect() {
      // console.log(this.selector_index[0])
      this.SetUsersUserGroup(this.selector_index[0])
    },
  },
  watch: {
    selector_index(val, oldVal) {
      // console.log(val)
    },
    search_text(val) {
      this.search_keywords = val
      this.ResetData()
      this.GetUserGroups()
    },
    model(val) {
      this.model = val
    },
    model(val) {
      if (!val) {
      } else {
        this.ResetData()
        this.GetUserGroups()
      }
    },
  },
}
</script>