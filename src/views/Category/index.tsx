import { Space, Form, Input, Select, UploadFile } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState, useRef } from "react";
import { getAllCategory, editCategory } from "@/api/category";
import Table from "@/components/base/BaseTable";
import BaseModal from "@/components/base/BaseModal";
import BaseForm from "@/components/base/BaseForm";
import BaseUpload from "@/components/baseItems/BaseUpload";
import "./Category.scss";
import BaseTitle from "@/components/base/BaseTitle";
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

const Category = () => {
  // 表格逻辑开始
  const [cateState, setCateState]: any = useState({
    list: [],
  });

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
      title: "父分类ID",
      dataIndex: "cate_id",
      key: "cate_id",
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
      if (res.data) {
        cateState.list = [...res.data];
        setCateState({ list: [...cateState.list] });
        console.log("setCateList", cateState);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDate();
  }, []);

  // 表格逻辑结束

  // 表单逻辑开始
  const [fileListState, setFileListState] = useState<UploadFile[]>([]);
  const [modalState, setModalState] = useState<any>({
    id: undefined,
    open: false,
    loading: false,
  });
  const [form] = Form.useForm();

  const uploadChange = (fileList: UploadFile[]) => {
    if (!fileList || fileList.length === 0) {
      form.setFieldsValue({
        img: "",
      });
      return;
    }
    const arr = fileList.map((item) =>
      item.url ? item.url : item.response.url
    )[0];
    form.setFieldsValue({
      img: arr,
    });
  };

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
      component: () => {
        return (
          <Select placeholder="请选择所属分类" allowClear>
            {cateState.list.map((item: any) => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        );
      },
    },
    {
      label: "缩略图",
      name: "img",
      // attrs: {
      //   rules: [{ message: "请上传缩略图!" }],
      // },
      shouldUpdate: true,
      component: () => {
        console.log("upload fileList", fileListState);
        return (
          <BaseUpload
            multiple={true}
            fileList={infoRef.current}
            onChange={uploadChange}
          />
        );
      },
    },
  ]);

  const infoRef: any = useRef();
  useEffect(() => {
    infoRef.current = fileListState;
  }, [fileListState]);

  const openModal = async (record: DataType) => {
    fileListState.splice(0, fileListState.length);
    record.img &&
      fileListState.push({
        uid: "-1",
        name: "xxx",
        status: "done",
        url: record.img,
      });
    setFileListState([...fileListState]);
    setModalState({
      open: true,
      loading: true,
    });
    modalState.id = record.id;
    await setTimeout(() => {}); // 延迟赋值

    setModalState({
      ...modalState,
      open: true,
      loading: false,
    });
    form.setFieldsValue({
      name: record.name,
      alias: record.alias,
      cate_id: record.cate_id,
      img: record.img,
    });
  };

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
  const onCancel = () => {
    onReset();
    setModalState({
      open: false,
      loading: true,
    });
  };

  const onOk = async () => {
    const validated = await form.validateFields();
    console.log("modalState", modalState);

    const res = await editCategory({ ...validated, id: modalState.id });
    if (res.status > 0) {
      return;
    }
    console.log("onFinish res", res);
    onCancel();

    getDate();
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <BaseTitle title="分类" />
      <Table<DataType>
        dataSource={cateState.list}
        columns={columns}
        rowKey={(record) => record.id}
        height="100%"
      />
      <BaseModal
        title={modalState.id ? "编辑分类" : "新增分类"}
        width={800}
        open={modalState.open}
        onOk={onOk}
        onCancel={onCancel}
        cancelText="Cancel"
        okText="Confim"
      >
        {
          <BaseForm
            form={form}
            fields={formFields}
            loading={modalState.loading}
            tailLayout={tailLayout}
            formAttrs={{
              // ref: formRef,
              form,
              ...layout,
              name: "control-hooks",
            }}
          ></BaseForm>
        }
      </BaseModal>
    </>
  );
};
export default Category;
