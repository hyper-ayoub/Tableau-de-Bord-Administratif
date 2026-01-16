import React, { useMemo, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, IconButton, Tooltip, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Produits = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA //
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/products');
      const json = await response.json();
      setData(json.products); 
      localStorage.total = json.products.length;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // COLUMN ///
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'thumbnail',
        header: 'Image',
      
        Cell: ({ cell }) => (
          <img 
            src={cell.getValue()} 
            alt="product" 
            style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} 
          />
        ),
      },
      {
        accessorKey: 'title',
        header: 'Nom du Produit',
      },
      {
        accessorKey: 'price',
        header: 'Prix ($)',
        size: 100,
        Cell: ({ cell }) => `$${cell.getValue()}`,
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        size: 100,
      },
    ],
    [],
  );

  ///CRUD///

  const handleCreateProduct = async ({ values, table }) => {
    const newProduct = {
      ...values,
      id: Math.floor(Math.random() * 10000), // Fake ID
      thumbnail: values.thumbnail || 'https://placehold.co/150',
    };
    setData([newProduct, ...data]);
    table.setCreatingRow(null); // Close Modal
    localStorage.added = (Number(localStorage.added) || 0) +1;
  };

  // UPDATE //
  const handleSaveProduct = async ({ values, table }) => {
    const updatedData = [...data];
    const index = updatedData.findIndex((item) => item.id === values.id);
    if (index !== -1) {
      updatedData[index] = values;
      setData(updatedData);
    }
    table.setEditingRow(null); // Close Modal
  };

  // DELETE: Removes product
  const handleDeleteProduct = (row) => {
    if (window.confirm(`Voulez-vous supprimer ${row.original.title}?`)) {
      setData(data.filter((item) => item.id !== row.original.id));
      localStorage.deleted = (Number(localStorage.deleted) || 0) + 1;
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
    
    // Connect functions to Table
    onCreatingRowSave: handleCreateProduct,
    onEditingRowSave: handleSaveProduct,

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Modifier">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Supprimer">
          <IconButton color="error" onClick={() => handleDeleteProduct(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => table.setCreatingRow(true)}
      > + Ajouter un Produit
      </Button>
    ),
    state: { isLoading },
  })
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ color: '#0f172a', fontSize: '24px', fontWeight: '800', margin: 0 }}> Inventaire des Produits</h1>
      </div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Produits;
