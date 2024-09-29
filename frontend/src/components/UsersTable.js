import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Pagination,
  Modal,
  Row,
  Col,
  Select,
} from "antd";
import axios from "axios";
import UserForm from "./UserForm"; // Import UserForm for modal usage

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Track the current user for editing
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize, setPageSize] = useState(10); // Page size state
  const [totalUsers, setTotalUsers] = useState(0); // Total users state

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?page=${currentPage}&pageSize=${pageSize}&search=${searchTerm}`
      );
      setUsers(response.data.data);
      setTotalUsers(response.data.total); // Toplam kullanıcı sayısını set et
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Kullanıcı ID'sine göre kullanıcı bilgilerini al
  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setCurrentUser(response.data); // Kullanıcı bilgilerini state'e kaydet
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleEdit = (user) => {
    fetchUserById(user.id);
    //setCurrentUser(user); // Kullanıcı bilgilerini al
    setIsModalVisible(true); // Modalı göster
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
    fetchUsers();
  };

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };
  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <Input
            placeholder="Search by name or surname"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={users}
        rowKey="id"
        columns={[
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Surname", dataIndex: "surname", key: "surname" },
          {
            title: "Actions",
            render: (text, record) => (
              <Button onClick={() => handleEdit(record)}>Edit</Button>
            ),
          },
        ]}
        pagination={false}
      />

      {/* Pagination Component */}
      <Row justify="space-between" align="middle" style={{ marginTop: 20 }}>
        <Col>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalUsers}
            onChange={onPageChange}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} users`
            } // Toplam kaç veri olduğunu göstermek için
          />
        </Col>
        <Col>
          <Select
            defaultValue={pageSize}
            style={{ width: 120, marginLeft: 20 }}
            onChange={handlePageSizeChange}
          >
            <Select.Option value={5}>5</Select.Option>
            <Select.Option value={10}>10</Select.Option>
            <Select.Option value={20}>20</Select.Option>
            <Select.Option value={50}>50</Select.Option>
          </Select>
        </Col>
      </Row>

      <Modal
        title={currentUser ? "Edit User" : "Add User"}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <UserForm user={currentUser} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default UsersTable;
