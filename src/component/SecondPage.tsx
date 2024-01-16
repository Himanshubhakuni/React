// SecondPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Navigate } from 'react-router-dom';
import Post from '../model/Post';
import Box from '@mui/material/Box'; 
import DepartmentComponent from './DepartmentComponent';


const SecondPage: React.FC = () => {
  const [postData, setPostData] = useState<Post[]>([]);
  const [departmentData, setDepartmentData] = useState<Department[]>([]);
 

  useEffect(() => {
    const apiUrlPosts = 'https://jsonplaceholder.typicode.com/posts';
    import('./Department.json').then((data) => {
      setDepartmentData(data.default);
    });
    

    const fetchData = async () => {
      try {
        const responsePosts = await axios.get<Post[]>(apiUrlPosts);
        setPostData(responsePosts.data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'body', headerName: 'Body', width: 800 },
  ];

  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  // Redirect to first page if user details are missing
  if (!userDetails.name || !userDetails.phone || !userDetails.email) {
    return <Navigate to="/first" />;
  }

  return (
    <>    <h2>Second Page</h2>
    <p>Welcome, {userDetails.name}!</p>
  <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={postData}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
    
      checkboxSelection
      disableRowSelectionOnClick
    />
     <DepartmentComponent departmentData={departmentData} />
  </Box></>

  );
};

export default SecondPage;
