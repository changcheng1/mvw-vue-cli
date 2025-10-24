<template>
  <div class="about">
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
        <div class="about-content">
          <a-row justify="center">
            <a-col :span="20" :md="16" :lg="12">
              <a-card class="about-card">
                <template #title>
                  <info-circle-outlined />
                  About {{projectNamePascal}}
                </template>
                
                <a-typography-paragraph>
                  This is a modern Vue 3 application built with the latest web technologies
                  to provide a fast, reliable, and maintainable development experience.
                </a-typography-paragraph>
                
                <a-divider />
                
                <h3>Technology Stack</h3>
                <a-list size="small" :data-source="techStack">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-list-item-meta>
                        <template #title>
                          <a :href="item.url" target="_blank">{{ item.name }}</a>
                        </template>
                        <template #description>
                          {{ item.description }}
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </template>
                </a-list>{{#if usePinia}}
                
                <a-divider />
                
                <h3>State Management</h3>
                <a-typography-paragraph>
                  This application uses Pinia for state management, providing a simple
                  and intuitive way to manage application state with TypeScript support.
                </a-typography-paragraph>{{/if}}
                
                <a-divider />
                
                <div class="actions">
                  <a-space>
                    <a-button type="primary" @click="$router.push('/')">
                      <home-outlined />
                      Back to Home
                    </a-button>
                    <a-button href="https://github.com" target="_blank">
                      <github-outlined />
                      View Source
                    </a-button>
                  </a-space>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { 
  HomeOutlined, 
  InfoCircleOutlined, 
  GithubOutlined 
} from '@ant-design/icons-vue'

const route = useRoute()

const currentRoute = computed(() => {
  return route.name === 'About' ? 'about' : 'home'
})

const currentYear = new Date().getFullYear()

const techStack = ref([
  {
    name: 'Vue 3',
    description: 'Progressive JavaScript framework with Composition API',
    url: 'https://vuejs.org'
  },
  {
    name: 'Vite',
    description: 'Next generation frontend tooling',
    url: 'https://vitejs.dev'
  },
  {
    name: 'TypeScript',
    description: 'Typed superset of JavaScript',
    url: 'https://www.typescriptlang.org'
  },
  {
    name: 'Ant Design Vue',
    description: 'Enterprise-class UI design language and components',
    url: 'https://antdv.com'
  }{{#if hasScss}},
  {
    name: 'SCSS',
    description: 'Syntactically Awesome Style Sheets',
    url: 'https://sass-lang.com'
  }{{/if}}{{#if hasLess}},
  {
    name: 'Less',
    description: 'Dynamic CSS preprocessor',
    url: 'https://lesscss.org'
  }{{/if}}{{#if usePinia}},
  {
    name: 'Pinia',
    description: 'Intuitive, type safe, light and flexible Store for Vue',
    url: 'https://pinia.vuejs.org'
  }{{/if}}{{#if useRouter}},
  {
    name: 'Vue Router',
    description: 'Official router for Vue.js',
    url: 'https://router.vuejs.org'
  }{{/if}}
])
</script>

<style{{#if hasScss}} lang="scss" scoped{{/if}}{{#if hasLess}} lang="less" scoped{{/if}}{{#if hasScss}}{{else}}{{#if hasLess}}{{else}} scoped{{/if}}{{/if}}>
.about {
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
  padding: 2rem;
  min-height: calc(100vh - 134px);
  background: #f0f2f5;
}

.about-content {
  .about-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    :deep(.ant-card-head-title) {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
  
  h3 {
    color: #1890ff;
    margin-top: 1rem;
  }
  
  .actions {
    text-align: center;
    margin-top: 1rem;
  }
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
  
  .content {
    padding: 1rem;
  }
}
</style>