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
import api from "../services/api";
const uuid = require('uuid');

export const Requests = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [requests, setRequests] = useState([]);

    const { web3 } = useWeb3();
    const { wallet } = useWallet();
    const { showPopup, handleHide } = usePopup();

    const checkUser = useCallback(async (address) => {
        let user = await web3.contract.methods.getUser().call({
            from: address
        });

        if (!user.instanced) {
            navigate('/resources');
        }
        setName(user.name);
    }, []);

    const loadRequests = async (address) => {
        api.get(`requests/${address}`)
            .then(response => {
                console.log(address)
                setRequests(response.data)
            })
    }

    useEffect(() => {
        const checkWalletLogin = async () => {
            if (!await wallet.isLogged(true, web3)) {
                navigate('/');
            }
            checkUser(wallet.getAccount());
            loadRequests(wallet.getAccount());
        }
        checkWalletLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [checkUser]);
    // addUser('jdskjdf');

    const handleReject = (id) => {
        api.post('requests/answer', {
            id: id,
            answer: false
        });

        handleHide();
        navigate('/requests');
    }

    const handleAccept = async (id) => {
        let token = uuid.v4();
        console.log(token);
        api.post('requests/answer', {
            id: id,
            answer: true,
            token: token
        });

        await web3.contract.methods.createToken(token).send({
            from: wallet.getAccount()
        })

        handleHide();
        navigate('/requests');
    }

    const openAnswerPopup = (id, name) => {
        showPopup({
            text1: `${name} wants to read and write resources for you`,
            text2: "Do you allow?",
            onAllow: () => handleAccept(id),
            onReject: () => handleReject(id),
            hasInput: false
        });
    }


    return (
        <>
            <Header name={name}></Header>
            <Wrapper>
                <Center>
                    <Actions>
                        <Input img={require('../assets/search.png').default} placeholder="Search..."></Input>
                        <Button fullWidth={false} onClick={() => navigate('/resources')}>Resources</Button>
                    </Actions>
                    <List>
                        {requests.map(request =>
                            <ListItem
                                key={request.id}
                                side={`Situation: ${request.accepted}`}
                                title={request.description}
                                subtitle={`From: ${request.name}`}
                                onClick={() => openAnswerPopup(request.id, request.name)}></ListItem>
                        )}
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