import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import './App.css';
import AppRoutes from 'AppRoutes';
const queryCache = new QueryCache()

const App: React.FC = () => (
  <>
    <div className="App">
      <ReactQueryCacheProvider queryCache={queryCache}>
        <AppRoutes />
      </ReactQueryCacheProvider>
    </div>
    <ReactQueryDevtools initialIsOpen />
  </>
);

export default App;
