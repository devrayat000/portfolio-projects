import { LoadingOverlay } from "@mantine/core";
import { Suspense } from "react";

interface LazyProps {
  element: JSX.Element;
}

const Lazy: React.FC<LazyProps> = ({ element }) => {
  return <Suspense fallback={<LoadingOverlay visible />}>{element}</Suspense>;
};

export default Lazy;
