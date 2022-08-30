import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { ListItem } from "../components/list-item";
import { useWeb3 } from "../contexts/web3";
import { useWallet } from "../contexts/wallet";
import { usePopup } from "../contexts/popup";

export const Resources = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [newName, setNewName] = useState('');

    const { web3 } = useWeb3();
    const { wallet } = useWallet();
    const { showPopup } = usePopup();

    useEffect(() => {
        checkWalletLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function checkWalletLogin() {
        if (!await wallet.isLogged(true, web3)) {
            navigate('/');
        }
        checkUser(wallet.getAccount());
    }

    const handleChange = event => {
        setNewName(event.target.value);
        console.log(newName);

        console.log('value is:', event.target.value);
    };

    async function checkUser(address) {
        let user = await web3.contract.methods.getUser().call({
            from: address
        });
        setName('teste');
        if (!user.instanced) {
            showPopup({
                text1: "Creating new account!",
                text2: "Insert account name:",
                onReject: () => navigate('/'),
                onAllow: async () => await addUser(address),
                hasInput: true,
                placeholder: 'Name',
                onChange: handleChange,
                value: newName
            });
        }
        setName(user.name);
    }

    async function addUser(address) {
        console.log(newName);
        await web3.contract.methods.addUser(newName).send({
            from: address
        });
    }


    return (
        <>
            <Header name={name}></Header>
            <Wrapper>
                <Center>
                    <Actions>
                        <Input img={require('../assets/search.png').default} placeholder="Search..."></Input>
                        <Button fullWidth={false}>Create Resource</Button>
                    </Actions>
                    <List>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
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