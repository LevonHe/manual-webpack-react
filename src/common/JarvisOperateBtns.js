import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class JarvisOperateBtns extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) === JSON.stringify(nextProps)) {
      return false;
    }
    return true;
  }

  render() {
    const { number, btns, record, permissionNameArr } = this.props;
    if (!btns || btns.length === 0) {
      return null;
    }
    let currentNumber = 2;
    if (Object.prototype.toString.call(number) === '[object Number]') {
      currentNumber = number;
    }
    let newBtns = btns.filter((item) => item.visible);
    if (permissionNameArr && permissionNameArr.length > 0) {
      newBtns = newBtns.filter((item) => {
        if (item.pName) {
          let hasPermission = false;

          if (Object.prototype.toString.call(item.pName) === '[object String]') {
            permissionNameArr.includes(item.pName) ? (hasPermission = true) : (hasPermission = false);
          }

          if (Object.prototype.toString.call(item.pName) === '[object Array]') {
            item.pName.every((item) => {
              if (permissionNameArr.includes(item)) {
                hasPermission = true;
                return false;
              }
              return true;
            });
          }
          return hasPermission;
        }
        return true;
      });
    }
    if (newBtns.length === 0) {
      return null;
    }
    let currentBtns = [];
    let dropdownBtns = [];
    currentBtns = newBtns.slice(0, currentNumber);
    if (currentNumber < newBtns.length) {
      dropdownBtns = newBtns.slice(currentNumber);
    }
    return (
      <>
        {currentBtns.length > 0 &&
          currentBtns.map((cur) => (
            <a key={cur.text} onClick={() => cur.click(record)} className={cur.className || 'jarvis-op-a-btn'}>
              {cur.text}
            </a>
          ))}
        {dropdownBtns.length > 0 && (
          <Dropdown
            trigger={['click']}
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
            overlay={
              <Menu>
                {dropdownBtns.map((drop) => (
                  <Menu.Item key={drop.text}>
                    <a onClick={() => drop.click(record)} className={drop.className || 'jarvis-op-a-btn'}>
                      {drop.text}
                    </a>
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <a className="jarvis-op-a-btn">
              <Icon type="ellipsis" />
            </a>
          </Dropdown>
        )}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(JarvisOperateBtns);
