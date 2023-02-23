import { Box } from "@mui/material";
export function UnAuthorizedAlert() {
  return (
    <Box
      sx={{
        padding: "12px",
        fontStyle: 'italic',
        color: 'red'
      }}
    >
      You must select a user to be logged in
    </Box>
  );
}
