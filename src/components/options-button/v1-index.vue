<template>
  <v-menu transition="scale-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        color="medium-emphasis"
        @click.prevent.stop=""
        icon="mdi-dots-vertical"
        class="mc-options-button"
      ></v-btn>
    </template>

    <v-list rounded="lg">
      <!-- 查看关注者 -->
      <v-list-item
        v-if="showFollowers"
        @click="openFollowersDialog"
        :title="$t('Message.Client.Topic.Topic.LookFollowers', { value: followCount })"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-account-star"></v-icon>
        </template>
      </v-list-item>

      <!-- 分享 -->
      <v-list-item
        v-if="showCopyLink"
        @click="openShareBottomSheet"
        :title="$t('Message.Components.ShareBottomSheet.Share')"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-share-variant"></v-icon>
        </template>
      </v-list-item>

      <!-- 举报 -->
      <v-list-item
        v-if="showReportDialog"
        @click="openReportDialog"
        :title="$t('Message.Components.OptionsButton.Report')"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-flag"></v-icon>
        </template>
      </v-list-item>

      <!-- 编辑 -->
      <v-list-item
        v-if="showEdit"
        @click="editItem"
        :title="editText"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-pencil"></v-icon>
        </template>
      </v-list-item>

      <!-- 删除 -->
      <v-list-item
        v-if="showDelete"
        @click="deleteItem"
        :title="deleteText"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-delete"></v-icon>
        </template>
      </v-list-item>

      <!-- 重置封面 -->
      <v-list-item
        v-if="showResetCover"
        @click="resetCover"
        :title="$t('Message.Components.OptionsButton.ResetCover')"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-image-edit-outline"></v-icon>
        </template>
      </v-list-item>

      <!-- 重置头像 -->
      <v-list-item
        v-if="showResetAvatar"
        @click="resetAvatar"
        :title="$t('Message.Components.OptionsButton.ResetAvatar')"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-account-edit-outline"></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { computed } from 'vue';
import copy from 'copy-to-clipboard';
import {
  ResetAvatar,
  ResetCover,
  IsTauri,
  IsElectron,
  IsMobileApp,
  GetBaseUrl,
} from '@/api/global.js';

import { useUserStore } from '@/stores/user';
import { useDialogStore } from '@/stores/dialog';
import { useFabDialogStore } from '@/stores/fab-dialog';
import { useSnackbarStore } from '@/stores/snackbar';
import { useSheetStore } from '@/stores/sheet.js';

// Props
const props = defineProps({
  type: {
    type: String,
    default: 'topic', // user, topic, question, article, answer, comment, reply
  },
  item: {
    type: Object,
    default: null,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(['reset_avatar', 'reset_cover']);

// Stores
const userStore = useUserStore();
const dialogStore = useDialogStore();
const snackbarStore = useSnackbarStore();
const fabDialogStore = useFabDialogStore();
const sheetStore = useSheetStore();

// Methods
const getItemId = () => {
  const idMap = {
    topic: 'topic_id',
    question: 'question_id',
    article: 'article_id',
    answer: 'answer_id',
    comment: 'comment_id',
    reply: 'reply_id',
  };
  return props.item?.[idMap[props.type]] || 0;
};

const getOrigin = () => {
  if (IsTauri() || IsElectron() || IsMobileApp()) {
    return GetBaseUrl();
  } else {
    return window.location.origin;
  }
};

const spawnCopyLink = () => {
  const origin = getOrigin();
  const urlMap = {
    answer: `${origin}${$G_UrlHeaderLang()}/questions/${props.item.question_id}/answers/${props.item.answer_id}`,
    topic: `${origin}${$G_UrlHeaderLang()}/topics/${props.item.topic_id}`,
    user: `${origin}${$G_UrlHeaderLang()}/users/${props.item.user_id}`,
    article: `${origin}${$G_UrlHeaderLang()}/articles/${props.item.article_id}`,
    question: `${origin}${$G_UrlHeaderLang()}/questions/${props.item.question_id}`,
  };

  const text = urlMap[props.type];
  if (text && copy(text)) {
    snackbarStore.addMessage({ text: $t('Message.Client.Topic.Topic.Copied') + ' ' + text });
  }
};

const openShareBottomSheet = () => {
  const origin = getOrigin();
  const shareDataMap = {
    answer: {
      link: `${origin}${$G_UrlHeaderLang()}/questions/${props.item.question_id}/answers/${props.item.answer_id}`,
      title: props.item.content_markdown,
      desc: props.item.content_markdown,
    },
    topic: {
      link: `${origin}${$G_UrlHeaderLang()}/topics/${props.item.topic_id}`,
      title: props.item.name,
      desc: props.item.description,
    },
    user: {
      link: `${origin}${$G_UrlHeaderLang()}/users/${props.item.user_id}`,
      title: props.item.username,
      desc: props.item.bio,
    },
    article: {
      link: `${origin}${$G_UrlHeaderLang()}/articles/${props.item.article_id}`,
      title: props.item.title,
      desc: props.item.content_markdown,
    },
    question: {
      link: `${origin}${$G_UrlHeaderLang()}/questions/${props.item.question_id}`,
      title: props.item.title,
      desc: props.item.content_markdown,
    },
  };

  const shareData = shareDataMap[props.type];
  if (shareData) {
    const International = $i18n.locale != 'zh_CN';
    // console.log('International', International);
    sheetStore.setShareSheet({
      shareUrl: shareData.link,
      shareTitle: shareData.title,
      shareDesc: shareData.desc,
      // showInternational: International,
      // showChinese: !International || International,
      showInternational: true,// International,
      showChinese: true,// I!International || International,
      model: true,
    });
  }
};

const openReportDialog = () => {
  if (!userStore.getIsLogin) {
    dialogStore.setLoginDialog(true);
    snackbarStore.addMessage({
      text: $t('Message.Components.Account.YouMustLoginToUseThisFeature'),
      color: 'error',
    });
    return;
  }

  const previewTextMap = {
    topic: props.item.name,
    question: props.item.title,
    article: props.item.title,
    answer: props.item.content_markdown,
    comment: props.item.content,
    reply: props.item.content,
    user: props.item.username,
  };

  const reportPreviewText = previewTextMap[props.type];
  dialogStore.setReportDialog({
    type: props.type,
    item: props.item,
    report_preview_text: reportPreviewText,
    model: true,
  });
};

const editItem = () => {
  const item = props.item;

  if (IsTauri() || IsMobileApp()) {
    // 适配：把 item.content_rendered 里面的 /public/static/ 替换为 GetBaseUrl() + '/public/static/'
    const regex = /\/public\/static\//g;
    const newBaseUrl = GetBaseUrl() + '/public/static/';
    item.content_rendered = item.content_rendered.replaceAll(regex, newBaseUrl);
  }

  switch (props.type) {
    case 'topic':
      dialogStore.setTopicDialog({
        mode: 'edit',
        edit_topic: item,
        model: true,
      });
      break;
    case 'answer':
      fabDialogStore.setEditorFabDialog({
        title: $t('Message.Components.Editor.EditAnswer'),
        icon: 'mdi-comment-plus-outline',
        has_title: false,
        has_topic: false,
        submit_text: $t('Message.Components.Editor.Release'),
        edit_type: 'answer',
        edit_mode: 'edit',
        edit_mode_id: item.answer_id,
        md_content: item.content_rendered,
        model: 'moderate',
      });
      break;
    case 'question':
      fabDialogStore.setEditorFabDialog({
        title: $t('Message.Components.Editor.EditQuestion'),
        icon: 'mdi-forum',
        has_title: true,
        has_topic: true,
        submit_text: $t('Message.Components.Editor.Release'),
        edit_type: 'question',
        edit_mode: 'edit',
        edit_mode_id: item.question_id,
        md_title: item.title,
        md_topics: item.topics,
        md_content: item.content_rendered,
        model: 'moderate',
      });
      break;
    case 'article':
      fabDialogStore.setEditorFabDialog({
        title: $t('Message.Components.Editor.EditArticle'),
        icon: 'mdi-file-document',
        has_title: true,
        has_topic: true,
        submit_text: $t('Message.Components.Editor.Release'),
        edit_type: 'article',
        edit_mode: 'edit',
        edit_mode_id: item.article_id,
        md_title: item.title,
        md_topics: item.topics,
        md_content: item.content_rendered,
        model: 'moderate',
      });
      break;
    case 'comment':
      dialogStore.setCommentReplyEditDialog({
        title: $t('Message.Components.OptionsButton.EditComment'),
        type: 'comment',
        edit_id: item.comment_id,
        content: item.content,
        model: true,
      });
      break;
    case 'reply':
      dialogStore.setCommentReplyEditDialog({
        title: $t('Message.Components.OptionsButton.EditReply'),
        type: 'reply',
        edit_id: item.reply_id,
        content: item.content,
        model: true,
      });
      break;
    default:
      snackbarStore.addMessage({
        text: '暂不支持的编辑类型',
        color: 'error',
      });
      break;
  }
};

const resetAvatar = async () => {
  const response = await ResetAvatar({
    user_id: props.item.user_id,
    user_token: $G_GetUserToken(),
  });
  if (response.data.is_reset) {
    emit('reset_avatar', response.data.user);
  }
};

const resetCover = async () => {
  const response = await ResetCover({
    user_id: props.item.user_id,
    user_token: $G_GetUserToken(),
  });
  if (response.data.is_reset) {
    emit('reset_cover', response.data.user);
  }
};

const deleteItem = () => {
  const deletePreviewTextMap = {
    topic: props.item.name,
    question: props.item.title,
    article: props.item.title,
    answer: props.item.content_markdown,
    comment: props.item.content,
    reply: props.item.content,
  };

  const deletePreviewText = deletePreviewTextMap[props.type];
  dialogStore.setDeleteDialog({
    type: props.type,
    item: props.item,
    item_ids: [getItemId()],
    delete_preview_text: deletePreviewText,
    model: true,
  });
};

const openFollowersDialog = () => {
  dialogStore.setUsersDialog({
    id: getItemId(),
    type: props.type,
    modes: 'followers',
    model: true,
  });
};

// Computed properties
const followCount = computed(() => {
  const countMap = {
    topic: 'follower_count',
    question: 'follower_count',
    article: 'follower_count',
  };
  return props.item?.[countMap[props.type]] || 0;
});

const editText = computed(() => {
  const textMap = {
    topic: $t('Message.Components.OptionsButton.EditTopic'),
    question: $t('Message.Components.OptionsButton.EditQuestion'),
    article: $t('Message.Components.OptionsButton.EditArticle'),
    answer: $t('Message.Components.OptionsButton.EditAnswer'),
    comment: $t('Message.Components.OptionsButton.EditComment'),
    reply: $t('Message.Components.OptionsButton.EditReply'),
  };
  return textMap[props.type] || '';
});

const deleteText = computed(() => {
  const textMap = {
    topic: $t('Message.Components.OptionsButton.DeleteTopic'),
    question: $t('Message.Components.OptionsButton.DeleteQuestion'),
    article: $t('Message.Components.OptionsButton.DeleteArticle'),
    answer: $t('Message.Components.OptionsButton.DeleteAnswer'),
    comment: $t('Message.Components.OptionsButton.DeleteComment'),
    reply: $t('Message.Components.OptionsButton.DeleteReply'),
  };
  return textMap[props.type] || '';
});

const showCopyLink = computed(() => {
  switch (props.type) {
    case 'user':
      return !props.is_admin;
    case 'topic':
    case 'question':
    case 'article':
    case 'answer':
      return true;
    default:
      return false;
  }
});

const showFollowers = computed(() => {
  if (followCount.value === 0) return false;
  switch (props.type) {
    case 'topic':
    case 'question':
    case 'article':
      return true;
    default:
      return false;
  }
});

const showResetCover = computed(() => {
  return props.is_admin ||
    (props.type === 'user' &&
      props.item?.user_id === $G_GetUserID() &&
      ($route.name === 'user' || $route.name === 'lang-user'));
});

const showResetAvatar = computed(() => {
  return props.is_admin ||
    (props.type === 'user' &&
      props.item?.user_id === $G_GetUserID() &&
      ($route.name === 'user' || $route.name === 'lang-user'));
});

const showReportDialog = computed(() => {
  if (props.is_admin) return false;
  return props.item?.user_id !== $G_GetUserID();
});

const checkEditPermission = (type) => {
  try {
    const user = userStore.getUser;
    const item = props.item;
    
    if (!user || !item || item.user_id !== $G_GetUserID()) {
      return false;
    }

    const group = user.user_group;
    const abilityMap = {
      topic: 'ability_edit_own_topic',
      question: 'ability_edit_own_question',
      article: 'ability_edit_own_article',
      answer: 'ability_edit_own_answer',
      comment: 'ability_edit_own_comment',
      reply: 'ability_edit_own_reply',
    };

    const timeMap = {
      topic: 'time_before_edit_topic',
      question: 'time_before_edit_question',
      article: 'time_before_edit_article',
      answer: 'time_before_edit_answer',
      comment: 'time_before_edit_comment',
      reply: 'time_before_edit_reply',
    };

    const conditionMap = {
      topic: {
        condition: 'ability_edit_topic_only_no_article_or_question',
        check: () => item.article_count === 0 && item.question_count === 0,
      },
      question: {
        condition: 'ability_edit_question_only_no_answer',
        check: () => item.answer_count === 0,
      },
      article: {
        condition: 'ability_edit_article_only_no_comment',
        check: () => item.comment_count === 0,
      },
      answer: {
        condition: 'ability_edit_answer_only_no_comment',
        check: () => item.comment_count === 0,
      },
      comment: {
        condition: 'ability_edit_comment_only_no_reply',
        check: () => item.reply_count === 0,
      },
      reply: {
        condition: 'ability_edit_reply_only_no_reply',
        check: () => item.reply_count === 0,
      },
    };

    // 检查基本编辑权限
    if (!group[abilityMap[type]]) {
      return false;
    }

    // 检查特定条件
    const conditionConfig = conditionMap[type];
    if (conditionConfig && group[conditionConfig.condition] && !conditionConfig.check()) {
      return false;
    }

    // 检查时间限制
    const timeLimit = group[timeMap[type]];
    if (timeLimit > 0) {
      const timeElapsed = Math.floor(Date.now() / 1000) - item.create_time;
      if (timeElapsed >= timeLimit * 60) {
        return false;
      }
    }

    return true;
  } catch (e) {
    return false;
  }
};

const checkDeletePermission = (type) => {
  try {
    const user = userStore.getUser;
    const item = props.item;
    
    if (!user || !item || item.user_id !== $G_GetUserID()) {
      return false;
    }

    const group = user.user_group;
    const abilityMap = {
      topic: 'ability_delete_own_topic',
      question: 'ability_delete_own_question',
      article: 'ability_delete_own_article',
      answer: 'ability_delete_own_answer',
      comment: 'ability_delete_own_comment',
      reply: 'ability_delete_own_reply',
    };

    const timeMap = {
      topic: 'time_before_delete_topic',
      question: 'time_before_delete_question',
      article: 'time_before_delete_article',
      answer: 'time_before_delete_answer',
      comment: 'time_before_delete_comment',
      reply: 'time_before_delete_reply',
    };

    const conditionMap = {
      topic: {
        condition: 'ability_delete_topic_only_no_article_or_question',
        check: () => item.article_count === 0 && item.question_count === 0,
      },
      question: {
        condition: 'ability_delete_question_only_no_answer',
        check: () => item.answer_count === 0,
      },
      article: {
        condition: 'ability_delete_article_only_no_comment',
        check: () => item.comment_count === 0,
      },
      answer: {
        condition: 'ability_delete_answer_only_no_comment',
        check: () => item.comment_count === 0,
      },
      comment: {
        condition: 'ability_delete_comment_only_no_reply',
        check: () => item.reply_count === 0,
      },
      reply: {
        condition: 'ability_delete_reply_only_no_reply',
        check: () => item.reply_count === 0,
      },
    };

    // 检查基本删除权限
    if (!group[abilityMap[type]]) {
      return false;
    }

    // 检查特定条件
    const conditionConfig = conditionMap[type];
    if (conditionConfig && group[conditionConfig.condition] && !conditionConfig.check()) {
      return false;
    }

    // 检查时间限制
    const timeLimit = group[timeMap[type]];
    if (timeLimit > 0) {
      const timeElapsed = Math.floor(Date.now() / 1000) - item.create_time;
      if (timeElapsed >= timeLimit * 60) {
        return false;
      }
    }

    return true;
  } catch (e) {
    return false;
  }
};

const showEdit = computed(() => {
  return checkEditPermission(props.type);
});

const showDelete = computed(() => {
  return checkDeletePermission(props.type);
});
</script>
