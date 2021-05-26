import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import intl from 'react-intl-universal';
import history from '@/store/history';
import en_US from '@/locales/en-US';
import zh_CN from '@/locales/zh-CN';
import CookieService from '@/util/CookieService';

// 设置业务的国际化
const locales = {
  'en-US': en_US,
  'zh-CN': zh_CN,
};

const currentLocale = intl.determineLocale({
  urlLocaleKey: 'Jarvis-Lang',
  cookieLocaleKey: 'Jarvis-Lang',
});

function renderRouteConfigV3(routes, contextPath) {
  // Resolve route config object in React Router v3.
  const children = []; // children component list

  const renderRoute = (item, routeContextPath) => {
    let newContextPath;
    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = `${routeContextPath}/${item.path}`;
    }
    newContextPath = newContextPath.replace(/\/+/g, '/');
    if (item.component && item.childRoutes) {
      const childRoutes = renderRouteConfigV3(item.childRoutes, newContextPath);
      children.push(
        <Route
          key={newContextPath}
          render={(props) =>
            item.canActive ? (
              CookieService.getCookie('Jarvis-Token') ? (
                <item.component {...props}>{childRoutes}</item.component>
              ) : (
                <Redirect to="/login"></Redirect>
              )
            ) : (
              <item.component {...props}>{childRoutes}</item.component>
            )
          }
          path={newContextPath}
        />
      );
    } else if (item.component) {
      children.push(
        <Route
          key={newContextPath}
          render={(props) =>
            item.canActive ? (
              CookieService.getCookie('Jarvis-Token') ? (
                <item.component {...props}></item.component>
              ) : (
                <Redirect to="/login"></Redirect>
              )
            ) : (
              <item.component {...props}></item.component>
            )
          }
          path={newContextPath}
          exact
        />
      );
    } else if (item.childRoutes) {
      item.childRoutes.forEach((r) => renderRoute(r, newContextPath));
    }
  };

  routes.forEach((item) => renderRoute(item, contextPath));

  // Use Switch so that only the first matched route is rendered.
  return <Switch>{children}</Switch>;
}

export default class Root extends React.Component {
  state = {
    initDone: false,
  };

  componentDidMount() {
    this.loadLocales();
  }

  loadLocales = () => {
    intl
      .init({
        currentLocale,
        locales,
      })
      .then(() => {
        this.setState({
          initDone: true,
        });
      });
  };

  render() {
    const children = renderRouteConfigV3(this.props.routeConfig, '/');
    return (
      this.state.initDone && (
        <Provider store={this.props.store}>
          <PersistGate persistor={this.props.persistor}>
            <Router history={history}>{children}</Router>
          </PersistGate>
        </Provider>
      )
    );
  }
}
