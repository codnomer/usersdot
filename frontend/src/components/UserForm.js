import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const UserForm = ({ user, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user); // Set form fields to user data if editing
    } else {
      form.resetFields(); // Reset fields if adding a new user
    }
  }, [user, form]);

  const onFinish = async (values) => {
    try {
      if (user) {
        await axios.post(`http://localhost:3000/users/update`, {
          ...values,
          id: user.id,
        });
      } else {
        await axios.post("http://localhost:3000/users/save", values);
      }
      onClose(); // Close the modal after submission
    } catch (error) {
      // Enhanced error logging
      if (error.response) {
        console.error("Error saving user:", error.response.data); // Log specific error response
      } else {
        console.error("Error saving user:", error.message); // Log generic error message
      }
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="surname" label="Surname" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password" // Added password field
        label="Password"
        rules={[{ required: true, min: 6 }]} // Example rule for minimum length
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="phone" label="Phone">
        <Input />
      </Form.Item>
      <Form.Item name="age" label="Age">
        <Input />
      </Form.Item>
      <Form.Item name="country" label="Country">
        <Input />
      </Form.Item>
      <Form.Item name="district" label="District">
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        {user ? "Update User" : "Add User"}
      </Button>
    </Form>
  );
};

export default UserForm;
