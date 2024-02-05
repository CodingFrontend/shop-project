<template>
  <div class="sidebar-filter">
    <div v-if="brandsFilter" class="sidebar-filter-group">
      <div class="sidebar-filter-group__title">{{ brandsFilter.title }}</div>
      <div class="sidebar-filter-group__values">
        <VFilter v-model="filterData.brand" :list="brandsFilterRadioset" type="text" name="brand" />
      </div>
    </div>

    <div v-if="colorFilter" class="sidebar-filter-group">
      <div class="sidebar-filter-group__title">{{ colorFilter.title }}</div>
      <div class="sidebar-filter-group__values">
        <VFilter v-model="filterData.color" :list="colors" type="color" name="color" />
      </div>
    </div>

    <div v-if="sizeFilter" class="sidebar-filter-group">
      <div class="sidebar-filter-group__title">{{ sizeFilter.title }}</div>
      <div class="sidebar-filter-group__values">
        <VFilter v-model="filterData.size" :list="sizes" type="size" name="size" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/components/common/TheSidebar/style.scss'

import { ref, onMounted, watch } from 'vue'

import VFilter from '@/components/ui/VFilter/VFilter.vue'

import { useFilterStore } from '@/stores/filter'

const { getFilter } = useFilterStore()
import { useFilter } from '@/composables/useFilter'

const { colorFilter, brandsFilter, sizeFilter, colors, brandsFilterRadioset, sizes } = useFilter()

interface IFilter {
  brand: string | null
  color: string | null
  size: string | null
}

interface IProps {
  filter: IFilter
}

const $props = defineProps<IProps>()

const filterData = ref<IFilter>({
  brand: null,
  color: null,
  size: null
})

watch(
  () => $props.filter,
  () => {
    filterData.value = $props.filter
  },
  { immediate: true }
)

onMounted(() => {
  getFilter()
})
</script>
