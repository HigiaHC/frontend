import React from "react";
import styled from "styled-components";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { ListItem } from "../components/list-item";

export const Listing = () => {
  return (
    <>
      <Header></Header>
      <Wrapper>
        <Center>
          <Actions>
            <Input img={require('../assets/search.png')} placeholder="Search..."></Input>
            <Button fullWidth={false}>Create Resource</Button>
          </Actions>
          <List>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
            <ListItem side="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
          </List>
        </Center>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 200px;
`

const Center = styled.div`
  width: 968px;
`

const Actions = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 24px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-bottom: 40px;
`