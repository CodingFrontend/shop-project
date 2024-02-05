<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

import { RouterView } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout.vue'

const $route = useRoute()

const layout = computed((): string => {
  const component = $route.meta?.layout
    ? defineAsyncComponent(
        async () => await import(`@/layouts/${$route.meta.layout}/${$route.meta.layout}.vue`)
      )
    : null
  return component || DefaultLayout
})
</script>
