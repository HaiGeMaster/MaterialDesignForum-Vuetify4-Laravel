<template>
  <div class="badges-container">
    <div class="container">
      <h1 class="text-h4 text-center mb-8 font-weight-bold">🏆 社区成就徽章</h1>

      <!-- 话题系列 -->
      <div class="text-h6 mb-3 mt-6">话题系列</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
      </div>

      <!-- 问答系列 -->
      <div class="text-h6 mb-3 mt-6">问答系列</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
      </div>

      <!-- 回答系列 -->
      <div class="text-h6 mb-3 mt-6">回答系列</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
      </div>

      <!-- 文章系列 -->
      <div class="text-h6 mb-3 mt-6">文章系列</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
      </div>

      <!-- 评论系列 -->
      <div class="text-h6 mb-3 mt-6">评论系列</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
      </div>

      <!-- 互动 & 管理系列 -->
      <div class="text-h6 mb-3 mt-6">互动 & 管理系列</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
      </div>

      <BadgeCardV1 v-for="i in 10" :key="i"
        :count="i"
      />
    </div>
  </div>
</template>

<script>
import BadgeCard from '@/components/badge-card/index.vue'
import BadgeCardV1 from '@/components/badge-card/scalloped-badge.vue'

export default {
  name: 'BadgesPage',
  components: {
    BadgeCard,
    BadgeCardV1
  }
}
</script>

<style scoped>
.badges-container {
  min-height: 100vh;
  padding: 24px 0;
  background-color: var(--md-sys-color-background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.text-h4 {
  font-size: 24px;
  font-weight: 700;
  color: var(--md-sys-color-on-background);
}

.text-h6 {
  font-size: 18px;
  font-weight: 600;
  color: var(--md-sys-color-on-background);
}

.font-weight-bold {
  font-weight: 700;
}

.mb-8 {
  margin-bottom: 32px;
}

.mb-3 {
  margin-bottom: 12px;
}

.mt-6 {
  margin-top: 24px;
}

.text-center {
  text-align: center;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.sm\:grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.md\:grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.lg\:grid-cols-6 {
  grid-template-columns: repeat(6, 1fr);
}

.gap-4 {
  gap: 16px;
}

@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>