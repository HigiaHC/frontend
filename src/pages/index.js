import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "../components/button";
import { usePopup } from "../contexts/popup";
import { Wallet } from "../services/wallet";

export const Homepage = () => {
  const { showPopup } = usePopup()

  useEffect(() => {
    showPopup({
      text1: "Hello",
      text2: "test",
      onAllow: () => console.log("allow")
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function walletLogin() {
    let wallet = new Wallet();
    wallet.login();
  }

  return (
    <Wrapper>
      <Title>
        <Welcome>Bem-vindo à plataforma</Welcome>
        <Logo src={require('../assets/logo.png')}></Logo>
      </Title>
      <LoginOptions>
        <Option>
          <Icon src={require('../assets/user.png')}></Icon>
          <Button onClick={walletLogin}>Sou Paciente</Button>
        </Option>
        <Divider></Divider>
        <Option>
          <Icon src={require('../assets/doctor.png')}></Icon>
          <Button>Sou Profissional</Button>
        </Option>
      </LoginOptions>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 72px;

  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Welcome = styled.h1`
  font-style: italic;
  font-weight: 800;
  font-size: 36px;
  line-height: 42px;
  text-align: right;
  letter-spacing: 0.2em;
`

const Logo = styled.img``

const LoginOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 160px;
`

const Divider = styled.div`
  height: 435px;
  width: 1px;

  background-color: black;
`

const Option = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 40px;
`

const Icon = styled.img``
