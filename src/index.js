import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { ConfigProvider } from 'antd';
import en_US from 'antd/es/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import { persistor, store } from './store';
import routeConfig from './router/routeConfig';
import CookieService from './util/CookieService';
import Root from './router/Root';
import './assets/styles/index.less';
import 'moment/locale/zh-cn';

// 设置antd组件的全局国际化
let lang = CookieService.getCookie('Jarvis-Lang');
if (!lang || !['zh-CN', 'en-US'].includes(lang)) {
  lang = 'zh-CN';
  CookieService.setCookie('Jarvis-Lang', 'zh-CN', 1, '/');
}

let lan;
if (lang === 'zh-CN') {
  moment.locale('zh-cn');
  lan = zh_CN;
} else if (lang === 'en-US') {
  moment.locale('en');
  lan = en_US;
}

class App extends React.Component {
  state = {
    locale: lan,
  };

  render() {
    return (
      <ConfigProvider locale={this.state.locale}>
        <Root store={store} persistor={persistor} routeConfig={routeConfig}></Root>
      </ConfigProvider>
    );
  }
}

render(<App></App>, document.getElementById('root'));
