import styled from "styled-components";
import { TableView } from "../views/MainViews/TableView";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setToken } from "../store/user/slice";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledPage = styled.div`
  padding: 30px;
`;

export const MainPage = () => {
  const dispatch = useDispatch();

  return (
    <StyledPage>
      <Button
        variant="outlined"
        endIcon={<LogoutIcon />}
        onClick={() => dispatch(setToken(null))}
      >
        Logout
      </Button>
      <TableView />
    </StyledPage>
  );
};
