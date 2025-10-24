<template>
  <div class="home">
    <a-layout>
      <a-layout-header class="header">
        <div class="logo">
          <h2>{{projectNamePascal}}</h2>
        </div>
        <a-menu
          theme="dark"
          mode="horizontal"
          :selected-keys="[currentRoute]"
          class="menu"
        >
          <a-menu-item key="home" @click="$router.push('/')">
            <home-outlined />
            Home
          </a-menu-item>
          <a-menu-item key="about" @click="$router.push('/about')">
            <info-circle-outlined />
            About
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      
      <a-layout-content class="content">
        <HelloWorld />
      </a-layout-content>
      
      <a-layout-footer class="footer">
        <a-typography-text type="secondary">
          {{projectNamePascal}} ©{{currentYear}} Created with Vue 3 + Vite + Ant Design Vue
        </a-typography-text>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
import HelloWorld from '../components/HelloWorld.vue'

const route = useRoute()

const currentRoute = computed(() => {
  return route.name === 'Home' ? 'home' : 'about'
})

const currentYear = new Date().getFullYear()
</script>

<style{{#if hasScss}} lang="scss" scoped{{/if}}{{#if hasLess}} lang="less" scoped{{/if}}{{#if hasScss}}{{else}}{{#if hasLess}}{{else}} scoped{{/if}}{{/if}}>
.home {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  padding: 0 2rem;
  
  .logo {
    margin-right: 2rem;
    
    h2 {
      color: white;
      margin: 0;
    }
  }
  
  .menu {
    flex: 1;
    border-bottom: none;
  }
}

.content {
  padding: 0;
  min-height: calc(100vh - 134px);
}

.footer {
  text-align: center;
  background: #f0f2f5;
}

@media (max-width: 768px) {
  .header {
    padding: 0 1rem;
    
    .logo {
      margin-right: 1rem;
      
      h2 {
        font-size: 1.2rem;
      }
    }
  }
}
</style>