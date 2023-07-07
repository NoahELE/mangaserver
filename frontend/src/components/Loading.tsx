import { Spin } from 'antd';
import { type ReactElement } from 'react';

export default function Loading(): ReactElement {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
