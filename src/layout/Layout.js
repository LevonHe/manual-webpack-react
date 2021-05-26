import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Icon, Dropdown, Menu } from 'antd';
import intl from 'react-intl-universal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo_white2 from '@/assets/images/logo_white2.png';
import logo_white from '@/assets/images/logo_white.png';
import CookieService from '@/util/CookieService';
import StorageService from '@/util/StorageService';
import { getBrowserType, pathObj } from '@/util/commonService';
import * as actions from '@/store/modules/layout/_actions';
import JarvisDocCard from '@/common/JarvisDocCard';
import JarvisBrowserNotSupportTip from '@/common/JarvisBrowserNotSupportTip';
import UserInfoModal from './UserInfoModal';
import ChangePwdModal from './ChangePwdModal';
import LogoutModal from './LogoutModal';
import SidePanel from './SidePanel';

const { Header, Sider, Content, Footer } = Layout;

export class JarvisLayout extends React.Component {
  componentDidUpdate() {
    this.judgePath();
  }

  judgePath = () => {
    const { pathname } = this.props.history.location;
    const { urlArr } = this.props.login;
    const pathArr = [...urlArr];
    Object.keys(pathObj).forEach((k) => {
      if (urlArr.includes('/' + k)) {
        pathArr.push(...pathObj[k]);
      }
    });
    let isPathAllow = false;
    pathArr.every((ele) => {
      if (pathname.includes(ele)) {
        isPathAllow = true;
        return false;
      }
      return true;
    });
    if (!isPathAllow) {
      this.props.history.push('/overview');
    }
    if (pathname === '' || pathname === '/' || pathname.includes('/home')) {
      this.props.history.push('/overview');
    }
  };

  toogle = () => {
    this.props.actions.collapsed(!this.props.layout.collapsed);
  };

  changeLocale = (e) => {
    const lang = CookieService.getCookie('Jarvis-Lang');
    if (lang && lang === e.key) {
      return;
    }
    CookieService.setCookie('Jarvis-Lang', e.key, 1, '/');
    window.location.reload(true);
  };

  changeUser = (e) => {
    if (e.key === 'userInfo') {
      const winData = {
        userInfo: this.props.login.userInfo,
      };
      UserInfoModal.show(intl.get('common.userInfo'), '640px', winData);
    }
    if (e.key === 'changePwd') {
      ChangePwdModal.show(intl.get('common.updatePwd'), '640px', {}, this.logout);
    }
    if (e.key === 'logout') {
      LogoutModal.show(intl.get('common.logout'), '640px', {}, this.logout);
    }
  };

  logout = () => {
    CookieService.delCookie('Jarvis-Token', '/');
    StorageService.clear();
    this.props.history.replace('/login');
  };

  render() {
    const languageMenu = (
      <Menu onClick={this.changeLocale}>
        <Menu.Item key="zh-CN">{intl.get('common.zh_CN')}</Menu.Item>
        <Menu.Item key="en-US">{intl.get('common.en_US')}</Menu.Item>
      </Menu>
    );

    const userMenu = (
      <Menu onClick={this.changeUser}>
        <Menu.Item key="userInfo">
          <Icon type="info-circle" />
          {intl.get('common.userInfo')}
        </Menu.Item>
        <Menu.Item key="changePwd">
          <Icon type="edit" />
          {intl.get('common.updatePwd')}
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          {intl.get('common.logout')}
        </Menu.Item>
      </Menu>
    );

    const { layout, login } = this.props;

    const browserType = getBrowserType().type;
    const browserVersion = getBrowserType().version;
    // Edge兼容
    const edge_layoutStyle = { backgroundColor: '#202a36' };
    // ie9, ie10兼容
    const ie_siderStyle = { height: '100%', float: 'left' };
    const ie_rightSectionStyle = {
      minWidth: 'calc(100% - 200px)',
      maxWidth: 'calc(100% - 80px)',
      width: `calc(100% - ${layout.collapsed ? '80px' : '200px'})`,
      height: '100%',
      overflowY: 'hidden',
    };
    const ie_rightContentStyle = { height: 'calc(100% - 58px)' };

    return (
      <Layout className="iot-layout" style={browserType.includes('Edge') ? edge_layoutStyle : null}>
        <JarvisBrowserNotSupportTip></JarvisBrowserNotSupportTip>
        <Sider
          trigger={null}
          collapsible
          collapsed={layout.collapsed}
          style={browserType === 'IE' && browserVersion < 11 ? ie_siderStyle : null}
        >
          <NavLink to="/overview" className="jarvis-logo">
            {layout.collapsed && <img src={logo_white2} className="logoImg animated fadeInRight" />}
            {!layout.collapsed && <img src={logo_white} className="logoImg animated fadeInRight" />}
          </NavLink>
          <SidePanel></SidePanel>
        </Sider>
        <Layout style={browserType === 'IE' && browserVersion < 11 ? ie_rightSectionStyle : null}>
          <Header className="jarvis-header">
            <Icon
              className="jarvis-trigger"
              type={layout.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toogle}
            ></Icon>
            <Dropdown className="jarvis-dropdown" overlay={userMenu} trigger={['click']}>
              <a className="jarvis-dropdown-link">
                <Icon className="jarvis-icon vertical-middle" type="user"></Icon>
                <span className="jarvis-username">{login.userInfo.indentity}</span>
              </a>
            </Dropdown>
            <Dropdown className="jarvis-dropdown" overlay={languageMenu} trigger={['click']}>
              <a className="jarvis-dropdown-link">
                <Icon className="jarvis-icon vertical-middle" type="global"></Icon>
                {intl.options.currentLocale === 'zh-CN' ? (
                  <span className="vertical-middle">{intl.get('common.zh_CN')}</span>
                ) : (
                  <span className="vertical-middle">{intl.get('common.en_US')}</span>
                )}
              </a>
            </Dropdown>
            <JarvisDocCard></JarvisDocCard>
          </Header>
          <Content
            className="jarvis-content"
            style={browserType === 'IE' && browserVersion < 11 ? ie_rightContentStyle : null}
          >
            <div className="jarvis-container">{this.props.children}</div>
            <Footer className="jarvis-footer">
              <span>{intl.get('common.copyright1') + new Date().getFullYear() + intl.get('common.copyright2')}</span>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    layout: state.layout,
    login: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JarvisLayout);
