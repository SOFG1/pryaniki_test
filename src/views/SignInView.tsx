import styled from "styled-components";
import { Input } from "../UI/Input";
import { useEffect, useState } from "react";
import { Button } from "../UI/Button";
import { handleRequest } from "../api";
import { SignInData, userApi } from "../api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../store/user/slice";

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
`;

const StyledError = styled.p`
  color: red;
  margin-top: 10px;
  text-align: center;
`

export const SignInView = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const signin = async () => {
    const reqData: SignInData = { username: userName, password };
    setIsLoading(true)
    const { data, error } = await handleRequest(userApi.login(reqData));
    setIsLoading(false)
    if(data) dispatch(setToken(data.token))
    if(error) setError(error)
  };



  //Reset error
  useEffect(() => {
    if(error) {
      setTimeout(() => setError(null), 4000)
    }
  }, [error])

  return (
    <StyledView>
      <StyledTitle>Sign In</StyledTitle>
      <StyledInput
        placeholder="User Name"
        value={userName}
        onChange={setUserName}
      />
      <StyledInput
        placeholder="Password"
        value={password}
        onChange={setPassword}
        type="password"
      />
      <Button onClick={signin} disabled={isLoading}>Sign in</Button>
      {error && <StyledError>{error}</StyledError>}
    </StyledView>
  );
};
