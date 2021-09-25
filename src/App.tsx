import { ConfigProvider } from 'antd';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.less';
import pt_BR from 'antd/lib/locale/pt_BR';
import Routes from 'routes';

const App: FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider locale={pt_BR}>
        <Routes />
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
