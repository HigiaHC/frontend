import React from "react";
import styled from "styled-components";

export const Input = ({ label, placeholder, type, value, onChange, img, onClick }) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <InputField placeholder={placeholder} type={type} value={value} onChange={onChange}></InputField>
      {img && <Icon onClick={onClick} src={img}></Icon>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
`

const Label = styled.div``

const InputField = styled.input`
  width: 400px;
  height: 32px;

  border: 1px solid #515961;
  border-radius: 4px;

  padding: 8px 16px;
`

const Icon = styled.img`
  width: 16px;
  height: 16px;

  position: absolute;
  bottom: 8px;
  right: 8px;

  cursor: pointer;
`