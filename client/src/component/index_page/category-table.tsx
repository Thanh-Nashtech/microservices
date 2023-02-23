import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatDate } from "../../common/utils/format-date";
import { Checkbox } from "@mui/material";

export interface CategoryItem {
  id: number;
  name: string;
  createdAt: string | Date;
}

export interface CategoryTableProp {
  categories: CategoryItem[];
  selectedCategoryIds: number[];
  setSelectedCategoryIds: (ids: number[]) => void;
}

export default function CategoryTable({
  categories,
  selectedCategoryIds,
  setSelectedCategoryIds
}: CategoryTableProp) {
  const handleChange = (value: number) => {
    if (selectedCategoryIds.includes(value)) {
      setSelectedCategoryIds([
        ...selectedCategoryIds.splice(selectedCategoryIds.findIndex((item) => item === value))
      ]);
    } else {
      setSelectedCategoryIds([
        ...selectedCategoryIds,
        value
      ]);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{formatDate(category.createdAt)}</TableCell>
              <TableCell>
                <Checkbox
                  checked={selectedCategoryIds.includes(category.id)}
                  onChange={() => handleChange(category.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
