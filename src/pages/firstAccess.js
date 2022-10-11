import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export const FirstAccess = () => {
  const navigate = useNavigate();
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

  const { web3 } = useWeb3();
  const { wallet } = useWallet();

  const handleSubmit = async () => {
    var response = null;
    if (formData.name === "") {
      alert('Field cannot be empty');
      return;
    }
    
    if (!isPatientValid(patientData))
        alert('something is not working');

    const patient = parser.parsePatient(patientData);
    response = await fhirApi.post(`/${patient.resourceType}`, patient);

    await web3.contract.methods.createReference(response.data.id, formData.name, formData.type, "self").send({
        from: wallet.getAccount()
    });
    navigate('/resources');
     
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
      let ignore = false;
      if (!await wallet.isLogged(true, web3)) {
        navigate('/first-access');
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
            <Input placeholder="Email" value={patientData.email} onChange={(e) => setPatientData(prev => ({ ...prev, email: e }))}></Input>
            <Input placeholder="Phone" value={patientData.phone} onChange={(e) => setPatientData(prev => ({ ...prev, phone: e }))} mask={phoneMask}></Input>
            <Input placeholder="Address" value={patientData.address} onChange={(e) => setPatientData(prev => ({ ...prev, address: e }))}></Input>
            <Input placeholder="Birth Date" value={patientData.birthDate} onChange={(e) => setPatientData(prev => ({ ...prev, birthDate: e }))} mask={dateMask}></Input>
            <StyledSelect placeholder="Select gender..." options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' }
            ]} onChange={({ value }) => setPatientData(prev => ({ ...prev, gender: value }))} />         
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