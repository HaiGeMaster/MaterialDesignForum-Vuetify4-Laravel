<template>

   <v-btn icon class="edit" variant="tonal" :disabled="!userStore.getUser.user_group.ability_edit_own_info" @click="
      Set_EditInfoDialog
   ">
      <v-icon>
         mdi-pencil
      </v-icon>
      <v-tooltip activator="parent" location="top">{{ $t('Message.Client.User.User.EditProfile') }}</v-tooltip>
   </v-btn>
</template>
<script>
import { useUserStore } from '@/stores/user';
import { useDialogStore } from '@/stores/dialog';
export default {
   props: {
      user: {
         type: Object,
         default: null
      }
   },
   data() {
      return {
         userStore: useUserStore(),
         dialogStore: useDialogStore(),
         _user: null,
      }
   },
   methods: {
      Set_EditInfoDialog() {
         // if (!this.userStore.getUser.user_group.ability_edit_own_info) {
         //    return
         // }
         // console.log(this._user)
         this.dialogStore.setEditInfoDialog({
            model: true,
            user: this._user
         })
      }
   },
   watch: {
      user: {
         handler(newVal, oldVal) {
            if (newVal != null) {
               this._user = newVal
            } else {
               this._user = null
            }
         },
         deep: true,
         immediate: true
      }
   }
}
</script>