import React from 'react';
import { Row, Col, Icon } from 'antd';
import intl from 'react-intl-universal';

const DashboardCard = (props) => {
  const { card, image, toView, toEdit, toRename, toDelete } = props;

  const toview = toView || function view0() {};
  const toedit = toEdit || function edit0() {};
  const torename = toRename || function edit0() {};
  const todelete = toDelete || function delete0() {};

  return (
    <div className="dashboard-card-container">
      <div className="top">
        <a>
          {image && (
            <img style={{ width: '100%', height: '100%' }} src={image} className="preview-image" alt="preview image" />
          )}
        </a>
      </div>
      <p className="middle">{card.name}</p>
      <div className="bottom">
        <Row>
          <Col span={6}>
            <a className="jarvis-a-btn" onClick={() => toview(card)}>
              <Icon type="eye" className="dashboard-btn" />
              {intl.get('common.preview')}
            </a>
          </Col>
          <Col span={6}>
            <a className="jarvis-a-btn" onClick={() => toedit(card)}>
              <Icon type="edit" className="dashboard-btn" />
              {intl.get('common.edit')}
            </a>
          </Col>
          <Col span={6}>
            <a className="jarvis-a-btn" onClick={() => torename(card)}>
              <Icon type="form" className="dashboard-btn" />
              {intl.get('common.rename')}
            </a>
          </Col>
          <Col span={6}>
            <a className="jarvis-a-btn" onClick={() => todelete(card)}>
              <Icon type="delete" className="dashboard-btn" />
              {intl.get('common.delete')}
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default DashboardCard;
