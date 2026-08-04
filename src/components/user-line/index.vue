<template>
    <!-- <ListItem type="users" :item="user" :title="user.username" :subtitle="user.headline" /> -->

     
  <v-list style="padding: 16px 0;" >
    <v-list-item rounded="lg" v-if="user" :to="!is_reply ? `${$G_UrlHeaderLang()}/users/${user.user_id}` : ''" 
      style="padding-left: 0;"
    >
    <template v-slot:prepend>
      <UserPopover :user="user" :small_avatar="small_avatar" :is_reply="is_reply"/>
    </template>
      <!-- <v-list-item-content> -->
        <v-list-item-title>

          <span v-if="user != null"
            :class="
              user.user_id==$G_GetUserID()?'primary--text':''
            "
            @click="$router.push(`${$G_UrlHeaderLang()}/users/${user.user_id}`)"
            style="text-decoration:none;cursor: pointer;"
            >{{ user.username }}
          </span>

          <span class="grey--text"> {{ is_reply ? $t('Message.Components.Comments.Item.Reply') : ''  }} </span>

          <span v-if="is_reply && reply_user != null"
            :class="
              reply_user.user_id==$G_GetUserID()?'primary--text':''
            "
            @click="$router.push(`${$G_UrlHeaderLang()}/users/${reply_user.user_id}`)" 
            style="text-decoration:none;cursor: pointer;"
            >{{ reply_user.username }}
          </span>
          
        </v-list-item-title>
        <v-list-item-subtitle v-if="!is_reply" v-text="user.headline"></v-list-item-subtitle>
      <!-- </v-list-item-content> -->
        <template v-slot:append>
      <v-list-item-action>
        <!-- <span >{{ time }}</span> -->
        <v-list-item-subtitle>{{ time }}</v-list-item-subtitle>
      </v-list-item-action>
        </template>
    </v-list-item>
  </v-list>


</template>
<script>
import UserPopover from '@/components/user-popover/index.vue'
export default {
  name: 'user-line',
  props: {
    user: {
      type: Object,
      default: null,
    },
    time: {
      type: String,
      default: null,
    },
    is_reply: {
      type: Boolean,
      default: false,
    },
    reply_user: {
      type: Object,
      default: null,
    },
    small_avatar: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UserPopover,
      },
  data() {
    return {
      gradientColors: [
        '#ff0000',
        '#00ff00',
      ],
      gradientIndex: 0,
    };
  },
}
</script>
