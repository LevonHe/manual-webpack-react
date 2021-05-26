import Layout from '@/layout/Layout';
import Login from '@/features/login/Login';
import Register from '@/features/login/Register';
import ForgetPwd from '@/features/login/ForgetPwd';
import PageNotFound from '@/common/PageNotFound';
import overviewRoute from '@/features/overview/route';

const childRoutes = [overviewRoute];

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/forgetPwd',
    component: ForgetPwd,
  },
  {
    path: '/',
    component: Layout,
    canActive: true,
    childRoutes: [...childRoutes, { path: '*', name: 'Page not found', component: PageNotFound }].filter(
      (r) => r.component || (r.childRoutes && r.childRoutes.length > 0)
    ),
  },
];

export default routes;
