import React, { useState } from "react";
import Select from 'react-select';
import ReactJson from "react-json-view";
import styled from "styled-components";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { dateMask, phoneMask } from "../utils/mask";

export const NewReference = () => {
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

  const handleSubmit = () => {
    console.log(formData)
    console.log(patientData)
  }

  return (
    <>
      <Header></Header>
      <Wrapper>
        <Center>
          <Input placeholder="Resource Name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e }))}></Input>
          <SelectWrapper>
            <Select options={[
              { value: 'Patient', label: 'Patient' },
              { value: 'Observation', label: 'Observation' }
            ]} onChange={({ value }) => setFormData(prev => ({ ...prev, type: value }))} />
          </SelectWrapper>
          {formData.type === 'Patient' && <>
            <Input placeholder="Name" value={patientData.name} onChange={(e) => setPatientData(prev => ({ ...prev, name: e }))}></Input>
            <Input placeholder="Email" value={patientData.email} onChange={(e) => setPatientData(prev => ({ ...prev, email: e }))}></Input>
            <Input placeholder="Phone" value={patientData.phone} onChange={(e) => setPatientData(prev => ({ ...prev, phone: e }))} mask={phoneMask}></Input>
            <Input placeholder="Address" value={patientData.address} onChange={(e) => setPatientData(prev => ({ ...prev, address: e }))}></Input>
            <Input placeholder="Birth Date" value={patientData.birthDate} onChange={(e) => setPatientData(prev => ({ ...prev, birthDate: e }))} mask={dateMask}></Input>
            <SelectWrapper>
              <Select options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' }
              ]} onChange={({ value }) => setFormData(prev => ({ ...prev, type: value }))} />
            </SelectWrapper>
          </>}
          <ButtonWrapper>
            <Button onClick={handleSubmit} fullWidth={false}>Create Resource</Button>
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