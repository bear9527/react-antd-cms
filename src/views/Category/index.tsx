import {
  Space,
  Upload,
  Switch,
  Form,
  Input,
  Select,
  Modal,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState, useRef } from "react";
import { getAllCategory, editCategory } from "@/api/category";
import Table from "@/components/base/Table";
import BaseModal from "@/components/base/BaseModal";
import BaseForm from "@/components/base/BaseForm";
import BaseUpload from "@/components/baseItems/BaseUpload";
const { Option } = Select;

interface DataType {
  id: string;
  title: string;
  alias: string;
  name: string;
  description: number;
  img: string;
  cate_id: number;
}

const data: DataType[] = [];
const Category = () => {
  // 表格逻辑开始
  const [cateList, setCateList] = useState([]);

  // 表格列
  const columns: ColumnsType<DataType> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "alias",
      key: "alias",
    },
    {
      title: "img",
      key: "img",
      dataIndex: "img",
      render: (_, { img }) => (
        <>
          <img width={50} src={img} alt="" />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openModal(record)}>Invite {record.title}</a>
          <a onClick={() => deleteCol(record)}>Delete</a>
        </Space>
      ),
    },
  ];
  const getDate = async () => {
    try {
      const res = await getAllCategory();
      console.log("getAllCategory", res.data);
      if (!res.status) {
        setCateList(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDate();
  }, []);

  // 表格逻辑结束

  // 表单逻辑开始
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "xxx.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const [modalState, setModalState] = useState({
    open: false,
  });
  const [oldData, setOldData] = useState({});
  const [form] = Form.useForm();

  const uploadChange = (fileList: UploadFile[]) => {
    if (!fileList || fileList.length === 0) {
      return;
    }
    form.setFieldsValue({
      img: fileList.map((item) => (item.url ? item.url : item.response.url))[0],
    });
  };
  const upload = (
    <BaseUpload
      multiple={true}
      fileList={fileList}
      onChange={uploadChange}
      maxCount={2}
    />
  );
  const select = (
    <Select placeholder="请选择所属分类" allowClear>
      {cateList.map((item: any) => {
        return (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        );
      })}
    </Select>
  );
  const [formFields, setFormFields] = useState([
    {
      label: "标题",
      name: "name",
      attrs: { rules: [{ required: true, message: "请输入!" }] },
      component: <Input allowClear placeholder="请输入标题" />,
    },
    {
      label: "描述",
      name: "alias",
      attrs: { rules: [{ required: true, message: "请输入!" }] },
      component: <Input allowClear placeholder="请输入描述" />,
    },
    {
      label: "所属分类",
      name: "cate_id",
      attrs: {
        rules: [{ required: true, message: "请选择所属分类!" }],
      },
      // component: null,
      component: select,
    },
    {
      label: "缩略图",
      name: "img",
      attrs: {
        rules: [{ message: "请上传缩略图!" }],
      },
      // component: null,
      component: upload,
    },
  ]);
  const openModal = (record: DataType) => {
    console.log("openModal", record);
    setModalState({
      open: true,
    });
    form.setFieldsValue({
      name: record.name,
      alias: record.alias,
      cate_id: record.cate_id,
      img: record.img,
    });
    setOldData({
      id: record.id,
    })
  };
  useEffect(() => {
    formFields[2].component = select;
    // formFields[3].component = upload;
    setFormFields([...formFields]);
    // }, [modalState.open, fileList]);
  }, [cateList]);

  const deleteCol = (record: DataType) => {
    console.log("deleteCol", record);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };
  const onOk = async () => {
    const validated = await form.validateFields();
    console.log("onFinish validated", validated);
    console.log("onFinish form", );
    
    const res = await editCategory({...oldData,...validated});
    if(res.status < 1){}
    console.log("onFinish res", res);
  };
  const onCancel = (a: any) => {
    // onReset()
    console.log("a", a);
    setModalState({
      open: false,
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  return (
    <>
      <Table<DataType>
        dataSource={cateList}
        columns={columns}
        rowKey={(record) => record.id}
        height="100%"
      />
      <BaseModal
        title="编辑分类"
        width={800}
        open={modalState.open}
        onOk={onOk}
        onCancel={onCancel}
        cancelText="Cancel"
        okText="Confim"
      >
        <BaseForm
          form={form}
          fields={formFields}
          tailLayout={tailLayout}
          formAttrs={{
            // ref: formRef,
            form,
            ...layout,
            name: "control-hooks",
          }}
        ></BaseForm>
      </BaseModal>
    </>
  );
};
export default Category;
