import { Loader } from "@mantine/core";
import { Suspense } from "react";

export const Loading = () => {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <Loader size="lg" color="#F06445" />
    </div>
  );
};

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

  // Set the display name for easier identification in React DevTools
  const componentName = Component.displayName || Component.name || "Component";
  LoadableComponent.displayName = `Loadable(${componentName})`;

  return LoadableComponent;
};

export default Loadable;
