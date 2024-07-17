import { Button, TableCell, TableHead, TableRow } from "@mui/material";
import { TABLE_ITEM_PROPERTIES } from "../constants";
import { AddCircle } from "@mui/icons-material";

export const TableHeadComponent = () => {
  return (
    <TableHead>
      <TableRow>
        {TABLE_ITEM_PROPERTIES.map((p) => {
          return <TableCell key={p.prop}>{p.viewName}</TableCell>;
        })}
        <TableCell>
          <Button
            color="success"
            startIcon={<AddCircle fontSize="small" />}
            variant="contained"
          >
            Create
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
