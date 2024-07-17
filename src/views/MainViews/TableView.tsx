import { useSelector } from "react-redux";
import { userTokenSelector } from "../../store/user/selectors";
import { useEffect, useState } from "react";
import { handleRequest } from "../../api";
import { ITableItem, tableApi } from "../../api/tableApi";
import styled from "styled-components";
import {
  CircularProgress,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { TableHeadComponent } from "../../components/TableHeadComponent";
import { TableRowComponent } from "../../components/TableRowComponent";

const StyledWrapper = styled.div`
  padding-top: 100px;
  text-align: center;
`;

export const TableView = () => {
  const token = useSelector(userTokenSelector) as string;
  const [tableData, setTableData] = useState<ITableItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    const { data, error } = await handleRequest(tableApi.getTable(token));
    setIsLoading(false);
    if (data) setTableData(data);
    if (error) console.log(error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledWrapper>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHeadComponent />
            <TableBody>
              {tableData.map((item) => (
                <TableRowComponent item={item} key={item.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </StyledWrapper>
  );
};
