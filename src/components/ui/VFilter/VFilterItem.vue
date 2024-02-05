<template>
  <label :class="classListItem">
    <input
      type="radio"
      v-model="checkedValue"
      :name="$props.name"
      :value="$props.item.value"
      @input="handleUpdateValue($event as InputEvent)"
    />
    <span :class="classListCheckMark" :style="styleColor">{{ $props.item.label }}</span>
  </label>
</template>

<script setup lang="ts">
import '@/components/ui/VFilter/style.scss'

import { ref, computed, watchEffect } from 'vue'

type ModelValue = string | boolean | null | number
type DataValue = string
type FilterType = string

interface IFilterItem {
  value: ModelValue
  dataValue: DataValue
  label?: string
  available?: number
}

interface IProps {
  modelValue: ModelValue
  item: IFilterItem
  name: string
  type: FilterType
}

const $props = withDefaults(defineProps<IProps>(), {
  modelValue: null,
  name: '',
  label: '',
  value: ''
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()

const checkedValue = ref<string | boolean | null>('')

const classListCheckMark = computed((): string => {
  const classListType = [`filter-item-checkmark`, `filter-item-checkmark--${$props.type}`]
  const classDisabled = $props.item.available === 0 ? 'filter-item-checkmark--disabled' : ''

  return [...classListType, classDisabled].join(' ')
})

const classListItem = computed((): string => {
  return [`filter-item`, `filter-item--${$props.type}`].join(' ')
})

const colorValue = computed((): string => {
  return $props.type === 'color' ? $props.item.dataValue : ''
})

const styleColor = computed((): string => {
  return colorValue.value ? `background-color: ${colorValue.value}` : ''
})

watchEffect(() => {
  checkedValue.value = $props.modelValue
})

const handleUpdateValue = ($event: InputEvent) => {
  if ($props.item.available === 0) return

  const targetValue = ($event.target as HTMLInputElement).value

  emits('update:modelValue', targetValue)
}
</script>
