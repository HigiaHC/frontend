import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from 'react-select';
import ReactJson from "react-json-view";
import styled from "styled-components";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { dateMask, hourMask, phoneMask } from "../utils/mask";
import { useWeb3 } from "../contexts/web3";
import { useWallet } from "../contexts/wallet";
import parser from "../utils/parser";
import observationParser from "../utils/parserObservation";
import fhirApi from "../services/fhir";
import { isPatientValid } from '../utils/resources/patientValidator';

export const NewReference = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    type: ""
  })

  const [patientData, setPatientData] = useState({
    name: "",
    active: true,
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    gender: ""
  })

  const [observationData, setObservationData] = useState({
    code: {
      text: ""
    },
    performer: {
      display: ""
    },
    subject: {
      reference: ""
    },
    issued: "",
    note: [{text: ""}],
    interpretation: {
      text: ""
    },
  })

  const { web3 } = useWeb3();
  const { wallet } = useWallet();

  const handleSubmit = async () => {
    var response = null;
    if (formData.name === "") {
      alert('Field cannot be empty');
      return;
    }

    switch (formData.type.toLowerCase()) {
        case 'observation':
          observationData.subject.reference = `Patient/${location.state.patientId}`;
          observationData.issued = new Date().toISOString().slice(0, 18);
          observationData.performer.display = patientData.name;

          response = await fhirApi.post('/Observation', observationData);

          await web3.contract.methods.createReference(response.data.id, formData.name, formData.type, "self").send({
            from: wallet.getAccount()
          });
          navigate('/resources');
  
          break;

      default:
        alert('resource type not defined');
        break;
    }
  }

  const checkUser = async (address) => {
    let user = await web3.contract.methods.getUser().call({
      from: address
    });

    if (!user.instanced) {
      navigate('/first-access');
    }
    setName(user.name);
    setPatientData(prev => ({ ...prev, name: user.name }))
  }

  useEffect(() => {
    const checkWalletLogin = async () => {
      if (!await wallet.isLogged(true, web3)) {
        navigate('/');
      }
      checkUser(wallet.getAccount());
    }
    checkWalletLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkUser]);

  return (
    <>
      <Header name={name}></Header>
      <Wrapper>
        <Center>
          <Input placeholder="Name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e }))}></Input>
          {<StyledSelect placeholder="Select Resource type..." options={[
            { value: 'Observation', label: 'Observation' }
          ]} onChange={({ value }) => setFormData(prev => ({ ...prev, type: value }))} />}
          <hr></hr>
          {formData.type === 'Observation' && <>
            <Input placeholder="Symptons" value={observationData.code.text} onChange={(e) => setObservationData(prev => ({ ...prev, code: { text: e } }))}></Input>
            <Input placeholder="Note" value={observationData.note[0].text} onChange={(e) => setObservationData(prev => ({ ...prev, note: [{text: e}] }))}></Input>
            <Input placeholder="Interpretation" value={observationData.interpretation.text} onChange={(e) => setObservationData(prev => ({ ...prev, interpretation: {text: e} }))}></Input> 
          </>}
          <ButtonWrapper>
            <Button onClick={async () => handleSubmit()} fullWidth={false}>Create Resource</Button>
          </ButtonWrapper>
        </Center>
      </Wrapper>
    </>
  )
}

const StyledSelect = styled(Select)`
  width: 400px;
  height: 32px;


  color: #000000;
  font-weight: 400;
`

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 200px;
`

const Center = styled.div`
  width: 968px;

  display: flex;
  flex-direction: column;
  gap: 32px;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`