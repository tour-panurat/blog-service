"use client";

import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Link from "next/link";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";

function Users() {
  const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [page, setPage] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [limit, setLimit] = useState(10); // Number of users per page
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null); // User ID to delete

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [
    isAuthenticated,
    getIdTokenClaims,
    usernameFilter,
    emailFilter,
    page,
    limit,
  ]);

  const fetchUsers = async () => {
    try {
      const tokenClaims = await getIdTokenClaims();
      const token = tokenClaims?.__raw;

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          username: usernameFilter,
          email: emailFilter,
          page: page + 1, // Adjust page for backend (1-based index)
          limit,
        },
      });
      setUsers(res.data.users);
      setTotalUsers(res.data.total);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users. Please try again later.");
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        const tokenClaims = await getIdTokenClaims();
        const token = tokenClaims?.__raw;
        
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Close the dialog
        setOpen(false);
        setUserToDelete(null);
        fetchUsers(); // Refresh user list after deletion
      } catch (err) {
        console.error(err);
        setError("Failed to delete user. Please try again later.");
      }
    }
  };

  const handleClickOpen = (userId: string) => {
    setUserToDelete(userId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserToDelete(null);
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

      {/* Filter Inputs */}
      <div style={{ display: "flex", marginBottom: "16px" }}>
        <TextField
          size="small"
          label="Username"
          variant="outlined"
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
          style={{ marginRight: "16px" }}
        />
        <TextField
          size="small"
          label="Email"
          variant="outlined"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          style={{ marginRight: "16px" }}
        />

        <Button
          variant="contained"
          onClick={() => {
            router.push("/users/create");
          }}
          style={{ marginLeft: "16px" }}
        >
          Create
        </Button>
      </div>

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link
                    href={`/users/${user.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => router.push(`/users/${user.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    style={{ marginLeft: "8px" }}
                    onClick={() => handleClickOpen(user.id)} // Open dialog
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={totalUsers}
          rowsPerPage={limit}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default withAuthenticationRequired(Users);
