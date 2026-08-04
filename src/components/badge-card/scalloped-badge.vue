<template>
  <div class="scalloped-badge" :style="containerStyle">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <path :d="scallopedPath" :fill="color" />
    </svg>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 0=圆形，1~10 扇贝瓣数
  count: {
    type: Number,
    default: 0,
    validator: (v) => v >= 0 && v <= 10
  },
  color: {
    type: String,
    default: '#6750A4' // MD3 紫色
  },
  size: {
    type: [Number, String],
    default: 80
  }
})

// 生成完美圆润扇贝边路径
const scallopedPath = computed(() => {
  const count = props.count
  if (count === 0) {
    return 'M50 0 A50 50 0 1 0 50 100 A50 50 0 1 0 50 0 Z'
  }

  const points = []
  const step = (Math.PI * 2) / count
  const outer = 50
  const inner = 42

  // 起点
  points.push('M50,' + (50 - outer))

  for (let i = 0; i < count; i++) {
    const a1 = i * step - Math.PI / 2
    const a2 = (i + 1) * step - Math.PI / 2
    const midA = (a1 + a2) / 2

    const x1 = 50 + outer * Math.cos(a1)
    const y1 = 50 + outer * Math.sin(a1)
    const x2 = 50 + inner * Math.cos(midA)
    const y2 = 50 + inner * Math.sin(midA)
    const x3 = 50 + outer * Math.cos(a2)
    const y3 = 50 + outer * Math.sin(a2)

    points.push(`Q${x1},${y1} ${x2},${y2}`)
    points.push(`Q${x3},${y3} ${x3},${y3}`)
  }

  return points.join(' ') + ' Z'
})

const containerStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`
}))
</script>

<style scoped>
.scalloped-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
svg {
  display: block;
  width: 100%;
  height: 100%;
}
.content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 500;
  font-size: 24px;
}
</style>