<template>

  <v-dialog v-model="vmodel" :fullscreen="mainStore.getMobile" max-width="530px" scrollable>
    <v-card rounded="lg">
      <v-toolbar :title="title || $t('Message.Components.DrawerNavigation.UserGroup')">


        <template v-slot:prepend>
          <v-btn  icon @click="vmodel = !vmodel">
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
import Loading from '@/components/loading/index.vue'
import {
  GetUserGroups
} from '@/api/global.js'
import { useMainStore } from '@/stores/main'
import { useUpdateStore } from '@/stores/update';
// const mainStore = useMainStore()
export default {
  name: 'usergroup-selector-dialog',
  props: {
    // pre_selected_usergroup_id: {
    //   Number,
    //   default: 0
    // },
    model: {
      Boolean,
      default: false
    },
    title: {
      String,
      default: ''
    },
  },
  components: {
    Loading,
  },
  data: () => ({
    mainStore: useMainStore(),
    updateStore: useUpdateStore(),
    vmodel: false,
    selector_index: [],
    // selector_usergroups: [],
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
          // for (var j = 0; j < this.data.length; j++) {
          //   if (this.pre_selected_usergroup_id == this.data[j].user_group_id) {
          //     this.selector_index = j
          //     break
          //   }
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
      this.selector_index = []
    },
    OnSelect() {
      // console.log(this.selector_index[0])

      this.$emit('select', this.selector_index[0])
      // this.updateStore.setDataTableUpdate(0)
      this.vmodel = false
    },
  },
  watch: {
    selector_index(val, oldVal) {
      // console.log(val)
      // if (val = []) {
      //   this.selector_index = oldVal
      // }
    },
    search_text(val) {
      this.search_keywords = val
      this.ResetData()
      this.GetUserGroups()
    },
    model(val) {
      this.vmodel = val
    },
    vmodel(val) {
      if (!val) {
        this.$emit('model', this.model)
      } else {
        this.ResetData()
        this.GetUserGroups()
      }
    },
  },
}
</script>