<template>
  <!-- color="surface-variant" variant="outlined" elevation="0" -->
  <v-card :rounded="$G_Rounded()"  class="user " elevation="2">

    <div v-if="user" class="cover" ref="cover" :style="{
      backgroundImage: `url(${$G_ImgHandle(user.cover.large)})`,
    }">

      <v-chip style="top: 16px;left: 8px;" v-show="user.user_group.user_group_icon_show" class="ma-2"
        :color="user.user_group.user_group_color" variant="tonal">
        <v-icon :icon="user.user_group.user_group_icon" start></v-icon>
        {{ $t(user.user_group.user_group_name) }}
      </v-chip>
      <v-spacer></v-spacer>

      <div class="mc-cover-upload">
        <v-btn  variant="text" icon="mdi-camera" class="upload-btn" @click="handleFileSelectCover"
          :loading="upload_cover_loading">
        </v-btn>
      </div>
    </div>
    <!-- <div v-else class="cover skeleton-background"></div> -->
    <div v-else class="cover">
      <v-skeleton-loader class="cover-skeleton" type="image" ></v-skeleton-loader>
    </div>

    <div v-if="user" class="info">
      <div class="avatar-box">

        <div class="mc-avatar-upload">
          <v-btn  variant="text" icon="mdi-camera" class="upload-btn" @click="handleFileSelectAvatar"
            :loading="upload_avatar_loading">
          </v-btn>
        </div>

        <img :src="$G_ImgHandle(user.avatar.large)" class="avatar" ref="avatar" />
      </div>
      <div :class="{ 'fold': profile_fold }" class="profile">
        <div class="meta username" @click="Copy(user.username || 'username')">
          {{ user.username || 'username' }}
        </div>

        <div v-show="user.headline" class="meta">
          <v-btn rounded="lg"  variant="text" color="medium-emphasis" prepend-icon="mdi-account-circle" @click="Copy(user.headline)">
            {{ user.headline }}
            <v-tooltip activator="parent" location="start">{{ $t('Message.Client.User.User.OneSentenceIntroduction')
            }}</v-tooltip>
          </v-btn>
        </div>
        <div v-show="user.blog" class="meta">

          <v-btn rounded="lg"  variant="text" color="medium-emphasis" prepend-icon="mdi-link" @click="Copy(user.blog)">
            {{ user.blog }}
            <v-tooltip activator="parent" location="start">{{ $t('Message.Client.User.User.PersonalHomepage')
            }}</v-tooltip>
          </v-btn>
        </div>
        <div v-show="user.company" class="meta">

          <v-btn rounded="lg"  variant="text" color="medium-emphasis" prepend-icon="mdi-city" @click="Copy(user.company)">
            {{ user.company }}
            <v-tooltip activator="parent" location="start">{{
              $t('Message.Client.User.User.AffiliatedSchoolOrEnterprise') }}</v-tooltip>
          </v-btn>
        </div>
        <div v-show="user.location" class="meta">

          <v-btn rounded="lg"  variant="text" color="medium-emphasis" prepend-icon="mdi-map-marker" @click="Copy(user.location)">
            {{ user.location }}
            <v-tooltip activator="parent" location="start">{{ $t('Message.Client.User.User.Location') }}</v-tooltip>
          </v-btn>
        </div>
        <div v-show="user.bio" class="meta">

          <v-btn rounded="lg"  variant="text" color="medium-emphasis" prepend-icon="mdi-file-document" @click="Copy(user.bio)">
            {{ user.bio }}
            <v-tooltip activator="parent" location="start">{{ $t('Message.Client.User.User.PersonalIntroduction')
            }}</v-tooltip>
          </v-btn>
        </div>

        <v-btn rounded="lg"  variant="text" color="medium-emphasis"
          :prepend-icon="profile_fold ? 'mdi-chevron-down' : 'mdi-chevron-up'"
          v-show="user.blog || user.company || user.location || user.bio" @click="profile_fold = !profile_fold">

          {{ profile_fold ? $t('Message.Client.User.User.ShowDetail') : $t('Message.Client.User.User.CollapseDetails')
          }}
        </v-btn>
      </div>
    </div>
    <!-- <div v-else class="info">
      <div class="avatar-box skeleton-item-circle"></div>
      <div class="profile">
        <div class="meta username skeleton-item" style="margin: auto; max-width: 150px"></div>
        <div class="meta skeleton-item"></div>
        <div class="skeleton-item" style="margin: auto; width: 150px; height: 40x"></div>
      </div>
    </div> -->
    <div v-else class="info">
      <div class="avatar-box avatar-skeleton-box">
        <v-skeleton-loader type="image" width="102" height="102" />
      </div>
      <div class="profile">
        <div class="meta username " style="margin: auto;">
          <v-skeleton-loader type="heading" style="width: 300px;" />
          <v-skeleton-loader type="heading" style="width: 200px;" />
        </div>

        <!-- <div class="meta">

          <v-skeleton-loader type="button"  />
        </div>
          <v-skeleton-loader type="button"  /> -->
      </div>
    </div>

    <div v-if="user" class="actions">

      <FollowButton v-if="$G_GetUserID() != user.user_id" :followable_type="'user'" :followable_id="user.user_id"
        :is_follow="user.is_follow" />


      <EditInfoButton v-else :user="user" />

      <div class="follow">
        <v-btn rounded="lg"  variant="text" color="medium-emphasis" class="followers" @click="
          dialogStore.setUsersDialog({
            id: user.user_id,
            type: 'user',
            modes: 'followers',
            model: true,
          })
          ">
          {{ $t('Message.Client.User.User.NPeopleFollowing', {
            value: user.follower_count
          }) }}
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn rounded="lg"  variant="text" color="medium-emphasis" class="followees" @click="
          dialogStore.setUsersDialog({
            id: user.user_id,
            type: 'user',
            modes: 'followees',
            model: true,
          })
          ">
          {{ $t('Message.Client.User.User.FollowNPeople', {
            value: user.followee_count
          }) }}
        </v-btn>

      </div>
      <div class="flex-grow" />
      <OptionsButton type="user" :item="user" @reset_avatar="
        (user) => {
          updateStore.setUserUpdate(user)
        }" @reset_cover="
          (user) => {
            updateStore.setUserUpdate(user)
          }" />
    </div>
    <!-- <div v-else class="actions">
      <div class="mc-follow skeleton-item-circle" slot="icon" style="margin: 0 58px 0 0"></div>
      <div class="follow">
        <div class="skeleton-item followers" style="margin: auto; width: 150px; height: 40x"></div>
        <div class="skeleton-item followees" style="margin: auto; width: 150px; height: 40x"></div>
      </div>
      <div class="flex-grow" />
      <div class="mc-follow skeleton-item-circle" slot="icon" style="margin: 0"></div>
    </div> -->
    <div v-else class="actions">
        <v-skeleton-loader type="avatar" class="mc-follow" style="margin-right: 58px;" />
        <div class="follow">
          <v-skeleton-loader type="button" class="followers" style="width: 80px; height: 40x" />
          <v-skeleton-loader type="button" class="followees" style="width: 80px; height: 40x" />
        </div>
      <div class="flex-grow" />
        <v-skeleton-loader type="avatar" style="margin: 0;" />
    </div>

  </v-card>
</template>
<script>
import copy from 'copy-to-clipboard';
import AvatarUpload from '@/components/avatar-upload/index.vue'
import CoverUpload from '@/components/cover-upload/index.vue'
import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog.js'
import { useUpdateStore } from '@/stores/update'
import { useSnackbarStore } from '@/stores/snackbar'
import {
  UploadAvatar,
  UploadCover,
} from '@/api/global.js';
// import ReturnButton from '@/components/return-button/index.vue'
import FollowButton from '@/components/follow-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
import EditInfoButton from '@/components/dialog/edit-info-dialog/edit-info-button.vue'
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  components: {
    AvatarUpload,
    CoverUpload,
    FollowButton,
    OptionsButton,
    EditInfoButton,
  },
  data: () => ({
    mainStore: useMainStore(),
    dialogStore: useDialogStore(),
    updateStore: useUpdateStore(),
    snackbarStore: useSnackbarStore(),
    profile_fold: true,
    upload_avatar_loading: false,
    upload_cover_loading: false,
  }),
  computed: {
    ComputedFoldButtonRule() {
      // v-if="user.blog!=null || user.company!=null || user.location!=null || user.bio!=null"
      let a = 0
      let b = 0
      if (this.user.headline) {
        a++
      }
      if (this.user.blog) {
        b++
      }
      if (this.user.company) {
        b++
      }
      if (this.user.location) {
        b++
      }
      if (this.user.bio) {
        b++
      }
      // console.log(a)
      // return a
      if (a == 1 && b == 0) {
        return false
      } else if (a == 0 && b >= 1) {
        return false
      } else if (a == 0 && b == 0) {
        return false
      } else {
        return true
      }
    },
    ReturnGetScrollValue() {
      return this.mainStore.getScrollValue;
    },
  },
  methods: {
    Copy(text) {
      copy(text);
      this.snackbarStore.addMessage({ text: this.$t('Message.Client.Topic.Topic.Copied') + ' ' + text })
    },
    SetCover() {
      const _this = this;
      setTimeout(() => {
        window.addEventListener('scroll', () => {
          window.requestAnimationFrame(() => {
            if (_this.$refs.cover == null || _this.$refs.cover == undefined) {
              return;
            }
            _this.$refs.cover.style['background-position-y'] = `${window.scrollY / 2}px`;
          });
        });
        window.scrollTo(0, _this.$refs.cover.offsetWidth * 0.56 * 0.58);
      });
    },
    handleFileSelectCover() {
      // const fileInput = this.$refs.cover_input
      //创建一个input
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      // fileInput.accept = 'image/png';
      // 支持png,jpg,jpeg,gif图片格式
      // fileInput.accept = 'image/png,image/jpg,image/jpeg,image/gif';
      fileInput.accept = 'image/png,image/jpg,image/jpeg';
      fileInput.style.display = 'none';
      //创建一个img
      const previewImg = this.$refs.cover
      //将input添加到页面
      document.body.appendChild(fileInput);

      const cover = this.$refs.cover
      const _this = this;
      fileInput.onchange = function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
          previewImg.src = event.target.result;
          cover.style['background-image'] = `url(${event.target.result})`;
          _this.UploadCover(previewImg.src);
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    },
    async UploadCover(src) {
      this.upload_cover_loading = true
      const response = await UploadCover({
        user_token: this.$G_GetUserToken(),
        cover: src,
      })
      if (response.data.is_upload) {
        this.upload_cover_loading = false
      } else {
        this.upload_cover_loading = false
      }
    },
    handleFileSelectAvatar() {
      //创建一个input
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      // fileInput.accept = 'image/png';
      // 支持png,jpg,jpeg,gif图片格式
      // fileInput.accept = 'image/png,image/jpg,image/jpeg,image/gif';
      fileInput.accept = 'image/png,image/jpg,image/jpeg';
      fileInput.style.display = 'none';
      const avatar = this.$refs.avatar
      const _this = this;
      fileInput.onchange = function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
          avatar.src = event.target.result;
          _this.UploadAvatar(
            avatar.src
          );
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    },
    async UploadAvatar(src) {
      this.upload_avatar_loading = true
      const response = await UploadAvatar({
        user_token: this.$G_GetUserToken(),
        avatar: src,
      })
      if (response.data.is_upload) {
        this.upload_avatar_loading = false
      } else {
        this.upload_avatar_loading = false
      }
    },
  },
  watch: {
    user(val) {
      // if(val!=null){
      //   this.SetCover();
      // }
    },
    ReturnGetScrollValue(val) {
      if (this.$refs.cover) {
        window.requestAnimationFrame(() => {
          this.$refs.cover.style['background-position-y'] = `${val / 2}px`;
        });
      }
    },
  },
  created() {
    // if(this.user){
    //   this.SetCover();
    // }
  },
};
</script>
<style lang="less">
@import './index.less';
</style>
