

<template>
  <v-container fluid class="bg-gray-50 min-vh-100 py-6">
    <v-row justify="center">
      <v-col cols="12" lg="10">
        <h1 class="text-h4 text-center mb-8 font-weight-bold">🏆 社区成就徽章</h1>

        <!-- 话题系列 -->
        <div class="text-h6 mb-3 mt-6">话题系列</div>
        <v-grid cols="2" sm="3" md="4" lg="6" gap="4">
          <BadgeCard
            title="话题新秀"
            desc="发布1个话题"
            icon="mdi-bookmark-outline"
            level="bronze"
          />
          <BadgeCard
            title="话题达人"
            desc="发布10个话题"
            icon="mdi-bookmark"
            level="silver"
          />
          <BadgeCard
            title="话题领袖"
            desc="发布50个话题"
            icon="mdi-crown"
            level="gold"
          />
        </v-grid>

        <!-- 问答系列 -->
        <div class="text-h6 mb-3 mt-6">问答系列</div>
        <v-grid cols="2" sm="3" md="4" lg="6" gap="4">
          <BadgeCard
            title="提问萌新"
            desc="发起1个提问"
            icon="mdi-help-circle-outline"
            level="bronze"
          />
          <BadgeCard
            title="问题猎手"
            desc="发起10个提问"
            icon="mdi-magnify"
            level="silver"
          />
          <BadgeCard
            title="好奇星人"
            desc="发起50个提问"
            icon="mdi-lightbulb"
            level="gold"
          />
        </v-grid>

        <!-- 回答系列 -->
        <div class="text-h6 mb-3 mt-6">回答系列</div>
        <v-grid cols="2" sm="3" md="4" lg="6" gap="4">
          <BadgeCard
            title="初次作答"
            desc="首次回答问题"
            icon="mdi-comment-outline"
            level="bronze"
          />
          <BadgeCard
            title="答主入门"
            desc="累计回答10个问题"
            icon="mdi-check-circle"
            level="silver"
          />
          <BadgeCard
            title="百答能手"
            desc="累计回答100个问题"
            icon="mdi-comment-multiple"
            level="gold"
          />
          <BadgeCard
            title="金牌答主"
            desc="回答获1000个赞"
            icon="mdi-medal"
            level="diamond"
          />
        </v-grid>

        <!-- 文章系列 -->
        <div class="text-h6 mb-3 mt-6">文章系列</div>
        <v-grid cols="2" sm="3" md="4" lg="6" gap="4">
          <BadgeCard
            title="提笔新人"
            desc="发布1篇文章"
            icon="mdi-file-document-outline"
            level="bronze"
          />
          <BadgeCard
            title="专栏作者"
            desc="发布10篇文章"
            icon="mdi-pencil"
            level="silver"
          />
          <BadgeCard
            title="笔耕不辍"
            desc="发布50篇文章"
            icon="mdi-feather"
            level="gold"
          />
        </v-grid>

        <!-- 评论系列 -->
        <div class="text-h6 mb-3 mt-6">评论系列</div>
        <v-grid cols="2" sm="3" md="4" lg="6" gap="4">
          <BadgeCard
            title="评论区访客"
            desc="发布1条评论"
            icon="mdi-message-outline"
            level="bronze"
          />
          <BadgeCard
            title="热评常客"
            desc="累计发布100条评论"
            icon="mdi-fire"
            level="silver"
          />
          <BadgeCard
            title="金句王"
            desc="单条评论获1000个赞"
            icon="mdi-format-quote-close"
            level="gold"
          />
        </v-grid>

        <!-- 回复 & 用户组 & 举报 -->
        <div class="text-h6 mb-3 mt-6">互动 & 管理系列</div>
        <v-grid cols="2" sm="3" md="4" lg="6" gap="4">
          <BadgeCard
            title="礼貌回复"
            desc="首次回复他人评论"
            icon="mdi-arrow-left-return"
            level="bronze"
          />
          <BadgeCard
            title="组内新人"
            desc="加入第一个用户组"
            icon="mdi-account-group-outline"
            level="bronze"
          />
          <BadgeCard
            title="正义观察员"
            desc="首次有效举报"
            icon="mdi-flag-outline"
            level="bronze"
          />
        </v-grid>

      </v-col>
    </v-row>
  </v-container>
</template>

<!-- BadgeCard组件 -->
<template>
  <v-card
    elevation="2"
    hover
    class="text-center pa-4 rounded-xl transition-all"
  >
    <div
      class="d-flex align-items-center justify-content-center rounded-circle mb-3 mx-auto"
      :style="{
        width: '72px',
        height: '72px',
        background: badgeGradient,
      }"
    >
      <v-icon size="36" color="white">{{ icon }}</v-icon>
    </div>
    <div class="text-subtitle-1 font-weight-medium mb-1">{{ title }}</div>
    <div class="text-caption text-gray-600">{{ desc }}</div>
  </v-card>
</template>

<style scoped>
.v-card:hover {
  transform: translateY(-4px);
}
</style>