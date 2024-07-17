import styled from "styled-components";
import { TableView } from "../views/MainViews/TableView";

const StyledPage = styled.div`
  padding: 30px;
`;

export const MainPage = () => {
  return (
    <StyledPage>
      <TableView />
    </StyledPage>
  );
};
