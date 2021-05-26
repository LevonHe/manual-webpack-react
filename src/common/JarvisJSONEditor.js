import React from 'react';
import ReactAce from 'react-ace-editor';

export default class JSONSEditor extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.ace &&
      this.ace.editor &&
      this.ace.editor.getValue() &&
      this.ace.editor.getValue() === nextProps.jsonValue
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    if (!this.ace) {
      return;
    }
    const { editor } = this.ace;
    if (prevProps.jsonValue === this.props.jsonValue) {
      return;
    }
    editor.setValue(this.props.jsonValue || '');
  }

  onJsonChange = () => {
    if (this.ace) {
      const editor = this.ace.editor;
      const jsonValue = editor.getValue();
      this.props.changeJsonValue(jsonValue);
    }
  };

  onRef = (instance) => {
    this.ace = instance;
    if (!instance) {
      return;
    }
    this.ace.editor.$blockScrolling = Infinity;
  };

  render() {
    const { width, height, readOnly } = this.props;
    return (
      <div
        className={readOnly ? 'jarvis-json-box-readonly' : 'jarvis-json-box'}
        style={{ width: width || '100%', height: height || '120px' }}
      >
        <ReactAce
          mode="json"
          theme="eclipse"
          style={{ height: '100%', width: '100%', borderRadius: '4px', opacity: readOnly ? '0.5' : '1' }}
          onChange={this.onJsonChange}
          setReadOnly={readOnly}
          ref={this.onRef}
        ></ReactAce>
      </div>
    );
  }
}
