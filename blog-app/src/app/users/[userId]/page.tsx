"use client";

import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Link from "next/link";

const UserDetail = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
  const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
  const [user, setUser] = useState<any | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      const tokenClaims = await getIdTokenClaims();
      const token = tokenClaims?.__raw;

      try {
        const [userResponse, postsResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/posts`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, getIdTokenClaims, userId]);

  const handleDeleteUser = async () => {
    if (!userId) return;

    setDeleting(true);
    const tokenClaims = await getIdTokenClaims();
    const token = tokenClaims?.__raw;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/users");
    } catch (err) {
      console.error(err);
      setError("Failed to delete user. Please try again later.");
    } finally {
      setDeleting(false);
      handleClose();
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading || loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return <Typography>No user found.</Typography>;

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="error"
            onClick={handleClickOpen}
            disabled={deleting}
          >
            Delete User
          </Button>
        </Grid>
      </Grid>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            @{user.username}
          </Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">Phone: {user.phone}</Typography>
          <Typography variant="body1">Website: {user.website}</Typography>
          <Typography variant="h6" style={{ marginTop: "16px" }}>
            Address
          </Typography>
          <Typography variant="body2">
            {user.address?.street}, {user.address?.suite}, {user.address?.city}{" "}
            {user.address?.zipcode}
          </Typography>
          <Divider style={{ margin: "16px 0" }} />
          <Typography variant="h6">Company</Typography>
          <Typography variant="body2">{user.company?.name}</Typography>
          <Typography variant="body2">{user.company?.catchPhrase}</Typography>
        </CardContent>
      </Card>
      <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: "24px" }}>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            User Posts
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained">
            <Link href={`/users/${userId}/posts/create`} style={{ color: "inherit", textDecoration: "none" }}>
              Create Post
            </Link>
          </Button>
        </Grid>
      </Grid>
      {posts.length > 0 ? (
        <Grid container spacing={2} style={{ marginTop: "16px" }}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Link href={`/posts/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" style={{ marginTop: "16px" }}>
          No posts found for this user.
        </Typography>
      )}

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
};

export default withAuthenticationRequired(UserDetail);
