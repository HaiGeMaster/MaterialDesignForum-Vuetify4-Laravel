
<script setup>
    import TopicItem from '@/components/topic-item/index.vue'
</script>
<template>
  <v-sheet
    class="mx-auto"
  >
    <v-slide-group
      show-arrows
    >
      <v-slide-group-item
        v-for="n in 25"
        :key="n"
        v-slot="{ isSelected, toggle }"
      >
        <!-- <v-btn rounded="lg" 
          :color="isSelected ? 'primary' : undefined"
          class="ma-2"
          rounded
          @click="toggle"
        >
          Options {{ n }}
        </v-btn> -->
        <TopicItem />
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>
