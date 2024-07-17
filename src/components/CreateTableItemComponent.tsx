import { Button, Input, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ICraeteTableItem, ITableItem, tableApi } from "../api/tableApi";
import { TABLE_ITEM_PROPERTIES } from "../constants";
import { useSelector } from "react-redux";
import { userTokenSelector } from "../store/user/selectors";
import { handleRequest } from "../api";

const StyledContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 400px;
  min-width: 500px;
  padding: 30px;
  border-radius: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.p`
  font-size: 30px;
  font-weight: 700;
`;

const StyledInput = styled(Input)`
  margin-bottom: 25px;
  width: 100%;
`;

const StyledError = styled.p`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

interface IProps {
  open: boolean;
  onClose: () => void;
  onCreate: (i: ITableItem) => void;
}

export const CreateTableItemComponent = ({
  open,
  onClose,
  onCreate,
}: IProps) => {
  const token = useSelector(userTokenSelector) as string;
  const [data, setData] = useState<ICraeteTableItem>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (prop: string, value: string) => {
    setData((p) => ({ ...p, [prop]: value }));
  };

  const handleCreate = async () => {
    setIsFetching(true);
    const { data: reqData, error: reqError } = await handleRequest(
      tableApi.createItem(token, data)
    );
    setIsFetching(false);
    if (reqData) {
      onCreate(reqData);
      setData({});
      onClose();
    }
    if (reqError) {
      setError(reqError.title);
    }
  };

  //Reset error
  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 4000);
    }
  }, [error]);


  return (
    <Modal open={open} onClose={onClose}>
      <StyledContent>
        <StyledTitle>Craete item</StyledTitle>
        {TABLE_ITEM_PROPERTIES.map((p) => {
          return (
            <StyledInput
              key={p.prop}
              aria-label="test"
              placeholder={p.viewName}
              value={data[p.prop] || ""}
              onChange={(e) => handleChange(p.prop, e.target.value)}
            />
          );
        })}
        <Button
          onClick={handleCreate}
          variant="contained"
          color="success"
          disabled={isFetching}
        >
          Create
        </Button>
        {error && <StyledError>{error}</StyledError>}
      </StyledContent>
    </Modal>
  );
};
