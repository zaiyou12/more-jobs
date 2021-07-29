import AppLink from '../components/AppLink.vue'
import type { App } from 'vue'

export default function registerGlobalComponents (app: App): void {
  app.component('AppLink', AppLink)
}
