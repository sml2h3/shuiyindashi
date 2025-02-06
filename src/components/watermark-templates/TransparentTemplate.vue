<template>
  <div class="transparent-template">
    <div class="header">
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
    </div>
    <div class="editor-container">
      <div class="preview-area">
        <div class="image-container">
          <template v-if="previewImage">
            <div class="image-wrapper">
              <!-- 背景大图 -->
              <img :src="previewImage" class="background-image">
              <!-- 毛玻璃效果 -->
              <div class="glass-effect" :style="glassStyle"></div>
              <!-- 摄影信息 -->
              <div class="photo-info" v-if="hasPhotoInfo" :style="textPositionStyle">
                <div class="info-row camera-info" v-if="formattedCamera" :style="cameraStyle">
                  {{ formattedCamera }}
                </div>
                <div class="info-row settings-info" v-if="formattedSettings" :style="settingsStyle">
                  {{ formattedSettings }}
                </div>
              </div>
              <!-- 前景小图 -->
              <div class="foreground-container" :style="foregroundStyle">
                <img :src="previewImage" class="foreground-image">
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
            
            <el-form-item label="模糊度">
              <div class="slider-with-value">
                <el-slider 
                  v-model="glassSettings.blur" 
                  :min="0" 
                  :max="20" 
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
            <el-form-item label="图片缩放">
              <div class="slider-with-value">
                <el-slider 
                  v-model="imageSettings.scale" 
                  :min="20" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ imageSettings.scale }}%</span>
              </div>
            </el-form-item>
            <el-form-item label="水平位置">
              <div class="slider-with-value">
                <el-slider 
                  v-model="imageSettings.x" 
                  :min="0" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ imageSettings.x }}%</span>
              </div>
            </el-form-item>
            <el-form-item label="垂直位置">
              <div class="slider-with-value">
                <el-slider 
                  v-model="imageSettings.y" 
                  :min="0" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ imageSettings.y }}%</span>
              </div>
            </el-form-item>
            <el-form-item label="圆角">
              <div class="slider-with-value">
                <el-slider 
                  v-model="imageSettings.borderRadius" 
                  :min="0" 
                  :max="30"
                  :format-tooltip="value => value + 'px'"
                ></el-slider>
                <span class="value-display">{{ imageSettings.borderRadius }}px</span>
              </div>
            </el-form-item>
            <el-form-item label="阴影大小">
              <div class="slider-with-value">
                <el-slider 
                  v-model="imageSettings.shadowSize" 
                  :min="0" 
                  :max="50"
                  :format-tooltip="value => value + 'px'"
                ></el-slider>
                <span class="value-display">{{ imageSettings.shadowSize }}px</span>
              </div>
            </el-form-item>
            <el-form-item label="阴影透明度">
              <div class="slider-with-value">
                <el-slider 
                  v-model="imageSettings.shadowOpacity" 
                  :min="0" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ imageSettings.shadowOpacity }}%</span>
              </div>
            </el-form-item>
            
            <div class="section-divider">拍摄信息</div>
            
            <el-form-item label="相机品牌">
              <el-input 
                v-model="photoInfo.brand" 
                placeholder="例如：Canon"
                clearable
              ></el-input>
            </el-form-item>
            
            <el-form-item label="相机型号">
              <el-input 
                v-model="photoInfo.model" 
                placeholder="例如：EOS R5"
                clearable
              ></el-input>
            </el-form-item>
            
            <el-form-item label="焦段">
              <div class="input-with-unit">
                <el-input 
                  v-model="photoInfo.focalLength" 
                  placeholder="例如：24"
                  type="number"
                  clearable
                ></el-input>
                <span class="unit">mm</span>
              </div>
            </el-form-item>
            
            <el-form-item label="光圈">
              <div class="input-with-unit">
                <span class="prefix">f/</span>
                <el-input 
                  v-model="photoInfo.aperture" 
                  placeholder="例如：2.8"
                  type="number"
                  step="0.1"
                  clearable
                ></el-input>
              </div>
            </el-form-item>
            
            <el-form-item label="快门速度">
              <div class="input-with-unit">
                <span class="prefix">1/</span>
                <el-input 
                  v-model="photoInfo.shutterSpeed" 
                  placeholder="例如：200"
                  type="number"
                  clearable
                ></el-input>
                <span class="unit">s</span>
              </div>
            </el-form-item>
            
            <el-form-item label="ISO">
              <div class="input-with-unit">
                <span class="prefix">ISO</span>
                <el-input 
                  v-model="photoInfo.iso" 
                  placeholder="例如：100"
                  type="number"
                  clearable
                ></el-input>
              </div>
            </el-form-item>

            <div class="section-divider">文字样式</div>
            
            <el-form-item label="水平位置">
              <div class="slider-with-value">
                <el-slider 
                  v-model="textSettings.position.x" 
                  :min="0" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ textSettings.position.x }}%</span>
              </div>
            </el-form-item>

            <el-form-item label="垂直位置">
              <div class="slider-with-value">
                <el-slider 
                  v-model="textSettings.position.y" 
                  :min="0" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ textSettings.position.y }}%</span>
              </div>
            </el-form-item>

            <el-form-item label="相机信息">
              <el-color-picker v-model="textSettings.camera.color" show-alpha></el-color-picker>
              <div class="slider-with-value">
                <el-slider 
                  v-model="textSettings.camera.opacity" 
                  :min="0" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ textSettings.camera.opacity }}%</span>
              </div>
            </el-form-item>
            
            <el-form-item label="参数信息">
              <el-color-picker v-model="textSettings.settings.color" show-alpha></el-color-picker>
              <div class="slider-with-value">
                <el-slider 
                  v-model="textSettings.settings.opacity" 
                  :min="0" 
                  :max="100"
                  :format-tooltip="value => value + '%'"
                ></el-slider>
                <span class="value-display">{{ textSettings.settings.opacity }}%</span>
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
import EXIF from 'exif-js'

export default {
  name: 'TransparentTemplate',
  data() {
    return {
      previewImage: null,
      originalImage: null,
      glassSettings: {
        blur: 5,
        opacity: 50
      },
      imageSettings: {
        quality: 100,
        scale: 80,
        x: 50,    // 水平居中
        y: 45,    // 偏上位置
        borderRadius: 8,  // 默认圆角
        shadowSize: 20,   // 默认阴影大小
        shadowOpacity: 30 // 默认阴影透明度
      },
      photoInfo: {
        brand: '',
        model: '',
        focalLength: '',
        aperture: '',
        shutterSpeed: '',
        iso: ''
      },
      textSettings: {
        camera: {
          color: '#FFFFFF',
          opacity: 100
        },
        settings: {
          color: '#FFFFFF',
          opacity: 100
        },
        position: {
          x: 50,  // 水平居中
          y: 90   // 距底部10%
        }
      },
      composing: {
        visible: false,
        progress: 0,
        status: '',
        text: '',
        canClose: false
      }
    }
  },
  computed: {
    glassStyle() {
      return {
        backdropFilter: 'blur(' + this.glassSettings.blur + 'px)',
        backgroundColor: 'rgba(255, 255, 255, ' + (this.glassSettings.opacity / 400) + ')',
        boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, ' + (this.glassSettings.opacity / 200) + ')'
      }
    },
    foregroundStyle() {
      const shadowOpacity = this.imageSettings.shadowOpacity / 100;
      return {
        width: this.imageSettings.scale + '%',
        height: this.imageSettings.scale + '%',
        left: 'calc(' + this.imageSettings.x + '% - ' + (this.imageSettings.scale / 2) + '%)',
        top: 'calc(' + this.imageSettings.y + '% - ' + (this.imageSettings.scale / 2) + '%)',
        borderRadius: this.imageSettings.borderRadius + 'px',
        boxShadow: '0 ' + (this.imageSettings.shadowSize / 2) + 'px ' + 
                   this.imageSettings.shadowSize + 'px rgba(0, 0, 0, ' + shadowOpacity + ')'
      }
    },
    hasPhotoInfo() {
      return this.photoInfo.brand || 
             this.photoInfo.model || 
             this.photoInfo.focalLength || 
             this.photoInfo.aperture ||
             this.photoInfo.shutterSpeed ||
             this.photoInfo.iso
    },
    formattedCamera() {
      return [this.photoInfo.brand, this.photoInfo.model]
        .filter(Boolean)
        .join(' | ')
    },
    formattedSettings() {
      const parts = []
      if (this.photoInfo.focalLength) {
        parts.push(this.photoInfo.focalLength + 'mm')
      }
      const exposure = []
      if (this.photoInfo.aperture) {
        exposure.push('f/' + this.photoInfo.aperture)
      }
      if (this.photoInfo.shutterSpeed) {
        exposure.push('1/' + this.photoInfo.shutterSpeed + 's')
      }
      if (this.photoInfo.iso) {
        exposure.push('ISO ' + this.photoInfo.iso)
      }
      if (exposure.length > 0) {
        parts.push(exposure.join(' '))
      }
      return parts.join(' | ')
    },
    cameraStyle() {
      return {
        color: this.textSettings.camera.color,
        opacity: this.textSettings.camera.opacity / 100
      }
    },
    settingsStyle() {
      return {
        color: this.textSettings.settings.color,
        opacity: this.textSettings.settings.opacity / 100
      }
    },
    textPositionStyle() {
      return {
        left: this.textSettings.position.x + '%',
        top: this.textSettings.position.y + '%',
        transform: 'translate(-50%, -50%)'
      }
    }
  },
  methods: {
    async handleImageChange(file) {
      this.originalImage = file.raw
      
      const reader = new FileReader()
      reader.onload = async (e) => {
        await this.processImage(e.target.result)
        await this.extractExifData(file.raw)
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
    async extractExifData(imageFile) {
      try {
        return new Promise((resolve) => {
          EXIF.getData(imageFile, () => {
            const exifData = EXIF.getAllTags(imageFile)
            
            // 相机信息
            if (!this.photoInfo.brand) this.photoInfo.brand = exifData.Make || ''
            if (!this.photoInfo.model) this.photoInfo.model = exifData.Model || ''
            
            // 焦距
            if (!this.photoInfo.focalLength && exifData.FocalLength) {
              this.photoInfo.focalLength = Math.round(exifData.FocalLength)
            }
            
            // 光圈
            if (!this.photoInfo.aperture && exifData.FNumber) {
              this.photoInfo.aperture = exifData.FNumber
            }
            
            // 快门速度
            if (!this.photoInfo.shutterSpeed && exifData.ExposureTime) {
              this.photoInfo.shutterSpeed = Math.round(1/exifData.ExposureTime)
            }
            
            // ISO
            if (!this.photoInfo.iso && exifData.ISO) {
              this.photoInfo.iso = exifData.ISO
            }
            
            resolve()
          })
        })
      } catch (error) {
        console.error('读取EXIF信息失败:', error)
      }
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
        
        // 加载背景图
        this.composing.progress = 10
        this.composing.text = '加载背景图...'
        const bgImage = await this.loadImage(this.previewImage)
        canvas.width = bgImage.width
        canvas.height = bgImage.height

        // 获取预览区域的尺寸
        const previewArea = this.$el.querySelector('.preview-area')
        const previewWidth = previewArea.clientWidth - 40  // 减去padding
        const previewHeight = previewArea.clientHeight - 40
        
        // 计算缩放比例
        const scaleRatio = Math.max(
          canvas.width / previewWidth,
          canvas.height / previewHeight
        )
        
        // 绘制背景图
        this.composing.progress = 30
        this.composing.text = '绘制背景...'
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
        
        // 应用毛玻璃效果
        this.composing.progress = 50
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
        
        // 绘制前景图
        this.composing.progress = 70
        this.composing.text = '绘制前景...'
        const scale = this.imageSettings.scale / 100
        const width = canvas.width * scale
        const height = canvas.height * scale
        const x = (canvas.width * this.imageSettings.x / 100) - (width / 2)
        const y = (canvas.height * this.imageSettings.y / 100) - (height / 2)
        
        // 创建圆角蒙版
        const scaledRadius = Math.round(this.imageSettings.borderRadius * scaleRatio)
        if (scaledRadius > 0) {
          ctx.save()
          this.roundRect(ctx, x, y, width, height, scaledRadius)
          ctx.clip()
        }
        
        ctx.drawImage(bgImage, x, y, width, height)
        
        if (scaledRadius > 0) {
          ctx.restore()
        }
        
        // 添加阴影
        const scaledShadowSize = Math.round(this.imageSettings.shadowSize * scaleRatio)
        if (scaledShadowSize > 0) {
          ctx.save()
          ctx.shadowColor = 'rgba(0, 0, 0, ' + (this.imageSettings.shadowOpacity / 100) + ')'
          ctx.shadowBlur = scaledShadowSize
          ctx.shadowOffsetY = scaledShadowSize / 2
          this.roundRect(ctx, x, y, width, height, scaledRadius)
          ctx.restore()
        }
        
        // 添加文字
        this.composing.progress = 90
        this.composing.text = '添加文字...'
        
        // 计算文字基准位置
        const baseX = canvas.width * this.textSettings.position.x / 100
        const baseY = canvas.height * this.textSettings.position.y / 100
        
        // 计算两行文字的垂直间距
        const cameraFontSize = Math.round(28 * scaleRatio)
        const settingsFontSize = Math.round(18 * scaleRatio)
        
        // 调整行距计算，考虑字体大小和额外间距
        const lineSpacing = Math.round((cameraFontSize + settingsFontSize) * 1.2)
        
        if (this.formattedCamera) {
          ctx.save()
          const textShadowSize = Math.round(4 * scaleRatio)
          
          // 设置字体样式
          ctx.font = 'italic 200 ' + cameraFontSize + 'px "Helvetica Neue", Arial, sans-serif'
          ctx.fillStyle = this.textSettings.camera.color
          ctx.globalAlpha = this.textSettings.camera.opacity / 100
          ctx.textAlign = 'center'
          ctx.textBaseline = 'bottom'  // 使用bottom基线
          
          // 文字阴影
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
          ctx.shadowBlur = textShadowSize * 2
          ctx.shadowOffsetY = textShadowSize / 2
          
          // 字母间距和位置
          const letterSpacing = Math.round(2 * scaleRatio)
          const text = this.formattedCamera.split('').join('\u200B'.repeat(letterSpacing))
          
          // 计算第一行位置，考虑是否有第二行
          const yOffset = this.formattedSettings ? lineSpacing / 2 : 0
          
          // 应用垂直拉伸效果
          ctx.save()
          ctx.scale(1, 1.02)
          ctx.fillText(text, baseX, baseY - yOffset + cameraFontSize / 2)
          ctx.restore()
          
          ctx.restore()
        }
        
        if (this.formattedSettings) {
          ctx.save()
          const textShadowSize = Math.round(4 * scaleRatio)
          
          // 设置字体样式
          ctx.font = '300 ' + settingsFontSize + 'px "Helvetica Neue", Arial, sans-serif'
          ctx.fillStyle = this.textSettings.settings.color
          ctx.globalAlpha = this.textSettings.settings.opacity / 100
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'  // 使用top基线
          
          // 文字阴影
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
          ctx.shadowBlur = textShadowSize * 2
          ctx.shadowOffsetY = textShadowSize / 2
          
          // 字母间距和位置
          const letterSpacing = Math.round(1.5 * scaleRatio)
          const text = this.formattedSettings.split('').join('\u200B'.repeat(letterSpacing))
          
          // 计算第二行位置，考虑是否有第一行
          const yOffset = this.formattedCamera ? lineSpacing / 2 : 0
          
          ctx.fillText(text, baseX, baseY + yOffset - settingsFontSize / 2)
          ctx.restore()
        }
        
        // 导出图片
        this.composing.progress = 95
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
        this.composing.text = '合成失败'
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
    
    roundRect(ctx, x, y, width, height, radius) {
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
    }
  },
  watch: {
    'imageSettings.quality': {
      // eslint-disable-next-line no-unused-vars
      handler(newValue) {
        if (this.originalImage) {
          const reader = new FileReader()
          reader.onload = async (e) => {
            await this.processImage(e.target.result)
          }
          reader.readAsDataURL(this.originalImage)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.transparent-template {
  padding: 20px;
  height: 100vh;
  background-color: var(--primary-black);

  .header {
    margin-bottom: 20px;
  }

  .editor-container {
    display: flex;
    gap: 20px;
    height: calc(100vh - 80px);
  }

  .preview-area {
    flex: 1;
    background-color: var(--secondary-black);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .image-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      
      .background-image {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      
      .glass-effect {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: 8px;
        backdrop-filter: saturate(180%);
      }

      .foreground-container {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        overflow: hidden;
        
        .foreground-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
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

    h3 {
      color: var(--text-white);
      margin-top: 0;
      margin-bottom: 20px;
    }
    
    .settings-form {
      flex: 1;
      overflow-y: auto;
      padding-right: 10px;
      
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

        .el-color-picker {
          margin-bottom: 10px;
          width: 100%;
          
          ::v-deep .el-color-picker__trigger {
            width: 100%;
            height: 36px;
            border: none;
            background-color: var(--primary-black);
          }
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

.input-with-unit {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .el-input {
    flex: 1;
  }
  
  .prefix, .unit {
    color: var(--text-white);
    font-size: 14px;
    opacity: 0.8;
  }
}

.photo-info {
  position: absolute;
  text-align: center;
  z-index: 1;
  width: 100%;
  
  .info-row {
    margin: 8px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    
    &.camera-info {
      font-size: 28px;
      font-weight: 200;
      letter-spacing: 2px;
      font-style: italic;
      transform: scale(1, 1.02);
    }
    
    &.settings-info {
      font-size: 18px;
      font-weight: 300;
      letter-spacing: 1.5px;
      margin-top: 12px;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }
  }
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
</style> 