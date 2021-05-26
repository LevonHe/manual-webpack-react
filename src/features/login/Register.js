import React from 'react';
import { Form, Button, Input, Spin, Icon, Checkbox, Tabs, Dropdown, Menu } from 'antd';
import intl from 'react-intl-universal';
import debounce from 'lodash/debounce';
import $api from '@/api/index';
import { PASSWORD_REG, TELEPHONE_REG, VERIFICATION_CODE_REG, EMAIL_REG } from '@/util/regExpService';
import MsgService from '@/util/MsgService';
import { processFieldsValue } from '@/util/commonService';
import JarvisBrowserNotSupportTip from '@/common/JarvisBrowserNotSupportTip';
import CookieService from '@/util/CookieService';

export class RegisterForm extends React.Component {
  state = {
    loading: false,
    isReadAndAgree: true,
    isClickVerificationCode: false,
    time: 0,
    activeKey: 'phoneNumber',
    showText: 'ciphertext',
  };

  componentWillUnmount() {
    this.setState = () => {};
    document.onmouseup = null;
  }

  handleRegister = (e) => {
    if (e) e.preventDefault();
    if (!this.state.isReadAndAgree) {
      return;
    }
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      processFieldsValue(fieldsValue);
      let registerParam = {};
      if (this.state.activeKey === 'phoneNumber') {
        registerParam = {
          phoneNumber: fieldsValue.phoneNumber,
          verificationCode: fieldsValue.verificationCode,
          credential: fieldsValue.credential,
        };
      } else {
        registerParam = {
          email: fieldsValue.email,
          verificationCode: fieldsValue.verificationCode,
          credential: fieldsValue.credential,
        };
      }
      this.register(registerParam);
    });
  };

  register = debounce(
    (registerParam) => {
      if (!registerParam) {
        return;
      }

      this.setState({
        loading: true,
      });
      $api.userApi
        .register(registerParam)
        .then((data) => {
          if (!data) {
            return;
          }
          MsgService.success(intl.get('register.registerSuccess'));
          this.props.history.push('/login');
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

  queryVerificationCode = () => {
    const { form } = this.props;
    form.validateFields([this.state.activeKey], (err) => {
      if (err) return;
      let param = {};
      if (this.state.activeKey === 'phoneNumber') {
        const phoneNumber = form.getFieldValue('phoneNumber');
        param = {
          phoneNumber,
        };
      } else {
        const email = form.getFieldValue('email');
        param = {
          email,
        };
      }
      if (this.state.isClickVerificationCode) {
        return;
      }
      $api.userApi
        .getVerificationCode(param)
        .then((data) => {
          if (!data || !data.success) {
            return;
          }
          let time = 60;
          this.setState(
            {
              isClickVerificationCode: true,
              time,
            },
            () => {
              let timer = null;
              const _this = this;
              timer = setInterval(() => {
                time -= 1;
                _this.setState({
                  time,
                });
                if (time === 0) {
                  clearInterval(timer);
                  _this.setState({
                    isClickVerificationCode: false,
                  });
                }
              }, 1000);
            }
          );
        })
        .catch((err) => {
          MsgService.error(err);
        });
    });
  };

  onCheckboxChange = (e) => {
    this.setState({
      isReadAndAgree: e.target.checked,
    });
  };

  toLogin = debounce(
    () => {
      const { history } = this.props;
      history.push('/login');
    },
    300,
    {
      leading: true,
      trailing: false,
    }
  );

  onTabChange = (activeKey) => {
    this.props.form.resetFields();
    this.setState({
      activeKey,
      isClickVerificationCode: false,
      time: 0,
    });
  };

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
    const { TabPane } = Tabs;
    const languageMenu = (
      <Menu onClick={this.changeLocale}>
        <Menu.Item key="zh-CN">{intl.get('common.zh_CN')}</Menu.Item>
        <Menu.Item key="en-US">{intl.get('common.en_US')}</Menu.Item>
      </Menu>
    );
    return (
      <div className="jarvis-register-bg clearfix">
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
        <div className="jarvis-register-container">
          <Spin spinning={this.state.loading}>
            <Form className="jarvis-register-form" layout="vertical" onSubmit={this.handleRegister}>
              <Tabs defaultActiveKey={this.state.activeKey} onChange={this.onTabChange}>
                <TabPane tab={intl.get('register.phoneNumberRegister')} key="phoneNumber">
                  {this.state.activeKey === 'phoneNumber' && (
                    <div className="mt-10">
                      <Form.Item>
                        {getFieldDecorator('phoneNumber', {
                          validateFirst: true,
                          rules: [
                            { required: true, message: intl.get('user.placeholder.phoneNumber') },
                            {
                              pattern: TELEPHONE_REG,
                              message: intl.get('user.invalid.phoneNumber'),
                            },
                          ],
                        })(
                          <Input
                            placeholder={intl.get('user.placeholder.phoneNumber')}
                            className="jarvis-register-button"
                          ></Input>
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('verificationCode', {
                          validateFirst: true,
                          rules: [
                            { required: true, message: intl.get('register.enterVerificationCode') },
                            {
                              pattern: VERIFICATION_CODE_REG,
                              message: intl.get('register.verificationCodeInvaid'),
                            },
                          ],
                        })(
                          <Input
                            suffix={
                              <a onClick={this.queryVerificationCode}>
                                {this.state.isClickVerificationCode
                                  ? intl.get('register.resend', { 0: this.state.time })
                                  : intl.get('register.getVerificationCode')}
                              </a>
                            }
                            placeholder={intl.get('register.enterVerificationCode')}
                            className="jarvis-register-button"
                            maxLength={6}
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
                            suffix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}></Icon>}
                            placeholder={intl.get('login.password')}
                            className="jarvis-register-button"
                            autoComplete="new-password"
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
                    </div>
                  )}
                </TabPane>
                <TabPane tab={intl.get('register.emailRegister')} key="email">
                  {this.state.activeKey === 'email' && (
                    <div className="mt-10">
                      <Form.Item>
                        {getFieldDecorator('email', {
                          validateFirst: true,
                          rules: [
                            { required: true, message: intl.get('user.placeholder.email') },
                            {
                              pattern: EMAIL_REG,
                              message: intl.get('user.invalid.email'),
                            },
                          ],
                        })(
                          <Input
                            placeholder={intl.get('user.placeholder.email')}
                            className="jarvis-register-button"
                            maxLength={64}
                          ></Input>
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator('verificationCode', {
                          validateFirst: true,
                          rules: [
                            { required: true, message: intl.get('register.enterVerificationCode') },
                            {
                              pattern: VERIFICATION_CODE_REG,
                              message: intl.get('register.verificationCodeInvaid'),
                            },
                          ],
                        })(
                          <Input
                            suffix={
                              <a onClick={this.queryVerificationCode}>
                                {this.state.isClickVerificationCode
                                  ? intl.get('register.resend', { 0: this.state.time })
                                  : intl.get('register.getVerificationCode')}
                              </a>
                            }
                            placeholder={intl.get('register.enterVerificationCode')}
                            className="jarvis-register-button"
                            maxLength={6}
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
                            suffix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}></Icon>}
                            placeholder={intl.get('login.password')}
                            className="jarvis-register-button"
                            autoComplete="new-password"
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
                    </div>
                  )}
                </TabPane>
              </Tabs>

              <Button className="jarvis-register-button" type="primary" htmlType="submit">
                {intl.get('common.registerNow')}
              </Button>
              <div className="jarvis-register-form-footer">
                {/* <Checkbox onChange={this.onCheckboxChange} defaultChecked className="jarvis-register-checkbox">
                  {intl.get('common.readAndAgreed')}
                  <a>{'《' + intl.get('common.userAgreement') + '》'}</a>
                </Checkbox> */}
                <div className="pull-right">
                  <span className="jarvis-register-accountExisted">{intl.get('register.accountExisted')}? </span>
                  <a className="jarvis-register-login" onClick={this.toLogin}>
                    {intl.get('common.login')}
                  </a>
                </div>
              </div>
            </Form>
          </Spin>
        </div>
        <div className="jarvis-register-footer">
          {intl.get('common.copyright1') + new Date().getFullYear() + intl.get('common.copyright2')}
        </div>
      </div>
    );
  }
}

const createRegisterForm = Form.create()(RegisterForm);
export default createRegisterForm;
