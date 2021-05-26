import { SuspenseComponent } from '@/common/WithLoadable';

export default {
  path: 'overview',
  name: 'overview',
  component: SuspenseComponent(() => import('./Index')),
  canActive: true,
};
