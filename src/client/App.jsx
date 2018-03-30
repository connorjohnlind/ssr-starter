import React from 'react';
import { renderRoutes } from 'react-router-config';

import Header from './components/Header';
import './App.scss';

const App = ({ route }) => {
  return (
    <div className="App">
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App
};
