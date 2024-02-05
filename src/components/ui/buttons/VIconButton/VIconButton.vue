<template>
  <button
    :type="$props.nativeType"
    :title="$props.title"
    class="icon-button"
    :disabled="$props.disabled"
    @click="onClick()"
  >
    <VIcon :name="$props.iconName" :viewbox="$props.iconViewBox" :size="$props.iconSize" />
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import '@/components/ui/buttons/VIconButton/style.scss'
import { withDefaults, defineProps, defineEmits } from 'vue'
import VIcon from '@/components/ui/VIcon/VIcon.vue'

interface IProps {
  nativeType?: 'submit' | 'button'
  iconName: string
  iconViewBox?: string
  iconSize?: string
  title?: string
  disabled?: boolean
}

const $props = withDefaults(defineProps<IProps>(), {
  nativeType: 'button',
  disabled: false
})

const $emits = defineEmits<{
  (e: 'click'): void
}>()

const onClick = (): void => {
  $emits('click')
}
</script>
