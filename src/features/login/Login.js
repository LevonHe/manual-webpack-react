import React from 'react';
import { Form, Button, Input, Spin, Icon, Checkbox, Dropdown, Menu } from 'antd';
import intl from 'react-intl-universal';
import debounce from 'lodash/debounce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $api from '@/api/index';
import { PASSWORD_REG, ACCOUNT_REG } from '@/util/regExpService';
import CookieService from '@/util/CookieService';
import StorageService from '@/util/StorageService';
import MsgService from '@/util/MsgService';
import {
  processFieldsValue,
  getBrowserType,
  mapChangeArray,
  filterMenuAside,
  extractName,
  extractUrl,
} from '@/util/commonService';
import * as actions from '@/store/modules/login/_actions';
import JarvisBrowserNotSupportTip from '@/common/JarvisBrowserNotSupportTip';
import menu from '@/router/menu';

export class LoginForm extends React.Component {
  state = {
    loading: false,
    isReadAndAgree: true,
    showText: 'ciphertext',
  };

  componentDidMount() {
    CookieService.delCookie('Jarvis-Token', '/');
    StorageService.clear();
    const { userInfo, menuAside, permissionNameArr, urlArr } = this.props.actions;
    userInfo({
      indentity: '',
      userId: '',
      roleName: '',
      roleId: '',
      email: '',
      phoneNumber: '',
    });
    menuAside([]);
    permissionNameArr([]);
    urlArr([]);
  }

  componentWillUnmount() {
    this.setState = () => {};
    document.onmouseup = null;
  }

  handleLogin = (e) => {
    if (e) e.preventDefault();
    if (!this.state.isReadAndAgree) {
      return;
    }
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      processFieldsValue(fieldsValue);
      const loginParam = {
        account: fieldsValue.account,
        credential: fieldsValue.credential,
      };
      this.login(loginParam);
    });
  };

  login = debounce(
    (loginParam) => {
      if (!loginParam) {
        return;
      }

      this.setState({
        loading: true,
      });
      $api.userApi
        .login(loginParam)
        .then((data) => {
          const { accessToken } = data;
          const browserType = getBrowserType().type;
          let expireTime = 0;
          if (browserType === 'IE') {
            expireTime = 1;
          }
          CookieService.setCookie('Jarvis-Token', accessToken, expireTime, '/');
          this.bindSubjectRole();
        })
        .catch((err) => {
          MsgService.error(err);
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    },
    300,
    {
      leading: true,
      trailing: false,
    }
  );

  bindSubjectRole = () => {
    const { actions } = this.props;
    $api.userApi
      .getLoginUserInfo()
      .then((res) => {
        const { role } = res;
        if (!role || !role.permission) {
          MsgService.error(intl.get('common.invalid.noPermission'));
          return;
        }
        const userInfo = {
          userId: res.id,
          indentity: res.name,
          roleName: role.name,
          roleId: role.id,
          organizationId: res.organizationId,
          email: res.email,
          phoneNumber: res.phoneNumber,
          tenantId: res.tenantId,
        };
        actions.userInfo(userInfo);

        const { permission } = role;
        // 接口权限
        const permissionNameArr = [];
        // if (!permission || !permission.permissions || permission.permissions.length === 0) {
        //   MsgService.error(intl.get('common.invalid.noPermission'));
        //   return;
        // }
        mapChangeArray(permission.permissions, permissionNameArr);
        // 保存接口权限的名称数组
        if (permissionNameArr.toString() !== (this.props.login.permissionNameArr || []).toString()) {
          actions.permissionNameArr(permissionNameArr);
        }

        // 视图列表
        const menuAside = filterMenuAside(menu, permissionNameArr);
        const nameArrNew = [];
        const urlArrNew = [];
        extractName(menuAside, nameArrNew);
        extractUrl(menuAside, urlArrNew);
        const nameArrOld = [];
        extractName(this.props.login.menuAside || [], nameArrOld);
        // 保存视图列表
        if (nameArrNew.toString() !== nameArrOld.toString()) {
          actions.menuAside(menuAside);
        }
        // 保存url列表
        if (urlArrNew.toString() !== (this.props.login.urlArr || []).toString()) {
          actions.urlArr(urlArrNew);
        }

        this.props.history.push('/overview');
      })
      .catch((err) => {
        MsgService.error(err);
      });
  };

  onCheckboxChange = (e) => {
    this.setState({
      isReadAndAgree: e.target.checked,
    });
  };

  toForgetPwd = debounce(
    () => {
      const { history } = this.props;
      history.push('/forgetPwd');
    },
    300,
    {
      leading: true,
      trailing: false,
    }
  );

  toRegister = debounce(
    () => {
      const { history } = this.props;
      history.push('/register');
    },
    300,
    {
      leading: true,
      trailing: false,
    }
  );

  onMouseDown = (e) => {
    if (e) e.preventDefault();
    this.setState({
      showText: 'Plaintext',
    });
    if (!document.onmouseup) {
      document.onmouseup = (e) => {
        if (e) e.preventDefault();
        this.setState({
          showText: 'ciphertext',
        });
      };
    }
  };

  changeLocale = (e) => {
    const lang = CookieService.getCookie('Jarvis-Lang');
    if (lang && lang === e.key) {
      return;
    }
    CookieService.setCookie('Jarvis-Lang', e.key, 1, '/');
    window.location.reload(true);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const languageMenu = (
      <Menu onClick={this.changeLocale}>
        <Menu.Item key="zh-CN">{intl.get('common.zh_CN')}</Menu.Item>
        <Menu.Item key="en-US">{intl.get('common.en_US')}</Menu.Item>
      </Menu>
    );
    return (
      <div className="jarvis-login-bg clearfix">
        <JarvisBrowserNotSupportTip></JarvisBrowserNotSupportTip>
        <div className="pull-right mr-20 mt-20">
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
        </div>
        <div className="jarvis-login-container">
          <Spin spinning={this.state.loading}>
            <Form className="jarvis-login-form" layout="vertical" onSubmit={this.handleLogin}>
              <p>{intl.get('common.accountPassword')}</p>
              <Form.Item>
                {getFieldDecorator('account', {
                  validateFirst: true,
                  rules: [
                    { required: true, message: intl.get('login.enterUserName') },
                    { max: 64, message: intl.get('common.accountValid') },
                    {
                      pattern: ACCOUNT_REG,
                      message: intl.get('common.accountValid'),
                    },
                  ],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}></Icon>}
                    placeholder={intl.get('login.account')}
                    className="jarvis-login-button"
                  ></Input>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('credential', {
                  validateFirst: true,
                  rules: [
                    { required: true, message: intl.get('login.enterPwd') },
                    { min: 8, message: intl.get('common.passwordValid') },
                    { max: 20, message: intl.get('common.passwordValid') },
                    {
                      pattern: PASSWORD_REG,
                      message: intl.get('common.passwordValid'),
                    },
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}></Icon>}
                    placeholder={intl.get('login.password')}
                    className="jarvis-login-button"
                    suffix={
                      <Icon
                        type={this.state.showText === 'ciphertext' ? 'eye-invisible' : 'eye'}
                        style={{ color: 'rgba(0,0,0,.25)' }}
                        onMouseDown={this.onMouseDown}
                      ></Icon>
                    }
                    type={this.state.showText === 'ciphertext' ? 'password' : 'text'}
                  ></Input>
                )}
              </Form.Item>
              <Button className="jarvis-login-button" type="primary" htmlType="submit">
                {intl.get('common.login')}
              </Button>
              <div className="jarvis-login-form-footer">
                <div className="pull-right">
                  <a className="jarvis-login-forgetPwd" onClick={this.toForgetPwd}>
                    {intl.get('common.forgetPwd')}
                  </a>
                  <span className="jarvis-login-separator"></span>
                  <a className="jarvis-login-register" onClick={this.toRegister}>
                    {intl.get('common.register')}
                  </a>
                </div>
              </div>
            </Form>
          </Spin>
        </div>
        <div className="jarvis-login-footer">
          {intl.get('common.copyright1') + new Date().getFullYear() + intl.get('common.copyright2')}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}
const createLoginForm = Form.create()(LoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(createLoginForm);
