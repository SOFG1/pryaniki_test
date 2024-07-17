import { Button, TableCell, TableRow } from "@mui/material";
import { ITableItem, tableApi } from "../api/tableApi";
import { TABLE_ITEM_PROPERTIES } from "../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { userTokenSelector } from "../store/user/selectors";
import { useState } from "react";
import { handleRequest } from "../api";
import { formatDate } from "../utils/formatDate";

interface IProps {
  item: ITableItem;
  onDelete: (id: string) => void;
}

export const TableRowComponent = ({ item, onDelete }: IProps) => {
  const token = useSelector(userTokenSelector) as string;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const { error } = await handleRequest(tableApi.deleteItem(token, item.id));
    setIsDeleting(false);
    if (!error) onDelete(item.id);
  };

  return (
    <TableRow
      key={item.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {TABLE_ITEM_PROPERTIES.map((p) => {
        let value = item[p.prop]
        if(p.prop === "companySigDate") {
            value = formatDate(value)
        }
        if(p.prop === "employeeSigDate") {
            value = formatDate(value)
        }
        return <TableCell key={p.prop}>{value}</TableCell>;
      })}
      <TableCell>
        <Button
          startIcon={<DeleteIcon fontSize="small" />}
          variant="contained"
          fullWidth={true}
        >
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button
          fullWidth={true}
          onClick={handleDelete}
          disabled={isDeleting}
          color="error"
          startIcon={<DeleteIcon fontSize="small" />}
          variant="contained"
        >
          delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
