import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { ruRU } from '@mui/x-data-grid/locales';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(selectedUser);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleOpen = (user = null) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleSave = async () => {
    try {
      if (selectedUser) {
        console.log('хуета');
        await axios.put(`http://127.0.0.1:3000/api/users/${selectedUser.id}`, selectedUser);
      } else {
        console.log('норм');
        await axios.post('http://127.0.0.1:3000/api/users', selectedUser);
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Failed to save user', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };



  return (
    <div>
   
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Добавить пользователя</Button>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={users}
        columns={[
          { field: 'name', headerName: 'Имя', width: 150 },
          { field: 'login', headerName: 'Логин', width: 150 },
          { field: 'telegram', headerName: 'Telegram', width: 150 },
          { field: 'role', headerName: 'Роль', width: 150 },
          {
            field: 'actions',
            headerName: 'Действия',
            width: 300,
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
      <Dialog open={open} onClose={handleClose}>
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Роль</InputLabel>
            <Select
              value={selectedUser?.role || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
              label="Роль"
            >
              <MenuItem value="admin">Админ</MenuItem>
              <MenuItem value="user">Пользователь</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;