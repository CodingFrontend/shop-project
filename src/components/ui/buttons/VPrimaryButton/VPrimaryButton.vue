<template>
  <button
    :type="$props.nativeType"
    class="button"
    :class="className"
    :disabled="disabled"
    :title="title"
    role="button"
    :aria-label="ariaLabel"
    @click="handleClick"
    @keydown.enter="handleKeyDownEnter"
    @keyup.space="handleKeyUpSpace"
  >
    <VIcon
      v-if="$props.loading"
      name="loader"
      class="button__loading"
      size="48"
      view-box="0 0 24 24"
    />
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import '@/components/ui/buttons/VPrimaryButton/style.scss'

import { withDefaults, defineProps, defineEmits, computed } from 'vue'

import VIcon from '@/components/ui/VIcon/VIcon.vue'

// [START] Types and interfaces
type NativeType = 'button' | 'submit'
type AriaLabelType = string | null
type TitleType = string | null

interface IProps {
  nativeType?: NativeType
  disabled?: boolean
  loading?: boolean
  title?: TitleType
  ariaLabel?: AriaLabelType
}
// [END] Types and interfaces

// [START] Props
const $props = withDefaults(defineProps<IProps>(), {
  nativeType: 'button',
  disabled: false,
  loading: false,
  title: null,
  ariaLabel: null
})
// [END] Props

// [START] Emits
const emits = defineEmits<{
  (e: 'click' | 'keydown.enter' | 'keydown.space'): void
}>()
// [END] Emits

// [START] Computed properties
const className = computed((): string => {
  const { loading, disabled } = $props

  let className = ''

  className += loading ? ' button--loading' : ''
  className += disabled ? ' button--disabled' : ''

  return className
})

const disabled = computed((): boolean => $props.loading || $props.disabled)
const title = computed((): string => $props.title || '')
const ariaLabel = computed((): string => $props.ariaLabel || '')
// [END] Computed properties

// [START] Methods
const handleClick = (): void => emits('click')
const handleKeyDownEnter = (): void => emits('keydown.enter')
const handleKeyUpSpace = (): void => emits('keydown.space')
</script>
