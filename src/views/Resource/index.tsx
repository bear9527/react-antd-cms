import {
  Space,
  Form,
  Input,
  Select,
  UploadFile,
  Button,
  Popconfirm,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState, useRef } from "react";
import {
  getAllCategory,
  editCategory,
  addCategory,
  deleteCategory,
  batchDeleteCategory,
} from "@/api/category";
import BaseTable from "@/components/base/BaseTable";
import BaseModal from "@/components/base/BaseModal";
import BaseForm from "@/components/base/BaseForm";
import BaseUpload from "@/components/baseItems/BaseUpload";
import "./Resource.scss";
import BaseTitle from "@/components/base/BaseTitle";
import { useDispatch, useSelector } from "react-redux";
import { getTopCateList } from "../../store/modules/categoryStore";

interface DataType {
  id: string;
  title: string;
  alias: string;
  // name: string;
  description: number;
  img: string;
  cate_id: number;
}

const Resource = () => {
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
      dataIndex: "title",
      key: "title",
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
          <a onClick={() => openModal(record)}>Invite</a>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => deleteCol(record)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  const getDate = async () => {
    try {
      const res = await getAllCategory({
        cate_id: 0
      });
      if (res.data) {
        cateState.list = [...res.data];
        setCateState({ list: [...cateState.list] });
        console.log("setCateList", cateState);
      }
    } catch (error) {}
  };
  const { categoryList } = useSelector((state: any) => state.categoryStore);
  const dispatch = useDispatch();

  useEffect(() => {
    // getDate();
    dispatch(getTopCateList() as any)
    console.log('categoryList',categoryList);
    setCateState({ list: [...categoryList] });
  }, [dispatch]);
  // const getCateListHandler = () => {
  //   dispatch(getTopCateList());
  // };


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
      name: "title",
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
      label: "缩略图",
      name: "img",
      // attrs: {
      //   rules: [{ message: "请上传缩略图!" }],
      // },
      shouldUpdate: true,
      component: () => {
        console.log("upload fileList", fileListState);
        console.log("upload infoRef.current", infoRef.current);
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
  }, [fileListState, modalState.open]);

  const openModal = async (record?: DataType) => {
    fileListState.splice(0, fileListState.length);
    setModalState({
      open: true,
      loading: true,
    });
    if (!record) {
      console.log("empty");
      setFileListState([...fileListState]);
      await setTimeout(() => {}); // 延迟赋值
      setModalState({
        open: true,
        loading: false,
      });
      return;
    }
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
      title: record.title,
      alias: record.alias,
      cate_id: 0,
      img: record.img,
    });
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
    const res: any = await (modalState.id
      ? editCategory({ ...validated, id: modalState.id })
      : addCategory({ ...validated }));
    if (res.status > 0) {
      return;
    } else {
      console.log("onFinish res", res);
      onCancel();
      // getDate();
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  const deleteCol = async (record: any) => {
    const res: any = await deleteCategory(record.id);
    if (res.status > 0) {
      return;
    } else {
      message.success("delete succss");

      // getDate();
    }
  };
  const batchDelete = async () => {
    const res: any = await batchDeleteCategory({ ids: checkedIdList });
    if (res.status > 0) {
      return;
    } else {
      message.success(res.message);
      // getDate();
    }
  };
  // rowSelection object indicates the need for row selection
  // 表单逻辑开始
  const [checkedIdList, setCheckedIdList] = useState<React.Key[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${typeof selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setCheckedIdList(selectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      // disabled: String(record.id) === '18', // Column configuration not to be checked
      name: record.id,
    }),
  };
  return (
    <>
      <BaseTitle title="资源分类">
        {/* <button onClick={()=>clickHandler()}></button> */}
        <Button type="primary" ghost onClick={() => openModal()}>
          add
        </Button>
      </BaseTitle>
      <BaseTable<DataType>
        rowSelection={{
          ...rowSelection,
        }}
        dataSource={cateState.list}
        columns={columns}
        rowKey={(record) => record.id}
        height="100%"
      >
        <Space size={"small"}>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => batchDelete()}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" disabled={checkedIdList.length == 0}>批量删除</Button>
          </Popconfirm>
        </Space>
      </BaseTable>
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

export default Resource;
