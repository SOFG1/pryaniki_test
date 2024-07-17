import { useEffect, useState } from "react";
import { Button, TextField, Modal } from "@mui/material";
import styled from "styled-components";
import { ITableItem, tableApi } from "../api/tableApi";
import { TABLE_ITEM_PROPERTIES } from "../constants";
import { useSelector } from "react-redux";
import { userTokenSelector } from "../store/user/selectors";
import { handleRequest } from "../api";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { convertApiData } from "../utils/convertApiData";

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
  margin-bottom: 25px;
`;

const StyledError = styled.p`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

interface IProps {
  open: boolean;
  selectedItem: ITableItem | null;
  onClose: () => void;
  onCreate: (i: ITableItem) => void;
  onEdit: (i: ITableItem) => void;
}

export const CreateTableItemComponent = ({
  open,
  selectedItem,
  onClose,
  onCreate,
  onEdit,
}: IProps) => {
  const token = useSelector(userTokenSelector) as string;
  const [data, setData] = useState<any>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const handleChange = (prop: string, value: any) => {
    setData((p: any) => ({ ...p, [prop]: value }));
  };

  const handleCreate = async () => {
    setErrors({});
    setErrorMessage(null);
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
      setErrors(reqError.errors);
      setErrorMessage(reqError.title);
    }
  };

  const handleEdit = async () => {
    setErrors({});
    setErrorMessage(null);
    setIsFetching(true);
    const { data: reqData, error: reqError } = await handleRequest(
      tableApi.editItem(token, (selectedItem as ITableItem).id, data)
    );
    setIsFetching(false);
    if (reqData) {
      onEdit(reqData);
      setData({});
      onClose();
    }
    if (reqError) {
      setErrors(reqError.errors);
      setErrorMessage(reqError.title);
    }
  };

  //Fill form with selected data
  useEffect(() => {
    if (selectedItem) {
      const convertedData = convertApiData(selectedItem);
      setData(convertedData);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (!open) {
      setData({});
      setErrors({});
      setErrorMessage(null);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <StyledContent>
        <StyledTitle>Craete item</StyledTitle>
        {TABLE_ITEM_PROPERTIES.map((p) => {
          if (p.type === "date") {
            return (
              <InputWrapper>
                <LocalizationProvider dateAdapter={AdapterDayjs} key={p.prop}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      label={p.viewName}
                      value={dayjs(data[p.prop] || null)}
                      onChange={(v) => handleChange(p.prop, v)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {errors[p.prop]?.map((e) => (
                  <StyledError>{e}</StyledError>
                ))}
              </InputWrapper>
            );
          }
          return (
            <InputWrapper>
              <TextField
                error={errors[p.prop]?.length > 0}
                style={{ width: "100%" }}
                key={p.prop}
                label={p.viewName}
                value={data[p.prop] || ""}
                onChange={(e) => handleChange(p.prop, e.target.value)}
              />
              {errors[p.prop]?.map((e) => (
                <StyledError>{e}</StyledError>
              ))}
            </InputWrapper>
          );
        })}
        {!selectedItem && (
          <Button
            onClick={handleCreate}
            variant="contained"
            color="success"
            disabled={isFetching}
          >
            Create
          </Button>
        )}
        {selectedItem && (
          <Button
            onClick={handleEdit}
            variant="contained"
            disabled={isFetching}
          >
            Edit
          </Button>
        )}
        {errorMessage && <StyledError>{errorMessage}</StyledError>}
      </StyledContent>
    </Modal>
  );
};
