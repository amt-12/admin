import React, { useState,useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import ContentOne from "./Components/ContentOne";
import ContentTwo from "./Components/ContentTwo";
import { jwtDecode } from "jwt-decode";

const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("1");

// useEffect(() => {
  const userToken = localStorage.getItem("jwtToken");
  const userRole = jwtDecode(userToken)
  const userRoleAuthenticated = userRole?.userId?.role
  console.log("userRole from localStorage", userRoleAuthenticated);
// }, [])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

const getMenuItems = () => {
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "nav 1",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "nav 2",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "nav 3",
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "nav 4",
    },
  ];
  if (userRoleAuthenticated === "admin") {
    return menuItems;
  }
  switch(userRoleAuthenticated) {
    case "user":
      return menuItems.slice(3, 4);
    // case "doctor":
    //   return menuItems.slice(2, 3);
    default:
      return [];
  }
}
const items = getMenuItems();
console.log("menu items based on user role", items);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div>
          <h1 style={{ color: "white", textAlign: "center" }}>Logo</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          onClick={(event) => {
            console.log("I just clicked menu and this i got", event);
            setKey(event?.key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {key === "1" ? (
            <ContentOne />
          ) : key === "2" ? (
            <ContentTwo />
          ) : (
            "no content Found"
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
