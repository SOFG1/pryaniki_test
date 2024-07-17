import styled from "styled-components";
import { Input } from "../UI/Input";
import { useState } from "react";
import { Button } from "../UI/Button";
import { handleRequest } from "../api";
import { SignInData, userApi } from "../api/userApi";

const StyledView = styled.div`
  max-width: 300px;
  margin: 200px auto 0;
  display: flex;
  flex-direction: column;
  background-color: #fff08e;
  border-radius: 40px;
  padding: 30px;
`;

const StyledTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;

const StyledInput = styled(Input)`
    margin-bottom: 25px;
`

export const SignInView = () => {
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const signin = async () => {
      const reqData: SignInData = {username: userName, password}
      const {data, error} = await handleRequest(userApi.login(reqData))
      console.log(data)
      console.log(error)


    }

  return (
    <StyledView>
      <StyledTitle>Sign In</StyledTitle>
      <StyledInput placeholder="User Name" value={userName} onChange={setUserName} />
      <StyledInput placeholder="Password" value={password} onChange={setPassword} type="password" />
      <Button onClick={signin}>Sign in</Button>
    </StyledView>
  );
};
