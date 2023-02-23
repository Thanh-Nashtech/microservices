import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "../common/axios";
import { User } from "../entity/user.entity";
import { ManageEnum } from "../pages/index.page";

export interface UserListProp {
  users: User[];
  setSelectedUser: (user: User) => void;
  selectedUser: User | null;

  setLoginedUser: (user: User | null) => void;
  loginedUser: User | null;

  setManageSection: (section: ManageEnum | null) => void;
}

export function UserList({ users, setSelectedUser, selectedUser, setManageSection, setLoginedUser }: UserListProp) {

  const loginAsUser = async (user: User) => {
    setSelectedUser(user);
    setManageSection(null);
    const res = await axios().post("/auth/login", {
      email: user.email,
      password: '123456789'
    });
    if (res.data.accessToken) {
      setLoginedUser(user);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("currentEmail", user.email);
    } else {
      setLoginedUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("currentEmail");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          {users.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton 
                onClick={() => loginAsUser(user)} 
                sx={{
                  backgroundColor: (selectedUser && selectedUser.id === user.id) ? 'green' : '#ffffff',
                }}
              >
                <ListItemText 
                  primary={`${user.firstName} ${user.lastName}`} secondary={`${user.id}`}
                  sx={{
                    color: (selectedUser && selectedUser.id === user.id) ? '#ffffff' : 'black'
                  }}
                 />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
