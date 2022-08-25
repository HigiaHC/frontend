import React from "react";
import styled from "styled-components";

export const Button = ({ children, onClick, fullWidth = true, outline = false }) => {
  return (
    <Wrapper outline={outline} fullWidth={fullWidth} onClick={onClick}>{children}</Wrapper>
  )
}

const Wrapper = styled.div`
  width: ${props => props.fullWidth ? '280px' : 'fit-content'};
  text-align: center;
  padding: 8px 16px;

  border-radius: 4px;

  background-color: ${props => !props.outline ? '#F48B20' : 'transparent'} ;
  border: ${props => props.outline ? '1px solid #000' : 'none'};
  color: ${props => props.outline ? 'black' : 'white'};
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  text-transform: uppercase;

  cursor: pointer;
`