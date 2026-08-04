<template>
  <!-- v-show="items.length > 0" -->
  <v-card rounded="lg" style="z-index: 1201;" id="usersmentionlist" outlined>

    <v-list rounded="lg" density="compact">

      <v-list-item v-for="(item, index) in items" :key="index" @click="selectItem(index)" :title="item.username">
        <template v-slot:prepend>
          <v-avatar start>
            <v-img :src="$G_ImgHandle(item.avatar.small)">

              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate></v-progress-circular>
                </div>
              </template>

            </v-img>
          </v-avatar>
        </template>
      </v-list-item>

    </v-list>

  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        // this.command({ id: item ,type:'user'})
        // this.command({ data: item ,id:'user'})

        // this.command({class:'user'})
        // this.command({id:item})
        this.command({
          id: {
            type: 'user',
            data: item
          }
        })

      }
    },
  },
}
</script>

<style lang="less" scoped>
#usersmentionlist {
  .theme--dark & {
    .v-list-item__title {
      color: white;
    }

    .v-card {
      border-color: #4a4a4a;
    }
  }
}
</style>