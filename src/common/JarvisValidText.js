import React from 'react';

export default class JarvisValidText extends React.PureComponent {
  render() {
    const { text } = this.props;
    return (
      <span className="jarvis-valid-text">
        <span className="jarvis-valid-text-item">{text}</span>
      </span>
    );
  }
}
