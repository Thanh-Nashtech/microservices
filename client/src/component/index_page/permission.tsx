import {
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "../../common/axios";
import { Permission as PermissionEntity } from "../../entity/permission.entity";
import { Role } from "../../entity/role.entity";
import { User } from "../../entity/user.entity";

enum childSection {
  UserRole = "user-role",
  RolePermission = "role-permission",
}

export function Permission() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentSection, setCurrentSection] = useState<childSection>(
    childSection.UserRole
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<any>({});
  const [activePermissions, setActivePermissions] = useState<
    PermissionEntity[]
  >([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [allPermissions, setAllPermissions] = useState<PermissionEntity[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any>({});

  const loadUserRolePermissions = async () => {
    const res = await axios().get("/user/role-permission");
    setUsers(res.data);
  };

  const resetSelectedRoleObject = (roles: Role[]) => {
    const roleObject: any = {};
    roles.forEach((role: Role) => {
      roleObject[`${role.id}`] = false;
    });
    return roleObject;
  };

  const resetSelectedPermissionObject = (permissions: PermissionEntity[]) => {
    const permissionObject: any = {};
    permissions.forEach((permission: PermissionEntity) => {
      permissionObject[`${permission.id}`] = false;
    });
    return permissionObject;
  };

  const loadAllRoles = async () => {
    const res = await axios().get("/role");
    setRoles(res.data);
    setSelectedRoles(resetSelectedRoleObject(res.data));
  };

  const loadAllPermissions = async () => {
    const res = await axios().get("/permission");
    setSelectedPermissions(resetSelectedPermissionObject(res.data));
    setAllPermissions(res.data);
  };

  useEffect(() => {
    const roleObject = resetSelectedRoleObject(roles);
    selectedUser?.roles.forEach((role) => {
      roleObject[`${role.id}`] = true;
    });
    setSelectedRoles({ ...roleObject });
  }, [selectedUser]);

  useEffect(() => {
    const permissionObject = resetSelectedPermissionObject(allPermissions);
    selectedRole?.permissions.forEach((permission) => {
      permissionObject[`${permission.id}`] = true;
    });

    setSelectedPermissions({ ...permissionObject });
  }, [selectedRole]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const roleIds = [];
    for (const [key, value] of Object.entries(selectedRoles)) {
      if (value === true) {
        roleIds.push(Number(key));
      }
    }
    const dataToSubmit = {
      userId: selectedUser?.id,
      roleIds,
    };

    const res = await axios().post("/user/role", dataToSubmit);
    console.log(res.data);
    alert("Update success");
  };

  const onPermissionRoleSubmit = async (e: any) => {
    e.preventDefault();
    const permissionIds = [];
    for (const [key, value] of Object.entries(selectedPermissions)) {
      if (value === true) {
        permissionIds.push(Number(key));
      }
    }
    const dataToSubmit = {
      roleId: selectedRole?.id,
      permissionIds,
    };

    const res = await axios().post("/permission/role-permission", dataToSubmit);
    alert("Update success");
  };

  useEffect(() => {
    loadAllRoles();
    loadUserRolePermissions();
    loadAllPermissions();
  }, []);

  useEffect(() => {
    const activeRole: number[] = [];
    for (const [key, value] of Object.entries(selectedRoles)) {
      if (value === true) activeRole.push(Number(key));
    }
    const permissions: PermissionEntity[] = [];
    roles.forEach((role) => {
      if (activeRole.includes(role.id)) {
        permissions.push(...role.permissions);
      }
    });
    setActivePermissions([...permissions]);
  }, [selectedRoles]);

  return (
    <Box
      sx={{
        padding: "12px",
      }}
    >
      {currentSection === childSection.UserRole && (
        <Box>
           <Typography variant="h5">
            Define User Role
           </Typography>
          <Grid container>
            <Grid item xs={12} md={4}>
              {roles.length > 0 &&
                users.map((user) => (
                  <Box
                    sx={{
                      padding: "12px 0px 12px 0px",
                      userSelect: "none",
                      cursor: "pointer",
                      marginBottom: "12px",
                      paddingLeft: "12px",
                    }}
                    onClick={() => setSelectedUser(user)}
                    key={user.id}
                  >
                    <Box
                      sx={{
                        background:
                          selectedUser && selectedUser.id === user.id
                            ? "green"
                            : "#d8d8d8",
                        padding: "12px",
                      }}
                    >
                      {user.id} {user.firstName} {user.lastName}
                    </Box>
                  </Box>
                ))}
            </Grid>
            <Grid item xs={12} md={5}>
              <form
                style={{
                  padding: "12px",
                }}
                onSubmit={onSubmit}
              >
                {selectedUser &&
                  roles.map((role) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        key={`role_id_${role.id}`}
                      >
                        <Checkbox
                          value={role.id}
                          checked={selectedRoles[`${role.id}`]}
                          onChange={() => {
                            selectedRoles[`${role.id}`] =
                              !selectedRoles[`${role.id}`];
                            setSelectedRoles({ ...selectedRoles });
                          }}
                        />
                        <Typography>{role.name}</Typography>
                      </Box>
                    );
                  })}
                {selectedUser && <Button type="submit">Save</Button>}
              </form>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box>
                {activePermissions.map((activePermission) => (
                  <Box>
                    {activePermission.id} {activePermission.name}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontStyle: "italic",
              textDecoration: "underline",
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => setCurrentSection(childSection.RolePermission)}
          >
            Define Role Permision
          </Typography>
        </Box>
      )}
      {currentSection === childSection.RolePermission && (
        <Box>
          <Typography variant="h5">
            Define Role Permission
           </Typography>
          <Grid container>
            <Grid item xs={12} md={4}>
              {roles.map((role) => (
                <Box
                  sx={{
                    padding: "12px 0px 12px 0px",
                    userSelect: "none",
                    cursor: "pointer",
                    marginBottom: "12px",
                    paddingLeft: "12px",
                  }}
                  onClick={() => setSelectedRole(role)}
                  key={`updaterole_${role.id}`}
                >
                  <Box
                    sx={{
                      background:
                        selectedRole && selectedRole.id === role.id
                          ? "green"
                          : "#d8d8d8",
                      padding: "12px",
                    }}
                  >
                    {role.id} {role.name}
                  </Box>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={5}>
              <form
                style={{
                  padding: "12px",
                }}
                onSubmit={onPermissionRoleSubmit}
              >
                {selectedRole &&
                  allPermissions.map((permission) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        key={`permission_id_${permission.id}`}
                      >
                        <Checkbox
                          value={permission.id}
                          checked={selectedPermissions[`${permission.id}`]}
                          onChange={() => {
                            selectedPermissions[`${permission.id}`] =
                              !selectedPermissions[`${permission.id}`];
                            setSelectedPermissions({ ...selectedPermissions });
                          }}
                        />
                        <Typography>{permission.name}</Typography>
                      </Box>
                    );
                  })}
                {selectedRole && <Button type="submit">Save</Button>}
              </form>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontStyle: "italic",
              textDecoration: "underline",
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => setCurrentSection(childSection.UserRole)}
          >
            Define User Role
          </Typography>
        </Box>
      )}
    </Box>
  );
}
