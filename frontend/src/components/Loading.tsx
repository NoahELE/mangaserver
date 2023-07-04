import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
