<template>

  <v-container fluid>
    <v-card>
      <v-toolbar extended>
        <v-toolbar-title text="地图查询"></v-toolbar-title>

        <template v-slot:extension>
          <v-tabs v-model="serverTab" color="primary" align-tabs="center" grow>
            <v-tab value="al">国服</v-tab>
            <v-tab value="gl">国际服</v-tab>
            <v-tab value="ns">NS服</v-tab>
          </v-tabs>
        </template>
        <template v-slot:append>
          <v-btn rounded="lg"  icon="mdi-magnify"></v-btn>
        </template>
      </v-toolbar>

      <v-divider>地图主题</v-divider>

      <v-tabs v-model="mapThemeTab" color="primary" align-tabs="center"  class="mb-2" show-arrows>
        <v-tab v-for="(theme, i) in mapThemeList" :key="i" :value="mapThemeListGetValue(theme)">{{
          mapThemeListGetValue(theme)
          }}</v-tab>
      </v-tabs>

      <!-- <v-table>
        <tbody> -->
          <!-- 每一行5列 -->
          <!-- <tr v-for="(theme, i) in mapThemeList" :key="i">
            <td>{{ mapThemeListGetValue(theme) }}</td>
          </tr> -->
        <!-- </tbody>
      </v-table> -->

      <v-divider>地图名称</v-divider>

      <v-tabs v-model="mapNameTab" color="primary" align-tabs="center" class="mb-2" show-arrows>
        <v-tab v-for="(name, i) in mapNameListGetData(mapNameList)" :key="i" :value="mapNameListGetValue(name)">{{
          mapNameListGetValue(name) + ' ' + name.length + "'" }}</v-tab>
      </v-tabs>

      <v-divider>地图关卡</v-divider>


      <v-list-item v-for="(item, i) in mapDataListGetDataALORGL" :key="i">
        <v-list-item-title>{{ item.season }}</v-list-item-title>

        <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">{{ item.chapter }}</v-list-item-subtitle>
        <!-- 
        <v-list-item-subtitle class="text-high-emphasis">{{ item.subtitle }}</v-list-item-subtitle> -->

        <template v-slot:append>
          <v-list-item-action class="flex-column align-end">
            <small class="mb-4 text-high-emphasis opacity-60 text-green">{{ item.race }}</small>

            <v-spacer></v-spacer>

            <!-- <v-icon v-if="isSelected" color="yellow-darken-3">mdi-star</v-icon>

            <v-icon v-else class="opacity-30">mdi-star-outline</v-icon> -->


            <small class="mb-4 text-high-emphasis opacity-60">{{ item.raceType }}</small>
          </v-list-item-action>
        </template>
      </v-list-item>

    </v-card>
  </v-container>
</template>
<script>
import carItem from './car-item.vue'
import { mapTheme, mapName, mapData } from './data.js'
export default {
  name: 'car-view',
  components: {
    carItem,
  },
  data() {
    return {
      serverTab: 'al',
      mapThemeTab: '大桥海湾',
      mapNameTab: '大桥景观',

      mapThemeList: mapTheme,
      mapNameList: mapName,
      mapDataList: mapData,
    }
  },
  computed: {
    mapDataListGetDataALORGL() {
      switch (this.serverTab) {
        case 'al':
          return this.mapDataListGetData(this.mapDataList.al)
        case 'gl':
          return this.mapDataListGetData(this.mapDataList.gl)
        case 'ns':
          return this.mapDataListGetData(this.mapDataList.al)
        default:
          return []
      }
    },
  },
  methods: {
    mapThemeListGetValue(item) {//根据serverTab选中的服务器，返回该服务器下的地图主题列表
      switch (this.serverTab) {
        case 'al':
          return item.mapThemeAL
        case 'gl':
        case 'ns':
          return item.mapThemeCN
        default:
          return []
      }
    },
    mapNameListGetData(items) {//根据mapThemeTab选中的地图主题，返回该主题下的地图名称列表
      switch (this.serverTab) {
        case 'al':
          //返回items数组对象中mapThemeAL==this.mapThemeTab的项
          return items.filter(item => item.mapThemeAL == this.mapThemeTab)
        case 'gl':
        case 'ns':
          //返回items数组对象中mapThemeCN==this.mapThemeTab的项
          return items.filter(item => item.mapThemeCN == this.mapThemeTab)
        default:
          return []
      }
    },
    mapNameListGetValue(item) {//根据serverTab选中的服务器，返回该服务器下的地图主题列表
      switch (this.serverTab) {
        case 'al':
          return item.mapNameAL
        case 'gl':
        case 'ns':
          return item.mapNameCN
        default:
          return []
      }
    },
    mapDataListGetData(items) {//根据mapNameTab选中的地图名称，返回该名称下的地图数据
      switch (this.serverTab) {
        case 'al':
          //返回items数组对象中mapNameAL==this.mapNameTab的项
          return items.filter(item => item.mapName == this.mapNameTab)
        case 'gl':
          return items.filter(item => item.mapName == this.mapNameTab)
        case 'ns':
          //返回items数组对象中mapNameCN==this.mapNameTab的项
          return items.filter(item => item.mapName == this.mapNameTab)
        default:
          return []
      }
    }
  },
  watch: {
    serverTab(newVal, oldVal) {
      switch (newVal) {
        case 'al':
          this.mapThemeTab = '大桥海湾'
          this.mapNameTab = this.mapNameListGetValue(this.mapNameList[0])
          break;
        case 'gl':
        case 'ns':
          this.mapThemeTab = '旧金山'
          this.mapNameTab = this.mapNameListGetValue(this.mapNameList[0])
          break;
        default:
          break;
      }
    }
  }
}
</script>