import { Spin } from 'antd';
import { type ReactElement } from 'react';

export default function Loading(): ReactElement {
  return (
    <div className="inset-0 absolute flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
}
