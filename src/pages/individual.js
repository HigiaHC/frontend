import React, { useState } from "react";
import ReactJson from "react-json-view";
import styled from "styled-components";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { Input } from "../components/input";

export const Individual = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
  })

  const handleSubmit = () => {
    console.log(formData)
  }

  const json = {
    "resourceType": "Patient",
    "id" : "75432",
    "meta" : {
      "versionId" : "12",
      "lastUpdated" : "2022-05-21T15:43:30Z"
    },
    "text": {
      "status": "generated",
      "div": "<div>Exemplo de HTML</div>"
    },
    "extension": [
      {
        "url": "http://example.org/",
        "valueCode": "renal"
      }
    ],
    "identifier": [
      {
        "use": "usual",
        "label": "MRN",
        "system": "https://www.higiahealth.chain/identifiers/mrn",
        "value": "123456"
      }
    ],
    "name": [
      {
        "family": [
          "Levin"
        ],
      }
    ]
  }

  return (
    <>
      <Header></Header>
      <Wrapper>
        <Center>
          <Input placeholder="Name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}></Input>
          <ReactJson src={json} theme="monokai" style={{ padding: 16, borderRadius: 8, maxHeight: 640, overflowY: 'auto' }} />
          <ButtonWrapper>
            <Button onClick={handleSubmit} fullWidth={false}>Create Resource</Button>
          </ButtonWrapper>
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

  display: flex;
  flex-direction: column;
  gap: 32px;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`