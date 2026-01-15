import React, { useMemo, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, IconButton, Tooltip, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Categories = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //  1. FETCH DATA //
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //  COLUMNS  //
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false, 
        size: 80,
      },
      {
        accessorKey: 'image',
        header: 'Aperçu',
        Cell: ({ cell }) => (
          <img 
            src={cell.getValue()} 
            alt="cat" 
            style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
          />
        ),
      },
      {
        accessorKey: 'name',
        header: 'Nom de la Catégorie',
      },
    ],
    [],
  );

  ///CRUD///
  const handleCreateCategory = async ({ values, table }) => {
    const newRow = {
      ...values,
      id: Math.floor(Math.random() * 1000), 
      image: values.image || 'https://placehold.co/150'
    };
    setData([newRow, ...data]);
    table.setCreatingRow(null); 
  };

  const handleSaveCategory = async ({ values, table }) => {
    const updatedData = [...data];
    const index = updatedData.findIndex((item) => item.id === values.id);
    if (index !== -1) {
      updatedData[index] = values;
      setData(updatedData);
    }
    table.setEditingRow(null); 
  };

  // DELETE //
  const handleDeleteRow = (row) => {
    if (window.confirm(`Voulez-vous supprimer ${row.original.name}?`)) {
      setData(data.filter((item) => item.id !== row.original.id));
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
    
    onCreatingRowSave: handleCreateCategory,
    onEditingRowSave: handleSaveCategory,

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Modifier">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Supprimer">
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    
    renderTopToolbarCustomActions: ({ table }) => (
      
      <Button
        variant="contained"
        onClick={() => table.setCreatingRow(true)}
      >
        + Nouvelle Catégorie
      </Button>
    ),
    state: { isLoading },
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ color: '#0f172a', fontSize: '24px', fontWeight: '800', margin: 0 }}>
          Gestion des  Catégories
        </h1>
      </div>

      <MaterialReactTable table={table} />
    </div>
  );

};

export default Categories;