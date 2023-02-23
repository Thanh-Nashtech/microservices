import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../common/axios";
import { Product as ProductEntity } from "../../entity/product.entity";
import { Category as CategoryEntity } from "../../entity/category.entity";
import BasicPagination from "../common/pagination";
import CategorySelect from "./category-select";
import CategoryTable from "./category-table";
import ProductTable from "./product-table";

export function Product() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isCategoryShowAll, setCategoryShowAll] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const { handleSubmit, register, setValue } = useForm();
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [selectedCategoryId, setSelectCategoryId] = useState("");

  const onSubmit = async (data: any) => {
    await axios().post("/product", {
      categoryId: selectedCategoryId,
      ...data
    });
    loadProducts();
    setValue('name','')
  };

  const loadCategory = async () => {
    setCategoryErrorMessage("");
    const res = await axios().get(`/category?noPagination=true`);
    setCategories(res.data.data);
  };

  const loadProducts = async (isShowAll = false) => {
    try {
      let additionalQuery = "";
      if (searchInput !== "") {
        additionalQuery = `&search=${searchInput}`;
      }

      if (isShowAll) {
        additionalQuery = `&noPagination=true`;
      }

      setCategoryErrorMessage("");
      const res = await axios().get(`/product?page=${page}${additionalQuery}`);
      setProducts(res.data.data);
      setTotalPage(res.data.totalPage);
    } catch (e: any) {
      setCategoryErrorMessage(e.response.data.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProducts();
      clearTimeout(timeout);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

  useEffect(() => {
    loadCategory();
    loadProducts();
  }, [page]);

  const handleDeleteCategory = async () => {
    try {
      setCategoryErrorMessage("");
      await axios().delete(`/product`, {
        data: {
          ids: selectedProductIds,
        },
      });
      loadProducts();
      setSelectedProductIds([]);
    } catch (e: any) {
      setCategoryErrorMessage(e.response.data.message);
    }
  };

  const handleShowAll = () => {
    loadProducts(!isCategoryShowAll);
    setCategoryShowAll(!isCategoryShowAll);
  };

  return (
    <Box
      sx={{
        padding: "12px",
      }}
    >
      <Grid container>
        <Grid item md={4} sx={{ paddingRight: "12px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CategorySelect
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectCategoryId}
            />
            <TextField
              variant="standard"
              fullWidth
              placeholder="Add new product"
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
          <ProductTable
            products={products}
            selectedProductIds={selectedProductIds}
            setSelectedProductIds={setSelectedProductIds}
          />
          <Box
            sx={{
              display: "flex",
              marginTop: "12px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <BasicPagination
              page={page}
              totalPage={totalPage}
              setPage={setPage}
            />
            <Box>
              <Button
                variant="contained"
                color={"secondary"}
                sx={{ marginRight: "4px" }}
                onClick={handleShowAll}
              >
                {!isCategoryShowAll ? "SHOW ALL" : "SHOW WITH PAGINATION"}
              </Button>
              <Button
                onClick={handleDeleteCategory}
                disabled={selectedProductIds.length <= 0}
                variant="contained"
                color={"warning"}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
