import React, { useMemo, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, IconButton, Tooltip, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Users = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA ///
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      const json = await response.json();
      const formattedUsers = json.results.map((u) => ({
        id: u.login.uuid,
        firstName: u.name.first,
        lastName: u.name.last,
        email: u.email,
        city: u.location.city,
        avatar: u.picture.large, // The Image URL
      }));
      setData(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //  COLUMN //
  const columns = useMemo(
    () => [
      {
        accessorKey: 'avatar',
        header: 'Photo / Avatar URL',
        Cell: ({ cell }) => (
          <img 
            src={cell.getValue()} 
            alt="user" 
            style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #ccc' }} 
          />
        ),
      },
      {
        accessorKey: 'firstName',
        header: 'Prénom',
      },
      {
        accessorKey: 'lastName',
        header: 'Nom',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'city',
        header: 'Ville',
      },
    ],
    [],
  );

  ///CRUD///

  const handleCreateUser = async ({ values, table }) => {
    const newUser = {
      ...values,
      id: Math.random().toString(36).substr(2, 9),
      avatar: values.avatar || `https://i.pravatar.cc/150?u=${Math.random()}`,
    };
    setData([newUser, ...data]);
    table.setCreatingRow(null);
  };

  // UPDATE //
  const handleSaveUser = async ({ values, table }) => {
    const updatedData = [...data];
    const index = updatedData.findIndex((item) => item.id === values.id);
    if (index !== -1) {
      updatedData[index] = values;
      setData(updatedData);
    }
    table.setEditingRow(null);
  };

  const handleDeleteUser = (row) => {
    if (window.confirm(`Supprimer l'utilisateur ${row.original.firstName}?`)) {
      setData(data.filter((user) => user.id !== row.original.id));
    }
  };

  // TABLE //
  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    editDisplayMode: 'modal',
    createDisplayMode: 'modal',
    getRowId: (row) => row.id,
    onCreatingRowSave: handleCreateUser,
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Modifier">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Supprimer">
          <IconButton color="error" onClick={() => handleDeleteUser(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        + Nouveau Client
      </Button>
    ),
    state: { isLoading },
  });

  return (
    <div style={{ padding: '10px' }}>
     <div style={{ marginBottom: '25px' }}>
        <h1 style={{ color: '#0f172a', fontSize: '24px', fontWeight: '800', margin: 0 }}>Gestion des Utilisateurs</h1>
      </div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Users;