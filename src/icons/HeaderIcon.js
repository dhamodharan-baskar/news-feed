import React from "react";
import styled from "styled-components";

const HeaderIcon = props => {
  return (
    <div>
      <Line />
      <Line />
      <Line />
    </div>
  );
};

export default HeaderIcon;

const Line = styled.div`
    width: 32px;
    height: 4px;
    border-radius: 4px;
    background-color: rgb(235, 239, 243);
    margin: 4px;
`