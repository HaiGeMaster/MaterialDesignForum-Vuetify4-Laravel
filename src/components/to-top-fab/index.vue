<template>
  <!-- <v-tooltip top transition="scale-transition" origin="center center">
    <template v-slot:activator="{ on, attrs }"> -->
  <v-fab-transition>
    <v-fab icon="mdi-chevron-up" color="accent" :size="!mainStore.getMobile ? 'default' : 'x-large'" @click="ToTop"
      v-show="mainStore.getScrollValue > 1" :style="{
        'position': 'fixed',
  'bottom': HandleBottom ,
        'right': '16px',
      }
        ">
      <v-progress-circular id="totop-v-progress-circular" :rotate="360" :model-value="mainStore.getScrollValue"
        color="white" :size="mainStore.getMobile ? 68 : 48" :width="3">
        <v-icon color="white" :style="{
          'font-size': mainStore.getScrollValue >= 99 ? '32px' : '28px'
        }">
          mdi-chevron-up
        </v-icon>
      </v-progress-circular>

      <!-- <v-icon>
        mdi-chevron-up
      </v-icon> -->

      <v-tooltip activator="parent" location="top">{{ $t('Message.Components.ToTopButton.ToTop') }}</v-tooltip>
    </v-fab>
  </v-fab-transition>
  <!-- </template>
<span>
  {{
  $t('Message.Components.ToTopButton.ToTop')
  }}
</span>
</v-tooltip> -->
</template>
<script>
import { useMainStore } from '@/stores/main';
export default {
  data: () => ({
    mainStore: useMainStore(),
    WindowWidth: ''
  }),
  methods: {
    ToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
  },
  computed: {
    HandleBottom() {
      // if (this.mainStore.getMobile) {
      //   if (this.mainStore.getScrollMode == 'up' &&
      //     (this.$route.name == 'article' || this.$route.name == 'lang-article')
      //   ) {
      //     return '142px'
      //   }
      //   return '72px'
      // } else {
      //   if (this.mainStore.getScrollMode == 'up' &&
      //     (this.$route.name == 'article' || this.$route.name == 'lang-article') &&
      //     (this.WindowWidth < 1150 && this.WindowWidth > 600)
      //   ) {
      //     var bottom_min = 16
      //     var bottom_max = 86
      //     var window_width_min = 1000
      //     var a = (bottom_max - (bottom_max - bottom_min) * (this.WindowWidth - window_width_min) / 150)
      //     if (a > bottom_max) {
      //       return '86px'
      //     }
      //     return a + 'px'
      //   } else if (this.WindowWidth < 600) {
      //     return '16px'
      //   }
      // }


    //   mainStore.getMobile && ($router.name == 'article' || $router.name == 'lang-article')
    // ? (mainStore.getScrollMode == 'down' ? '16px' : '72px')
      // : (!mainStore.getMobile ? '16px' : '72px')


      
      // if(this.mainStore.getMobile&&(this.$route.name == 'article' || this.$route.name == 'lang-article')){
      //   if(this.mainStore.getScrollMode == 'down'){
      //     return '16px'
      //   } else {
      //     return '152px'
      //   }
      // } else {
        if(this.mainStore.getMobile){
          return '72px'
        } else {
          return '16px'
        }
      // }
    },
  },
  mounted() {
    const handleResize = () => {
      this.WindowWidth = window.innerWidth;
    };
    this.WindowWidth = window.innerWidth;
    window.addEventListener('resize', handleResize);
  }
}
</script>