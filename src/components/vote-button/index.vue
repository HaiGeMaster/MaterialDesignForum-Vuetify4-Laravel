<template>
  <div class="mc-vote">
    <v-tooltip :text="$t('Message.Components.VoteButton.Up')" location="top">
      <template v-slot:activator="{ props }">
        <v-btn   :size="size" v-bind="props" icon variant="plain" style="margin-right: 2px;" :loading="up_is_loading" 
          @click.stop.prevent="Vote(vote.votable_id, vote.votable_type, 'up')">
          <v-badge bordered offset-x="-8" offset-y="-8" color="primary" :content="up_count" :model-value="up_count > 0">
            <v-icon size="small" :color="up_value ? 'primary' : ''
              ">
              {{ up_value ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}
            </v-icon>
          </v-badge>
        </v-btn>
      </template>
    </v-tooltip>
    <!-- :disabled="!userStore.getUser.user_group.ability_vote" -->
    <v-tooltip :text="$t('Message.Components.VoteButton.Down')" location="top">
      <template v-slot:activator="{ props }">
        <v-btn   :size="size" v-bind="props" icon variant="plain" :loading="down_is_loading"
          @click.stop.prevent="Vote(vote.votable_id, vote.votable_type, 'down')"
          
          >
          <v-badge bordered offset-x="-8" offset-y="-8" color="primary" :content="down_count" :model-value="down_count > 0">
            <v-icon size="small" :color="down_value ? 'primary' : ''
              ">
              {{ down_value ? 'mdi-thumb-down' : 'mdi-thumb-down-outline' }}
            </v-icon>
          </v-badge>
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>
<script>
import {
  Vote
} from '@/api/global.js'
import { useUserStore } from '@/stores/user.js'
import { useDialogStore } from '@/stores/dialog.js'
import { useSnackbarStore } from '@/stores/snackbar'
export default {
  name: 'vote',
  components: {
  },
  props: {
    vote: {
      type: Object,
      default: null,
    },
    vote_down_count: {
      type: Number,
      default: 0,
    },
    vote_up_count: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
      snackbarStore: useSnackbarStore(),
      up_is_loading: false,
      down_is_loading: false,
      up_count: 0,
      down_count: 0,
      up_value: false,
      down_value: false,
    };
  },
  methods: {
    async Vote(votable_id, votable_type, type) {
      if (!this.userStore.getIsLogin) {
        // this.$store.dispatch('Dialog/Set_LoginDialog', true)
        // this.$store.dispatch('Snackbar/Show_Snackbar', {
        //   text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
        // })
        this.dialogStore.setLoginDialog(true)
        this.snackbarStore.addMessage({ text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'), color: 'error' })
        return
      }
      if(!this.userStore.getUser.user_group.ability_vote){
        this.snackbarStore.addMessage({ text: this.$t('Message.App.InsufficientPermissions'), color: 'warning' })
        return
      }
      if (type == 'up') {
        this.up_is_loading = true;
      } else if (type == 'down') {
        this.down_is_loading = true;
      }
      const response = await Vote({
        user_token: this.$G_GetUserToken(),
        votable_id: votable_id,
        votable_type: votable_type,
        type: type,
      });
      this.up_count = response.data.vote.up.count
      this.down_count = response.data.vote.down.count
      this.up_value = response.data.vote.up.value
      this.down_value = response.data.vote.down.value
      this.up_is_loading = false;
      this.down_is_loading = false;
      this.$forceUpdate();
    }
  },
  watch: {
    vote: {
      handler(val) {
        if (!val) {
          return
        }
        this.up_count = val.up.count
        this.down_count = val.down.count
        this.up_value = val.up.value
        this.down_value = val.down.value
      },
      immediate: true,
      deep: true
    },
  }
}
</script>
<style lang="less">
// @import './index.less';
// </style>
