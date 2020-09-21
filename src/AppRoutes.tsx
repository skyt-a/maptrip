import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const Map = lazy(() => import('./containers/pages/Map'));

const AppRoutes: React.FC<unknown> = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  </Suspense>
);

export default AppRoutes;
