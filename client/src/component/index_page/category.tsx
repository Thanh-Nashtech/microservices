import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../common/axios";
import { Category as CategoryEntity } from "../../entity/category.entity";
import BasicPagination from "../common/pagination";
import CategoryTable from "./category-table";
export function Category() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isCategoryShowAll, setCategoryShowAll] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const { handleSubmit, register, setValue } = useForm();

  const onSubmit = async (data: any) => {
    setValue("name", "");
    await axios().post("/category", data);
    loadCategories();
  };

  const loadCategories = async (isShowAll = false) => {
    try {
      let additionalQuery = "";
      if (searchInput !== "") {
        additionalQuery = `&search=${searchInput}`;
      }

      if (isShowAll) {
        additionalQuery = `&noPagination=true`;
      }
 
      setCategoryErrorMessage("");
      const res = await axios().get(`/category?page=${page}${additionalQuery}`);
      setCategories(res.data.data);
      setTotalPage(res.data.totalPage);
    } catch (e: any) {
      setCategoryErrorMessage(e.response.data.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadCategories();
      clearTimeout(timeout);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

  useEffect(() => {
    loadCategories();
  }, [page]);

  const handleDeleteCategory = async () => {
    try {
      setCategoryErrorMessage("");
      await axios().delete(`/category`, {
        data: {
          ids: selectedCategoryIds
        }
      });
      loadCategories();
      setSelectedCategoryIds([])
    } catch (e: any) {
      setCategoryErrorMessage(e.response.data.message);
    }
  }

  const handleShowAll = () => {
      loadCategories(!isCategoryShowAll);
      setCategoryShowAll(!isCategoryShowAll);
  }

  return (
    <Box
      sx={{
        padding: "12px",
      }}
    >
      <Grid container>
        <Grid item md={4} sx={{ paddingRight: "12px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="standard"
              fullWidth
              placeholder="Add new category"
              {...register("name")}
            />
            <Button
              type={"submit"}
              sx={{ marginTop: "12px", display: "none" }}
              variant="contained"
              color="success"
              fullWidth
            >
              ADD
            </Button>
            <Typography
              sx={{
                fontSize: "10px",
                marginTop: "8px",
                color: "#b7b7b7",
                fontStyle: "italic",
              }}
            >
              Press enter to submit
            </Typography>
          </form>
        </Grid>
        <Grid item md={8}>
          {categoryErrorMessage}
          <TextField
            variant="standard"
            fullWidth
            placeholder="Search"
            value={searchInput}
            onChange={(e: any) => setSearchInput(e.target.value)}
            sx={{ marginBottom: "12px" }}
          />
          <CategoryTable
            categories={categories}
            selectedCategoryIds={selectedCategoryIds}
            setSelectedCategoryIds={setSelectedCategoryIds}
          />
          <Box
            sx={{
              display: 'flex',
              marginTop: '12px',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <BasicPagination
              page={page}
              totalPage={totalPage}
              setPage={setPage}
            />
            <Box>
              <Button variant="contained" color={'secondary'} sx={{marginRight: '4px'}} onClick={handleShowAll}>
              {
                !isCategoryShowAll ? 'SHOW ALL' : 'SHOW WITH PAGINATION'
              }

              </Button>
              <Button onClick={handleDeleteCategory} disabled={(selectedCategoryIds.length <=0)} variant="contained" color={'warning'}>Delete</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
