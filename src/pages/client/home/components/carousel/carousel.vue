<template>
  <!-- variant="outlined" color="surface-variant"  -->
  <v-card class="carousel-container" v-if="slides.length > 0" rounded="lg" >
    <!-- 轮播主体容器 -->
    <div class="carousel-slats" ref="carousel" :style="{
      transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}%))`,
      transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    }" @touchstart="handleTouchStart" @touchmove.prevent="handleTouchMove" @touchend="handleTouchEnd"
      @mousedown="handleMouseDown">
      <!-- 轮播项 -->
      <a v-for="(slide, index) in slides" :key="index" class="slat" :href="slide.href" target="_blank">
        <img :src="slide.image" :alt="slide.title" >
        <div class="carousel-content">
          <h2 class="carousel-title">{{ slide.title }}</h2>
          <p class="carousel-description">{{ slide.description }}</p>
        </div>
      </a>
    </div>

    <!-- 控制按钮 -->
    <div class="carousel-controls" v-show="slides.length > 1">

      <v-btn   icon @click="goToPrev" variant="tonal">
        <v-icon>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-btn   icon @click="goToNext" variant="tonal">
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </div>

    <!-- 指示器 -->
    <div class="indicators">
      <div v-for="(_, index) in slides" :key="index" class="indicator" :class="{ active: currentIndex === index }"
        @click="goToSlide(index)">
      </div>
    </div>
  </v-card>
</template>

<script>
import {
  GetThemeCarouselParamJson,
} from '@/api/global.js'
export default {
  name: 'Carousel',
  props: {
    interval: {
      type: Number,
      default: 5000
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slides:[],
      currentIndex: 0,
      timer: null,
      // 拖动相关状态
      isDragging: false,       // 是否正在拖动
      startX: 0,               // 拖动起始X坐标
      dragOffset: 0,           // 拖动偏移量（百分比）
      currentX: 0              // 当前X坐标（用于计算偏移）
    }
  },
  mounted() {
    // 自动播放逻辑
    if (this.autoplay) {
      this.startAutoplay();
    }

    // 添加窗口resize监听（可选，用于处理屏幕尺寸变化）
    window.addEventListener('resize', this.handleResize);

    this.GetThemeCarouselParamJson();
  },
  beforeUnmount() {
    // 清理自动播放和事件监听
    this.stopAutoplay();
    if (this.$refs.carousel) {
      this.$refs.carousel.removeEventListener('mouseenter', this.stopAutoplay);
      this.$refs.carousel.removeEventListener('mouseleave', this.startAutoplay);
    }
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    async GetThemeCarouselParamJson() {
      const user_token = this.$G_GetUserToken();
      const response = await GetThemeCarouselParamJson({
        user_token: user_token,
      });
      if (response.data.is_get) {
        this.slides = response.data.json_text;
      }
    },
    // 触摸事件处理
    handleTouchStart(e) {
      this.isDragging = true;
      this.startX = e.touches[0].clientX;
      this.currentX = this.startX;
      this.dragOffset = 0;
    },
    handleTouchMove(e) {
      if (!this.isDragging) return;
      const touch = e.touches[0];
      this.currentX = touch.clientX;
      this.dragOffset = ((this.currentX - this.startX) / this.$refs.carousel.offsetWidth) * 100;
    },
    handleTouchEnd() {
      if (!this.isDragging) return;
      this.handleDragEnd();
    },

    // 鼠标事件处理
    handleMouseDown(e) {
      e.preventDefault(); // 防止选中文字
      this.isDragging = true;
      this.startX = e.clientX;
      this.currentX = this.startX;
      this.dragOffset = 0;

      // 添加全局鼠标移动和松开监听
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseMove(e) {
      if (!this.isDragging) return;
      this.currentX = e.clientX;
      this.dragOffset = ((this.currentX - this.startX) / this.$refs.carousel.offsetWidth) * 100;
    },
    handleMouseUp() {
      if (!this.isDragging) return;
      this.handleDragEnd();
      // 移除全局监听
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    },

    // 处理拖动结束逻辑
    handleDragEnd() {
      const threshold = 20; // 切换阈值（百分比）
      const velocity = Math.abs(this.dragOffset); // 拖动速度（绝对值）

      if (velocity > threshold) {
        // 拖动距离超过阈值，切换轮播
        if (this.dragOffset > 0) {
          this.goToPrev();
        } else {
          this.goToNext();
        }
      } else {
        // 拖动距离不足，回到原位置
        this.currentIndex = Math.round((this.currentIndex * 100 - this.dragOffset) / 100);
      }

      // 重置拖动状态
      this.isDragging = false;
      this.dragOffset = 0;
    },

    // 跳转控制方法
    goToPrev() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
    goToNext() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },

    // 自动播放控制
    startAutoplay() {
      if (this.timer === null && this.slides.length > 1) {
        this.timer = setInterval(() => {
          this.goToNext();
        }, this.interval);
      }
    },
    stopAutoplay() {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    // 窗口resize处理（可选）
    handleResize() {
      // 重置拖动偏移量
      this.dragOffset = 0;
    }
  },
  watch: {
    slides() {
      this.currentIndex = 0;
      this.stopAutoplay();
      if (this.autoplay) {
        this.$nextTick(() => {
          this.$refs.carousel.addEventListener('mouseenter', this.stopAutoplay);
          this.$refs.carousel.addEventListener('mouseleave', this.startAutoplay);
          this.startAutoplay();
        });
      }
    }
  }
}
</script>

<style scoped lang="less">
.carousel-container {
  /* padding: 8px; */
  // margin-bottom: 16px;

  position: relative;
  /* margin: 0 auto; */

  margin: 16px 8px;
  overflow: hidden;
  // border-radius: 16px;
  // box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  // border: 1px solid rgb(0 0 0 / 10%);
  // .theme--dark & {
  //   border-color: rgb(255 255 255 / 10%)
  // }
}

.carousel-slats {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  height: 400px;
}

.slat {
  min-width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.slat img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blinds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 2;
}

.blind-slice {
  flex: 1;
  height: 100%;
  background-color: rgb(var(--mdui-color-secondary-container));
  transform-origin: center bottom;
  transform: scaleY(1);
}

.blind-slice.active {
  transform: scaleY(0);
}

.carousel-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 24px;
  // backdrop-filter: blur(16px);
  // background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  background: linear-gradient(to top, rgb(0 0 0 / 50%), transparent);
  color: white;
  z-index: 1;
}

.carousel-title {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}

.carousel-description {
  margin: 8px 0 0;
  font-size: 16px;
  opacity: 0.9;
}

.carousel-controls {
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;
  display: flex;
  gap: 8px;
  z-index: 2;
}

/* .carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  transform: translateY(-50%);
  z-index: 3;
}

.mdui-button-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
} */

.indicators {
  position: absolute;
  /* bottom: 88px; */
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 3;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.indicator.active {
  background-color: white;
  transform: scale(1.2);
}
</style>