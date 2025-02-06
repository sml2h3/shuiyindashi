<template>
  <div class="template-select">
    <div class="header">
      <h1>水印精灵</h1>
      <p class="subtitle">专业的水印添加工具</p>
      <div class="inspiration">
        <p>灵感与设计来源于 
          <a href="https://sj.qq.com/appdetail/com.hasmash.photoby" target="_blank" rel="noopener noreferrer">
            边框水印大师
          </a>
        </p>
      </div>
    </div>
    <div class="template-list">
      <el-row :gutter="24">
        <el-col :span="12" v-for="(template, index) in templates" :key="index">
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
// 导入预览图
import transparentPreview from '@/assets/template-previews/transparent.jpg'

export default {
  name: 'TemplateSelect',
  data() {
    return {
      templates: [
        {
          id: 1,
          name: '透明模板',
          preview: transparentPreview,  // 使用在线占位图
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
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 20px 10px;
  }
  
  .header {
    text-align: center;
    margin-bottom: 60px;
    
    @media (max-width: 768px) {
      margin-bottom: 30px;
    }
    
    h1 {
      font-size: 48px;
      margin: 0;
      font-weight: 300;
      letter-spacing: 2px;
      
      @media (max-width: 768px) {
        font-size: 36px;
        letter-spacing: 1.5px;
      }
      
      @media (max-width: 480px) {
        font-size: 28px;
        letter-spacing: 1px;
      }
    }
    
    .subtitle {
      color: var(--text-gray);
      margin-top: 10px;
      font-size: 18px;
      
      @media (max-width: 768px) {
        font-size: 16px;
        margin-top: 8px;
      }
      
      @media (max-width: 480px) {
        font-size: 14px;
        margin-top: 6px;
      }
    }
    
    .inspiration {
      margin-top: 15px;
      font-size: 14px;
      color: var(--text-gray);
      opacity: 0.8;
      
      @media (max-width: 768px) {
        font-size: 13px;
        margin-top: 12px;
      }
      
      a {
        color: #3a8ee6;
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: #2674d8;
          text-decoration: underline;
        }
      }
    }
  }
  
  .template-list {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 30px;
    box-sizing: border-box;
    
    @media (max-width: 768px) {
      padding: 0 10px;
    }
    
    .el-row {
      margin: 0 !important;
      
      .el-col {
        padding: 0 20px;
        margin-bottom: 40px;
        
        @media (max-width: 1200px) {
          width: 50% !important;
        }
        
        @media (max-width: 768px) {
          width: 100% !important;
          padding: 0 10px;
          margin-bottom: 20px;
        }
      }
    }
  }
  
  .template-card {
    margin-bottom: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: rgba(30, 32, 35, 0.6);
    height: 100%;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    
    &:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
      border-color: rgba(255, 255, 255, 0.1);
      
      .preview-image {
        transform: scale(1.05);
        opacity: 0.9;
      }
      
      .preview-overlay {
        opacity: 1;
        
        .el-button {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      .template-info {
        background: rgba(35, 37, 40, 0.95);
      }
    }
    
    @media (max-width: 768px) {
      backdrop-filter: none;
      background-color: var(--secondary-black);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      
      &:hover {
        transform: none;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      }
      
      .preview-overlay {
        opacity: 1;
        
        .el-button {
          transform: none;
          opacity: 1;
        }
      }
    }
  }
  
  .template-preview {
    height: 400px;
    overflow: hidden;
    position: relative;
    background-color: rgba(20, 22, 25, 0.8);
    
    @media (max-width: 1400px) {
      height: 350px;
    }
    
    @media (max-width: 1200px) {
      height: 300px;
    }
    
    @media (max-width: 768px) {
      height: 250px;
    }
    
    @media (max-width: 480px) {
      height: 200px;
    }
    
    .preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }
    
    .preview-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.7)
      );
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      
      .el-button {
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 25px;
        padding: 12px 28px;
        font-weight: 500;
        letter-spacing: 0.5px;
        background: linear-gradient(135deg, #3a8ee6, #2674d8);
        border: none;
        box-shadow: 0 4px 15px rgba(42, 120, 228, 0.35);
        
        &:hover {
          background: linear-gradient(135deg, #4a98e9, #2f7ddb);
          transform: translateY(0) scale(1.05);
        }
        
        @media (max-width: 480px) {
          padding: 10px 24px;
          font-size: 14px;
          transform: none;
          opacity: 1;
        }
      }
    }
  }
  
  .template-info {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(30, 32, 35, 0.95);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    
    @media (max-width: 768px) {
      padding: 20px;
      background: var(--secondary-black);
    }
    
    h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      color: var(--text-white);
      letter-spacing: 0.5px;
      
      @media (max-width: 768px) {
        font-size: 18px;
      }
    }
    
    .description {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      margin: 12px 0 0;
      line-height: 1.6;
      font-weight: 300;
      letter-spacing: 0.3px;
      
      @media (max-width: 768px) {
        font-size: 13px;
        margin-top: 8px;
        color: var(--text-gray);
      }
    }
  }
}
</style> 