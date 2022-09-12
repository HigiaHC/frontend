import React from "react";
import styled from "styled-components";

export const ListItem = ({ side, title, subtitle, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <TextGroup>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </TextGroup>
      <Text>{side}</Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #DCDFE2;
  border-radius: 30px;

  padding: 32px 72px;
`

const Text = styled.div`
  font-style: italic;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.2em;
`

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`