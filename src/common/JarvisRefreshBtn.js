import React, { memo } from 'react';
import { Icon } from 'antd';

const JarvisRefreshBtn = (props) => (
  <div className="jarvis-refresh-container" onClick={props.onClick}>
    <Icon className="jarvis-refresh-btn" type="redo" />
  </div>
);

export default memo(JarvisRefreshBtn);
