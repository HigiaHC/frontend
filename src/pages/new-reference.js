import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import ReactJson from "react-json-view";
import styled from "styled-components";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { dateMask, phoneMask } from "../utils/mask";
import { useWeb3 } from "../contexts/web3";
import { useWallet } from "../contexts/wallet";
import parser from "../utils/parser"
import fhirApi from "../services/fhir";

export const NewReference = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    type: "Patient"
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
    console.log(formData)
    console.log(patientData)

    if (formData.name === "") {
      alert('Field cannot be empty');
      return;
    }

    console.log(wallet.getAccount())
    if (formData.type === 'Patient') {
      const patient = parser.parsePatient(patientData);

      const response = await fhirApi.post(`/${patient.resourceType}`, patient);
  
      await web3.contract.methods.createReference(response.data.id, formData.name, formData.type).send({
        from: wallet.getAccount()
      });
      navigate('/resources');
    }
  }

  const checkUser = async (address) => {
    let user = await web3.contract.methods.getUser().call({
      from: address
    });

    // console.log(user);

    if (!user.instanced) {
      navigate('/');
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
          <Input placeholder="Resource Name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e }))}></Input>
          {/* <SelectWrapper>
            <Select placeholder="Select Resource type..." options={[
              { value: 'Patient', label: 'Patient' },
              { value: 'Observation', label: 'Observation' }
            ]} onChange={({ value }) => setFormData(prev => ({ ...prev, type: value }))} />
          </SelectWrapper> */}
          <hr></hr>
          {formData.type === 'Patient' && <>
            <Input placeholder="Email" value={patientData.email} onChange={(e) => setPatientData(prev => ({ ...prev, email: e }))}></Input>
            <Input placeholder="Phone" value={patientData.phone} onChange={(e) => setPatientData(prev => ({ ...prev, phone: e }))} mask={phoneMask}></Input>
            <Input placeholder="Address" value={patientData.address} onChange={(e) => setPatientData(prev => ({ ...prev, address: e }))}></Input>
            <Input placeholder="Birth Date" value={patientData.birthDate} onChange={(e) => setPatientData(prev => ({ ...prev, birthDate: e }))} mask={dateMask}></Input>
            {/* <SelectWrapper>
              <Select placeholder="Select gender..." options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' }
              ]} onChange={({ value }) => setPatientData(prev => ({ ...prev, gender: value }))} />
            </SelectWrapper> */}
          </>}
          <ButtonWrapper>
            <Button onClick={async () => handleSubmit()} fullWidth={false}>Create Resource</Button>
          </ButtonWrapper>
        </Center>
      </Wrapper>
    </>
  )
}

const SelectWrapper = styled.div`
  &${Select} {
    width: 400px;
    height: 32px;

  
    color: #000000;
    font-weight: 400;
  }
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