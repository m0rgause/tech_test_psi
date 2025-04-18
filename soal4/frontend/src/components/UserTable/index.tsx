"use client";
import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Avatar,
  Row,
  Col,
  Spin,
  notification,
} from "antd";
import "@ant-design/v5-patch-for-react-19";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { fetchUsers } from "@/services/userService";
import type { User } from "@/services/userService";

const UserTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const users = await fetchUsers(1, 500);
        setData(users);
        // setFilteredData(users.slice(0, pagination.pageSize));
        setPagination((prev) => ({
          ...prev,
          total: users.length,
        }));
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Gagal memuat data pengguna",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // search by name, not all fields
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // hitung daya yang akan ditampilkan berdasarkan halaman saat ini
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const paginatedData = filtered.slice(startIndex, endIndex);

    setFilteredData(paginatedData);
    setPagination((prev) => ({
      ...prev,
      total: filtered.length,
    }));
  }, [data, searchText, pagination.current, pagination.pageSize]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: "Umur",
      dataIndex: "age",
      key: "age",
      sorter: (a: User, b: User) => a.age - b.age,
    },
    {
      title: "Alamat",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telepon 1",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Telpon 2",
      dataIndex: "cell",
      key: "cell",
    },
    {
      title: "Foto",
      dataIndex: "picture",
      key: "picture",
      render: (url: string[]) => <Avatar src={url[0]} size="large" />,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Input.Search
            placeholder="Cari pengguna..."
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 300 }}
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
          />
        </Col>
      </Row>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            ...pagination,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
          rowKey={(record) => record.email} // Assuming email is unique
        />
      </Spin>
    </div>
  );
};

export default UserTable;
