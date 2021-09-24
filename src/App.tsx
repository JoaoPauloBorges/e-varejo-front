import { ConfigProvider } from 'antd';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.less';
import pt_BR from 'antd/es/locale/pt_BR';
import Routes from 'routes';

const App: FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider locale={pt_BR} />
      <Routes/>
    </BrowserRouter>
  );
};

export default App;
