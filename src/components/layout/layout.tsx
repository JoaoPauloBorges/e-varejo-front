import { Layout, Menu, Row } from 'antd';
import SearchBox from 'components/searchBox';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce, useDebouncedCallback } from 'use-debounce/lib';
import LogoSrc from '../../assets/mmartam.png';

const { Header, Content } = Layout;

const Cabecalho: FC<{ onChangeSearchBox: (input: string) => void }> = ({ onChangeSearchBox }) => {
  return (
    <>
      <Row justify="space-between" align="middle" style={{ width: '100%' }}>
        <div style={{ minWidth: '40%', maxWidth: '40%', display: 'inline-flex' }}>
          <div style={{ minWidth: '100px', maxWidth: '100px', margin: '0 8px' }}>
            <Link to="/">
              <img src={LogoSrc} alt="logo da empresa (mmartam)" style={{ maxWidth: '100%' }} />
            </Link>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              Produtos
              <Link to="/products" />
            </Menu.Item>
            <Menu.Item key="2">
              Cadastro
              <Link to="/create" />
            </Menu.Item>
          </Menu>
        </div>
        <div style={{ minWidth: '35%', display: 'flex' }}>
          <SearchBox onChange={onChangeSearchBox} />
        </div>
      </Row>
    </>
  );
};

interface PropsContent {
  titleHeader: string;
  children: React.ReactNode;
}

const ContentLayout: FC<PropsContent> = ({ titleHeader, children }) => {
  const [pageName, setPageName] = useState('');

  const onChangeSearchBox = useDebouncedCallback((value) => setPageName(value), 1000);

  useEffect(() => {
    setPageName(titleHeader);
  }, [titleHeader]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header" color="light">
        <Cabecalho onChangeSearchBox={onChangeSearchBox} />
      </Header>
      <Row
        style={{
          padding: '0 50px',
          height: '64px',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#e0e0e0',
        }}
      >
        <div>
          <p>{pageName}</p>
        </div>
      </Row>
      <Content
        style={{
          padding: '0 50px',
          margin: 0,
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default ContentLayout;
