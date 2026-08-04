<template>
  <!-- variant="outlined" rounded="lg" color="surface-variant"  -->
  <v-card class=" system-info" rounded="lg" append-icon="mdi-information-outline"  
  :title="$t('Message.Components.ServerInfoDtatStats.SystemInfo')"
  style="height: 400px;" >
  
  <template v-slot:append>
    <v-icon style="height: 70px;">
      mdi-information-outline
    </v-icon>
    </template>
    <!-- <v-card-title style="height: 82px;padding: 16px 16px 0 16px;" >
      {{ $t('Message.Components.ServerInfoDtatStats.SystemInfo') }}
      <v-spacer></v-spacer>
      <span>
        <v-icon>
          mdi-information-outline
        </v-icon>
      </span>
    </v-card-title> -->
    <v-card-text style="padding: 0 16px 36px 16px;height: 270px;overflow:auto" >
      <!-- :style="`${$store.getters.GetMobile?'height: 300px;overflow-y: scroll;':''}`" -->
      <v-list rounded="lg" style="padding: 0;" v-if="data != null" >
        <!--       
        <v-list-item style="min-height: 36px;"
          v-for="(value, key) in Object.entries(data)" :key="key"
        >
            <v-list-item-title>
              {{ $t(`Message.Components.ServerInfoDtatStats.${value[0]}`) }}:
              <span class="grey--text lighten-2" :title="value[1]">
                {{ value[1] }}
              </span>
            </v-list-item-title>
        </v-list-item> -->

        <v-list-item style="min-height: 36px;" v-for="(value, key) in Object.entries(data)" :key="key">
          <!-- <v-list-item-content> -->
            
        <!-- ServerInfoDtatStats: {
          ServerInfo: "Server Info",
          SystemInfo: "System Info",
          MDF_VERSION: "MDF Version",
          OS: "OS",
          PHP_VERSION: "PHP Version",
          WEB_SERVER: "Web Server",
          DB_VERSION: "DB Version",
          UPLOAD_MAX_FILESIZE: "Upload Max Filesize",
          MAX_EXECUTION_TIME: "Max Execution Time",
          DISK_FREE_SPACE: "Disk Free Space",
          DB_SIZE: "DB Size",
        }, 

        $t('Message.Components.ServerInfoDtatStats.ServerInfo')
        $t('Message.Components.ServerInfoDtatStats.SystemInfo')
        $t('Message.Components.ServerInfoDtatStats.MDF_VERSION')
        $t('Message.Components.ServerInfoDtatStats.OS')
        $t('Message.Components.ServerInfoDtatStats.PHP_VERSION')
        $t('Message.Components.ServerInfoDtatStats.WEB_SERVER')
        $t('Message.Components.ServerInfoDtatStats.DB_VERSION')
        $t('Message.Components.ServerInfoDtatStats.UPLOAD_MAX_FILESIZE')
        $t('Message.Components.ServerInfoDtatStats.MAX_EXECUTION_TIME')
        $t('Message.Components.ServerInfoDtatStats.DISK_FREE_SPACE')
        $t('Message.Components.ServerInfoDtatStats.DB_SIZE')


        -->

            <v-list-item-title>{{ $t(`Message.Components.ServerInfoDtatStats.${value[0]}`) }}</v-list-item-title>
            <!-- <v-list-item-subtitle v-if="!userStore.getMobile || value[0]=='OS'" :title="value[1]">
              {{ value[1] }}
            </v-list-item-subtitle> -->
          <!-- </v-list-item-content> -->
          <!-- <v-list-item-action v-if="!$store.getters.GetMobile&&value[0]!='OS'" style="margin: 0;">
            <v-list-item-action-text :title="value[1]">
              {{ value[1] }}
            </v-list-item-action-text>
          </v-list-item-action> -->
          <template v-slot:append v-if="!userStore.getMobile &&value[0]!='OS'">
            <!-- <v-list-item-action-text :title="value[1]"> -->
              {{ value[1] }}
            <!-- </v-list-item-action-text> -->
          </template>
        </v-list-item>

      </v-list>

      <v-list rounded="lg" dense  style="padding: 0;" three-line v-else>
              <v-skeleton-loader class="mx-auto" type="list-item-two-line" v-for="i in 8" :key="i"></v-skeleton-loader>  
        <!-- <v-list-item style="min-height: 36px;" >
          <v-list-item-content>
            <v-list-item-title>
            </v-list-item-title>
            <v-list-item-subtitle v-if="$store.getters.GetMobile||value[0]=='OS'" :title="value[1]">
              {{ value[1] }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> -->

      </v-list>

    </v-card-text>
  </v-card>
</template>
<script>
// import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"
// import colors from 'vuetify/lib/util/colors'

import {
  // GetDataBetweenTimestamps,
  GetServerInfo,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main'
export default {
  name: 'server-info-data-stats',
  props: {
  },
  data: () => ({
    userStore: useMainStore(),
    data: null,
    loading: false,
  }),
  methods: {
    async GetServerInfo() {
      // console.log('GetServerInfo')
      this.loading = true
      var user_token = this.$G_GetUserToken()
      const res = await GetServerInfo({
        user_token: user_token,
      })
      if (res.data.is_get == true) {
        // this.data = null
        this.data = res.data.data
        this.loading = false
      } else {
        // this.data = null
        this.loading = false
      }
    },
  },
  created() {
    this.GetServerInfo()
  },
}
</script>