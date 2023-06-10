<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">SaaSGlue Blog</h1>

      <div class="columns is-multiline">
        <div class="column is-3">
          <ArticleCard v-for="article in articles" :articleUrl="article.uri" :author="article.author" :createdDate="new Date(article.date)">
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
