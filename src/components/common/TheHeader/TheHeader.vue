<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link :to="{ name: 'catalog' }" class="header__logo"><span>ЛОГО</span></router-link>
      <slot></slot>
    </div>
  </header>
</template>

<script setup lang="ts">
import '@/components/common/TheHeader/style.scss'
</script>
