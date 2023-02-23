import { AppLayout } from "../layout/app.layout";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "../common/axios";
import { User } from "../entity/user.entity";
import { UserList } from "../component/list";
import { Box } from "@mui/system";
import { FeatureMenu } from "../component/index_page/feature-menu";
import { Permission } from "../component/index_page/permission";
import { User as UserManager } from "../component/index_page/user";
import { Product as ProductManager } from "../component/index_page/Product";
import { Category as CategoryManager } from "../component/index_page/category";
import Typography from "@mui/material/Typography";
import { UnAuthorizedAlert } from "../component/index_page/unauthorization-alert";

export enum ManageEnum {
  Permission = "permission",
  User = "user",
  Category = "category",
  Product = "Product",
}

export const IndexPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loginedUser, setLoginedUser] = useState<User | null>(null);
  const [manageSection, setManageSection] = useState<ManageEnum | null>(null);

  const loadUsers = async () => {
    const res = await axios().get("/user");
    setUsers([...res.data]);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <AppLayout>
      <Grid
        container
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "22px",
          boxSizing: "border-box",
          height: "100%",
        }}
      >
        <Grid item xs={12} md={3}>
          <Typography
            sx={{
              fontWeight: "bold",
            }}
          >
            LOGIN AS
          </Typography>
          <UserList
            users={users}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
            loginedUser={loginedUser}
            setLoginedUser={setLoginedUser}
            setManageSection={setManageSection}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          {<FeatureMenu setManageSection={setManageSection} />}
          {manageSection == ManageEnum.Permission && <Permission />}
          {manageSection == ManageEnum.Category && <CategoryManager />}
          {manageSection == ManageEnum.Product && <ProductManager />}
          {!selectedUser && <UnAuthorizedAlert />}
        </Grid>
      </Grid>
      <Box>
        Login as{"  "}
        {loginedUser
          ? `${loginedUser.firstName} ${loginedUser.lastName}`
          : "Unauthorized"}
      </Box>
    </AppLayout>
  );
};
