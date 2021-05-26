import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tooltip, Icon, Button } from 'antd';

export class JarvisCreateHeader extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (
      JSON.stringify(this.props.createHeader) === JSON.stringify(nextProps.createHeader) &&
      JSON.stringify(this.props.permissionNameArr) === JSON.stringify(nextProps.permissionNameArr)
    ) {
      return false;
    }
    return true;
  }

  render() {
    const { permissionNameArr } = this.props;
    const { header, btns } = this.props.createHeader;
    return (
      <div className="jarvis-create-header clearfix">
        <div className="jarvis-create-left pull-left">
          <span className="jarvis-create-title">{header.title}</span>
          {header.helpTip ? (
            <Tooltip title={header.helpTip.content} placement={header.helpTip.position || 'top'} mouseEnterDelay={0.5}>
              <Icon type="question-circle" theme="filled" />
            </Tooltip>
          ) : (
            ''
          )}
        </div>
        {permissionNameArr && permissionNameArr.length > 0 && (
          <div className="jarvis-create-right pull-right">
            {btns && btns.length > 0
              ? btns.map((btn, idx) => (
                  <Button
                    className="jarvis-create-btn"
                    key={idx}
                    type="primary"
                    onClick={btn.click}
                    disabled={btn.pName && !permissionNameArr.includes(btn.pName)}
                  >
                    <Icon type="plus" />
                    {btn.text}
                  </Button>
                ))
              : ''}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { permissionNameArr: state.login.permissionNameArr };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JarvisCreateHeader);
