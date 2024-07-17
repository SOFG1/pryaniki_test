import { Button, TableCell, TableHead, TableRow } from "@mui/material";
import { TABLE_ITEM_PROPERTIES } from "../constants";
import { AddCircle } from "@mui/icons-material";


interface IProps {
  openCreate: () => void
}

export const TableHeadComponent = ({openCreate}: IProps) => {
  return (
    <TableHead>
      <TableRow>
        {TABLE_ITEM_PROPERTIES.map((p) => {
          return <TableCell key={p.prop}>{p.viewName}</TableCell>;
        })}
        <TableCell>
          <Button
            fullWidth={true}
            color="success"
            startIcon={<AddCircle fontSize="small" />}
            variant="contained"
            onClick={openCreate}
          >
            Create
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
