import { IMaskDirective } from 'vue-imask';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    vImask: typeof IMaskDirective;
  }
}