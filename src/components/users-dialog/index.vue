<template>
  




  <v-dialog v-model="model" :fullscreen="mainStore.getMobile" max-width="530px" scrollable>
    <v-card rounded="lg" >
      <v-toolbar :title="dialogStore.getUsersDialog.modes == 'followers' ?
        $t('Message.Components.UsersDialog.FollowersN', { value: pagination.total }) :
        $t('Message.Components.UsersDialog.FolloweesN', { value: pagination.total })">


        <template v-slot:append>
          <v-btn  icon @click="model = !model">
            <v-icon>
              mdi-close
            </v-icon>
            <v-tooltip activator="parent" location="left">{{ $t('Message.Components.DialogClass.Close') }}</v-tooltip>
          </v-btn>
        </template>


        

      </v-toolbar>

      <v-card-text>
        <v-list rounded="lg" v-if="!is_empty && data != null" lines="two">
          <v-list-item rounded="lg" v-for="(user, index) in data" :title="user.username" :key="index" :subtitle="user.headline"
            :to="$G_UrlHeaderLang() + '/users/' + user.user_id" :prependAvatar="$G_ImgHandle(user.avatar.small)">

            <template v-slot:append>
              <FollowButton v-if="userStore.getUser.user_id != user.user_id" :followable_id="user.user_id"
                followable_type="user" :is_follow="user.is_follow" />
            </template>
          </v-list-item>
        </v-list>
        <Loading :empty="data == null" :need_margin_bottom="false" :loading="is_loading" :pagination="pagination"
          @autoload="GetFollows" />
      </v-card-text>

    </v-card>
  </v-dialog>
</template>
<script>
import Loading from '@/components/loading/index.vue'
import FollowButton from '@/components/follow-button/index.vue'
// import CommonDialog from '@/components/dialog/common-dialog/index.vue'
import {
  GetFollows
} from '@/api/global.js';
import { useDialogStore } from '@/stores/dialog';
import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/main';
// import { useUpdateStore } from '@/stores/update'
export default {
  name: 'users-dialog',
  props: {
    // id: {
    //   Number,
    //   default: 0
    // },
    // type: {
    //   String,
    //   default: '',
    // },
    // modes: {
    //   String,
    //   default: 'followers',
    // },
    // model: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  computed: {
    model: {
      get() {
        return this.dialogStore.getUsersDialog.model
      },
      set(val) {
        this.dialogStore.setUsersDialog({ model: val })
      }
    },
    // modes: {
    //   get() {
    //     return this.dialogStore.getUsersDialog.modes
    //   },
    //   set(val) {
    //     this.dialogStore.setUsersDialog({modes: val})
    //   }
    // },
    // type: {
    //   get() {
    //     return this.dialogStore.getUsersDialog.type
    //   },
    //   set(val) {
    //     this.dialogStore.setUsersDialog({type: val})
    //   }
    // },
    // id: {
    //   get() {
    //     return this.dialogStore.getUsersDialog.id
    //   },
    //   set(val) {
    //     this.dialogStore.setUsersDialog({id: val})
    //   }
    // },
  },
  components: {
    Loading,
    // Empty,
    FollowButton,
    // CommonDialog,
  },
  data: () => ({
    dialogStore: useDialogStore(),
    userStore: useUserStore(),
    mainStore: useMainStore(),
    // updateStore: useUpdateStore(),
    // vmodel: false,
    is_loading: false,
    is_empty: true,
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
    goto(id) {
      // this.vmodel = false
      this.dialogStore.setUsersDialog({ model: false })
      this.$router.push(`${this.$G_UrlHeaderLang()}/users/${id}`)
    },
    async GetFollows() {
      if (this.is_loading) {
        return
      }
      this.is_loading = true
      const response = await GetFollows({
        modes: this.dialogStore.getUsersDialog.modes,
        followable_type: this.dialogStore.getUsersDialog.type,
        followable_id: this.dialogStore.getUsersDialog.id,
        page: this.pagination.next,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('user_id', this.data, response.data.data)
        this.pagination = response.data.pagination
        if (response.data.pagination.total == 0 || response.data.pagination.total == null) {
          this.is_empty = true
        } else {
          this.is_empty = false
        }
      }
      this.is_loading = false
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
    }
  },
  watch: {
    model(val) {
      this.ResetData()
      if (val) {
        this.GetFollows()
        // this.vmodel = val
      } else {
        //  this.updateStore.se
      }
    },
    // vmodel(val) {
    //   if (!val) {
    //     this.$emit('model', val)
    //   }
    // },
    '$route'() {
      // this.vmodel = false
      this.dialogStore.setUsersDialog({ model: false })
    },
  },
}
</script>