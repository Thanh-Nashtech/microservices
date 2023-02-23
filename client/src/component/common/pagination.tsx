import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export interface BasicPaginationProp {
    page: number;
    setPage: (page: number) => void;
    totalPage: number;
}

export default function BasicPagination({page, totalPage, setPage}: BasicPaginationProp) {
  const handleChange = (e:any, value: number) => {
    console.log(value)
    setPage(value)
  }
  return (
    <Stack spacing={2}>
      <Pagination onChange={handleChange} count={totalPage} page={page} color="primary" />
    </Stack>
  );
}