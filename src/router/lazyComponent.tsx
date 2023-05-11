// import GlobalLoading from '@main/components/global-loading/global-loading';
import React, { LazyExoticComponent } from 'react';

export const LazyImportComponent = (props: {
  lazyChildren: LazyExoticComponent<() => JSX.Element>;
}) => {
  return (
    <React.Suspense fallback={<>loading。。。</>}>
      <props.lazyChildren />
    </React.Suspense>
  );
};