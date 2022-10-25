import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactJson from "react-json-view";
import styled from "styled-components";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { useWeb3 } from "../contexts/web3";
import { useWallet } from "../contexts/wallet";
import fhirApi from "../services/fhir";

export const Resource = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [content, setContent] = useState({});

  const { web3 } = useWeb3();
  const { wallet } = useWallet();

  const checkUser = useCallback(async (address) => {
    let user = await web3.contract.methods.getUser().call({
        from: address
    });

    if (!user.instanced) {
        navigate('/first-access');
    }
  }, []);

  const loadResource = async (address) => {
    let references = await web3.contract.methods.listReferences().call({
      from: address
    });

    let hasAccess = (references.findIndex(resource => resource.id === params.id) > 0 ? true : false);

    references.forEach(resource => {
      if (resource.id === params.id)
        hasAccess = true
    });

    if (hasAccess) {

      const response = await fhirApi.get(`/${params.type}/${params.id}`);
      console.log(response.data)
      if (response.data !== undefined) {
        setContent(response.data);
      }
    }
  }

  useEffect(() => {
    const checkWalletLogin = async () => {
        if (!await wallet.isLogged(true, web3)) {
            navigate('/');
        }
        checkUser(wallet.getAccount());
        loadResource(wallet.getAccount());
    }
    checkWalletLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [checkUser]);

  return (
    <>
      <Header></Header>
      <Wrapper>
        <Center>
          <ReactJson src={content} theme="monokai" style={{ padding: 16, borderRadius: 8, maxHeight: 640, overflowY: 'auto' }} />
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