<template>
  <a :class="{ active: pageContext.urlPathname === $attrs.href }">
    <slot />
  </a>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { usePageContext } from '../renderer/usePageContext.js';

  export default defineComponent({
    name: 'MenuLink',

    computed: {
      pageContext() {
        return usePageContext();
      }
    }
  });
</script>
