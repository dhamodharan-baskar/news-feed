import React from "react";
import styled from "styled-components";
import Modal from 'react-modal';
const customStyles = {
  overlay: {
    backgroundColor: "rgba(18,52,77,0.58)",
    zIndex: 3000,
    transition: "opacity 250ms"
  },
  content: {
    top: "0%%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: "visible",
    borderRadius: "0 0 6px 6px",
    boxShadow: "0 0 0 1px rgba(24,50,71,0.1), 0 1px 4px 0 rgba(24,50,71,0.15), 0 6px 14px 0 rgba(24,50,71,0.05)",
    marginRight: "-50%",
    padding: "0",
    transform: "translate(-50%, 0)",
    border: 0,
  }
};
const ConfirmationModal = props => {
  return (
        <Modal
          ariaHideApp={false}
          isOpen={props.isOpen}
          style={customStyles}
          onRequestClose={props.onRequestClose}>
            <ModalOverview>
              <ModalContent>
                Are you sure do you want to delete this Message ?
              </ModalContent>
              <Footer>
                <CancelButton type="submit" onClick={() => props.onRequestClose()}>Cancel</CancelButton>
                <DeleteButton type="submit" onClick={() => props.onSubmit()}>Delete</DeleteButton>
              </Footer>
            </ModalOverview>
        </Modal>
  );
};

export default ConfirmationModal;

const ModalOverview = styled.div`
   
`
const ModalContent = styled.div`
    padding: 24px;
    font-size: 14px;
    color: #12344D;
`
const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    border-radius: 0 0 6px 6px;
    background: #f5f7f9;
    width: 100% !important;
    justify-content: flex-end !important;
`
const DeleteButton = styled.button`
    margin: 12px;
    margin-left: 0px;
    border: 1px solid #C82124;
    border-radius: 4px;
    width: auto;
    font-weight: 600;
    padding: 0 10px;
    position: relative;
    text-align: center;
    color: #FFFFFF;
    font-size: 14px;
    opacity: 1;
    cursor: pointer;
    height: 32px;
    background: linear-gradient(
    180deg
    ,#D72D30 0%,#C82124 100%);
`
const CancelButton = styled.button`
    margin: 12px;
    cursor: pointer;
    border: 1px solid #CFD7DF;
    border-radius: 4px;
    box-shadow: 0 0 white;
    width: auto;
    font-weight: 600;
    padding: 0 10px;
    position: relative;
    text-align: center;
    color: #12344D;
    font-size: 14px;
    opacity: 1;
    height: 32px;
    background: linear-gradient(180deg,#FFFFFF 0%,#F3F5F7 100%);
`