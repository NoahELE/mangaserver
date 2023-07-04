import { Outlet } from 'react-router-dom';
import TopMenu from '../components/TopMenu';

export default function RootView() {
  return (
    <>
      <TopMenu />
      <Outlet />
    </>
  );
}
