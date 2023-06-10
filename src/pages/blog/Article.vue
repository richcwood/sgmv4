<template>
  <section class="section">
    <main class="container is-max-desktop">
      <article class="content">
        <header>
          <h1 class="title has-text-centered">
            <slot name="title" />
          </h1>
        </header>
        <hr />
        <slot />
        <hr />
        <footer>
          <div v-if="$slots.tags" class="tags">
            <slot name="tags" />
          </div>
        </footer>
      </article>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Article',
});
</script>
