import React from "react";
import styled from "styled-components";
import HeaderIcon from "../icons/HeaderIcon.js"

const Header = props => {
  return (
    <FeedContent>
      <HeaderIcon />
      <Title>Header</Title>
    </FeedContent>
  );
};

export default Header;

const FeedContent = styled.div`
    width: 100%;
    height:50px; 
    background-color: #2c5cc5;
    position: fixed;
    z-index: 999;
    display: flex;
    align-items: center;
    padding: 0px 24px;
`
const Title = styled.h4` 
    color: rgb(235, 239, 243);
    margin: 0px 12px;
`
