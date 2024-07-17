import { TableCell, TableRow } from "@mui/material";
import { ITableItem } from "../api/tableApi";
import { TABLE_ITEM_PROPERTIES } from "../constants";

interface IProps {
  item: ITableItem;
}

export const TableRowComponent = ({ item }: IProps) => {
  return (
    <TableRow
      key={item.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {TABLE_ITEM_PROPERTIES.map((p) => {
        return <TableCell key={p}>{item[p]}</TableCell>;
      })}
      <TableCell>
        <button>delete</button>
      </TableCell>
    </TableRow>
  );
};
