import React from 'react';
import { Icon } from 'antd';
import intl from 'react-intl-universal';
import Doc from '@/util/globalSwitch';

export default class JarvisDocCard extends React.PureComponent {
  handleClick = () => {
    // window.open(Doc.jarvisDocUrl, '_blank');
    const docWindow = window.open();
    docWindow.opener = null;
    docWindow.location = Doc.jarvisDocUrl;
    docWindow.target = '_blank';
  };

  render() {
    return (
      <div className="jarvis-doc-card clearfix" onClick={this.handleClick}>
        <Icon type="file-text" className="jarvis-icon vertical-middle" />
        <span className="vertical-middle">{intl.get('common.userManual')}</span>
      </div>
    );
  }
}
