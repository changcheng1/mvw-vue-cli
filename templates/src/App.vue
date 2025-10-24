<template>
  <div id="app">
    <a-config-provider :theme="{ algorithm: theme.defaultAlgorithm }">{{#if useRouter}}
      <router-view />{{/if}}{{#if useRouter}}{{else}}
      <HelloWorld />{{/if}}
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'{{#if useRouter}}{{else}}
import HelloWorld from './components/HelloWorld.vue'{{/if}}
</script>

<style{{#if hasScss}} lang="scss"{{/if}}{{#if hasLess}} lang="less"{{/if}}>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>