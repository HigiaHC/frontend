import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { ListItem } from "../components/list-item";
import { useWeb3 } from "../contexts/web3";
import { useWallet } from "../contexts/wallet";
import { usePopup } from "../contexts/popup";
import { unixToDate } from "../utils/date";

export const Resources = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [newName, setNewName] = useState('');
    const [references, setReferences] = useState([]);

    const { web3 } = useWeb3();
    const { wallet } = useWallet();
    const { showPopup, handleHide } = usePopup();

    const addUser = useCallback(async (address) => {
        await web3.contract.methods.addUser(newName).send({
            from: address
        });
        navigate('/resources');
    }, [newName]);

    const handleReject = () => {
        alert('You need to choose a name');
        navigate('/resources');
    }

    const checkUser = useCallback(async (address) => {
        let user = await web3.contract.methods.getUser().call({
            from: address
        });

        if (!user.instanced) {
            showPopup({
                text1: "Creating new account!",
                text2: "Insert account name:",
                onAllow: () => addUser(address),
                onReject: () => handleReject(),
                hasInput: true,
                onChange: (value) => setNewName(value),
                placeholder: 'Name'
            });
        }
        setName(user.name);
    }, [newName]);

    const loadReferences = async (address) => {
        let references = await web3.contract.methods.listReferences().call({
            from: address
        });

        setReferences(references);
    }

    useEffect(() => {
        const checkWalletLogin = async () => {
            if (!await wallet.isLogged(true, web3)) {
                navigate('/');
            }
            checkUser(wallet.getAccount());
            loadReferences(wallet.getAccount());
        }
        checkWalletLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [checkUser]);
    // addUser('jdskjdf');


    return (
        <>
            <Header name={name}></Header>
            <Wrapper>
                <Center>
                    <Actions>
                        <Input img={require('../assets/search.png').default} placeholder="Search..."></Input>
                        <Button fullWidth={false} onClick={() => navigate('/new')}>Create Resource</Button>
                    </Actions>
                    <List>
                        {references.map(reference =>
                            <ListItem key={reference.id} side={`Date: ${unixToDate(reference.date)}`} title={reference.name} subtitle={`Type: ${reference.resourceType}`}></ListItem>
                        )}
                        {/* <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem>
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
                        <ListItem date="22/08/2022" title="Resource 1" subtitle="Type: Patient"></ListItem> */}
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