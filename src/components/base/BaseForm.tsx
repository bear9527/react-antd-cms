import { Space, Tag, Switch, Form, Input, Select, Button } from "antd";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const BaseModal: React.FC<any> = (props) => {
  return (
    <>
      {!props.loading ? (
        <Form {...props.formAttrs}>
          {props.fields.map((item: any, index: number) => {
            return (
              <Form.Item
                {...item.attrs}
                name={item.name}
                label={item.label}
                key={item.name}
                shouldUpdate={item.shouldUpdate}
              >
                {/* {item.component}/ */}
                {typeof item.component == "function"
                  ? item.component()
                  : item.component}
              </Form.Item>
            );
          })}
        </Form>
      ) : (
        <div className="loading-wrap">
          <LoadingOutlined />
        </div>
      )}
    </>
  );
};

export default BaseModal;
