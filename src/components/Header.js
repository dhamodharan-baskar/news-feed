import React from "react";
import styled from "styled-components";

const Header = props => {
  return (
    <FeedContent>header</FeedContent>
  );
};

export default Header;

const FeedContent = styled.div`
    width: 100%;
    height:50px; 
    border: 1px solid black;
    background-color: #000;
    position: fixed;
`