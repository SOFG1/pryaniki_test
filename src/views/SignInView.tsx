import styled from "styled-components";
import { Input } from "../UI/Input/Input";
import { useState } from "react";

const StyledView = styled.div`
  max-width: 300px;
  margin: 200px auto 0;
  display: flex;
  flex-direction: column;
  background-color: #ffd772;
  border-radius: 40px;
  padding: 30px;
`;

const StyledTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;

export const SignInView = () => {
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

  return (
    <StyledView>
      <StyledTitle>Sign In</StyledTitle>
      <Input placeholder="User Name" value={userName} onChange={setUserName} />
      <Input placeholder="Password" value={password} onChange={setPassword} type="password" />
      

    </StyledView>
  );
};
