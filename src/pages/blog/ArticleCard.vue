<template>
  <div class="card mr-6 mb-4">
    <div class="card-image">
      <figure class="image is-16by9">
        <slot name="image" />
      </figure>
    </div>
    <header class="card-header">
      <h2 class="card-header-title is-size-5 mb-0">
        <a :href="articleUrl">
          <slot name="title" />
        </a>
      </h2>
    </header>

    <div class="card-content">
      <div class="mb-3 tags" v-if="$slots.tags">
        <slot name="tags" />
      </div>
      <p class="mb-3 article-description">
        <slot name="description" />
      </p>
      <p class="is-flex is-align-items-center is-justify-content-start">
        <time :datetime="seoCreatedDate">{{ createdDateLocal }}</time>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArticleCard',
  props: {
    author: {
      required: true,
      type: String,
    },
    createdDate: {
      required: true,
      type: Date,
    },
    articleUrl: {
      required: true,
      type: String,
    }
  },

  computed: {
    createdDateLocal () {
      return this.createdDate.toDateString();
    },

    seoCreatedDate () {
      return this.createdDate.toISOString().split('T')[0];
    }
  }
});
</script>

<style scoped>
  .card:hover {
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.5), 0 0px 0 1px rgba(10, 10, 10, 0.5);
  }

  .card-image figure {
    margin-right: 0;
    margin-left: 0;
  }

  .article-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
