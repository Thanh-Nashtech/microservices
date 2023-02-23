import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatDate } from "../../common/utils/format-date";
import { Checkbox } from "@mui/material";
import { Product } from "../../entity/product.entity";

export interface ProductTableProp {
  products: Product[];
  selectedProductIds: number[];
  setSelectedProductIds: (ids: number[]) => void;
}

export default function ProductTable({
  products,
  selectedProductIds,
  setSelectedProductIds
}: ProductTableProp) {
  const handleChange = (value: number) => {
    if (selectedProductIds.includes(value)) {
      setSelectedProductIds([
        ...selectedProductIds.splice(selectedProductIds.findIndex((item) => item === value))
      ]);
    } else {
      setSelectedProductIds([
        ...selectedProductIds,
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
            <TableCell>Category</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category?.name}</TableCell>
              <TableCell>{formatDate(product.createdAt)}</TableCell>
              <TableCell>
                <Checkbox
                  checked={selectedProductIds.includes(product.id)}
                  onChange={() => handleChange(product.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
