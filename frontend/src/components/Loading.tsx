import { Spin } from 'antd';
import { type ReactElement } from 'react';
import styles from './Loading.module.css';

export default function Loading(): ReactElement {
  return (
    <div className={styles.loading}>
      <Spin size="large" />
    </div>
  );
}
