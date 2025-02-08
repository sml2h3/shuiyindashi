import Vue from 'vue'
import VueRouter from 'vue-router'
import TemplateSelect from '@/views/TemplateSelect.vue'
import TransparentTemplate from '@/components/watermark-templates/TransparentTemplate.vue'
import PhotoshopTemplate from '@/components/watermark-templates/PhotoshopTemplate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'template-select',
    component: TemplateSelect
  },
  {
    path: '/watermark/transparent',
    name: 'transparent-template',
    component: TransparentTemplate
  },
  {
    path: '/watermark/photoshop',
    name: 'photoshop-template',
    component: PhotoshopTemplate
  }
  // 后续可以在这里添加更多的模板路由
]

const router = new VueRouter({
  routes
})

export default router 