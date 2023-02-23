import { Box } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { ManageEnum } from "../../pages/index.page";
import Typography from "@mui/material/Typography";
import QrCodeIcon from '@mui/icons-material/QrCode';
import CategoryIcon from '@mui/icons-material/Category';

export interface FeatureMenuProp {
  setManageSection: (manageSection: ManageEnum) => void;
}

export function FeatureMenu({ setManageSection }: FeatureMenuProp) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        onClick={() => setManageSection(ManageEnum.Permission)}
        sx={{
          padding: "12px",
          cursor: "pointer",
          userSelect: "none",
          "&:hover": {
            color: "green",
          },
          display: "flex",
          alignItems: "center",
        }}
      >
        <RemoveCircleIcon /> 
        <Typography>Permission</Typography>
      </Box>
      <Box
        onClick={() => setManageSection(ManageEnum.Category)}
        sx={{
          padding: "12px",
          cursor: "pointer",
          userSelect: "none",
          "&:hover": {
            color: "green",
          },
          display: "flex",
          alignItems: "center",
        }}
      >
        <CategoryIcon /> 
        <Typography> Category</Typography>
      </Box>
      <Box
        onClick={() => setManageSection(ManageEnum.Product)}
        sx={{
          padding: "12px",
          cursor: "pointer",
          userSelect: "none",
          "&:hover": {
            color: "green",
          },
          display: "flex",
          alignItems: "center",
        }}
      >
        <QrCodeIcon /> 
        <Typography> Product</Typography>
      </Box>
    </Box>
  );
}
