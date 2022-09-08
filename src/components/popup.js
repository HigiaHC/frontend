import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Button } from "./button";
import { Input } from "./input";

export const Popup = ({ text1, text2, onReject, onAllow, hasInput, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue]);

  return (
    <>
      <Backdrop></Backdrop>
      <Wrapper>
        <Text>{text1}</Text>
        <Text>{text2}</Text>

        {hasInput && <Input value={inputValue} placeholder={placeholder} onChange={(event) => setInputValue(event)}></Input>}

        <ButtonGroup>
          <Button outline onClick={onReject}>Reject</Button>
          <Button onClick={onAllow}>Allow</Button>
        </ButtonGroup>
      </Wrapper>
    </>
  )
}

const Backdrop = styled.div`
  position: fixed;

  margin: 0;
  padding: 0;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  z-index: 998;

  background-color: #000000CC;
`

const Wrapper = styled.div`
  position: fixed;

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
