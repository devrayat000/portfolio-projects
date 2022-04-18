import { LoadingOverlay } from "@mantine/core";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const LazyRoute = () => {
  return (
    <Suspense fallback={<LoadingOverlay visible />}>
      <Outlet />
    </Suspense>
  );
};

export default LazyRoute;
