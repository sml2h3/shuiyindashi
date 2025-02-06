<template>
  <div class="template-select">
    <div class="header">
      <h1>水印大师</h1>
      <p class="subtitle">专业的水印添加工具</p>
    </div>
    <div class="template-list">
      <el-row :gutter="30">
        <el-col :span="6" v-for="(template, index) in templates" :key="index">
          <el-card :body-style="{ padding: '0px' }" class="template-card" shadow="never">
            <div class="template-preview">
              <img :src="template.preview" class="preview-image">
              <div class="preview-overlay">
                <el-button type="primary" @click="selectTemplate(template)">选择此模板</el-button>
              </div>
            </div>
            <div class="template-info">
              <h3>{{ template.name }}</h3>
              <p class="description">{{ template.description }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateSelect',
  data() {
    return {
      templates: [
        {
          id: 1,
          name: '透明模板',
          preview: 'https://placeholder.co/400x300',
          type: 'transparent',
          description: '创建磨砂玻璃效果的背景，并在图片下方优雅地展示拍摄信息'
        }
      ]
    }
  },
  methods: {
    selectTemplate(template) {
      this.$router.push({
        name: `${template.type}-template`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.template-select {
  padding: 40px 20px;
  min-height: 100vh;
  background-color: var(--primary-black);
  
  .header {
    text-align: center;
    margin-bottom: 60px;
    
    h1 {
      font-size: 48px;
      margin: 0;
      font-weight: 300;
      letter-spacing: 2px;
    }
    
    .subtitle {
      color: var(--text-gray);
      margin-top: 10px;
      font-size: 18px;
    }
  }
  
  .template-list {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .template-card {
    margin-bottom: 30px;
    transition: all 0.3s ease;
    background-color: var(--secondary-black);
    
    &:hover {
      transform: translateY(-5px);
      
      .preview-overlay {
        opacity: 1;
      }
    }
  }
  
  .template-preview {
    height: 240px;
    overflow: hidden;
    position: relative;
    background-color: var(--secondary-black);
    
    .preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.8;
      transition: all 0.3s ease;
    }
    
    .preview-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: all 0.3s ease;
    }
  }
  
  .template-info {
    padding: 20px;
    
    h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 400;
      color: var(--text-white);
    }
    
    .description {
      color: var(--text-gray);
      font-size: 14px;
      margin: 10px 0 0;
      line-height: 1.5;
    }
  }
}
</style> 