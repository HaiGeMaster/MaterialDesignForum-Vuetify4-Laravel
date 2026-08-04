<template>
  <!-- :title="car.fullName" -->
  <v-card rounded="lg" class="mx-auto" variant="outlined" @click="">
    <!-- <v-card-title>{{ car.fullName }}</v-card-title> -->
    <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
      <v-card-title>
        <span class="font-weight-bold card-title">{{ car.fullName }}
          
              <v-tooltip activator="parent" location="top">车辆名称：{{ car.fullName }}</v-tooltip>

        </span>
      </v-card-title>
    </v-img>

    <!-- 标题区：名称 + 星级 + 标签 -->
    <template v-slot:title>
      <!-- 星级评级（使用car.star值） -->
      <v-rating disabled :model-value="car.star" active-color="amber" :length="car.star">
        <v-tooltip activator="parent" location="top">星级：{{ car.star }}</v-tooltip>
      </v-rating>
    </template>

    <template v-slot:append>
      <!-- 水平排列别名和性能分 -->
      <div>
        <span class="me-2 grey--text text--darken-2">
          {{ car.nickName }}
          <v-tooltip activator="parent" location="top">车辆别名：{{ car.nickName }}</v-tooltip>
        </span>
        <br />
        <span class="text-h6 text-amber font-weight-bold">
          {{ car.rank }}
          <span :class="`text-${getQualityColor(car.quality)}`">{{ car.carClass }}
          </span>
          <v-tooltip activator="parent" location="top">车辆性能分：{{ car.rank }} 车辆类型：{{ car.carClass }} 车辆品质：{{
            getQualityDesc(car.quality) }}</v-tooltip>
        </span>
      </div>
    </template>

    <!-- 基础信息区：钥匙 + 红色/白色方块 -->
    <v-card-text>
      <v-row no-gutters class="mb-4">
        <v-col>
          <div class="d-flex flex-wrap gap-2">
            <!-- 使用car.star_* 属性 -->
            <v-chip v-show="car.star_1 != '0'" label variant="elevated" :color="getQualityColor(car.quality)"
              elevation="0" class="font-weight-bold">{{
                car.star_1
              }}</v-chip>
            <v-chip v-show="car.star_2 != '0'" label variant="elevated" :color="getQualityColor(car.quality)"
              elevation="0" class="font-weight-bold">{{
                car.star_2
              }}</v-chip>
            <v-chip v-show="car.star_3 != '0'" label variant="elevated" :color="getQualityColor(car.quality)"
              elevation="0" class="font-weight-bold">{{
                car.star_3
              }}</v-chip>
            <v-chip v-show="car.star_4 != '0'" label variant="elevated" :color="getQualityColor(car.quality)"
              elevation="0" class="font-weight-bold">{{
                car.star_4
              }}</v-chip>
            <v-chip v-show="car.star_5 != '0'" label variant="elevated" :color="getQualityColor(car.quality)"
              elevation="0" class="font-weight-bold">{{
                car.star_5
              }}</v-chip>
            <v-chip v-show="car.star_6 != '0'" label variant="elevated" :color="getQualityColor(car.quality)"
              elevation="0" class="font-weight-bold">{{
                car.star_6
              }}</v-chip>
            <!-- 白色数值方块（使用topSpeed） -->
            <v-chip label variant="outlined" class="font-weight-bold" :color="getQualityColor(car.quality)"
              elevation="0">
              {{ (car.star_2 + car.star_3 + car.star_4 + car.star_5 +
                car.star_6) }}
            </v-chip>


            <v-tooltip activator="parent" location="top">每个星级所需图纸数量 最后为总数量</v-tooltip>
          </div>
        </v-col>
      </v-row>

      <!-- 性能属性区：两列布局 -->
      <v-row>
        <!-- 第一列 -->
        <v-col cols="6">
          <v-list rounded="lg" class="transparent" dense>
            <!-- 最大速度 -->
            <v-list-item>
              <v-list-item-title class="text-subtitle-1">极速 {{ toFloat(car.topSpeed) }} km/h</v-list-item-title>
              <v-list-item-action class="d-flex align-center">
                <!-- <span class="text-h6 me-2">{{ toFloat(car.topSpeed) }}km/h</span> -->
                <!-- striped -->
                <!-- model-value应该为双精度浮点数 -->
                <v-progress-linear rounded color="cyan" height="8" :max="600"
                  :model-value="car.topSpeed"></v-progress-linear>
              </v-list-item-action>
            </v-list-item>

            <!-- 加速 -->
            <v-list-item>
              <v-list-item-title class="text-subtitle-1">加速 {{ toFloat(car.acceleration) }}s</v-list-item-title>
              <v-list-item-action class="d-flex align-center">
                <!-- <span class="text-h6 me-2">{{ toFloat(car.acceleration) }}s</span> -->
                <v-progress-linear rounded color="cyan" height="8" max="100"
                  :model-value="car.acceleration"></v-progress-linear>
              </v-list-item-action>
            </v-list-item>

            <!-- 操控 -->
            <v-list-item>
              <v-list-item-title class="text-subtitle-1">操控 {{ toFloat(car.handling) }}%</v-list-item-title>
              <v-list-item-action class="d-flex align-center">
                <!-- <span class="text-h6 me-2">{{ toFloat(car.handling) }}%</span> -->
                <v-progress-linear rounded color="cyan" height="8" max="100"
                  :model-value="car.handling"></v-progress-linear>
              </v-list-item-action>
            </v-list-item>

            <!-- 氮气 -->
            <v-list-item>
              <v-list-item-title class="text-subtitle-1">氮气 {{ toFloat(car.nitro) }}%</v-list-item-title>
              <v-list-item-action class="d-flex align-center">
                <!-- <span class="text-h6 me-2">{{ toFloat(car.nitro)  }}%</span> -->
                <v-progress-linear rounded color="cyan" height="8" max="100"
                  :model-value="car.nitro"></v-progress-linear>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- 第二列 -->
        <v-col cols="6">
          <v-list rounded="lg" class="transparent" dense>
            <!-- 氮速空速 -->
            <v-list-item>
              <v-list-item-title class="text-subtitle-1">氮速空速</v-list-item-title>
              <template v-slot:append>
                <span class="text-h6 font-weight-bold">{{ car.nitroSpeed }} / {{ car.airSpeed }}</span>
              </template>
              <v-tooltip activator="parent" location="top">氮速空速：{{ car.nitroSpeed }} / {{ car.airSpeed }}</v-tooltip>
            </v-list-item>

            <!-- 改装费用 -->
            <v-list-item>
              <v-list-item-title class="text-subtitle-1">改装费用</v-list-item-title>
              <template v-slot:append>
                <span class="text-h6 font-weight-bold">{{ formatNumber(car.totalCost) }}</span>
              </template>
              <v-tooltip activator="parent" location="top">改装费用：{{ formatNumber(car.totalCost) }}</v-tooltip>
            </v-list-item>

            <!-- 进口零件 -->
            <v-list-item>
              <v-list-item-title class="text-subtitle-1">进口零件</v-list-item-title>
              <template v-slot:append>
                <div class="d-flex gap-2">
                  <v-chip label color="blue" class="hexagon-chip" v-show="car.uncommonPart != '0'">{{ car.uncommonPart
                    }}</v-chip>
                  <v-chip label color="purple" class="hexagon-chip" v-show="car.rarePart != '0'">{{ car.rarePart
                    }}</v-chip>
                  <v-chip label color="orange" class="hexagon-chip" v-show="car.epicPart != '0'">{{ car.epicPart
                    }}</v-chip>
                </div>
              </template>
              <v-tooltip activator="parent" location="top">进口零件：特殊：{{ car.uncommonPart }} 稀有：{{ car.rarePart }} 史诗：{{
                car.epicPart }}</v-tooltip>
            </v-list-item>

            <!-- 单喷时间 -->
            <v-list-item>
              <v-list-item-title class="text-subtitle-1">单喷时间</v-list-item-title>
              <template v-slot:append>
                <span class="text-h6 font-weight-bold">{{ car.nitroDuration }}s</span>
              </template>
              <v-tooltip activator="parent" location="top">单喷时间：{{ car.nitroDuration }}</v-tooltip>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'car-item',
  props: {
    car: {
      type: Object,
      default: () => ({
        _id: 311,
        fullName: 'Devel Sixteen🔑',
        car_id: 'sixteen',
        brand: 'Devel',
        releaseVersion: '4.6',
        nickName: '恶魔',
        carClass: 'R',
        star: 6,
        quality: 'ruby',
        star_1: '🔑',
        star_2: 60,
        star_3: 65,
        star_4: 68,
        star_5: 72,
        star_6: 75,
        rank: 5254,
        topSpeed: 556.5,
        acceleration: 81.37,
        handling: 56.37,
        nitro: 38.45,
        nitroDuration: 3.7,
        stageCost: 50000000,
        uncommonPartCost: 240000,
        partCost: 68000000,
        totalCost: 118000000,
        uncommonPart: 4,
        rarePart: 8,
        epicPart: 6,
        nitroSpeed: 559,
        blueSpeed: 0,
        airSpeed: 600,
        getMethod: '联会赛事',
        getLoot: '',
        getGoals: '',
        getClassCup: '',
        getStore: '',
        getExclusive: '',
        getHunt: '',
        getLegendPass: '',
        getUnleash: '',
        getClassicMP: '',
        get1vs1: '',
        getSpecialEvent: '',
        getGrandPrix: '',
        getDriveSyndicate: 1,
        keyCar: 1,
        decals: '',
        decalsExclusive: '',
        bodyParts: '',
        openCar: '',
        nitroVisuals: '',
        storeEpicPart: '',
        keyWords: '十六 16',
        packLevel: '',
      })
    }
  },
  data() {
    return {
    }
  },
  methods: {
    toFloat(value) {
      const a = parseFloat(value)
      return a.toFixed(2)
    },
    // 计算进度条百分比
    calcProgress(value, max) {
      return (value / max) * 100
    },

    // 格式化数字为千位分隔符格式
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    // 根据车级返回颜色
    // getCarClassColor(carClass) {
    //   switch (carClass) {
    //     case 'R':
    //       return 'red'
    //     case 'S':
    //       return 'orange'
    //     case 'A':
    //       return 'amber'
    //     case 'B':
    //       return 'purple'
    //     case 'C':
    //     case 'D':
    //       return 'blue'
    //     default:
    //       return 'gray'
    //   }
    // },

    // 根据品质返回颜色
    getQualityColor(quality) {
      switch (quality) {
        case 'ruby':
          return 'red'
        case 'epic':
          return 'amber'
        case 'rare':
          return 'purple'
        case 'uncm':
          return 'blue'
        default:
          return 'gray'
      }
    },

    // 根据品质返回说明
    getQualityDesc(quality) {
      switch (quality) {
        case 'ruby':
          return '传奇'
        case 'epic':
          return '史诗'
        case 'rare':
          return '稀有'
        case 'uncm':
          return '特殊'
        default:
          return '未知'
      }
    }
  }
}
</script>

<style scoped>
/* 新增六边形样式 */
.hexagon-chip {
  width: 28px;
  height: 26px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  border-radius: 0 !important;
  min-width: auto !important;
  padding: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
}

.v-card {
  border-radius: 12px;
  min-width: 370px;
  width: 400px;
}

.text-subtitle-1 {
  font-weight: 500;
}

.gap-2 {
  gap: 8px;
}

.card-title {
  font-size: 20px;
}
</style>
