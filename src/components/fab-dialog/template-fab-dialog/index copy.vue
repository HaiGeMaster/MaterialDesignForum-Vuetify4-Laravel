<template>
  <v-expand-transition>
    <!-- <v-app> -->
    <v-card v-show="vmodel" ref="draggableCard" rounded="lg" :loading="loading" class="template-fab-dialog"
      @mousedown="startDrag" @mouseup="stopDrag" @touchstart="startDrag" @touchend="stopDrag" @touchmove="onDrag">
      <!-- <v-layout> -->
        <v-toolbar :extended="toolbar_extended" :title="title">

          <template v-slot:appbar_append>
            <slot name="appbar_append"></slot>

            <v-btn v-show="!mainStore.getMobile" icon @click="toggleFullscreen">
              <v-icon>
                {{ isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
              </v-icon>
              <v-tooltip activator="parent" location="left">{{ isFullscreen ?
                $t('Message.Components.DialogClass.ExitFullscreen') : $t('Message.Components.DialogClass.Fullscreen')
              }}</v-tooltip>
            </v-btn>

            <v-btn icon @click="vmodel = false">
              <v-icon>
                mdi-close
              </v-icon>
              <v-tooltip activator="parent" location="left">{{ $t('Message.Components.DialogClass.Close') }}</v-tooltip>
            </v-btn>
          </template>

          <template v-slot:extension v-if="toolbar_extended">
            <slot name="appbar_extension"></slot>
          </template>

        </v-toolbar>

        <!-- <v-main> -->
          <v-card-text style="max-height: 95%;overflow-y: scroll;">
            <slot name="content"></slot>
          </v-card-text>
        <!-- </v-main> -->
      <!-- </v-layout> -->
    </v-card>
    <!-- </v-app> -->
  </v-expand-transition>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useFabDialogStore } from '@/stores/fab-dialog'
export default {
  props: {
    model: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    toolbar_extended: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mainStore: useMainStore(),
      fabDialogStore: useFabDialogStore(),

      vmodel: false,
      isDragging: false,
      isFullscreen: false,
      startX: 0,
      startY: 0,
      startLeft: 0,
      startTop: 0,
      originalPosition: {}
    }
  },
  // computed: {
  //   model: {
  //     get() {
  //       return this.fabDialogStore.getNewSearchFabDialog
  //     },
  //     set(val) {
  //       this.fabDialogStore.setNewSearchFabDialog(val)
  //     }
  //   },
  // },
  mounted() {
    // 初始化位置到右下角
    this.setInitialPosition();
    // 添加鼠标移动和释放事件监听器
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);
    // 添加触摸事件监听器
    document.addEventListener('touchmove', this.onDrag);
    document.addEventListener('touchend', this.stopDrag);
  },
  beforeUnmount() {
    // 移除事件监听器
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
    // 移除触摸事件监听器
    document.removeEventListener('touchmove', this.onDrag);
    document.removeEventListener('touchend', this.stopDrag);
  },
  methods: {
    setInitialPosition() {
      const card = this.$refs.draggableCard;
      if (card) {
        const cardEl = card.$el || card;
        cardEl.style.bottom = '16px';
        cardEl.style.right = '16px';
      }
    },
    startDrag(event) {
      // 只有点击卡片本身（非按钮区域）才开始拖动 v-toolbar__content
      if (event.target.closest('.v-btn')) return;

      this.isDragging = true;
      // 处理触摸事件和鼠标事件
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      this.startX = clientX;
      this.startY = clientY;

      const card = this.$refs.draggableCard;
      if (card) {
        const cardEl = card.$el || card;
        const rect = cardEl.getBoundingClientRect();
        this.startLeft = rect.left;
        this.startTop = rect.top;
      }
    },
    onDrag(event) {
      if (!this.isDragging) return;

      // 阻止触摸事件的默认行为，避免页面滚动
      if (event.touches) {
        event.preventDefault();
      }

      const card = this.$refs.draggableCard;
      if (card) {
        const cardEl = card.$el || card;
        // 处理触摸事件和鼠标事件
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        const dx = clientX - this.startX;
        const dy = clientY - this.startY;

        cardEl.style.left = `${this.startLeft + dx}px`;
        cardEl.style.top = `${this.startTop + dy}px`;
        // 清除bottom和right属性，避免冲突
        cardEl.style.bottom = 'auto';
        cardEl.style.right = 'auto';
      }
    },
    stopDrag() {
      this.isDragging = false;
    },
    toggleFullscreen() {
      const card = this.$refs.draggableCard;
      if (!card) return;

      const cardEl = card.$el || card;

      if (!this.isFullscreen) {
        // 进入全屏模式
        // 保存原始位置和尺寸
        const rect = cardEl.getBoundingClientRect();
        this.originalPosition = {
          width: cardEl.style.width || '450px',
          height: cardEl.style.height || '650px',
          left: cardEl.style.left || rect.left + 'px',
          top: cardEl.style.top || rect.top + 'px',
          bottom: cardEl.style.bottom || '16px',
          right: cardEl.style.right || '16px'
        };

        // 设置全屏样式
        cardEl.style.width = '100%';
        cardEl.style.height = '100vh';
        cardEl.style.left = '0';
        cardEl.style.top = '0';
        cardEl.style.bottom = '0';
        cardEl.style.right = '0';
        cardEl.style.zIndex = '1999';
        this.isFullscreen = true;
      } else {
        // 退出全屏模式
        // 恢复原始位置和尺寸
        cardEl.style.width = this.originalPosition.width;
        cardEl.style.height = this.originalPosition.height;
        cardEl.style.left = this.originalPosition.left;
        cardEl.style.top = this.originalPosition.top;
        cardEl.style.bottom = this.originalPosition.bottom;
        cardEl.style.right = this.originalPosition.right;
        cardEl.style.zIndex = '1200';
        this.isFullscreen = false;
      }
    }
  },
  watch: {
    model(val) {
      this.vmodel = val
    },
    vmodel(val) {
      this.$emit('model', val)
    },
    isDragging(val) {
      if (this.isFullscreen) {
        this.toggleFullscreen();
      }
    }
  }
}
</script>

<style lang="less">
/* */
@import '../../../vendor/variable.less';

.template-fab-dialog {
  width: 450px;
  height: 650px;
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1200;
  cursor: move;


  @media (max-width: @screen-xs-max) {
    width: 100%;
    height: 100vh;
    left: 0 !important;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    transform: none;
  }
}

// 按钮区域不继承拖动光标
.template-fab-dialog .v-btn .v-card-text {
  cursor: pointer;
}
</style>