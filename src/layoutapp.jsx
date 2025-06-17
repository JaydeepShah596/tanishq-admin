import { Breadcrumb, Layout, Menu, Modal, Row, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Category from "./category/category";

const items = [
  {
    key: "1",
    label: "Dashboard",
    icon: <BsFillGridFill size={20} />,
  },
  {
    key: "2",
    label: "Category",
    icon: <BsFillGridFill size={20} />,
  },
];
const LayoutApp = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const [navigateKey, setnavigateKey] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    handleNavigation();
  }, [navigateKey]);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("register")));
  }, []);

  const handleNavigation = () => {
    if (!navigateKey.key) return;

    setLoading(true);

    setTimeout(() => {
      if (navigateKey?.key === "26") {
        setIsModalVisible(true);
      } else if (navigateKey?.key === "1") {
        navigate("/dashboard");
      } else if (navigateKey?.key === "2") {
        navigate("/category");
      }
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsModalVisible(false);
    navigate("/");
  };

  const onClick = (e) => {
    console.log("e", e);
    setnavigateKey(e);
  };

  const [loading, setLoading] = useState(false);
  return (
    <>
      <Layout style={{ minHeight: "100vh", minWidth: "100wh" }}>
        <Sider
          breakpoint="md"
          collapsedWidth="80"
          collapsible
          //   theme="light"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          onBreakpoint={(broken) => {
            console.log("Screen broken:", broken);
          }}
          width={250}
          style={{ color: "white", backgroundColor: "white" }}
        >
          {!collapsed && (
            <>
              <Row justify="center">
                <img
                  src="src/assets/logo.svg"
                  alt="Profile"
                  preview={false}
                  height={80}
                  width={180}
                  style={{
                    padding: "5px",
                  }}
                />
              </Row>
            </>
          )}
          <hr style={{ marginTop: "10%" }} />

          <Menu
            mode="inline"
            className="custom-menu"
            style={{
              borderRight: 0,
              color: "white",
              overflowY: "scroll",
              height: "550px",
              textAlign: "left",
            }}
            items={items}
            theme="light"
            onClick={(e) => onClick(e)}
          />
        </Sider>

        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {/* <Header1 /> */}
          </Header>

          <Layout
            style={{
              padding: "0 24px 24px",
              height: "100%",
            }}
          >
            <Breadcrumb
              items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
              style={{ margin: "16px 0" }}
            />
            <Content
              style={{
                padding: 24,
                margin: 0,
                // minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                overflowY: "scroll",
                height: "100px",
              }}
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/category" element={<Category />} />
                {/* <Route path="/details" element={<Details />} />
                <Route path="/allmembers" element={<AllMembers />} />
                <Route path="/" element={<Login />} /> */}
              </Routes>
            </Content>

            <Modal
              title="Confirm Logout"
              open={isModalVisible}
              onOk={handleLogout}
              onCancel={() => setIsModalVisible(false)}
              okText="Yes, Logout"
              cancelText="Cancel"
            >
              <p>Are you sure you want to log out?</p>
            </Modal>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutApp;
