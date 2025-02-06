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
        <h3>模板设置</h3>
        <div class="settings-form">
          <el-form label-position="top">
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
  </div>
</template>

<script>
import EXIF from 'exif-js'

export default {
  name: 'TransparentTemplate',
  data() {
    return {
      previewImage: null,
      glassSettings: {
        blur: 5,
        opacity: 50
      },
      imageSettings: {
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
      const reader = new FileReader()
      reader.onload = async (e) => {
        this.previewImage = e.target.result
        await this.extractExifData(file.raw)
      }
      reader.readAsDataURL(file.raw)
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
</style> 