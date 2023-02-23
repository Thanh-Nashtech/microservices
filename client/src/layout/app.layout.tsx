import { Box, Grid } from "@mui/material";

export interface ApplayoutProp {
  children: React.ReactNode;
}

export function AppLayout({ children }: ApplayoutProp) {
  return (
    <Box
      sx={{
        backgroundColor: "#2c2c2c",
        height: "100vh",
        padding: "22px 120px 22px 120px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "22px",
          boxSizing: "border-box",
          height: "100%",
          overflow: 'scroll'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
