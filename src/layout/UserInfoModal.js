import React from 'react';
import { Form, Button } from 'antd';
import intl from 'react-intl-universal';
import withDialog from '@/common/WithDialog';

export class UserInfoModal extends React.Component {
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
    const { userInfo } = this.props.winData;
    return (
      <Form className="clearfix" {...formItemLayout}>
        <Form.Item label={intl.get('common.username')}>
          <span className="jarvis-span-input">{userInfo.indentity || '--'}</span>
        </Form.Item>
        <Form.Item label={intl.get('common.role')}>
          <span className="jarvis-span-input">{userInfo.roleName || '--'}</span>
        </Form.Item>
        <Form.Item label={intl.get('common.email')}>
          <span className="jarvis-span-input">{userInfo.email || '--'}</span>
        </Form.Item>
        <Form.Item label={intl.get('common.phone')}>
          <span className="jarvis-span-input">{userInfo.phoneNumber || '--'}</span>
        </Form.Item>
        <Button className="jarvis-modleBtn" type="primary" onClick={this.props.onClose}>
          {intl.get('common.confirm')}
        </Button>
      </Form>
    );
  }
}
const createUserInfoModal = Form.create()(UserInfoModal);
const withDialogUserInfoModal = withDialog(createUserInfoModal);
export default withDialogUserInfoModal;
