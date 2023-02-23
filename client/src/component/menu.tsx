import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export default function IconMenu() {
  return (
    <Paper sx={{ width: '100%', maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>User</ListItemText>
        
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Category</ListItemText>
         
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ProductionQuantityLimitsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Product</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}