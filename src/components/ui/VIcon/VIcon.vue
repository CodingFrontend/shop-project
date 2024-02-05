<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :aria-labelledby="$props.name"
    :width="width"
    :height="height"
    :viewBox="viewbox"
    preserveAspectRatio="xMinYMin meet"
    role="presentation"
    class="icon"
  >
    <g :fill="$props.color" class="icon__main-group" ref="iconWrap">
      <component :is="iconComponent" ref="icon" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import '@/components/ui/VIcon/style.scss'

import { withDefaults, defineProps, defineAsyncComponent, ref, computed, watch } from 'vue'

import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter.ts'

// [START] Types and interfaces
type Size = number | string

interface ISvgBox {
  x: number
  y: number
  width: number
  height: number
}

interface IProps {
  name: string
  size?: Size
  color?: string
  viewbox?: string
}
// [END] Types and interfaces

// [SART] Props
const $props = withDefaults(defineProps<IProps>(), {
  size: 24,
  color: 'currentColor',
  viewBox: undefined
})
// [END] Props

// [START] Variables
let icon = ref<HTMLElement | null>(null)

const setIcon = (): Promise<typeof import('*.vue')> => {
  return defineAsyncComponent(async () => {
    return await import(`@/components/ui/VIcon/icons/${capitalizeFirstLetter($props.name)}Icon.vue`)
  })
}

let iconComponent = setIcon()
// [END] Variables

// [START] Computed
const width = computed(() => `${$props.size}px`)
const height = computed(() => `${$props.size}px`)

const svgBoxSize = computed<ISvgBox>(() => {
  let data: ISvgBox = {
    x: 0,
    y: 0,
    width: 24,
    height: 24
  }

  if (icon.value instanceof SVGGraphicsElement) {
    const svg = icon.value
    data = svg.getBBox()
  }

  return data
})

const viewbox = computed<string>(() => {
  if ($props?.viewbox) return $props.viewbox

  const size = +$props.size
  const { width, height } = svgBoxSize.value
  const computedWidth = Math.max(width, size)
  const computedHeight = Math.max(height, size)
  return `0 0 ${computedWidth} ${computedHeight}`
})
// [END] Computed

watch(
  () => $props.name,
  (val: IProps, oldVal: IProps): void => {
    if (val !== oldVal && icon.value) {
      iconComponent = setIcon()
    }
  }
)
</script>
