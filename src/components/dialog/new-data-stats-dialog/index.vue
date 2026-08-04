<template>
  <v-dialog v-model="vmodel" transition="dialog-bottom-transition" :fullscreen="mainStore.getMobile">
    <v-card rounded="lg">
      <v-toolbar elevation="0">

        <template v-slot:prepend>
          <v-icon style="margin: 0 8px 0 8px;">
            mdi-chart-line
          </v-icon>
        </template>

        <v-toolbar-title>{{ $t('Message.Components.NewDataStats.DetailedDataes') }}</v-toolbar-title>
        <!-- <v-spacer></v-spacer> -->
        <template v-slot:append>
          <v-btn  icon @click="vmodel = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-toolbar>

      <v-card-text>
        <NewDataStats :model_type="type" model_items_select="last_1_year" :color="color"></NewDataStats>
      </v-card-text>



      <!-- <v-card-actions>

        <v-spacer></v-spacer>
        <Cancel @cancel="vmodel = false" :text="$t('Message.Components.DataTable.Cancel')" />

        <Confirm @confirm="vmodel = false" :text="$t('Message.Components.DataTable.Confirm')" />
      </v-card-actions> -->
    </v-card>


  </v-dialog>
</template>
<script>
import NewDataStats from '@/components/new-data-stats/index.vue'
import { useMainStore } from '@/stores/main'
// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'
export default {
  name: 'new-data-stats-dialog',
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',//@param $model_type string user, user_group, report, topic, question, answer, article, comment, reply
    },
    color: {
      type: String,
      default: '',//@param $color string user, user_group, report, topic, question, answer, article, comment, reply
    },
  },
  components: {
    NewDataStats,
    // Confirm,
    // Cancel,
  },
  data() {
    return {
      mainStore: useMainStore(),
      vmodel: false,
      // title: '',
    };
  },
  methods: {
  },
  mounted() {
    // console.log(this.$t('Message.Components.NewDataStats.DetailedDataes'))
    // this.title = this.$t('Message.Components.NewDataStats.DetailedDataes')
  },
  watch: {
    model(val) {
      // console.log('model', val)
      if (val == true) {
        this.vmodel = val
        // console.log(this.$t('Message.Components.NewDataStats.DetailedDataes'))
      }
    },
    vmodel(val) {
      if (val == false) {
        this.$emit('model', val)
      }
    },
    // '$i18n.locale'() {
    //   this.title = this.$t('Message.Components.NewDataStats.DetailedDataes')
    // },
  },
};
</script>