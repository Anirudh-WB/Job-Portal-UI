import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import CustomAction from "./customAction";

interface TableColumn {
  fieldName: string;
  displayName: string;
  cssClass?: string;
}
interface DynamicTableProps<T> {
  columns: TableColumn[];
  data: T[];
  customActions?: CustomAction[];
}


function DynamicTable<T>({
  columns,
  data,
  customActions,
}: DynamicTableProps<T>) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            {columns.map((column) => (
              <TableCell key={column.fieldName}>{column.displayName}</TableCell>
            ))}
            {customActions && customActions.length > 0 && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((item: T) => (
            <TableRow key={getKey(item)}>
              {columns.map((column) => (
                <TableCell key={column.fieldName}>
                  {renderCellContent(item, column)}
                </TableCell>
              ))}
              {customActions && customActions.length > 0 && (
                <TableCell>
                  {customActions.map((action, index) => (
                    <Button  variant="contained"
                      key={index}
                      onClick={() => action.callback(getKey(item))}
                    >
                      {action.icon && action.icon}
                      {action.label}
                    </Button>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>

     
    </>
  );
}
function getKey(item: any): string | number {
  // Implement a function to generate a unique key for each item
  // This assumes that each item has a unique identifier, such as an 'id' property
  return item.id;
}
// function renderCellContent<T>(
//   item: T,
//   column: TableColumn,
//   onEdit?: (id: string | number) => void,
//   onDelete?: (id: string | number) => void
// ) {
//   if (column.fieldName === "edit" && onEdit) {
//     return <button onClick={() => onEdit(getKey(item))}>Edit</button>;
//   }

//   if (column.fieldName === "delete" && onDelete) {
//     return <button onClick={() => onDelete(getKey(item))}>Delete</button>;
//   }

//   // Assert the type of 'item' to 'any' for dynamic property access
//   const fieldValue = (item as any)[column.fieldName];

//   // For other columns, display the content as a string
//   return fieldValue !== undefined && fieldValue !== null
//     ? String(fieldValue)
//     : "N/A";
// }
function renderCellContent<T>(item: T, column: TableColumn) {
  // Assert the type of 'item' to 'any' for dynamic property access
  const fieldValue = (item as any)[column.fieldName];

  // For other columns, display the content as a string
  return fieldValue !== undefined && fieldValue !== null
    ? String(fieldValue)
    : 'N/A';
}

export default DynamicTable;
