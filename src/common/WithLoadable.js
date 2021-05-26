import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import intl from 'react-intl-universal';

const Loading = () => (
  <div className="jarvis-loading">
    <Spin tip={intl.get('common.loading')} size="large"></Spin>
  </div>
);

export function SuspenseComponent(component) {
  const Component = lazy(component);
  return (props) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
}
