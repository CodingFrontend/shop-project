<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button"
      :disabled="disabledMinusButton"
      @click="handleRemoveItem"
    >
      -
    </button>
    <span class="counter__value">{{ $props.modelValue }}</span>
    <button
      type="button"
      class="counter__button"
      :disabled="disabledPlusButton"
      @click="handleAddItem"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import '@/components/ui/VCounter/style.scss'

import { watch, ref, computed } from 'vue'

interface IProps {
  modelValue: number
  minValue: number
  maxValue: number
}

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const $props = withDefaults(defineProps<IProps>(), {
  modelValue: 1
})

const counter = ref<number>(0)

const disabledMinusButton = computed((): boolean => {
  return counter.value === $props.minValue
})

const disabledPlusButton = computed((): boolean => {
  return counter.value === $props.maxValue
})

watch(
  () => $props.modelValue,
  () => {
    counter.value = $props.modelValue
  },
  { immediate: true }
)

const handleRemoveItem = (): void => {
  counter.value--
  emits('update:modelValue', counter.value)
}

const handleAddItem = (): void => {
  counter.value++
  emits('update:modelValue', counter.value)
}
</script>
