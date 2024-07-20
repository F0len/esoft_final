import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import { ruRU } from '@mui/x-data-grid/locales';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const roles = ['admin', 'teacher', 'student'];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const transformedUsers = response.data.map(user => ({
        ...user,
        roles: user.roles.join(', ')
      }));
      setUsers(transformedUsers);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleOpen = (user = null) => {
    setSelectedUser(user ? { ...user, roles: user.roles.split(', ') } : { roles: [] });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleSave = async () => {
    try {
      const userToSave = {
        ...selectedUser,
        roles: Array.isArray(selectedUser.roles) ? selectedUser.roles : selectedUser.roles.split(', ') // Ensure roles is an array
      };

      if (selectedUser.id) {
        await updateUser(selectedUser.id,userToSave);
      } else {
        await createUser(userToSave);
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Failed to save user', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <div>
      <Button sx={{ mb: 1 }} variant="contained" color="primary" onClick={() => handleOpen()}>Добавить пользователя</Button>
      <DataGrid
        autosizeOnMount={true}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={users}
        columns={[
          { field: 'name', headerName: 'Имя', flex: 1, autoWidth: true },
          { field: 'login', headerName: 'Логин', flex: 1, autoWidth: true },
          { field: 'telegram', headerName: 'Telegram', flex: 1, autoWidth: true },
          { field: 'roles', headerName: 'Роль', flex: 1, autoWidth: true },
          {
            field: 'actions',
            headerName: 'Действия',
            flex: 1,
            autoWidth: true,
            renderCell: (params) => (
              <>
                <Button onClick={() => handleOpen(params.row)}>Изменить</Button>
                <Button color='error' onClick={() => handleDelete(params.row.id)}>Удалить</Button>
              </>
            )
          }
        ]}
        pageSize={10}
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{selectedUser ? 'Редактировать пользователя' : 'Добавить пользователя'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Имя"
            fullWidth
            margin="normal"
            value={selectedUser?.name || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
          />
          <TextField
            label="Логин"
            fullWidth
            margin="normal"
            value={selectedUser?.login || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, login: e.target.value })}
          />
          <TextField
            label="Пароль"
            fullWidth
            margin="normal"
            value={selectedUser?.password || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
          />
          <TextField
            label="Telegram"
            fullWidth
            margin="normal"
            value={selectedUser?.telegram || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, telegram: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Роль</InputLabel>
            <Select
            value={selectedUser?.roles || []}
            label='Роль'
              multiple
              margin="normal"
              displayEmpty
              fullWidth
              onChange={(e) => setSelectedUser({ ...selectedUser, roles: e.target.value })}
              renderValue={(selected) => selected.join(', ')}
            >
              {roles?.map((role) => (
                <MenuItem key={role} value={role}>
                  <Checkbox checked={selectedUser?.roles.includes(role)} />
                  <ListItemText primary={role} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>Отмена</Button>
          <Button color='info' onClick={handleSave}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
