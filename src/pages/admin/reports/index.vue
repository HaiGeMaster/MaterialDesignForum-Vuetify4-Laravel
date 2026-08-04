<template>
  <v-container fluid v-if="userStore.getUser.user_group.ability_admin_manage_report">
    <!-- <v-card v-if="$G_AppIsCanUse()"  rounded="lg" :outlined="$vuetify.theme.dark||$store.getters.GetMobile"> -->
      <DataTable v-if="$G_AppIsCanUse()&&userStore.getIsLogin" 
        :headers="headers"
        type="reports"
        order="+create_time"
      />
    <!-- </v-card> -->
      <NoAllowUse v-else/>
    <Loading :show_empty_icon="false" :need_margin_bottom="true" :show_text="false"/>
  </v-container>
</template>
<script>
import DataTable from '@/components/data-table/index.vue'
import Loading from '@/components/loading/index.vue'
import NoAllowUse from '@/components/no-allow-use/index.vue'
import { useUserStore } from '@/stores/user'
export default {
  name: 'admin-page-reports',
  components: {
    DataTable,
    Loading,
    NoAllowUse,
  },
  data: () => ({
    userStore: useUserStore(),
    dialog: false,
  }),
  computed:{
    headers(){

      return [
        {
          title: this.$t('Message.Admin.Reports.ReportID'),
          align: 'start',
          key: 'report_id',
        },
        {
          title: this.$t('Message.Admin.Reports.UserID'),
          key: 'user_id',
        },
        {
          title: this.$t('Message.Admin.Reports.ReportableType'),
          key: 'reportable_type',
        },
        {
          title: this.$t('Message.Admin.Reports.ReportableID'),
          key: 'reportable_id',
        },
        {
          title: this.$t('Message.Admin.Reports.Reason'),
          key: 'reason',
        },
        {
          title: this.$t('Message.Admin.Reports.ReportHandleState'),
          key: 'report_handle_state',
        },
        {
          title: this.$t('Message.Admin.Reports.CreateTime'),
          key: 'create_time',
        },
      ]
    },
  },
}
</script>