<!-- <script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const user = userStore.getUser
</script> -->

<template>
  <v-container id="page-user">
    <User :user="user" @update_user="OnUpdateUser" />
    <Contexts v-if="user != null" :user="user" />
  </v-container>
</template>
<script>
import { useUserStore } from '@/stores/user'
import {
  GetUser,
  Get_G_USER,
} from '@/api/global.js';
import User from './components/user/index.vue'
import Contexts from './components/contexts/index.vue'
// import EditInfoDialog from '@/components/dialog/edit-info-dialog/index.vue'
// import DeviceList from '@/components/hiage-content/device-list/index.vue'
import { useUpdateStore } from '@/stores/update'
export default {
  components: {
    User,
    Contexts,
    // EditInfoDialog,
    // DeviceList,
  },
  data: () => ({
    userStore: useUserStore(),
    updateStore: useUpdateStore(),
    // tab_item: 'question',
    user: null,
  }),
  computed: {
    ReturnUpdateGetUserUpdate() {
      return this.updateStore.getUserUpdate
    },
    ReturnGetIsLogin() {
      return this.userStore.getIsLogin
    },
    ShowAssetList() {
      //需要域名中包含xbedrock.com且用户ID为1
      return window.location.href.includes('xbedrock.com') && this.user != null && this.user.user_id == 1;
    },
  },
  methods: {
    async GetUser() {
      // console.log('this.$route.params.user_id', this.$route.params.user_id)
      this.user = null
      const USER = Get_G_USER()
      // console.log('USER', USER)
      if (USER !== null) {
        this.user = USER.user
        return
      }

      const response = await GetUser({
        user_id: this.$route.params.user_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get) {
        this.user = response.data.user
      }
    },
    // 头像/封面上传成功后，立即用后端返回的最新用户数据更新页面，并同步全局登录用户
    OnUpdateUser(user) {
      this.user = user
      this.userStore.setUser(user)
    }
  },
  created() {
    this.GetUser()
  },
  watch: {
    '$route.params.user_id'(val) {
      // console.log('val', val)
      if (val == '' || val == undefined) {
        return;
      }
      this.GetUser()
    },
    ReturnUpdateGetUserUpdate(val) {
      this.GetUser()
    },
    ReturnGetIsLogin(val) {//让其在登录时重新请求，以免用户编辑时出现字段空缺
      this.GetUser()
    },
  },
};
</script>
<style lang="less">
@import './index.less';

</style>
