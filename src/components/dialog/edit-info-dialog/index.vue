<template>
  <v-dialog v-model="model" :fullscreen="mainStore.getMobile" max-width="530px" scrollable>
    <v-card rounded="lg">
      <v-toolbar :title="$t('Message.Components.EditInfoDialog.EditInfo')">


        <template v-slot:prepend>
          <v-btn icon @click="model = !model">
            <v-icon>
              mdi-close
            </v-icon>
            <v-tooltip activator="parent" location="right">{{ $t('Message.Components.DialogClass.Close') }}</v-tooltip>
          </v-btn>

        </template>


        <template v-slot:append>

          <OptionsButton v-if="$route.path.includes('/admin')" type="user" :item="user" :is_admin="is_admin"
            @reset_avatar="model = !model" @reset_cover="model = !model" />

          <v-btn icon variant="text" :loading="is_loading" @click="OnSubmitEditInfo()">
            <v-icon>
              mdi-check
            </v-icon>
            <v-tooltip activator="parent" location="left">{{ $t('Message.Admin.Options.Save') }}</v-tooltip>
          </v-btn>

        </template>

      </v-toolbar>

      <v-card-text>
        <v-form ref="form">
          <v-text-field color="primary"   variant="underlined" v-if="is_admin" v-model="EMail" counter="100" maxlength="100"
            :label="$t('Message.Components.EditInfoDialog.Email')"
            :placeholder="$t('Message.Components.EditInfoDialog.Email')" :rules="[
              v => !!v || $t('Message.Components.EditInfoDialog.CannotBeEmpty'),
              v => (v || '').length <= 100 || $t('Message.Components.EditInfoDialog.LengthCannotExceedNCharacters', { value: 100 }),
            ]"></v-text-field>
          <v-text-field color="primary"   variant="underlined" v-model="UserName" counter="100" maxlength="100"
            :label="$t('Message.Components.EditInfoDialog.UserName')"
            :placeholder="$t('Message.Components.EditInfoDialog.UserName')" :rules="[
              v => !!v || $t('Message.Components.EditInfoDialog.CannotBeEmpty'),
              v => (v || '').length <= 100 || $t('Message.Components.EditInfoDialog.LengthCannotExceedNCharacters', { value: 100 }),
            ]"></v-text-field>

          <!-- <v-text-field color="primary"   variant="underlined" v-model="UserGroupName" @click="UGmodel = true" disabled
            :label="$t('Message.Components.DrawerNavigation.UserGroup')" v-if="is_admin"
            :placeholder="$t('Message.Components.DrawerNavigation.UserGroup')">
            <template v-slot:append-outer>
              <v-btn rounded="lg"  icon @click="UGmodel = true">
                <v-icon>
                  mdi-account-search-outline
                </v-icon>
              </v-btn>
            </template>
          </v-text-field> -->

          <v-text-field color="primary"   variant="underlined" v-model="OneSentenceIntroduction" counter="40" maxlength="40"
            :label="$t('Message.Components.EditInfoDialog.OneSentenceIntroduction')"
            :placeholder="$t('Message.Components.EditInfoDialog.OneSentenceIntroduction')" :rules="[
              v => (v || '').length <= 40 || $t('Message.Components.EditInfoDialog.LengthCannotExceedNCharacters', { value: 40 }),
            ]"></v-text-field>
          <v-text-field color="primary"   variant="underlined" v-model="PersonalHomepage" counter="40" maxlength="40"
            :label="$t('Message.Components.EditInfoDialog.PersonalHomepage')"
            :placeholder="$t('Message.Components.EditInfoDialog.PersonalHomepage')" :rules="[
              v => (v || '').length <= 40 || $t('Message.Components.EditInfoDialog.LengthCannotExceedNCharacters', { value: 40 }),
            ]"></v-text-field>
          <v-text-field color="primary"   variant="underlined" v-model="AffiliatedSchoolOrEnterprise" counter="80" maxlength="80"
            :label="$t('Message.Components.EditInfoDialog.AffiliatedSchoolOrEnterprise')"
            :placeholder="$t('Message.Components.EditInfoDialog.AffiliatedSchoolOrEnterprise')" :rules="[
              v => (v || '').length <= 80 || $t('Message.Components.EditInfoDialog.LengthCannotExceedNCharacters', { value: 40 }),
            ]"></v-text-field>
          <v-text-field color="primary"   variant="underlined" v-model="Location" counter="80" maxlength="80"
            :label="$t('Message.Components.EditInfoDialog.Location')"
            :placeholder="$t('Message.Components.EditInfoDialog.Location')" :rules="[
              v => (v || '').length <= 80 || $t('Message.Components.EditInfoDialog.LengthCannotExceedNCharacters', { value: 80 }),
            ]"></v-text-field>
          <v-textarea variant="underlined" v-model="PersonalIntroduction" counter="160" maxlength="160"
            :label="$t('Message.Components.EditInfoDialog.PersonalIntroduction')"
            :hint="$t('Message.Components.EditInfoDialog.PersonalIntroduction')" :rules="[
              v => (v || '').length <= 160 || $t('Message.Components.EditInfoDialog.LengthCannotExceedNCharacters', { value: 160 }),
            ]"></v-textarea>
        </v-form>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>
<script>
// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'

import OptionsButton from '@/components/options-button/index.vue'
// import UserGroupSelectorDialog
import {
  EditInfo,
  GetUserGroups,
  GetUserGroup,
} from '@/api/global.js'

import { useMainStore } from '@/stores/main';
import { useDialogStore } from '@/stores/dialog';
import { useUserStore } from '@/stores/user';
import { useSnackbarStore } from '@/stores/snackbar'
export default {
  name: 'edit-info-dialog',
  props: {
    // user: {
    //   type: Object,
    //   default: null,
    // },
    // model: {
    //   type: Boolean,
    //   default: false,
    // },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    model: {
      get() {
        return this.dialogStore.getEditInfoDialog.model
      },
      set(val) {
        this.dialogStore.setEditInfoDialog({
          model: val,
        })
      }
    }
  },
  data: () => ({
    mainStore: useMainStore(),
    dialogStore: useDialogStore(),
    userStore: useUserStore(),
    snackbarStore: useSnackbarStore(),
    UGmodel: false,
    user: null,
    // model: false,
    EMail: '',
    UserName: '',
    UserGroupName: '',
    UserGroupID: '',
    OneSentenceIntroduction: '',
    PersonalHomepage: '',
    AffiliatedSchoolOrEnterprise: '',
    Location: '',
    PersonalIntroduction: '',
    is_loading: false,
    search_user_group: null,
    search_user_group_value: '',
    search_user_group_data: [],
    search_user_group_is_loading: false,
  }),
  components: {
    // Confirm,
    // Cancel,
    OptionsButton,
    // UserGroupSelectorDialog:() => import('@/components/dialog/usergroup-selector-dialog/index.vue')
  },
  watch: {
    // user: {
    //   handler: function (val, oldVal) {
    //     if (val != null) {
    //       this.EMail = val.email;
    //       this.UserName = val.username;
    //       this.UserGroupID = val.user_group_id;
    //       this.OneSentenceIntroduction = val.headline;
    //       this.PersonalHomepage = val.blog;
    //       this.AffiliatedSchoolOrEnterprise = val.company;
    //       this.Location = val.location;
    //       this.PersonalIntroduction = val.bio;

    //       this.GetUserGroup()
    //     }
    //   },
    //   deep: true
    // },
    model(val) {
      // console.log(val)
      // this.model = val

      if (val) {
        const user = this.dialogStore.getEditInfoDialog.user
        if (user != null) {
          this.user = user
          this.EMail = user.email;
          this.UserName = user.username;
          this.UserGroupID = user.user_group_id;
          this.OneSentenceIntroduction = user.headline;
          this.PersonalHomepage = user.blog;
          this.AffiliatedSchoolOrEnterprise = user.company;
          this.Location = user.location;
          this.PersonalIntroduction = user.bio;
          this.GetUserGroup()
        }
      }
    },
    // model(val) {
    //   // console.log(val)
    //   if (val == false) {
    //     this.$emit('model', val)
    //   }
    // },
    search_user_group_value(val) {
      // console.log(val)
      // this.GetUserGroups()
      // console.log(this.UserGroupID)
    }
  },
  methods: {
    async GetUserGroup() {
      const data = await GetUserGroup({
        user_group_id: this.UserGroupID,
        user_token: this.$G_GetUserToken()
      })
      // console.log(data)
      if (data.data.is_get == true) {
        this.UserGroupName = this.$t(data.data.user_group.user_group_name)
        // console.log(this.UserGroupName)
      }
    },
    async OnSubmitEditInfo() {

      if (!this.userStore.getUser.user_group.ability_edit_own_info) {
        this.snackbarStore.addMessage({ text: this.$t('Message.App.InsufficientPermissions'), color: 'warning' })
        return
      }

      if (this.is_loading) {
        return
      }
      // console.log(this.user)
      this.is_loading = true;
      if (this.$refs.form.validate() == false || this.user == null) {
        return
      }
      // console.log(this.user)
      const response = await EditInfo({
        email: this.EMail,
        username: this.UserName,
        user_group_id: this.UserGroupID,
        headline: this.OneSentenceIntroduction || '',
        blog: this.PersonalHomepage || '',
        company: this.AffiliatedSchoolOrEnterprise || '',
        location: this.Location || '',
        bio: this.PersonalIntroduction || '',
        edit_target_user_id: this.user.user_id,
        user_token: this.$G_GetUserToken(),
      })
      // console.log(response)
      if (response.data.is_edit) {
        this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin() ? this.$t('Message.Components.Snackbar.Updated') : this.$t(`Message.Components.Snackbar.YouUserInfoHasBeenEdited`), color: 'success' })
        this.$emit('edit_user', response.data.user)
        this.model = false
      }
      this.is_loading = false;
    },
    async GetUserGroups() {
      this.search_user_group_is_loading = true
      const response = await GetUserGroups({
        order: '+user_group_id',
        page: 1,
        user_token: this.$G_GetUserToken(),
        search_keywords: this.search_user_group_value || '',
      })
      // console.log(response)
      if (response.data.is_get) {
        // console.log(response.data)
        // response.data.data.map((item) => {
        //   // item.text = item.user_group_name
        //   // item.value = item.user_group_id
        //   this.search_user_group_data.push({
        //     text: item.user_group_name,
        //     value: item.user_group_id,
        //   })
        // })
        // // this.search_user_group_data

        this.search_user_group_data = []
        this.$forceUpdate()

        for (let i = 0; i < response.data.data.length; i++) {
          this.search_user_group_data.push({
            text: response.data.data[i].user_group_name,
            value: response.data.data[i].user_group_id,
          })
        }
        // console.log(this.search_user_group_data)
        this.$forceUpdate()

        this.search_user_group_is_loading = false
      }
      this.search_user_group_is_loading = false
    },
  },
}
</script>
