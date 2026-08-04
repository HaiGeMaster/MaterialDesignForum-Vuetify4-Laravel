<template>

  <v-card rounded="lg" elevation="0" :title="$t('Message.Admin.Options.Carousel.CarouselManage')">

    <!-- <v-card-title class="d-flex justify-space-between align-center">
      <span>
        {{ $t('Message.Admin.Options.Carousel.CarouselManage') }}
      </span>
      <v-btn rounded="lg"  depressed color="accent" @click="openAddDialog">
        <v-icon left>mdi-plus</v-icon>
        {{ $t('Message.Admin.Options.Carousel.AddCarousel') }}
      </v-btn>
    </v-card-title> -->

    <template v-slot:append>
      <v-btn rounded="lg" color="accent" @click="openAddDialog()" variant="tonal">
        <v-icon start>
          mdi-plus
        </v-icon>
        {{ $t('Message.Admin.Options.Carousel.AddCarousel') }}
      </v-btn>

    </template>

    <v-card-text>

      <v-data-table :headers="headers" :items="items" :no-data-text="$t('Message.Components.DataTable.NoDataText')"
        :no-results-text="$t('Message.Components.DataTable.NoDataTextForSearch')" :header-props="{
          'sort-by-text': $t('Message.Components.DataTable.SortBy'),
        }" hide-default-footer>
        <template v-slot:item.image="{ item }">
          <v-img :src="item.image" max-width="50" contain></v-img>
        </template>

        <!-- 操作按钮 -->
        <template v-slot:item.actions="{ item, index }">
          <v-menu rounded="xl" transition="scroll-y-reverse-transition">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" variant="text">
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <v-list rounded="lg">

              <v-list-item @click="moveUp(index)">
                <template v-slot:prepend>
                  <v-icon>
                    mdi-arrow-up
                  </v-icon>
                </template>

                <v-list-item-title>
                  {{ $t('Message.Admin.Options.Carousel.MoveUp') }}
                </v-list-item-title>

              </v-list-item>
              <v-list-item @click="moveDown(index)">
                <template v-slot:prepend>
                  <v-icon>
                    mdi-arrow-down
                  </v-icon>
                </template>

                <v-list-item-title>
                  {{ $t('Message.Admin.Options.Carousel.MoveDown') }}
                </v-list-item-title>

              </v-list-item>
              <v-list-item @click="openEditDialog(index)">
                <template v-slot:prepend>
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </template>

                <v-list-item-title>
                  {{ $t('Message.Admin.Options.Carousel.Edit') }}
                </v-list-item-title>

              </v-list-item>
              <v-list-item @click="confirmDelete(index)">
                <template v-slot:prepend>
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </template>

                <v-list-item-title>
                  {{ $t('Message.Admin.Options.Carousel.Delete') }}
                </v-list-item-title>

              </v-list-item>

            </v-list>
          </v-menu>

        </template>

      </v-data-table>

      <!-- 添加/编辑对话框 -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card rounded="lg"
          :title="editMode ? $t('Message.Admin.Options.Carousel.Edit') : $t('Message.Admin.Options.Carousel.Add')">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field color="primary" v-model="dialogItem.image"
                :label="$t('Message.Admin.Options.Carousel.ImageUrl')"
                :rules="[v => !!v || $t('Message.Admin.Options.Carousel.ImageUrlNotNull'), v => isValidUrl(v) || $t('Message.Admin.Options.Carousel.ImageUrlNotValid')]"
                required></v-text-field>

              <div class="d-flex align-center mt-2 mb-4">
                <v-img v-if="dialogItem.image && isValidUrl(dialogItem.image)" :src="dialogItem.image" max-width="200"
                  data-fancybox="gallery" contain class="mr-4"></v-img>
                <!-- <v-icon v-else color="error">mdi-image-off</v-icon> -->
              </div>

              <v-text-field color="primary" v-model="dialogItem.title"
                :label="$t('Message.Admin.Options.Carousel.Title')"
                :rules="[v => !!v || $t('Message.Admin.Options.Carousel.TitleNotNull')]" required></v-text-field>

              <v-textarea v-model="dialogItem.description" :label="$t('Message.Admin.Options.Carousel.Description')"
                :rules="[v => !!v || $t('Message.Admin.Options.Carousel.DescriptionNotNull')]" required></v-textarea>

              <v-text-field color="primary" v-model="dialogItem.href" :label="$t('Message.Admin.Options.Carousel.Href')"
                :rules="[v => !!v || $t('Message.Admin.Options.Carousel.HrefNotNull'), v => isValidUrl(v) || $t('Message.Admin.Options.Carousel.HrefNotValid')]"
                required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <Cancel @cancel="dialog = false" :text="$t('Message.Components.DataTable.Cancel')" />
            <Confirm @confirm="saveItem" :text="$t('Message.Components.DataTable.Confirm')" /> -->

            <v-btn rounded="lg" variant="tonal" @click="dialog = false">
              {{ $t('Message.Components.DataTable.Cancel') }}
            </v-btn>

            <v-btn rounded="lg" color="primary" variant="flat" @click="saveItem()">
              {{ $t('Message.Components.DataTable.Confirm') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 删除确认对话框 -->
      <v-dialog v-model="deleteDialog" max-width="400px" :title="$t('Message.Admin.Options.Carousel.Delete')">
        <v-card rounded="lg">
          <v-card-text>
            {{ $t('Message.Admin.Options.Carousel.ConfirmDelete') }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <Cancel @cancel="deleteDialog = false" :text="$t('Message.Components.DataTable.Cancel')" />

            <Confirm @confirm="deleteItem" :text="$t('Message.Components.DataTable.Confirm')" /> -->
            <v-btn rounded="lg" variant="tonal" @click="deleteDialog = false">
              {{ $t('Message.Components.DataTable.Cancel') }}
            </v-btn>
            <v-btn rounded="lg" color="primary" variant="flat" @click="deleteItem()">
              {{ $t('Message.Components.DataTable.Confirm') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn rounded="lg" variant="flat" :loading="loading" @click="SetThemeCarouselParamJson" color="primary">{{
        $t('Message.Admin.Options.Save')
      }}</v-btn>

      <!-- <v-btn rounded="lg"  color="accent" @click="">{{ $t('Message.Components.Account.Reset')
        }}</v-btn> -->
    </v-card-actions>

  </v-card>
</template>

<script>
// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'

import {
  // SetThemeCarouselParamJson,
  // GetThemeCarouselParamJson,
  SetAppBaseInfo,
} from '@/api/global.js'
import { useMainStore } from '@/stores/main.js'
import { useSnackbarStore } from '@/stores/snackbar.js'
export default {
  name: 'ImageCRUD',
  components: {
    // Confirm,
    // Cancel,
  },
  computed: {
    headers() {
      return [
        { text: this.$t('Message.Admin.Options.Carousel.Image'), value: 'image', sortable: false },
        { text: this.$t('Message.Admin.Options.Carousel.Title'), value: 'title' },
        // { text: this.$t('Message.Admin.Options.Carousel.Description'), value: 'description' },
        { text: this.$t('Message.Admin.Options.Carousel.Actions'), value: 'actions', sortable: false, align: 'center' }
      ]
    }
  },
  data: () => ({
    mainStore: useMainStore(),
    snackbarStore: useSnackbarStore(),
    loading: false,
    // headers: [
    //   { text: '图片', value: 'image', sortable: false },
    //   { text: '标题', value: 'title' },
    //   { text: '描述', value: 'description' },
    //   { text: '操作', value: 'actions', sortable: false, align: 'center' }
    // ],
    items: [
      // {
      //   image: "https://cn.cfmoto.com/upload/image/20250726/20250726113122.jpg",
      //   title: "自然风景",
      //   description: "美丽的自然景观展示，感受大自然的魅力。",
      //   href: "https://www.baidu.com",
      // }
    ],
    dialog: false,
    editMode: false,
    editIndex: -1,
    deleteDialog: false,
    deleteIndex: -1,
    valid: false,
    dialogItem: {
      image: "",
      title: "",
      description: "",
      href: ""
    },
    defaultItem: {
      image: "",
      title: "",
      description: "",
      href: ""
    },
  }),
  methods: {
    moveUp(index) {
      if (index > 0) {
        // console.log(index)
        const temp = this.items[index - 1];
        this.items[index - 1] = this.items[index];
        this.items[index] = temp;

        // const cache = this.items;
        // this.items = []
        // this.$forceUpdate();
        // this.items = cache;
        this.$forceUpdate();
        this.SetThemeCarouselParamJson();

        // console.log(this.items)
      }
    },
    moveDown(index) {
      if (index < this.items.length - 1) {
        // console.log(index)
        const temp = this.items[index + 1];
        this.items[index + 1] = this.items[index];
        this.items[index] = temp;

        // const cache = this.items;
        // this.items = []
        // this.$forceUpdate();
        // this.items = cache;
        this.$forceUpdate();
        this.SetThemeCarouselParamJson();

        // console.log(this.items)
      }
    },
    async GetThemeCarouselParamJson() {
      // const user_token = this.$G_GetUserToken();
      // const response = await GetThemeCarouselParamJson({
      //   user_token: user_token,
      // });
      // if (response.data.is_get) {
      //   this.items = response.data.json_text;
      //   this.$forceUpdate();
      // }

      this.items = JSON.parse(this.mainStore.getAppBaseInfo.option_list.theme_carousel_param)
    },
    async SetThemeCarouselParamJson() {
      const user_token = this.$G_GetUserToken();
      this.loading = true;
      const data = {
        option_list: {
          theme_carousel_param: this.items,
        }
      }
      const response = await SetAppBaseInfo({
        user_token: user_token,
        app_base_info: data,
      });
      if (response.data.is_set) {
        this.snackbarStore.addMessage({ text: this.$t('Message.Components.Snackbar.Updated'), color: 'success' })
        // this.items = response.data.data.option_list.theme_carousel_param
        this.mainStore.setAppBaseInfo(res.data.data)
        this.$forceUpdate();
        this.loading = false;
      } else {
        this.loading = false;
      }
    },
    isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    },
    openAddDialog() {
      this.editMode = false;
      this.dialogItem = JSON.parse(JSON.stringify(this.defaultItem));
      this.dialog = true;
      this.$nextTick(() => {
        if (this.$refs.form) this.$refs.form.resetValidation();
      });
    },
    openEditDialog(index) {
      this.editMode = true;
      this.editIndex = index;
      this.dialogItem = JSON.parse(JSON.stringify(this.items[index]));
      this.dialog = true;
    },
    saveItem() {
      //可能失效？？https://vuetifyjs.com/zh-Hans/components/forms/#section-66b497325c5e6027
      if (!this.$refs.form.validate()) return;

      if (this.editMode) {
        // 编辑模式
        this.$forceUpdate()
        // console.log(this.items)
        // console.log(this.dialogItem)
        Object.assign(this.items[this.editIndex], this.dialogItem);
        this.SetThemeCarouselParamJson();
      } else {
        // 添加模式
        this.items.push(this.dialogItem);
      }
      this.dialog = false;
    },
    confirmDelete(index) {
      this.deleteIndex = index;
      this.deleteDialog = true;
    },
    deleteItem() {
      this.items.splice(this.deleteIndex, 1);
      this.deleteDialog = false;
      this.SetThemeCarouselParamJson();
    }
  },
  async mounted() {
    await this.GetThemeCarouselParamJson();
  },
  watch: {
    // items: {
    //   handler(newVal, oldVal) {
    //     this.$forceUpdate();
    //     this.SetThemeCarouselParamJson();
    //   },
    //   deep: true
    // }
  }
}
</script>

<style scoped>
.v-data-table td {
  vertical-align: middle;
}
</style>