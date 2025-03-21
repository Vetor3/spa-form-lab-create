import { createApp } from 'vue';
import { IMaskDirective } from 'vue-imask';

export function setupImask(app: ReturnType<typeof createApp>) {
  app.directive('imask', IMaskDirective as any);
} 