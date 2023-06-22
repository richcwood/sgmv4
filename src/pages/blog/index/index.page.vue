<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered is-size-2-desktop is-size-3-touch mb-6">SaaSGlue Blog</h1>

      <div class="columns is-multiline">
        <div v-for="article in articles" class="column is-4">
          <ArticleCard :articleUrl="article.uri" :author="article.author" :createdDate="new Date(article.date)">
            <template #image>
              <img :src="article.image" alt="Article image" />
            </template>
            <template #title>
              {{ article.title }}
            </template>
            <template #description>
              {{ article.description }}
            </template>
            <template #tags>
              <span v-for="tag in article.tags" class="tag is-primary">{{ tag }}</span>
            </template>
          </ArticleCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import articles, { Article } from '../articles';
import ArticleCard from '../ArticleCard.vue';

export default defineComponent({
  name: 'Blog',
  components: { ArticleCard },

  computed: {
    articles (): Article[] {
      return articles;
    }
  }
});
</script>
