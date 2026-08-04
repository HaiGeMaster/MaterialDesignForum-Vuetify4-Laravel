<template>
  <v-card class="carousel-container" v-if="slides.length > 0" rounded="lg" hover>
    <!-- progress="primary" hide-delimiters -->
    <v-carousel style="cursor: pointer;" v-model="model" interval="5000" cycle show-arrows="hover" height="400"
      hide-delimiter-background>
      <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide.image" cover @click="handleClick(slide)">
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import {
  // GetThemeCarouselParamJson,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main.js'
export default {
  name: 'Carousel',
  data() {
    return {
      mainStore: useMainStore(),
      slides: [],
      model: 0,
    }
  },
  mounted() {
    // this.GetThemeCarouselParamJson();
  },
  computed: {
    ReturnGetAppBaseInfo() {
      return this.mainStore.getAppBaseInfo;
    }
  },
  watch: {
    ReturnGetAppBaseInfo(val) {
      if (val?.option_list) this.GetThemeCarouselParamJson()
    }
  },
  methods: {
    async GetThemeCarouselParamJson() {
      const raw = this.mainStore.getAppBaseInfo?.option_list?.theme_carousel_param
      try {
        this.slides = raw ? JSON.parse(raw) : []
      } catch {
        this.slides = []
      }
    },
    handleClick(slide) {
      window.open(slide.href, '_blank');
    },
  },
}
</script>

<style scoped lang="less">
.carousel-container {
  margin: 0 8px 8px 8px;
}
</style>