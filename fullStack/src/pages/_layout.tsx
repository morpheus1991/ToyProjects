import React, { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
// import Foote

const Layout: FC = () => {
  return (
    <div>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
