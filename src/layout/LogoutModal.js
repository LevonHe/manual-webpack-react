import React from 'react';
import { Button } from 'antd';
import intl from 'react-intl-universal';
import withDialog from '@/common/WithDialog';

export class DeviceUnBindAppModal extends React.Component {
  onOk = () => {
    this.props.onClose();
    this.props.onOk();
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div className="clearfix">
        <div style={{ marginBottom: '20px' }}>{intl.get('common.logoutText')}</div>
        <Button className="jarvis-modleBtn" type="primary" onClick={this.onOk}>
          {intl.get('common.confirm')}
        </Button>
        <Button className="jarvis-modleBtn" onClick={this.onClose}>
          {intl.get('common.cancel')}
        </Button>
      </div>
    );
  }
}

const withDialogDeviceUnBindAppModal = withDialog(DeviceUnBindAppModal);

export default withDialogDeviceUnBindAppModal;
