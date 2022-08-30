import React from "react";
import styled from "styled-components";
import { Button } from "./button";

export const Header = ({ name }) => {
  return (
    <Wrapper>
      <Center>
        <Logo src={require('../assets/logo.png').default}></Logo>
        <Menu>
          <MenuItem>
            <MenuIcon src={require('../assets/login.png').default}></MenuIcon>
            {name}
          </MenuItem>
          <Button fullWidth={false}>Logout</Button>
        </Menu>
      </Center>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;

  width: 100%;
  height: 121px;

  background-color: #DCDFE2;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

const Center = styled.div`
  width: 968px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.img`
  height: 72px;
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
`

const MenuIcon = styled.img``