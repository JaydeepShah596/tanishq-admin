import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Table,
  Typography,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
const { Title } = Typography;

const Category = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [categorylist, setCategorylist] = useState([]);
  const [count, setCount] = useState(0);

  const addcategory = async (values) => {
    try {
      const newcategory = {
        id: Math.floor(Math.random() * (999 - 100 + 1)).toString(),
        ...values,
        date: moment().format("LLL"),
      };
      const response = await fetch("http://localhost:3000/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newcategory),
      });
      if (!response.ok) throw new Error("Falif to New Members");
      setCount((prevCount) => prevCount + 1);
      fetchcategory();
      setIsModalOpen(false);
      form.resetFields();
      message.success("Customer added successfully!");
      console.log("Category", newcategory);
    } catch (error) {
      console.log("Error adding newmember:", error);
    }
  };

  useEffect(() => {
    fetchcategory;
  }, [count]);

  const fetchcategory = async () => {
    try {
      const response = await fetch("http://localhost:3000/category");
      console.log("respone", response);

      const data = await response.json();
      setCategorylist(data);
      //   setOriginalList(data);
      console.log("CategoryList", categorylist);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => `${index + 1}`,
      // width: 50,
      onHeaderCell: () => {
        return {
          style: { backgroundColor: "#15427d", color: "#fff" },
        };
      },
    },
    {
      title: "Category Name",
      dataIndex: "category",
      key: "category",
      // width: 100,
      onHeaderCell: () => {
        return {
          style: { backgroundColor: "#15427d", color: "#fff" },
        };
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      // width: 80,
      onHeaderCell: () => {
        return {
          style: { backgroundColor: "#15427d", color: "#fff" },
        };
      },
      render: (_, selectedTask) => {
        return (
          <>
            <RiEdit2Fill
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("Edit Clicked", selectedTask?.id);
                if (!selectedTask?.id) {
                  console.error("Selected task is undefined or invalid.");
                  return;
                }
                // console.log("Edit Clicked: ", selectedTask?.id);
                // showModalEdite(selectedTask?.id);
                // setselectedTask(selectedTask?.id);
              }}
            />
            <MdDelete
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("Delete Clicked", selectedTask?.id);
                // setselectedTask(selectedTask?.id);
                // showModal2(selectedTask?.id);
              }}
            />
          </>
        );
      },
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Title
                level={4}
                style={{ textAlign: "start", fontWeight: "600" }}
              >
                All Members
              </Title>
            </Col>

            <Col
              xs={24}
              md={12}
              style={{
                gap: "10px",
                display: "flex",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              {/* <Search
                id="standard-basic"
                label="Search"
                variant="outlined"
                placeholder="Search Your members"
                onChange={handleFilter}
                value={sortdata}
                style={{
                  marginTop: "1%",
                  flex: "1 1 200px",
                  // height: "30px",
                  padding: "15px",
                  // width: "300px",
                }}
              /> */}
              <Button
                style={{
                  marginTop: "20px",
                  background: "#15427d",
                  color: "white",
                }}
                onClick={showModal}
              >
                <FaPlus /> Add
              </Button>
            </Col>
          </Row>

          <Modal
            title="Add Category"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            // width={1200}
          >
            <Form
              form={form}
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              layout="horizontal"
              style={{
                maxWidth: "100vw",
                marginTop: "30px",
              }}
              onFinish={addcategory}
            >
              {/* name & role */}
              {/* <Form.Item style={{ marginTop: "4%" }}> */}
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please enter category" }]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 18px)",
                  margin: "0 8px",
                }}
              >
                <Input
                  placeholder="Enter Your category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Item>
              {/* </Form.Item> */}

              <Row
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                  marginTop: "5%",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    background: "#15427d",
                    color: "white",
                  }}
                >
                  Add Category
                </Button>
                <Button
                  onClick={handleCancel}
                  style={{ background: "green", color: "white" }}
                >
                  Cancel
                </Button>
              </Row>
            </Form>
          </Modal>

          <Row>
            <Col span={24}>
              <Table
                style={{ marginTop: "20px" }}
                columns={columns}
                dataSource={categorylist}
                bordered
                size="middle"
                pagination
                // scroll={{ x: "calc(700px + 50%)", y: 80 * 5 }}
              ></Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Category;
