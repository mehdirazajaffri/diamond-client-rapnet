import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class DefaultModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { heading, content, size, handleClose, show } = this.props;
    return (
      <Modal
        {...this.props}
        show={show}
        onHide={handleClose}
        size={size ? size : "sm"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {heading ? (
            <Modal.Title id="contained-modal-title-vcenter">
              {heading}
            </Modal.Title>
          ) : (
            ""
          )}
        </Modal.Header>
        <Modal.Body>{content ? content : ""}</Modal.Body>
      </Modal>
    );
  }
}

export default DefaultModal;
