
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";

const BaseTitle: React.FC<any> = (props) => {
  return (
    <>
      <div css={styles}>
        <h2 className="title">{props.title}</h2>
        <div className="base-title-wrap">{props.children}</div>
      </div>
    </>
  );
};

export default BaseTitle;
const styles = css`
  width: calc( 100% + 48px);
  margin-left: -24px;
  margin-top: -24px;
  border-top:20px solid #f0f2f5;
  border-bottom:20px solid #f0f2f5;
  .title{
    padding-left: 24px;
    font-size: 20px;
  }
  
`;