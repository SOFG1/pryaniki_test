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
import { CreateEditItemComponent } from "../../components/CreateEditItemComponent";

const StyledWrapper = styled.div`
  padding-top: 100px;
  text-align: center;
`;

export const TableView = () => {
  const token = useSelector(userTokenSelector) as string;
  const [tableData, setTableData] = useState<ITableItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<null | ITableItem>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const { data, error } = await handleRequest(tableApi.getTable(token));
    setIsLoading(false);
    if (data) setTableData(data);
    if (error) console.log(error);
  };

  const onDeleteItem = (id: string) => {
    setTableData((p) => p.filter((i) => i.id !== id));
  };

  const onCreateItem = (item: ITableItem) => {
    setTableData((p) => [...p, item]);
  };

  const onEditItem = (item: ITableItem) => {
    const index = tableData.findIndex(i => i.id === item.id)
    const copy = [...tableData]
    copy.splice(index, 1, item)
    setTableData(copy);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
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
            <TableHeadComponent openCreate={() => setShowModal(true)} />
            <TableBody>
              {tableData.map((item) => (
                <TableRowComponent
                  onDelete={onDeleteItem}
                  onSelect={setSelectedItem}
                  item={item}
                  key={item.id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CreateEditItemComponent
        open={showModal || !!selectedItem}
        selectedItem={selectedItem}
        onCreate={onCreateItem}
        onEdit={onEditItem}
        onClose={handleCloseModal}
      />
    </StyledWrapper>
  );
};
