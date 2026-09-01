<template>
  <v-dialog v-model="model" :fullscreen="mainStore.getMobile" max-width="530px" scrollable>
    <v-card rounded="lg" >
      <v-toolbar  
        :title="dialogStore.getTopicDialog.mode == 'new' ? $t('Message.Components.TopicsDialog.NewTopic') : $t('Message.Components.TopicsDialog.EditTopic')">


        <template v-slot:prepend>
          <v-btn  icon @click="model = !model">
            <v-icon>
              mdi-close
            </v-icon>
            <v-tooltip activator="parent" location="right">{{ $t('Message.Components.DialogClass.Close') }}</v-tooltip>
          </v-btn>
        </template>


        <template v-slot:append>
          <v-btn  icon variant="text" :loading="is_loading" @click="OnSubmit()">
            <v-icon>
              mdi-check
            </v-icon>
            <v-tooltip activator="parent" location="left">{{ $t('Message.Admin.Options.Save') }}</v-tooltip>
          </v-btn>

        </template>

      </v-toolbar>

      <v-card-text>
        <v-form ref="form">
          <v-text-field color="primary"   v-model="TopicTitle" :label="$t('Message.Components.TopicsDialog.TopicName')" required
            variant="underlined" counter="20" maxlength="20" :rules="[
              v => !!v || $t('Message.Components.TopicsDialog.TopicNameCannotBeEmpty'),
              v => (v || '').length <= 20 || $t('Message.Components.TopicsDialog.LengthCannotExceedNCharacters', { value: 20 })
            ]">
          </v-text-field>
          <v-textarea v-model="TopicDescription" :label="$t('Message.Components.TopicsDialog.TopicDescription')"
            variant="underlined" required counter="1000" maxlength="1000" :rules="[
              v => !!v || $t('Message.Components.TopicsDialog.TopicDescriptionCannotBeEmpty'),
              v => (v || '').length <= 1000 || $t('Message.Components.TopicsDialog.LengthCannotExceedNCharacters', { value: 20 })
            ]">
          </v-textarea>
          <div class="cover-wrapper" @click="
            handleFileSelect()
            ">
            <span class="title">{{ $t('Message.Components.TopicsDialog.TopicImage') }}</span>
            <div class="content">

              <!-- v-show="has_new_cover==true" -->
              <img v-show="TopicCover != ''" :src="TopicCover" id="topic_dialog_preview_image"
                ref="topic_dialog_preview_image" />
              <div class="placeholder" :title="$t('Message.Components.TopicsDialog.ClickToUploadTopicImage')" @click="
                ">
                <v-icon>mdi-camera</v-icon>
              </div>
            </div>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  AddTopic,
  EditTopic
} from '@/api/global.js'
// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'
import { useDialogStore } from '@/stores/dialog';
import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/main';
import { useSnackbarStore } from '@/stores/snackbar'
export default {
  name: 'topics-dialog',
  // props: {
  //   model: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   mode: {
  //     type: String,
  //     default: 'new',
  //   },
  //   edit_topic: {
  //     type: Object,
  //     default: null,
  //   },
  // },
  components: {
    // Confirm,
    // Cancel
  },
  computed: {
    model: {
      get() {
        return this.dialogStore.getTopicDialog.model
      },
      set(val) {
        this.dialogStore.setTopicDialog({ model: val })
      }
    },
    edit_topic: {
      get() {
        return this.dialogStore.getTopicDialog.edit_topic
      },
      set(val) {
        this.dialogStore.setTopicDialog({ edit_topic: val })
      }
    },
  },
  data: () => ({
    dialogStore: useDialogStore(),
    userStore: useUserStore(),
    mainStore: useMainStore(),
    snackbarStore: useSnackbarStore(),
    // model: false,
    TopicTitle: '',
    TopicDescription: '',
    TopicCover: '',
    TopicCoverFile: null,
    is_loading: false,

    has_new_cover: false,
  }),
  methods: {
    // OnChange(e) {
    //   const file = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.onload = function(event) {
    //       this.TopicCover = event.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // },
    handleFileSelect() {
      this.has_new_cover = true//表示有新的封面
      // const fileInput = this.$refs.topic_dialog_input
      //创建一个input
      const fileInput = document.createElement('input')
      fileInput.type = 'file'
      // fileInput.accept = 'image/png';
      // 支持png,jpg,jpeg,gif图片格式
      // fileInput.accept = 'image/png,image/jpg,image/jpeg,image/gif';
      fileInput.accept = 'image/png,image/jpg,image/jpeg';
      fileInput.style.display = 'none'
      document.body.appendChild(fileInput)
      // const fileInput = this.$refs.topic_dialog_input
      const previewImg = this.$refs.topic_dialog_preview_image
      const _this = this
      fileInput.onchange = function (e) {
        const file = e.target.files[0];
        if (!file) return;
        // 保存文件对象，提交时 multipart 二进制直传
        _this.TopicCoverFile = file;
        // 用 objectURL 预览，避免 base64 转换
        const url = URL.createObjectURL(file);
        previewImg.src = url;
        _this.TopicCover = url;
        _this.$forceUpdate()
      };
      fileInput.click();
    },
    async OnSubmit() {
      if (this.$refs.form.validate()) {
        this.is_loading = true
        if (this.dialogStore.getTopicDialog.mode == 'new') {
          const response = await AddTopic({
            name: this.TopicTitle,
            description: this.TopicDescription,
            cover: this.TopicCoverFile,
            user_token: this.$G_GetUserToken(),
          })
          if (response.data.is_add == true) {
            this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin()?this.$t('Message.Components.Snackbar.Created'):this.$t('Message.Components.Snackbar.YouTopicHasBeenCreated'), color: 'success' })
            this.$emit('add_topic', response.data.topic)

            this.is_loading = false
            this.model = false
          } else {
            this.is_loading = false
          }
        } else if (this.dialogStore.getTopicDialog.mode == 'edit') {
          // 编辑时只有选择新封面才上传；否则不传 cover 保持原封面
          const response = await EditTopic({
            topic_id: this.edit_topic.topic_id,
            name: this.TopicTitle,
            description: this.TopicDescription,
            cover: this.TopicCoverFile,
            user_token: this.$G_GetUserToken(),
          })
          if (response.data.is_edit == true) {
            this.snackbarStore.addMessage({ text: this.$G_ViewIsAdmin()?this.$t('Message.Components.Snackbar.Edited'):this.$t('Message.Components.Snackbar.YouTopicHasBeenEdited'), color: 'success' })
            this.$emit('edit_topic', response.data.topic)
            this.has_new_cover = false
            this.is_loading = false
            this.model = false
          } else {
            this.is_loading = false
          }
          this.has_new_cover = false
        }
      }
    }
  },
  watch: {
    // model(val) {
    //   if (val == true) {
    //     this.model = true
    //   }
    // },
    model(val) {
      if (val == false) {
        this.TopicTitle = ''
        this.TopicDescription = ''
        this.TopicCover = ''
        this.TopicCoverFile = null
        this.$emit('model', false)
      }
    },
    edit_topic: {
      handler(val) {
        // console.log(val)
        if (val != null) {
          this.TopicTitle = val.name
          this.TopicDescription = val.description
          this.TopicCover = this.$G_ImgHandle(val.cover.original)
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less">
/* */
@import '../../../vendor/variable.less';


.cover-wrapper {
  margin-top: 4px;

  .title {
    padding-bottom: 8px;
    font-size: 16px;
    transform: scale(.75) translateY(0);
    transform-origin: left;
  }

  .content {
    position: relative;
    width: 100%;
    padding-bottom: 56%;

    .v-image__image,
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }

    .placeholder {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(134, 134, 134, 0.42);
      border-radius: 8px;
      cursor: pointer;
      transition: border, box-shadow .2s cubic-bezier(.4, 0, .2, 1);

      i {
        padding: 12px;
        color: #fff;
        font-size: 36px;
        background-color: rgba(0, 0, 0, .26);
        border-radius: 50%;
        transition: color .2s cubic-bezier(.4, 0, .2, 1);
        user-select: none;
      }

      &.selected i {
        color: #fff !important;
        background-color: rgba(0, 0, 0, .26) !important;
      }

      &:hover {
        border-color: rgba(136, 136, 136, 0.87);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, .87);
      }

      .theme--dark & {
        border-color: rgba(255, 255, 255, .7);

        i {
          color: rgba(255, 255, 255, 0.56);
          background-color: rgba(255, 255, 255, .26);
        }

        &:hover {
          border-color: #fff;
          box-shadow: 0 0 0 1px #fff;

          i {
            color: #fff;
          }
        }
      }
    }
  }

  .error {
    height: 28px;
    color: rgba(255, 23, 68, .87);
    font-size: 12px;
    line-height: 28px;
  }

  &.invalid {
    .title {
      color: #ff1744 !important;
    }

    .placeholder {
      border-color: #ff1744 !important;
      box-shadow: 0 0 0 1px #ff1744 !important;
    }
  }
}

.topics-dialog {
  max-width: 530px;
  height: 94% !important;
  max-height: 720px !important;

  form {
    // padding: 0 40px 62px;
    padding: 24px;

    .v-text-field {
      padding-bottom: 28px;
    }
  }

  .dialog-title {
    padding: 16px 24px;
    line-height: 36px;
    font-size: 20px;
  }

  .dialog-content {
    padding: 0;
  }

  .dialog-content {
    padding-bottom: 62px;
  }

  .close {
    display: none;
  }

  .cover-wrapper {
    margin-top: 4px;

    .title {
      padding-bottom: 8px;
      font-size: 16px;
      transform: scale(.75) translateY(0);
      transform-origin: left;
    }

    .content {
      position: relative;
      width: 100%;
      padding-bottom: 56%;

      .v-image__image,
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }

      .placeholder {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(134, 134, 134, 0.42);
        border-radius: 8px;
        cursor: pointer;
        transition: border, box-shadow .2s cubic-bezier(.4, 0, .2, 1);

        i {
          padding: 12px;
          color: #fff;
          font-size: 36px;
          background-color: rgba(0, 0, 0, .26);
          border-radius: 50%;
          transition: color .2s cubic-bezier(.4, 0, .2, 1);
          user-select: none;
        }

        &.selected i {
          color: #fff !important;
          background-color: rgba(0, 0, 0, .26) !important;
        }

        &:hover {
          border-color: rgba(136, 136, 136, 0.87);
          box-shadow: 0 0 0 1px rgba(0, 0, 0, .87);
        }

        .theme--dark & {
          border-color: rgba(255, 255, 255, .7);

          i {
            color: rgba(255, 255, 255, 0.56);
            background-color: rgba(255, 255, 255, .26);
          }

          &:hover {
            border-color: #fff;
            box-shadow: 0 0 0 1px #fff;

            i {
              color: #fff;
            }
          }
        }
      }
    }

    .error {
      height: 28px;
      color: rgba(255, 23, 68, .87);
      font-size: 12px;
      line-height: 28px;
    }

    &.invalid {
      .title {
        color: #ff1744 !important;
      }

      .placeholder {
        border-color: #ff1744 !important;
        box-shadow: 0 0 0 1px #ff1744 !important;
      }
    }
  }

  @media (max-width: @screen-xs-max) {
    .dialog-title {
      padding: 10px 8px;
      font-size: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);

      .theme--dark & {
        border-bottom-color: rgba(255, 255, 255, .12);
      }
    }

    .list-item {
      padding-right: 16px;
      padding-left: 16px;
    }

    .close {
      display: inline-block;
      margin-right: 16px;
    }
  }
}
</style>
