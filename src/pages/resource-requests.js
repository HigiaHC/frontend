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
import parser from "../utils/parser";
import observationParser from "../utils/parserObservation";
import fhirApi from "../services/fhir";
import { isPatientValid } from '../utils/resources/patientValidator';
const uuid = require('uuid');

export const ResourceRequests = () => {
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
        api.get(`resources/requests/${address}`)
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

    const handleReject = (id) => {
        api.put(`resources/${id}`);

        handleHide();
        navigate('/resource-requests');
    }

    const handleAccept = async (id, description, type, from, fields) => {
        api.post(`resources/requests/created/${id}`);

        let response;

        switch (type.toLowerCase()) {
            case 'patient':
                if (!isPatientValid(fields))
                    alert('something is not working');

                const patient = parser.parsePatient(fields);
                response = await fhirApi.post(`/${type}`, patient);
                await web3.contract.methods.createReference(response.data.id, description, type, from).send({
                    from: wallet.getAccount()
                });
                navigate('/resources');
                break;
            case 'observation':
                const observation = observationParser.parseObservation(fields);
                response = await fhirApi.post(`/${observation.resourceType}`, observation);

                await web3.contract.methods.createReference(response.data.id, description, type, from).send({
                    from: wallet.getAccount()
                });
                navigate('/resources');

                break;

            case 'diagnostic':
                const dignostic = parser.parseDiagnostic(fields);
                response = await fhirApi.post(`/${dignostic.resourceType}`, dignostic);

                await web3.contract.methods.createReference(response.data.id, description, type, from).send({
                    from: wallet.getAccount()
                });
                navigate('/resources');

                break;

            default:
                alert('resource type not defined');
                break;

        }

        handleHide();
        navigate('/resource-requests');
    }

    const openAnswerPopup = (id, name, description, fields, type) => {
        showPopup({
            text1: `${name} wants to create a resource for you`,
            text2: "Do you allow?",
            onAllow: () => handleAccept(id, description, type, name, fields),
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
                                side={`From: ${request.from}`}
                                title={request.description}
                                subtitle={`Resource Type: ${request.type}`}
                                onClick={() => openAnswerPopup(
                                    request.id,
                                    request.from,
                                    request.description,
                                    request.fields,
                                    request.type
                                )}></ListItem>
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