/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Space } from "antd";
import React from "react";

const BaseTitle: React.FC<any> = (props) => {
  return (
    <>
      <div css={styles}>
        <Space size={"middle"}>
          <h2 className="title">{props.title}</h2>
          <div className="base-title-wrap">{props.children}</div>
        </Space>
      </div>
    </>
  );
};

export default BaseTitle;
const styles = css`
  display: flex;
  text-align: left;
  margin-top: -72px;
  border-top: 20px solid #f0f2f5;
  border-bottom: 20px solid #f0f2f5;
  .title {
    font-weight: bold;
    font-size: 20px;
  }
`;
