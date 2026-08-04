<template>
  <div class="badge-card" :class="`badge-${level}`">
    <div class="badge-icon">
      <i :class="`mdi ${icon}`"></i>
    </div>
    <div class="badge-content">
      <h3 class="badge-title">{{ title }}</h3>
      <p class="badge-desc">{{ desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BadgeCard',
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true,
      validator: (value) => {
        return ['bronze', 'silver', 'gold', 'diamond'].includes(value)
      }
    }
  }
}
</script>

<style scoped>
.badge-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--md-sys-color-surface-variant);
  transition: all 0.2s ease;
}

.badge-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.badge-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 24px;
}

.badge-bronze .badge-icon {
  background-color: #CD7F32;
  color: white;
}

.badge-silver .badge-icon {
  background-color: #C0C0C0;
  color: white;
}

.badge-gold .badge-icon {
  background-color: #FFD700;
  color: #333;
}

.badge-diamond .badge-icon {
  background-color: #B9F2FF;
  color: #0077BE;
}

.badge-content {
  flex: 1;
}

.badge-title {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--md-sys-color-on-surface);
}

.badge-desc {
  margin: 0;
  font-size: 14px;
  color: var(--md-sys-color-on-surface-variant);
}
</style>