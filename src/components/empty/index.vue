<template>
  <v-empty-state v-show="show" :headline="headline" :title="title || $t('Message.Components.Empty.Title')"
    :text="text || $t('Message.Components.Empty.NoData')" :image="box_empty">
    <!-- <slot name="empty"> -->
      <v-btn v-show="btn_text" @click="$emit('btn_click')" color="primary" rounded="lg">{{ btn_text }}</v-btn>
    <!-- </slot> -->
  </v-empty-state>


  <!-- prepend-icon="mdi-circle-off-outline" -->
</template>
<script>
// import following_empty from '@/assets/images/following_empty.png'
import box_empty from '@/assets/images/box-empty.png'
export default {
  props: {
    btn_text: {
      type: String,
      default: '',
    },
    headline: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png',
      // default: 'https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-dog.svg',
      // image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-dog.svg"
      // default: 'https://vuetifyjs.b-cdn.net/docs/images/logos/v.png',
      // default: require('@/assets/images/following_empty.png'),
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // following_empty: following_empty,
      box_empty: box_empty,
      default_headline: '',
      default_title: '',
      default_text: '',
      default_image: '',
    }
  },
  methods: {
    autoSelectTitle() {
      
    },
    autoSelectText() {
      
    }
  },
  watch: {
    title(newVal, oldVal) {
      // console.log(newVal, oldVal)
    }
  }
}
</script>