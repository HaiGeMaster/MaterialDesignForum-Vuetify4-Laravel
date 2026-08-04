<template>
  <div class='mc-list-header'>
    <v-btn rounded="lg"  icon v-if="show_close" class="close" @click="list_header_close_click()" variant="text">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <div class="title">
      {{ title }}
    </div>
    <v-spacer></v-spacer>
    <v-menu offset-y transition="scroll-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn rounded="lg"  variant="text" v-bind="props" class="ma-2" v-show="show_menu">
          <!-- <v-icon left>{{ select_icon }}</v-icon> -->
          {{ $t(menu_title) }}
          <v-icon right>
            mdi-menu-down
          </v-icon>
        </v-btn>
      </template>
      <v-list rounded="lg" v-if="show_menu">
        <v-list-item v-for="items in item[type]" :key="item.name" @click="menu_order_item_select(items)"
          :class="menu_title == items.name ? 'v-item--active v-list-item--active' : ''">
          <template v-slot:prepend>
            <v-icon>{{ items.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ $t(items.name) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: 'list-header',
  props: {
    title: {
      type: String,
      default: 'Test',
    },
    show_close: {
      Boolean,
      default: false
    },
    show_menu: {
      Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'answers',
    }
  },
  data: () => ({
    menu_title: '',
    item: {
      topics: [
        {
          order: '-update_time',
          name: 'Message.Client.Topic.Contexts.UpdateTimeFromLateToEarly',
          icon: 'mdi-sort-clock-descending-outline',
        },
        {
          order: '+update_time',
          name: 'Message.Client.Topic.Contexts.UpdateTimeFromEarlyToLate',
          icon: 'mdi-sort-clock-ascending-outline',
        },
        {
          order: '-vote_count',
          name: 'Message.Client.Topic.Contexts.Hottest',
          icon: 'mdi-fire',
        },
      ],
      users_1: [
        {
          order: '-update_time',
          name: 'Message.Client.User.Contexts.UpdateTimeFromLateToEarly',
          icon: 'mdi-sort-clock-descending-outline',
        },
        {
          order: '+update_time',
          name: 'Message.Client.User.Contexts.UpdateTimeFromEarlyToLate',
          icon: 'mdi-sort-clock-ascending-outline',
        },
      ],
      users_2: [
        {
          order: '-create_time',
          name: 'Message.Client.User.Contexts.ReleaseTimeFromLateToEarly',
          icon: 'mdi-sort-clock-descending-outline',
        },
        {
          order: '-create_time',
          name: 'Message.Client.User.Contexts.ReleaseTimeFromEarlyToLate',
          icon: 'mdi-sort-clock-ascending-outline',
        },
        {
          order: '-vote_count',
          name: 'Message.Client.User.Contexts.MostPopular',
          icon: 'mdi-fire',
        },
      ],
    },
    select_icon: 'mdi-sort-clock-descending-outline',
  }),
  methods: {
    menu_order_item_select(items) {
      this.menu_title = items.name
      this.select_icon = items.icon
      this.$emit('menu_order_item_select', items.name, items.order)
    },
    list_header_close_click() {
      this.$emit('list_header_close_click')
    }
  },
  created() {
    this.menu_title = this.item[this.type][0].name
  },
  watch: {
    type(val) {
      this.menu_title = this.item[this.type][0].name
      this.$emit('OnInit', this.item[this.type][0].order)
    }
  }
};
</script>
<style lang="less">
/* */ @import "../../vendor/variable.less";
.mc-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 18px;
    margin: 8px;
  }
  .menu {
    width: 236px;
  }
  @media (max-width: @screen-xs-max) {
    .title {
      font-size: 16px;
      margin: 4px;
    }
  }
}
</style>