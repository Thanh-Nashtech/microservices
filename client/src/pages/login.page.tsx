import { AppLayout } from "../layout/app.layout";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "../common/axios";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const res = await axios().post("/auth/login", data);
    if (res.status === 201) {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("currentEmail", data.email);
      navigate("/");
    }
  };

  return (
    <AppLayout>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            padding: "22px 60px 22px 60px",
            width: "20%",
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              marginTop: "12px",
            }}
          >
            <Typography>Email</Typography>
            <TextField fullWidth {...register("email")} />
          </Box>
          <Box
            sx={{
              marginTop: "12px",
            }}
          >
            <Typography>Password</Typography>
            <TextField defaultValue={'123456789'} fullWidth {...register("password")} type={"password"} />
          </Box>
          <Box
            sx={{
              marginTop: "12px",
              textAlign: "right",
            }}
          >
            <Button type={"submit"} variant="contained">
              SIGN IN
            </Button>
          </Box>
        </Box>
      </form>
    </AppLayout>
  );
};
