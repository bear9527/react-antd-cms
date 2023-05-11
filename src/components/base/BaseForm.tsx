import { Space, Tag, Switch, Form, Input, Select, Button } from "antd";
import React, { useEffect, useState } from "react";

const BaseModal: React.FC<any> = (props) => {
  return (
    <>
      <Form {...props.formAttrs}>
        {props.fields.map((item: any, index: number) => {
          return (
            <Form.Item
              {...item.attrs}
              name={item.name}
              label={item.label}
              key={item.name}
            >
              {item.component}
            </Form.Item>
          );
        })}
      </Form>
    </>
  );
};

export default BaseModal;
