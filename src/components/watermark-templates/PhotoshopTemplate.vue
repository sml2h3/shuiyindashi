<template>
  <div class="photoshop-template">
    <div class="header">
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
    </div>
    <div class="editor-container">
      <div class="preview-area">
        <div class="image-container">
          <template v-if="previewImage">
            <div class="image-wrapper">
              <!-- 背景大图 -->
              <img :src="previewImage" class="background-image" ref="backgroundImage">
              <!-- 毛玻璃效果 -->
              <div class="glass-effect" :style="glassStyle"></div>
              <!-- 白色中间层 -->
              <div class="center-panel" :style="centerPanelStyle" ref="centerPanel">
                <div class="center-panel-content">
                  <!-- Logo区域 -->
                  <div class="logo-area">
                    <div class="logo-wrapper">
                      <div class="ps-logo" ref="psLogo">
                        <span class="ps-text" :style="psTextStyle">Ps</span>
                      </div>
                      <div class="text-logo" ref="textLogo">
                        <span class="text" :style="textLogoStyle">Adobe Photoshop</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 下部内容区域 -->
                  <div class="content-area">
                    <!-- 左侧文字信息区 -->
                    <div class="info-section">
                      <div class="copyright-text" :style="copyrightTextStyle">
                        <span class="copyright-icon">©</span>
                        1990-2025 Adobe, All rights reserved.
                      </div>
                      <div class="copyright-text" :style="copyrightTextStyle">&nbsp;</div>
                      <div class="copyright-text" :style="copyrightTextStyle">
                        {{ centerPanel.customText }}的作品
                      </div>
                      <div class="copyright-text" :style="copyrightTextStyle">
                        有关法律声明及更多详细信息，请转到关于Photoshop屏幕。
                      </div>
                      <div class="copyright-text" :style="copyrightTextStyle">&nbsp;</div>
                      <div class="copyright-text" :style="copyrightTextStyle">
                        正在读取全球资源...
                      </div>
                      <div class="copyright-text" :style="copyrightTextStyle">&nbsp;</div>
                      <div class="copyright-text" :style="copyrightTextStyle">&nbsp;</div>
                      <div class="copyright-text" :style="copyrightTextStyle">&nbsp;</div>
                      <div class="copyright-text" :style="copyrightTextStyle">&nbsp;</div>
                      <div class="copyright-text" :style="copyrightTextStyle">&nbsp;</div>
                      <div class="copyright-text small-copyright-text" :style="smallCopyrightTextStyle">
                        Russell Preston Brown, Jerry Harris, Mike Shaw,SteveSnyder, Yukie Takahashi, Sarah Kong, David Howe, JohnPeterson, Kellisa Sandoval, jonathan lo, Adam jerugim. TomAttix, Yuko kaaita,Meredith Pavne-Stotzner.winodBalakrishnan, Tai Luxon, Dave Dobish, Alan Erickson, MelissaMonroe,chad Rolfs, Steve Guihamet, Maria Yao, JohnFitzqerald,Pam Clark,Foster Brereton, Daniel Presedo,David Hackel, Kevin Hopps, Pete Falco, jesper Storm BachePablo Serrano, Barkin Aygun, Ankit Kumar Singh, RamanKumar Gupta, Hyun Joon Jung, Soumya lakshmi, RuchiSood, Aiay Bedi,Sangeeta Varma, Mohit Gupta, MortezaSafdarnejad, Xiaoyang Liu, Hannah Nicollet, Fulvio Cervone,Charles Rose,Stephen Nlelson
                      </div>
                      <div class="copyright-text" :style="copyrightTextStyle">&nbsp;</div>
                      <div class="copyright-text" :style="copyrightTextStyle">&nbsp;</div>
                      <div class="copyright-text" :style="copyrightTextStyle">&nbsp;</div>
                      <CCLogoText :font-size="ccText.fontSize" />
                    </div>
                    
                    <!-- 右侧图片展示区 -->
                    <div class="preview-section">
                      <div class="preview-image-container">
                        <img 
                          v-if="previewImage"
                          :src="previewImage" 
                          class="preview-image"
                          alt="预览图片">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div class="upload-placeholder" v-else>
            <el-upload
              class="uploader"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleImageChange">
              <i class="el-icon-plus"></i>
              <div class="upload-text">点击上传图片</div>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="settings-panel">
        <div class="panel-header">
          <h3>模板设置</h3>
          <el-button 
            type="primary" 
            size="small" 
            :disabled="!previewImage"
            @click="startCompose">
            合成图片
          </el-button>
        </div>
        <div class="settings-form">
          <el-form label-position="top">
            <el-form-item label="画质">
              <div class="slider-with-value">
                <el-slider 
                  v-model="imageSettings.quality" 
                  :min="1" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ imageSettings.quality }}%</span>
              </div>
            </el-form-item>

            <div class="section-divider">基础设置</div>
            
            <el-form-item label="自定义文本">
              <el-input 
                v-model="centerPanel.customText" 
                placeholder="请输入自定义文本"
                clearable>
              </el-input>
            </el-form-item>

            <el-form-item label="中心面板尺寸">
              <div class="slider-with-value">
                <el-slider 
                  v-model="centerPanel.scale" 
                  :min="40" 
                  :max="95"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ centerPanel.scale }}%</span>
              </div>
            </el-form-item>

            <el-form-item label="水平位置">
              <div class="slider-with-value">
                <el-slider 
                  v-model="centerPanel.x" 
                  :min="0" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ centerPanel.x }}%</span>
              </div>
            </el-form-item>

            <el-form-item label="垂直位置">
              <div class="slider-with-value">
                <el-slider 
                  v-model="centerPanel.y" 
                  :min="0" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ centerPanel.y }}%</span>
              </div>
            </el-form-item>

            <el-form-item label="圆角">
              <div class="slider-with-value">
                <el-slider 
                  v-model="centerPanel.borderRadius" 
                  :min="0" 
                  :max="60"
                  :format-tooltip="value => value + 'px'"
                ></el-slider>
                <span class="value-display">{{ centerPanel.borderRadius }}px</span>
              </div>
            </el-form-item>

            <el-form-item label="模糊度">
              <div class="slider-with-value">
                <el-slider 
                  v-model="glassSettings.blur" 
                  :min="0" 
                  :max="this.getAdaptiveValue(20, 16, 12)" 
                  :step="0.5"
                  :format-tooltip="value => value + 'px'"
                ></el-slider>
                <span class="value-display">{{ glassSettings.blur }}px</span>
              </div>
            </el-form-item>
            <el-form-item label="透明度">
              <div class="slider-with-value">
                <el-slider 
                  v-model="glassSettings.opacity" 
                  :min="0" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ glassSettings.opacity }}%</span>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 合成进度模态框 -->
    <el-dialog
      title="图片合成中"
      :visible.sync="composing.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="composing.canClose"
      width="400px"
      center>
      <div class="compose-progress">
        <el-progress 
          :percentage="composing.progress" 
          :status="composing.status">
        </el-progress>
        <div class="progress-text">{{ composing.text }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CCLogoText from '@/components/CCLogoText.vue'

export default {
  name: 'PhotoshopTemplate',
  components: {
    CCLogoText
  },
  data() {
    return {
      previewImage: null,
      originalImage: null,
      glassSettings: {
        blur: this.getAdaptiveValue(16, 12, 8),
        opacity: 50
      },
      imageSettings: {
        quality: 100
      },
      composing: {
        visible: false,
        progress: 0,
        status: '',
        text: '',
        canClose: false
      },
      centerPanel: {
        width: 0,
        height: 0,
        aspectRatio: 1.35,
        scale: 80,
        x: 50,
        y: 50,
        borderRadius: 30,
        customText: '水印精灵'
      },
      psLogo: {
        fontWeight: 600,
        fontSize: 0
      },
      textLogo: {
        fontSize: 0
      },
      copyrightText: {
        fontSize: 0
      },
      smallCopyrightText: {
        fontSize: 0
      },
      ccText: {
        fontSize: 0
      }
    }
  },
  computed: {
    psTextStyle() {
      return {
        fontSize: `${this.psLogo.fontSize}px`,
        fontWeight: this.psLogo.fontWeight
      }
    },
    glassStyle() {
      return {
        backdropFilter: 'blur(' + this.glassSettings.blur + 'px)',
        backgroundColor: 'rgba(255, 255, 255, ' + (this.glassSettings.opacity / 400) + ')',
        boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, ' + (this.glassSettings.opacity / 200) + ')'
      }
    },
    centerPanelStyle() {
      const shadowOpacity = 0.1
      return {
        width: this.centerPanel.width + 'px',
        height: this.centerPanel.height + 'px',
        borderRadius: this.centerPanel.borderRadius + 'px',
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: this.centerPanel.y + '%',
        left: this.centerPanel.x + '%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, ' + shadowOpacity + ')',
      }
    },
    textLogoStyle() {
      return {
        fontSize: `${this.textLogo.fontSize}px`,
        fontWeight: 700
      }
    },
    copyrightTextStyle() {
      return {
        fontSize: `${this.copyrightText.fontSize}px`
      }
    },
    smallCopyrightTextStyle() {
      return {
        fontSize: `${this.smallCopyrightText.fontSize}px`
      }
    },
    ccTextStyle() {
      return {
        fontSize: `${this.ccText.fontSize}px`
      }
    }
  },
  methods: {
    async handleImageChange(file) {
      this.originalImage = file.raw
      
      const reader = new FileReader()
      reader.onload = async (e) => {
        await this.processImage(e.target.result)
        // 图片加载完成后更新中间层尺寸
        this.$nextTick(() => {
          this.updateCenterPanelSize()
        })
      }
      reader.readAsDataURL(file.raw)
    },
    async processImage(imageData) {
      if (this.imageSettings.quality === 100) {
        this.previewImage = imageData
        return
      }
      
      const img = new Image()
      img.src = imageData
      
      await new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          canvas.width = img.width
          canvas.height = img.height
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          
          this.previewImage = canvas.toDataURL('image/jpeg', this.imageSettings.quality / 100)
          resolve()
        }
      })
    },
    goBack() {
      this.$router.push({ name: 'template-select' })
    },
    async startCompose() {
      this.composing.visible = true
      this.composing.progress = 0
      this.composing.status = ''
      this.composing.text = '准备合成...'
      this.composing.canClose = false
      
      try {
        // 创建画布
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // 获取预览图的实际显示尺寸
        const previewImg = this.$el.querySelector('.background-image')
        if (!previewImg) {
          throw new Error('无法获取预览图尺寸')
        }
        
        // 加载背景图
        this.composing.progress = 20
        this.composing.text = '加载背景图...'
        const bgImage = await this.loadImage(this.previewImage)
        canvas.width = bgImage.width
        canvas.height = bgImage.height
        
        // 计算预览图和最终渲染图的尺寸比例
        const scaleRatio = canvas.width / previewImg.offsetWidth
        
        // 绘制背景图
        this.composing.progress = 40
        this.composing.text = '绘制背景...'
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
        
        // 应用毛玻璃效果
        this.composing.progress = 60
        this.composing.text = '应用特效...'
        
        // 创建临时canvas用于毛玻璃效果
        const tempCanvas = document.createElement('canvas')
        const tempCtx = tempCanvas.getContext('2d')
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        
        // 在临时canvas上绘制背景
        tempCtx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
        
        // 应用模糊效果
        const scaledBlur = Math.round(this.glassSettings.blur * scaleRatio)
        tempCtx.filter = 'blur(' + scaledBlur + 'px)'
        tempCtx.drawImage(tempCanvas, 0, 0)
        
        // 绘制半透明白色遮罩
        tempCtx.filter = 'none'
        tempCtx.fillStyle = 'rgba(255, 255, 255, ' + (this.glassSettings.opacity / 400) + ')'
        tempCtx.fillRect(0, 0, canvas.width, canvas.height)
        
        // 将毛玻璃效果绘制到主canvas
        ctx.drawImage(tempCanvas, 0, 0)
        
        // 导出图片
        this.composing.progress = 90
        this.composing.text = '导出图片...'
        const quality = this.imageSettings.quality / 100
        
        // 创建临时链接并触发下载
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        const link = document.createElement('a')
        link.download = 'watermark.jpg'
        link.href = dataUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // 更新状态
        this.composing.progress = 100
        this.composing.status = 'success'
        this.composing.text = '合成完成'
        this.composing.canClose = true
        
      } catch (error) {
        console.error('合成失败:', error)
        this.composing.status = 'exception'
        this.composing.text = '合成失败: ' + error.message
        this.composing.canClose = true
      }
    },
    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
      })
    },
    getAdaptiveValue(pcValue, tabletValue, mobileValue) {
      const width = window.innerWidth
      if (width <= 480) {
        return mobileValue
      } else if (width <= 768) {
        return tabletValue
      }
      return pcValue
    },
    updateAdaptiveValues() {
      this.glassSettings.blur = this.getAdaptiveValue(16, 12, 8)
    },
    updatePsLogoFontSize() {
      const psLogo = this.$refs.psLogo
      const logoWrapper = psLogo?.parentElement
      
      if (psLogo && logoWrapper) {
        // 获取logo-wrapper的实际高度
        const wrapperHeight = logoWrapper.offsetHeight
        
        // 检查高度是否为0或异常值
        if (wrapperHeight === 0 || wrapperHeight < 10) {
          console.log('Logo Wrapper 高度异常:', wrapperHeight, 'px, 等待重试...')
          requestAnimationFrame(() => {
            this.updatePsLogoFontSize()
          })
          return
        }

        // 计算PS Logo字体大小
        const width = psLogo.offsetWidth
        if (width === 0 || width < 10) {
          console.log('PS Logo 宽度异常:', width, 'px, 等待重试...')
          requestAnimationFrame(() => {
            this.updatePsLogoFontSize()
          })
          return
        }

        // 计算PS Logo字体大小
        const fontSize = Math.round(width * 0.6)
        if (fontSize < 8 || fontSize > 200) {
          console.log('计算的字体大小异常:', fontSize, 'px, 等待重试...')
          setTimeout(() => {
            this.updatePsLogoFontSize()
          }, 100)
          return
        }

        // 设置PS Logo字体大小
        this.psLogo.fontSize = fontSize
        
        // 计算text logo字体大小为logo-wrapper高度的50%
        const textFontSize = Math.round(wrapperHeight * 0.5)
        if (textFontSize < 6 || textFontSize > 120) {
          console.log('文字Logo字体大小异常:', textFontSize, 'px, 等待重试...')
          setTimeout(() => {
            this.updatePsLogoFontSize()
          }, 100)
          return
        }
        this.textLogo.fontSize = textFontSize

      } else {
        requestAnimationFrame(() => {
          this.updatePsLogoFontSize()
        })
      }
    },
    updateCenterPanelSize() {
      const bgImage = this.$refs.backgroundImage
      if (!bgImage) return

      const containerWidth = bgImage.offsetWidth
      const containerHeight = bgImage.offsetHeight

      // 检查容器尺寸是否合理
      if (containerWidth === 0 || containerHeight === 0 || 
          containerWidth < 100 || containerHeight < 100) {
        console.log('容器尺寸异常:', containerWidth, 'x', containerHeight, ', 等待重试...')
        setTimeout(() => {
          this.updateCenterPanelSize()
        }, 100)
        return
      }

      let width = containerWidth * this.centerPanel.scale / 100
      let height = width / this.centerPanel.aspectRatio

      if (height > containerHeight * this.centerPanel.scale / 100) {
        height = containerHeight * this.centerPanel.scale / 100
        width = height * this.centerPanel.aspectRatio
      }

      // 检查计算结果是否合理
      if (width < 100 || height < 100 || 
          width > containerWidth || height > containerHeight) {
        console.log('计算尺寸异常:', width, 'x', height, ', 等待重试...')
        setTimeout(() => {
          this.updateCenterPanelSize()
        }, 100)
        return
      }

      this.centerPanel.width = width
      this.centerPanel.height = height
      
      // 在中心面板尺寸更新后，更新PS Logo字体大小
      this.$nextTick(() => {
        this.updatePsLogoFontSize()
      })
    },
    updateCopyrightTextSize() {
      const infoSection = this.$el.querySelector('.info-section')
      if (!infoSection) {
        requestAnimationFrame(() => {
          this.updateCopyrightTextSize()
        })
        return
      }
      
      const sectionWidth = infoSection.offsetWidth
      // 检查宽度是否为0或异常值
      if (sectionWidth === 0 || sectionWidth < 10) {
        console.log('Info Section 宽度异常:', sectionWidth, 'px, 等待重试...')
        setTimeout(() => {
          this.updateCopyrightTextSize()
        }, 100)
        return
      }
      
      // 计算字体大小
      const fontSize = Math.round(sectionWidth * 0.035)
      const smallFontSize = Math.round(sectionWidth * 0.025)
      const ccFontSize = Math.round(sectionWidth * 0.04)
      // 检查计算结果是否异常
      if (fontSize === 0 || fontSize < 1 || smallFontSize === 0 || smallFontSize < 1 || ccFontSize === 0 || ccFontSize < 1) {
        console.log('计算的字体大小异常:', fontSize, 'px,', smallFontSize, 'px,', ccFontSize, 'px, 等待重试...')
        setTimeout(() => {
          this.updateCopyrightTextSize()
        }, 100)
        return
      }
      
      this.copyrightText.fontSize = fontSize
      this.smallCopyrightText.fontSize = smallFontSize
      this.ccText.fontSize = ccFontSize
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateAdaptiveValues)
    this.updateAdaptiveValues()
    window.addEventListener('resize', this.updateCenterPanelSize)
    
    // 初始化时计算字体大小
    this.$nextTick(() => {
      this.updatePsLogoFontSize()
      this.updateCopyrightTextSize()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateAdaptiveValues)
    window.removeEventListener('resize', this.updateCenterPanelSize)
  },
  watch: {
    'imageSettings.quality': {
      handler() {
        if (this.originalImage) {
          const reader = new FileReader()
          reader.onload = async (e) => {
            await this.processImage(e.target.result)
          }
          reader.readAsDataURL(this.originalImage)
        }
      }
    },
    'centerPanel.scale': {
      handler() {
        this.$nextTick(() => {
          this.updateCenterPanelSize()
        })
      }
    },
    previewImage: {
      handler() {
        // 当预览图更新时，确保重新计算字体大小
        this.$nextTick(() => {
          this.updatePsLogoFontSize()
          this.updateCenterPanelSize()
        })
      },
      immediate: true
    },
    'centerPanel.width': {
      handler() {
        // 当中心面板宽度变化时，确保重新计算字体大小
        this.$nextTick(() => {
          this.updatePsLogoFontSize()
          this.updateCopyrightTextSize()
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.photoshop-template {
  padding: 20px;
  height: 100vh;
  background-color: var(--primary-black);
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 10px;
    height: auto;
    min-height: 100vh;
  }

  .header {
    margin-bottom: 20px;
    width: 100%;
  }

  .editor-container {
    display: flex;
    gap: 20px;
    height: calc(100vh - 80px);
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    
    @media (max-width: 768px) {
      flex-direction: column;
      height: auto;
      gap: 10px;
    }
  }

  .preview-area {
    flex: 1;
    background-color: var(--secondary-black);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    
    @media (max-width: 768px) {
      padding: 10px;
      min-height: 50vh;
      width: 100%;
    }
  }

  .image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .image-wrapper {
      position: relative;
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      overflow: hidden;
      
      .background-image {
        display: block;
        max-width: 100%;
        max-height: calc(100vh - 140px);
        width: auto;
        height: auto;
        object-fit: contain;
        
        @media (max-width: 768px) {
          max-height: calc(50vh - 40px);
        }
      }
      
      .glass-effect {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }

      .center-panel {
        z-index: 2;
        transition: all 0.3s ease;

        .center-panel-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          
          // Logo区域
          .logo-area {
            flex: 0 0 15%;
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            padding: 0 0 3% 3%;
            box-sizing: border-box;
            position: relative;

            .logo-wrapper {
              position: absolute;
              left: 3%;
              bottom: 3%;
              height: calc(100% * 0.5);
              display: flex;
              align-items: center;
              gap: 8px;

              .ps-logo {
                height: 100%;
                aspect-ratio: 1;
                background-color: #001E36;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: Arial, sans-serif;
                font-weight: 600;
                color: #31A8FF;
                border-radius: 16%;

                .ps-text {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 100%;
                  font-size: calc(100% * 0.6);
                  line-height: 1;
                  letter-spacing: -0.05em;
                  padding: 15%;
                  box-sizing: border-box;
                  user-select: none;
                }
              }

              .text-logo {
                height: 100%;
                display: flex;
                align-items: center;
                flex: 1;
                min-width: 0;

                .text {
                  color: #001E36;
                  font-family: Arial, sans-serif;
                  line-height: 1;
                  letter-spacing: -0.02em;
                  white-space: nowrap;
                  user-select: none;
                  height: 100%;
                  display: flex;
                  align-items: center;
                }
              }
            }
          }
          
          // 下部内容区域
          .content-area {
            flex: 0 0 85%;
            width: 100%;
            display: flex;
            flex-direction: row;
            height: 85%; // 确保高度固定
            min-height: 0; // 允许子元素收缩
            max-width: 100%; // 限制最大宽度
            box-sizing: border-box; // 确保padding和border不影响尺寸
            
            // 左侧文字信息区
            .info-section {
              flex: 0 0 32%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              color: #666;
              font-size: 14px;
              padding: 10% 3% 15% 3%;
              box-sizing: border-box;
              
              .copyright-text {
                font-family: Arial, sans-serif;
                color: rgba(0, 30, 54, 0.5);
                font-size: 12px;
                line-height: 1.2;
                display: flex;
                align-items: center;
                gap: 4px;
                
                .copyright-icon {
                  font-size: inherit;
                }

                &.small-copyright-text {
                  margin-left: -2%;
                  color: rgba(0, 30, 54, 0.4);
                }
              }
            }
            
            // 右侧图片展示区
            .preview-section {
              flex: 0 0 68%;
              height: 100%;
              overflow: hidden;
              min-height: 0;
              padding: calc(3% + 5px);
              box-sizing: border-box;
              
              @media (max-width: 1440px) {
                padding: calc(2.5% + 5px);
              }
              
              @media (max-width: 1024px) {
                padding: calc(2% + 4px);
              }
              
              @media (max-width: 768px) {
                padding: calc(1.5% + 3px);
              }
              
              @media (max-width: 480px) {
                padding: calc(1% + 2px);
              }
              
              .preview-image-container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                min-height: 0; // 允许内容收缩
                
                .preview-image {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: top;
                }
              }
            }
          }
        }
      }
    }
  }

  .upload-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed var(--border-color);
    border-radius: 8px;

    .upload-text {
      color: var(--text-gray);
      margin-top: 10px;
    }
  }

  .settings-panel {
    width: 300px;
    background-color: var(--secondary-black);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    
    @media (max-width: 768px) {
      width: 100%;
      height: auto;
      padding: 15px;
    }

    h3 {
      color: var(--text-white);
      margin-top: 0;
      margin-bottom: 20px;
    }
    
    .settings-form {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 10px;
      width: 100%;
      box-sizing: border-box;
      
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }

      .el-form-item {
        margin-bottom: 20px;
        
        .el-form-item__label {
          color: var(--text-white);
        }
      }
    }
  }
}

.slider-with-value {
  display: flex;
  align-items: center;
  gap: 10px;

  .el-slider {
    flex: 1;
  }

  .value-display {
    min-width: 45px;
    color: var(--text-white);
    font-size: 14px;
    text-align: right;
  }
}

.section-divider {
  color: var(--text-white);
  font-size: 16px;
  font-weight: 500;
  margin: 30px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.section-divider:first-of-type {
  margin-top: 10px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  
  h3 {
    margin: 0;
  }
}

.compose-progress {
  padding: 20px;
  text-align: center;
  
  .progress-text {
    margin-top: 15px;
    color: var(--text-gray);
    font-size: 14px;
  }
}

// 确保对话框不会超出视口
.el-dialog {
  @media (max-width: 768px) {
    width: 90% !important;
    margin: 0 auto !important;
  }
}
</style> 