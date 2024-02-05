<template>
  <div class="filter">
    <VFilterItem
      v-for="(item, i) in $props.list"
      :key="i"
      :item="item"
      :name="$props.name"
      :type="$props.type"
      :model-value="$props.modelValue"
      @update:modelValue="handleUpdateFilter"
    />
  </div>
</template>

<script setup lang="ts">
import '@/components/ui/VFilter/style.scss'

import VFilterItem from '@/components/ui/VFilter/VFilterItem.vue'

type ModelValue = string | boolean | null | number

interface IListItem {
  value: ModelValue
  dataValue: string
  label?: string
  available?: number
}

interface IProps {
  modelValue: ModelValue
  list: IListItem[]
  name: string
  type: string
}

const $props = withDefaults(defineProps<IProps>(), {
  list: () => [],
  name: '',
  modelValue: null
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
  (e: 'select', value: ModelValue): void
}>()

const handleUpdateFilter = (value: string) => {
  emits('update:modelValue', value)
  emits('select', value)
}
</script>
