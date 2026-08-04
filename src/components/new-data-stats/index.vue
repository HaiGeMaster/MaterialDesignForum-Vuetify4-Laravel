<template>
  <v-card :class="classes" rounded="lg" style="height: 400px;" :loading="loading"
    :title="typeText + ' ' + $t('Message.Components.NewDataStats.Increase')"
    @click="$emit('onclick', model_type, color)">

    <template v-slot:append>
      <span style="width: 150px;">
        <v-select v-model="items_select" @click.prevent.stop="handleClick" variant="underlined"
          prepend-icon="mdi-calendar-month" :items="itemsText" item-title="text" item-value="value">
        </v-select>
      </span>
    </template>

    <v-card-text>
      <VChart ref="chartRef" :option="chartOption" autoresize style="height: 300px;" />
    </v-card-text>
  </v-card>
</template>

<script>
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  MarkPointComponent,
} from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, MarkPointComponent])

import { GetDataBetweenTimestamps } from '@/api/global.js'

export default {
  name: 'new-data-stats',
  components: { VChart },
  props: {
    init_data: {
      type: Array,
      default: () => []
    },
    model_type: {
      type: String,
      default: 'user'
    },
    model_items_select: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#1976d2'
    },
  },
  emits: ['onclick'],
  data: () => ({
    //分别有 last_7_days, this_month, last_month, last_30_days, this_year, last_year, last_1_year
    items_select: 'last_7_days',
    data: null,
    loading: false,
    vmodel_items_select: '',
  }),
  computed: {
    typeText() {
      switch (this.model_type) {
        case 'user': return this.$t('Message.Components.NewDataStats.User')
        case 'user_group': return this.$t('Message.Components.NewDataStats.UserGroup')
        case 'report': return this.$t('Message.Components.NewDataStats.Report')
        case 'topic': return this.$t('Message.Components.NewDataStats.Topic')
        case 'question': return this.$t('Message.Components.NewDataStats.Question')
        case 'answer': return this.$t('Message.Components.NewDataStats.Answer')
        case 'article': return this.$t('Message.Components.NewDataStats.Article')
        case 'comment': return this.$t('Message.Components.NewDataStats.Comment')
        case 'reply': return this.$t('Message.Components.NewDataStats.Reply')
      }
    },
    itemsText() {
      const a = [
        { text: this.$t('Message.Components.NewDataStats.Last7Days'), value: 'last_7_days' },
        { text: this.$t('Message.Components.NewDataStats.ThisMonth'), value: 'this_month' },
        { text: this.$t('Message.Components.NewDataStats.LastMonth'), value: 'last_month' },
        { text: this.$t('Message.Components.NewDataStats.Last30Days'), value: 'last_30_days' },
        { text: this.$t('Message.Components.NewDataStats.ThisYear'), value: 'this_year' },
        { text: this.$t('Message.Components.NewDataStats.LastYear'), value: 'last_year' },
        { text: this.$t('Message.Components.NewDataStats.Last1Year'), value: 'last_1_year' },
      ]
      const year = new Date().getFullYear()
      const yearArray = []
      for (let i = year; i > year - 10; i--) {
        yearArray.push({ text: String(i), value: String(i) })
      }
      return a.concat(yearArray)
    },
    chartOption() {
      if (!this.data || this.data.length === 0) {
        return {}
      }
      const lineColor = this.color || '#1976d2'
      return {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '8%',
          top: '5%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'rgba(30,30,30,0.85)',
          borderColor: 'transparent',
          textStyle: { color: '#fff', fontSize: 13 },
          formatter: (params) => {
            const p = params[0]
            return `<strong>${p.axisValue}</strong><br/>
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${lineColor};margin-right:6px;"></span>
              : <strong>${p.value}</strong>`

              // ${this.$t('Message.Common.Count')}
          },
        },
        xAxis: {
          type: 'category',
          data: this.data.map(d => d.date),
          axisLine: { lineStyle: { color: '#999' } },
          axisLabel: { color: '#999' },
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: 'rgba(128,128,128,0.15)' } },
          axisLabel: { color: '#999' },
        },
        series: [{
          type: 'line',
          data: this.data.map(d => d.count),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            color: lineColor,
            width: 2.5,
          },
          itemStyle: {
            color: lineColor,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: this.colorToRgba(lineColor, 0.3) },
                { offset: 1, color: this.colorToRgba(lineColor, 0.02) },
              ],
            },
          },
        }],
      }
    },
  },
  methods: {
    handleClick() {},
    colorToRgba(color, alpha) {
      const ctx = document.createElement('canvas').getContext('2d')
      ctx.canvas.width = 1
      ctx.canvas.height = 1
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
      return `rgba(${r},${g},${b},${alpha})`
    },
    async GetData() {
      this.loading = true
      const user_token = this.$G_GetUserToken()
      const res = await GetDataBetweenTimestamps({
        user_token: user_token,
        time_type: this.items_select,
        model_type: this.model_type,
      })
      if (res.data.is_get == true) {
        this.data = res.data.data
      } else {
        this.data = null
      }
      this.loading = false
      this.vmodel_items_select = ''
    },
  },
  created() {
    if (this.model_items_select) {
      this.vmodel_items_select = this.model_items_select
      this.items_select = this.vmodel_items_select
    }
    if (this.init_data.length > 0) {
      this.data = this.init_data
    } else {
      this.GetData()
    }
  },
  watch: {
    items_select() {
      this.vmodel_items_select = ''
      this.GetData()
    },
    model_type() {
      this.GetData()
    },
    init_data(val) {
      this.data = val
    },
  },
}
</script>
