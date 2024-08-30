"use client";

import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
  Divider,
  Grid,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Link from "next/link";

function PostDetail({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
  const [post, setPost] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false); // State for confirmation dialog
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const tokenClaims = await getIdTokenClaims();
          const token = tokenClaims?.__raw;

          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPost(res.data);
        } catch (err) {
          console.error(err);
          setError("Unable to load post details. Please try again later.");
        }
      }
    };

    if (isAuthenticated) {
      fetchPost();
    }
  }, [isAuthenticated, getIdTokenClaims, postId]);

  const handleDeletePost = async () => {
    if (!postId) return;

    setDeleting(true);
    const tokenClaims = await getIdTokenClaims();
    const token = tokenClaims?.__raw;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/posts"); // Redirect to the posts list after deletion
    } catch (err) {
      console.error(err);
      setError("Failed to delete the post. Please try again later.");
    } finally {
      setDeleting(false);
      handleClose();
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) {
    return (
      <Container>
        <Skeleton variant="text" width="80%" height={40} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          style={{ margin: "16px 0" }}
        />
        <Skeleton variant="text" width="60%" height={30} />
      </Container>
    );
  }

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!post) return <Typography>No post found.</Typography>;

  return (
    <Container maxWidth="md" style={{ marginTop: "24px" }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleClickOpen}
          disabled={deleting}
        >
          Delete Post
        </Button>
      </Grid>
      <Card variant="outlined" style={{ marginBottom: "16px" }}>
        <CardContent>
          <Typography variant="body1" paragraph>
            {post.body}
          </Typography>
          <Divider />
          <Typography variant="body2" style={{ marginTop: "16px" }}>
            <strong>Author:</strong>
            <Link
              href={`/users/${post.user?.id}`}
              style={{
                marginLeft: "4px",
                textDecoration: "underline",
                color: "#3f51b5",
              }}
            >
              {post.user?.name}
            </Link>
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        onClick={() => router.back()}
        style={{ backgroundColor: "#3f51b5", color: "#fff" }}
      >
        Go Back
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="error" disabled={deleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default withAuthenticationRequired(PostDetail);
