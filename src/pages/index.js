import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/button";
// import { usePopup } from "../contexts/popup";
import { useWallet } from "../contexts/wallet";

export const Homepage = () => {
  const navigate = useNavigate();

  const { wallet } = useWallet();

  useEffect(() => {
    checkWalletLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkWalletLogin() {
    if (await wallet.isLogged()) {
      navigate('/resources');
    }
  }

  async function walletLogin() {
    if (await wallet.login())
      navigate('/resources');
  }

  return (
    <Wrapper>
      <Title>
        <Welcome>Bem-vindo à plataforma</Welcome>
        <Logo src={require('../assets/logo.png').default}></Logo>
      </Title>
      <LoginOptions>
        <Option>
          <Icon src={require('../assets/user.png').default}></Icon>
          <Button onClick={walletLogin}>Entrar</Button>
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
