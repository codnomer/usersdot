import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Switch yerine Routes
import { Layout } from "antd";
import "antd/dist/reset.css"; // Ant Design stil dosyası
import UsersTable from "./components/UsersTable"; // Kullanıcı listesi bileşeni
import UserForm from "./components/UserForm"; // Kullanıcı ekleme/güncelleme formu bileşeni

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{ background: "#001529", color: "#fff", textAlign: "center" }}
        >
          <h1 style={{ color: "#fff" }}>User Management System</h1>
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            {" "}
            <Route exact path="/" element={<UsersTable />} />
            <Route path="/user-form/:id?" element={<UserForm />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ömer Demirhan Usersdot Test Case
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
