import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Menu, Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CookieService from '@/util/CookieService';
import StorageService from '@/util/StorageService';
import { leftMenuHighLightKey } from '@/util/commonService';
import * as actions from '@/store/modules/layout/_actions';

const { SubMenu } = Menu;

export class SidePanel extends React.Component {
  componentDidMount() {
    this.judgeUrl(this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname === this.props.location.pathname) {
      return;
    }
    this.judgeUrl(this.props);
  }

  judgeUrl = (props) => {
    const { location, login } = props;

    if (!login.menuAside || login.menuAside.length === 0) {
      CookieService.delCookie('Jarvis-Token', '/');
      StorageService.clear();
      this.props.history.replace('/login');
    }

    const pathKey = location.pathname.split('/')[1];
    const selectedKey = '/' + leftMenuHighLightKey(pathKey);
    const menuAside = this.props.login.menuAside;
    const openKey = this.findOpenKey(menuAside, selectedKey);
    this.props.actions.selectedKey(selectedKey);
    this.props.actions.openKeys([openKey]);
  };

  openChange = (openKeys) => {
    this.props.actions.openKeys(openKeys);
  };

  select = (selectedKey) => {
    this.props.actions.selectedKey(selectedKey.key);
  };

  toExternalUrl = (url) => {
    const urlWindow = window.open();
    urlWindow.opener = null;
    urlWindow.location = url;
    urlWindow.target = '_blank';
  };

  renderMenuList = (routeConfig) => {
    if (!routeConfig || routeConfig.length === 0) {
      return;
    }
    return routeConfig.map((item) => {
      if (!item.permissions || item.permissions.length === 0) {
        const IconFont = Icon.createFromIconfontCN({
          scriptUrl: '//at.alicdn.com/t/font_2050435_gpikx6uo3l9.js',
        });

        return (
          <Menu.Item key={item.url || item.name}>
            {item.url.includes('http') ? (
              <a onClick={() => this.toExternalUrl(item.url)}>
                {item.icon ? <Icon type={item.icon}></Icon> : ''}
                <span>{intl.get('menu.' + item.name)}</span>
                <IconFont type="iconexternal-link" style={{ float: 'right', marginTop: '13px', marginRight: 0 }} />
              </a>
            ) : (
              <NavLink to={item.url}>
                {item.icon ? <Icon type={item.icon}></Icon> : ''}
                <span>{intl.get('menu.' + item.name)}</span>
              </NavLink>
            )}
          </Menu.Item>
        );
      }
      return (
        <SubMenu
          key={item.name}
          title={
            <span>
              {item.icon ? <Icon type={item.icon}></Icon> : ''}
              <span>{intl.get('menu.' + item.name)}</span>
            </span>
          }
        >
          {this.renderMenuList(item.permissions)}
        </SubMenu>
      );
    });
  };

  findOpenKey = (routeConfig, selectedKey) => {
    let openKey = '';
    if (!routeConfig || routeConfig.length === 0) {
      return openKey;
    }
    routeConfig.every((ele) => {
      if (ele.permissions && ele.permissions.length) {
        ele.permissions.every((e) => {
          if (e.url && e.url === selectedKey) {
            openKey = ele.url || ele.name;
            return false;
          }
          return true;
        });
      }
      return true;
    });
    return openKey;
  };

  render() {
    const { layout, login } = this.props;
    const defaultProps = layout.collapsed ? {} : { openKeys: layout.openKeys };
    return (
      <Menu
        theme="dark"
        mode={layout.collapsed ? 'vertical' : 'inline'}
        selectedKeys={[layout.selectedKey]}
        onOpenChange={this.openChange}
        onSelect={this.select}
        {...defaultProps}
      >
        {this.renderMenuList(login.menuAside)}
      </Menu>
    );
  }
}

export const widthRouterSidePanel = withRouter(SidePanel);

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

export default connect(mapStateToProps, mapDispatchToProps)(widthRouterSidePanel);
