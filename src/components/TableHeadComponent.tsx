import { TableCell, TableHead, TableRow } from "@mui/material";
import { TABLE_ITEM_PROPERTIES } from "../constants";

export const TableHeadComponent = () => {
  return (
    <TableHead>
      <TableRow>
        {TABLE_ITEM_PROPERTIES.map((p) => {
          return <TableCell key={p}>{p}</TableCell>;
        })}
      </TableRow>
    </TableHead>
  );
};
