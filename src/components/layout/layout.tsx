import { Layout, Menu, Row } from "antd";
import SearchBox from "components/searchBox";
import React, { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce/lib";
import LogoSrc from "../../assets/mmartam.png";
import { PageName } from "./styles";

const { Header, Content } = Layout;

const Cabecalho: FC = () => {
  return (
    <>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <div
          style={{ minWidth: "40%", maxWidth: "40%", display: "inline-flex" }}
        >
          <div
            style={{ minWidth: "100px", maxWidth: "100px", margin: "0 8px" }}
          >
            <Link to="/">
              <img
                src={LogoSrc}
                alt="logo da empresa (mmartam)"
                style={{ maxWidth: "100%" }}
              />
            </Link>
          </div>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
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
        <div style={{ minWidth: "35%", display: "flex" }}>
          <SearchBox />
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
  const location = useLocation();
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    setPageName(titleHeader);
  }, [titleHeader]);

  useEffect(() => {
    const params = location.search.split("q=")?.[1];
    setPageName(params || titleHeader);
  }, [location.search, titleHeader]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="header"
        style={{
          background: "white",
          boxShadow: "0px 3px 6px 9px rgba(0,0,0,0.33)",
        }}
      >
        <Cabecalho />
      </Header>
      <Row
        style={{
          padding: "0 50px",
          height: "10vh",
          minHeight: "80px",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#e0e0e0",
        }}
      >
        <PageName>{pageName}</PageName>
      </Row>
      <Content
        style={{
          padding: "0 50px",
          margin: "20px 5%",
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default ContentLayout;
