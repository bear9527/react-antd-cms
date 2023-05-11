import { Button, Modal } from "antd";
import React, { useState } from "react";

const BaseModal: React.FC<any> = (props) => {
  return (
    <>
      <Modal
        title="Basic Modal"
        {...props}
      >
        <div className="base-modal-wrap">{props.children}</div>
      </Modal>
    </>
  );
};

export default BaseModal;
