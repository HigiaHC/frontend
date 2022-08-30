import React from "react";
import styled from "styled-components";

import { Button } from "./button";
import { Input } from "./input";

export const Popup = ({ text1, text2, onReject, onAllow, hasInput, placeholder, onChange, value }) => {
  return (
    <Wrapper>
      <Text>{text1}</Text>
      <Text>{text2}</Text>

      {hasInput ?
        <Input
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          type='text'
        ></Input> : <></>}

      <ButtonGroup>
        <Button outline onClick={onReject}>Reject</Button>
        <Button onClick={onAllow}>Allow</Button>
      </ButtonGroup>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;

  max-width: 480px;

  bottom: 24px;
  right: 24px;

  z-index: 999;

  background: #DCDFE2;
  border: 1px solid #000000;
  border-radius: 30px;

  padding: 48px 72px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const Text = styled.div`
  font-style: italic;
  font-weight: 800;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.2em;
`;

const ButtonGroup = styled.div`
  width: 100%;

  display: flex;
  gap: 24px;
`;
