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
import {
  editCategory,
  deleteCategory,
  batchDeleteCategory,
} from "@/api/category";

import {
  getArticleList,
  addArticle,
  editArticle
} from "@/api/article";

import React, { useEffect, useState, useRef } from "react";
import { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import BaseTable from "@/components/base/BaseTable";
import BaseModal from "@/components/base/BaseModal";
import BaseForm from "@/components/base/BaseForm";
import BaseUpload from "@/components/baseItems/BaseUpload";
import RichText from "@/components/baseItems/RichText";
import BaseTitle from "@/components/base/BaseTitle";
import "./Category.scss";
interface DataType {
  id: string;
  title: string;
  content: string;
  description: number;
  articlePic: string;
  // categoryId: number;
}

const Category = () => {
  const routerParam = useParams();

  useEffect(() => {
    getDate();
  }, [routerParam.id]);

  // 表格逻辑开始
  const [articleListState, setarticleListState]: any = useState({
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
      title: "父分类ID",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "articlePic",
      key: "articlePic",
      dataIndex: "articlePic",
      render: (_, { articlePic }) => (
        <>
          <img width={50} src={articlePic} alt="" />
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
  const getDate = async (id = routerParam.id) => {
    try {
      const res = await getArticleList({categoryId: id});
      if (res.data) {
        articleListState.list = [...res.data];
        setarticleListState({ list: [...articleListState.list] });
      }
    } catch (error) {}
  };
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
        articlePic: "",
      });
      return;
    }
    const arr = fileList.map((item) =>
      item.url ? item.url : item.response.url
    )[0];
    form.setFieldsValue({
      articlePic: arr,
    });
  };

  const contentChange = (content:string)=>{
    console.log('contentChange',content);
    
    form.setFieldsValue({
      content: content,
    });
  }

  const [formFields, setFormFields] = useState([
    {
      label: "标题",
      name: "title",
      attrs: { rules: [{ required: true, message: "请输入!" }] },
      component: <Input allowClear placeholder="请输入标题" />,
    },
    {
      label: "描述",
      name: "description",
      attrs: { rules: [{ required: true, message: "请输入!" }] },
      component: <Input allowClear placeholder="请输入描述" />,
    },
    {
      label: "缩略图",
      name: "articlePic",
      // attrs: {
      //   rules: [{ message: "请上传缩略图!" }],
      // },
      component: () => {
        return (
          <BaseUpload
            multiple={true}
            fileList={infoRef.current}
            onChange={uploadChange}
          />
        );
      },
    },
    {
      label: "内容",
      name: "content",
      attrs: { rules: [{ required: true, message: "请输入!" }] },
      component:  () => {
        return (
          <RichText
            content={form.getFieldValue('content')}
            onChange={contentChange}
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
    record.articlePic &&
      fileListState.push({
        uid: "-1",
        name: "xxx",
        status: "done",
        url: record.articlePic,
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
      description: record.description,
      content: record.content,
      articlePic: record.articlePic,
    });
    console.log('form',form.getFieldValue('content'));
    
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
      ? editArticle({ ...validated, id: modalState.id,categoryId: Number(routerParam.id) })
      : addArticle({ ...validated,categoryId: Number(routerParam.id) }));
    if (res.status > 0) {
      return;
    } else {
      console.log("onFinish res", res);
      onCancel();
      getDate();
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

      getDate();
    }
  };
  const batchDelete = async () => {
    const res: any = await batchDeleteCategory({ ids: checkedIdList });
    if (res.status > 0) {
      return;
    } else {
      message.success(res.message);
      getDate();
    }
  };
  const [checkedIdList, setCheckedIdList] = useState<React.Key[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setCheckedIdList(selectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      // disabled: String(record.id) === '18', // Column configuration not to be checked
      name: record.id,
    }),
  };
  return (
    <>
      <BaseTitle title="文章">
        <Button type="primary" ghost onClick={() => openModal()}>
          add
        </Button>
      </BaseTitle>
      <BaseTable<DataType>
        rowSelection={{
          ...rowSelection,
        }}
        dataSource={articleListState.list}
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
            <Button type="primary" disabled={checkedIdList.length == 0}>
              批量删除
            </Button>
          </Popconfirm>
        </Space>
      </BaseTable>
      <BaseModal
        title={modalState.id ? "编辑文章" : "新增文章"}
        width={'100%'}
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
