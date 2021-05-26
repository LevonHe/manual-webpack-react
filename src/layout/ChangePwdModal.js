import React from 'react';
import { Form, Input, Button, Spin, Icon } from 'antd';
import intl from 'react-intl-universal';
import debounce from 'lodash/debounce';
import $api from '@/api/index';
import MsgService from '@/util/MsgService';
import { PASSWORD_REG } from '@/util/regExpService';
import { processFieldsValue } from '@/util/commonService';
import withDialog from '@/common/WithDialog';

const FormItem = Form.Item;
export class ChangePwdModal extends React.Component {
  state = {
    loading: false,
    oldPwdShowText: 'ciphertext',
    newPwdShowText: 'ciphertext',
    confirmPwdShowText: 'ciphertext',
  };

  componentDidMount() {
    if (!document.onmouseup) {
      document.onmouseup = (e) => {
        if (e) e.preventDefault();
        this.setState({
          oldPwdShowText: 'ciphertext',
          newPwdShowText: 'ciphertext',
          confirmPwdShowText: 'ciphertext',
        });
      };
    }
  }

  componentWillUnmount() {
    this.setState = () => {};
    document.onmouseup = null;
  }

  handleSubmit = (e) => {
    if (e) e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      processFieldsValue(fieldsValue);
      const passwordParam = {
        oldCredential: fieldsValue.oldPassword,
        newCredential: fieldsValue.newPassword,
      };
      this.onOk(passwordParam);
    });
  };

  onOk = debounce(
    (passwordParam) => {
      this.setState({
        loading: true,
      });
      $api.userApi
        .changePwd(passwordParam)
        .then((data) => {
          if (!data || !data.success) {
            MsgService.error(intl.get('common.failureUpdatePwd'));
            return;
          }
          MsgService.success(intl.get('common.successUpdatePwd'));
          this.setState(
            {
              loading: false,
            },
            () => {
              this.props.onClose();
              this.props.onOk();
            }
          );
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
          MsgService.error(err);
        });
    },
    300,
    {
      leading: true,
      trailing: false,
    }
  );

  compareToNewPwd = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      return callback(intl.get('common.pwdNotConsistent'));
    }
    callback();
  };

  onOldPwdMouseDown = (e) => {
    if (e) e.preventDefault();
    this.setState({
      oldPwdShowText: 'Plaintext',
    });
  };

  onNewPwdMouseDown = (e) => {
    if (e) e.preventDefault();
    this.setState({
      newPwdShowText: 'Plaintext',
    });
  };

  onConfirmPwdMouseDown = (e) => {
    if (e) e.preventDefault();
    this.setState({
      confirmPwdShowText: 'Plaintext',
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <Spin spinning={this.state.loading}>
        <Form className="clearfix" {...formItemLayout} onSubmit={this.handleSubmit}>
          <FormItem label={intl.get('common.oldPassword')}>
            {getFieldDecorator('oldPassword', {
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
                placeholder={intl.get('login.enterPwd')}
                suffix={
                  <Icon
                    type={this.state.oldPwdShowText === 'ciphertext' ? 'eye-invisible' : 'eye'}
                    style={{ color: 'rgba(0,0,0,.25)' }}
                    onMouseDown={this.onOldPwdMouseDown}
                  ></Icon>
                }
                type={this.state.oldPwdShowText === 'ciphertext' ? 'password' : 'text'}
              ></Input>
            )}
          </FormItem>
          <FormItem label={intl.get('common.newPassword')}>
            {getFieldDecorator('newPassword', {
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
                placeholder={intl.get('login.enterPwd')}
                suffix={
                  <Icon
                    type={this.state.newPwdShowText === 'ciphertext' ? 'eye-invisible' : 'eye'}
                    style={{ color: 'rgba(0,0,0,.25)' }}
                    onMouseDown={this.onNewPwdMouseDown}
                  ></Icon>
                }
                type={this.state.newPwdShowText === 'ciphertext' ? 'password' : 'text'}
              ></Input>
            )}
          </FormItem>
          <FormItem label={intl.get('common.confirmPassword')}>
            {getFieldDecorator('confirmPassword', {
              validateFirst: true,
              rules: [{ required: true, message: intl.get('login.enterPwd') }, { validator: this.compareToNewPwd }],
            })(
              <Input
                placeholder={intl.get('login.enterPwd')}
                suffix={
                  <Icon
                    type={this.state.confirmPwdShowText === 'ciphertext' ? 'eye-invisible' : 'eye'}
                    style={{ color: 'rgba(0,0,0,.25)' }}
                    onMouseDown={this.onConfirmPwdMouseDown}
                  ></Icon>
                }
                type={this.state.confirmPwdShowText === 'ciphertext' ? 'password' : 'text'}
              ></Input>
            )}
          </FormItem>
          <Button className="jarvis-modleBtn" type="primary" htmlType="submit">
            {intl.get('common.confirm')}
          </Button>
          <Button className="jarvis-modleBtn" onClick={this.props.onClose}>
            {intl.get('common.cancel')}
          </Button>
        </Form>
      </Spin>
    );
  }
}

const createChangePwdModal = Form.create()(ChangePwdModal);
const withDialogChangePwdModal = withDialog(createChangePwdModal);
export default withDialogChangePwdModal;
