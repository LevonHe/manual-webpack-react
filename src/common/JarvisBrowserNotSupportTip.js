import React from 'react';
import intl from 'react-intl-universal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import { getBrowserType } from '@/util/commonService';
import * as actions from '@/store/modules/login/_actions';

export class JarvisBrowserNotSupportTip extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.login.browserTip === nextProps.login.browserTip) {
      return false;
    }
    return true;
  }

  handleClose = () => {
    this.props.actions.browserTip(false);
  };

  render() {
    const { browserTip } = this.props.login;

    let showTag = false;
    const { type: browserType, version: browserVersion } = getBrowserType();
    if (browserType === 'Chrome' && browserVersion < 69) {
      showTag = true;
    }
    if (browserType === 'Firefox' && browserVersion < 47) {
      showTag = true;
    }
    if (browserType === 'IE' && browserVersion < 11) {
      showTag = true;
    }
    return browserTip && showTag ? (
      <Tag className="browser-not-support-tag" color="orange" closable onClose={this.handleClose}>
        {intl.get('common.browserNotSupportTip')}
      </Tag>
    ) : null;
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

export default connect(mapStateToProps, mapDispatchToProps)(JarvisBrowserNotSupportTip);
