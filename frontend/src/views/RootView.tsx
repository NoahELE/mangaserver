import { type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import TopMenu from '../components/TopMenu';

export default function RootView(): ReactElement {
  return (
    <>
      <TopMenu />
      <Outlet />
    </>
  );
}
