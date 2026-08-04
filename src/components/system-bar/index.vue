<template>
  <!-- <v-layout style="height: 50px"> -->
  <v-system-bar window>
    <v-icon icon="mdi-vuetify" style="margin-right: 8px;"></v-icon>

    <span>{{ mainStore.getInfoData.site_name }}</span>

    <v-spacer style="-webkit-app-region: drag;height: 100%;"></v-spacer>
    <v-icon :icon="batteryIcon" :color="batteryColor"></v-icon>
    <span style="margin-right: 8px;">{{ batteryLevel }}%</span>

    <!-- <v-chip size="small" class="ma-2" >
      <v-icon :icon="batteryIcon" :color="batteryColor" start></v-icon>
      {{ batteryLevel }}%
    </v-chip> -->

    <!-- <v-btn variant="text">
      <v-icon start :icon="batteryIcon" :color="batteryColor"></v-icon>
      {{ batteryLevel }}%
    </v-btn> -->
    <v-btn @click="_OnWindowOpen('window-min')" size="small" icon="mdi-minus" variant="text"></v-btn>

    <v-btn @click="_OnWindowOpen('window-max')" size="small" icon="mdi-border-radius" variant="text"></v-btn>

    <v-btn @click="_OnWindowOpen('window-close')" size="small" icon="mdi-window-close" variant="text"></v-btn>
  </v-system-bar>
  <!-- </v-layout> -->
</template>
<script>
import { useMainStore } from '@/stores/main'
import {
  OnWindowOpen,
} from '@/api/global.js';
export default {
  name: 'SystemBar',
  props: {
    admin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mainStore: useMainStore(),
      batteryInfo: null,
      title: 'Material Design Forum',
      max: false,
      top_window: false,
    }
  },
  mounted() {
    this.getBatteryStatus()
  },
  methods: {
    async getBatteryStatus() {
      try {
        if ('getBattery' in navigator) {
          const battery = await navigator.getBattery()
          this.updateBatteryInfo(battery)

          // 监听电池状态变化
          battery.addEventListener('levelchange', () => this.updateBatteryInfo(battery))
          battery.addEventListener('chargingchange', () => this.updateBatteryInfo(battery))
        }
      } catch (error) {
        console.error('获取电池状态失败:', error)
      }
    },
    updateBatteryInfo(battery) {
      this.batteryInfo = {
        percentage: Math.round(battery.level * 100),
        charging: battery.charging
      }
    },
    UpdateTitle() {
      const _this = this;
      document.querySelector('title').addEventListener('DOMSubtreeModified', () => {
        _this.title = document.querySelector('title').innerText;
      });
    },
    _OnWindowOpen(type) {
      OnWindowOpen(type);
    },
  },
  computed: {
    max(val) {
      this._OnWindowOpen('max');
    },
    top_window(val) {
      this._OnWindowOpen(val ? 'window-top' : 'window-top-cancel');
    },
    batteryLevel() {
      return this.batteryInfo ? this.batteryInfo.percentage : 0
    },
    batteryIcon() {
      if (!this.batteryInfo) return 'mdi-battery-unknown'
      const level = this.batteryInfo.percentage
      const charging = this.batteryInfo.charging

      if (charging) {
        if (level >= 90) return 'mdi-battery-charging'
        if (level >= 80) return 'mdi-battery-charging-80'
        if (level >= 70) return 'mdi-battery-charging-70'
        if (level >= 60) return 'mdi-battery-charging-60'
        if (level >= 50) return 'mdi-battery-charging-50'
        if (level >= 40) return 'mdi-battery-charging-40'
        if (level >= 30) return 'mdi-battery-charging-30'
        if (level >= 20) return 'mdi-battery-charging-20'
        if (level >= 10) return 'mdi-battery-charging-10'
        return 'mdi-battery-charging-outline'
      } else {
        if (level >= 90) return 'mdi-battery'
        if (level >= 80) return 'mdi-battery-80'
        if (level >= 70) return 'mdi-battery-70'
        if (level >= 60) return 'mdi-battery-60'
        if (level >= 50) return 'mdi-battery-50'
        if (level >= 40) return 'mdi-battery-40'
        if (level >= 30) return 'mdi-battery-30'
        if (level >= 20) return 'mdi-battery-20'
        if (level >= 10) return 'mdi-battery-10'
        return 'mdi-battery-outline'
      }
    },
    batteryColor() {
      if (!this.batteryInfo) return 'mdi-battery-unknown'
      const level = this.batteryInfo.percentage
      const charging = this.batteryInfo.charging

      if (charging) {
        if (level <= 20) return 'orange'
        if (level <= 10) return 'red'
        return 'green'
      } else {
        if (level <= 20) return 'orange'
        if (level <= 10) return 'red'
        return ''
      }
    }
  }
}
</script>