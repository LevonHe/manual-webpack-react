import React, { memo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const PermissionControl = (props) => {
  const { permissionNameArr, pName, children } = props;

  let hasPermission = false;

  if (Object.prototype.toString.call(pName) === '[object String]') {
    permissionNameArr.includes(pName) ? (hasPermission = true) : (hasPermission = false);
  }

  if (Object.prototype.toString.call(pName) === '[object Array]') {
    pName.every((item) => {
      if (permissionNameArr.includes(item)) {
        hasPermission = true;
        return false;
      }
      return true;
    });
  }

  return <>{permissionNameArr && permissionNameArr.length > 0 && <span>{hasPermission ? children : null}</span>}</>;
};

function mapStateToProps(state) {
  return { permissionNameArr: state.login.permissionNameArr };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(PermissionControl));
