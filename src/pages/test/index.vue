<template>
  <v-container style="padding: 0;">
    <!-- 这里是一个测试页面 -->
    <v-container style="max-width: 846px" :style="{
      padding: mainStore.getMobile ? '0' : '1rem',
    }">
      <v-card :rounded="$G_Rounded()" :elevation="mainStore.getMobile ? '0' : '1'">


        <v-toolbar title="标题">
          <template v-slot:prepend>
            <v-btn icon="mdi-arrow-left"></v-btn>
          </template>
          <template v-slot:append>
            <v-btn icon="mdi-share-variant-outline"></v-btn>
          </template>

        </v-toolbar>

        <v-card-text class="py-2" :style="{
          paddingLeft: mainStore.getMobile ? '1rem' : '4rem',
          paddingRight: mainStore.getMobile ? '1rem' : '4rem',
        }">
          <v-list lines="two">
            <v-list-item class="w-100" @click="null" rounded="lg">
              <template v-slot:prepend>
                <v-avatar color="grey-darken-3" :image="avatar"></v-avatar>
              </template>

              <v-list-item-title>Evan You</v-list-item-title>

              <v-list-item-subtitle>Vue Creator</v-list-item-subtitle>

              <template v-slot:append>
                <div class="justify-self-end">
                  <v-icon class="me-1" icon="mdi-heart"></v-icon>
                  <span class="subheading me-2">256</span>
                  <span class="me-1">·</span>
                  <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                  <span class="subheading">45</span>
                </div>
              </template>
            </v-list-item>
          </v-list>

          <p v-for="i in 15">{{ text }}</p>
        </v-card-text>

        <!-- <v-card-text class="py-1">
          <p v-for="i in 15">{{ text }}</p>
        </v-card-text> -->

        <!-- class="bg-surface-light" -->
        <v-card-actions class="bg-surface-light">
          <v-btn icon="mdi-star-outline"></v-btn>
          <v-btn icon="mdi-comment-outline"></v-btn>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </v-card-actions>
      </v-card>

      <!-- <div   > -->
        <!-- subtitle="10条评论" -->
        <v-card class="mt-8" :rounded="$G_Rounded()" :elevation="mainStore.getMobile ? '0' : '1'">

          <v-toolbar title="10条评论">
            <template v-slot:append>
              <!-- <v-icon icon="mdi-filter-menu-outline"></v-icon> -->

              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn variant="text" v-bind="props" icon>
                    <!-- Activator slot -->
                    <v-icon icon="mdi-filter-multiple-outline"></v-icon>
                  </v-btn>

                </template>
                <v-list rounded="lg">
                  <v-list-item v-for="(item, index) in menu_items" :key="index" :value="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>

          </v-toolbar>


          <!-- <v-divider></v-divider> -->
          <v-card-text class="py-2" :style="{
            paddingLeft: !mainStore.getDesktop ? '1rem' : '4rem',
            paddingRight: !mainStore.getDesktop ? '1rem' : '4rem',
          }">
            <v-list lines="three" item-props>
              <v-list-item rounded="lg" active-class="text-pink" class="py-3" v-for="i in 4" @click="null"
                @mouseenter="listItemHover = i" @mouseleave="listItemHover = 0">
                <template v-slot:prepend>
                  <v-avatar color="grey-darken-3" :image="avatar"></v-avatar>
                </template>

                <v-list-item-title>标题</v-list-item-title>

                <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">
                  {{ text }}
                </v-list-item-subtitle>

                <v-expand-transition>
                  <v-list-item-action v-show="listItemHover == i">
                    <v-list-item-subtitle class="text-high-emphasis">
                      1天前 · 地球
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="text-high-emphasis" style="margin-left: 16px">
                      回复
                    </v-list-item-subtitle>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" size="small" icon="mdi-thumb-up-outline"></v-btn>
                    <v-btn variant="text" size="small" icon="mdi-thumb-down-outline"></v-btn>
                    <v-btn variant="text" size="small" icon="mdi-dots-vertical"></v-btn>
                  </v-list-item-action>
                </v-expand-transition>
                <!--<v-divider></v-divider>-->
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      <!-- </div> -->
    </v-container>



    <v-container class="pa-4" style="max-width: 1080px">
      <!-- 外层网格容器 -->
      <v-row style="width: 100%" density="comfortable">
        <v-col v-for="n in 5" :key="n" cols="12" sm="6" md="4" lg="3">
          <v-card rounded="lg" hover class="mx-auto" style="width: 100%" @click="null">
            <v-img class="align-end text-white" style="height: 134px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
              <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
            </v-img>

            <v-card-subtitle class="pt-4"> Name </v-card-subtitle>

            <!-- <v-card-text>
                <div>Whitehaven Beach</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text> -->

            <v-card-actions>
              <v-btn variant="tonal" icon="mdi-star-outline"></v-btn>
              <v-spacer></v-spacer>
              <v-btn variant="plain" text="0 人关注"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <!-- 网格项 - 每个卡片占一个网格单元 -->
        <v-col v-for="n in 5" :key="n" cols="12" sm="6" md="4" lg="3">
          <!-- 原来的卡片 -->
          <v-card rounded="lg" hover class="mx-auto" style="width: 100%" @click="null">
            <!-- 头像区域 -->
            <div style="
                  height: 170px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                ">
              <v-badge bordered location="top right" color="blue" content="1" offset-x="8" offset-y="8">
                <v-avatar color="surface-variant" size="80">
                  <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg">
                  </v-img>
                </v-avatar>
              </v-badge>
              <v-card-title class="mt-2">name {{ n }}</v-card-title>
              <v-card-subtitle>bio {{ n }}</v-card-subtitle>
            </div>

            <v-card-actions>
              <v-btn variant="tonal" icon="mdi-star-outline"></v-btn>
              <v-spacer></v-spacer>
              <v-btn variant="plain" icon="mdi-dots-vertical"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row style="width: 100%" density="comfortable"> </v-row>
    </v-container>
  </v-container>
</template>
<script>
import { useMainStore } from '@/stores/main';
export default {
  data: () => ({
    mainStore: useMainStore(),
    listItemHover: 0,
    avatar:
      'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
    text: `"Turns out semicolon-less style is easier and safer in TS because
            most gotcha edge cases are type invalid as well."`,
    menu_items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
}
</script>
