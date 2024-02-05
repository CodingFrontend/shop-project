<template>
  <div class="page-header">
    <slot>
      <h1 class="page-header__title">
        {{ $props.title }}
      </h1>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import '@/components/common/VPageHeader/style.scss'

import { withDefaults, defineProps } from 'vue'

// [START] Types and interfaces
interface IProps {
  title: string
}
// [END] Types and interfaces

// [START] Props
const $props = withDefaults(defineProps<IProps>(), {
  title: ''
})
// [END] Props
</script>
