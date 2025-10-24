<template>
  <div class="hello-world">
    <a-row justify="center" align="middle" class="hero-section">
      <a-col :span="20" :md="16" :lg="12">
        <div class="content">
          <h1 class="title">
            <a-typography-title :level="1">
              Welcome to {{projectNamePascal}}
            </a-typography-title>
          </h1>
          
          <a-typography-paragraph class="description">
            A modern Vue 3 application built with Vite, TypeScript, and Ant Design Vue.
          </a-typography-paragraph>

          <div class="features">
            <a-row :gutter="[16, 16]">
              <a-col :span="24" :sm="12" :md="8">
                <a-card size="small" class="feature-card">
                  <template #title>
                    <rocket-outlined /> Vue 3
                  </template>
                  <p>Latest Vue.js with Composition API</p>
                </a-card>
              </a-col>
              
              <a-col :span="24" :sm="12" :md="8">
                <a-card size="small" class="feature-card">
                  <template #title>
                    <thunderbolt-outlined /> Vite
                  </template>
                  <p>Lightning fast build tool</p>
                </a-card>
              </a-col>
              
              <a-col :span="24" :sm="12" :md="8">
                <a-card size="small" class="feature-card">
                  <template #title>
                    <code-outlined /> TypeScript
                  </template>
                  <p>Type-safe development</p>
                </a-card>
              </a-col>{{#if hasScss}}
              
              <a-col :span="24" :sm="12" :md="8">
                <a-card size="small" class="feature-card">
                  <template #title>
                    <bg-colors-outlined /> SCSS
                  </template>
                  <p>Powerful CSS preprocessor</p>
                </a-card>
              </a-col>{{/if}}{{#if hasLess}}
              
              <a-col :span="24" :sm="12" :md="8">
                <a-card size="small" class="feature-card">
                  <template #title>
                    <bg-colors-outlined /> Less
                  </template>
                  <p>Dynamic CSS preprocessor</p>
                </a-card>
              </a-col>{{/if}}{{#if usePinia}}
              
              <a-col :span="24" :sm="12" :md="8">
                <a-card size="small" class="feature-card">
                  <template #title>
                    <database-outlined /> Pinia
                  </template>
                  <p>Intuitive state management</p>
                </a-card>
              </a-col>{{/if}}{{#if useRouter}}
              
              <a-col :span="24" :sm="12" :md="8">
                <a-card size="small" class="feature-card">
                  <template #title>
                    <branches-outlined /> Vue Router
                  </template>
                  <p>Official routing solution</p>
                </a-card>
              </a-col>{{/if}}
            </a-row>
          </div>

          <div class="actions">
            <a-space size="large">
              <a-button type="primary" size="large" @click="handleGetStarted">
                Get Started
              </a-button>
              <a-button size="large" href="https://vuejs.org" target="_blank">
                Learn Vue
              </a-button>
            </a-space>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import {
  RocketOutlined,
  ThunderboltOutlined,
  CodeOutlined,
  BgColorsOutlined,
  DatabaseOutlined,
  BranchesOutlined,
} from '@ant-design/icons-vue'

const handleGetStarted = () => {
  message.success('Welcome to your new Vue 3 project! 🎉')
}
</script>

<style{{#if hasScss}} lang="scss" scoped{{/if}}{{#if hasLess}} lang="less" scoped{{/if}}{{#if hasScss}}{{else}}{{#if hasLess}}{{else}} scoped{{/if}}{{/if}}>
.hello-world {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.hero-section {
  min-height: 100vh;
}

.content {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.title {
  margin-bottom: 1.5rem !important;
  
  :deep(.ant-typography) {
    color: #1890ff !important;
    margin-bottom: 0 !important;
  }
}

.description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #666;
}

.features {
  margin: 2rem 0;
}

.feature-card {
  height: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  :deep(.ant-card-head-title) {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
  }
  
  :deep(.ant-card-body) {
    padding: 12px 16px;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
}

.actions {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .content {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .description {
    font-size: 1rem;
  }
}
</style>