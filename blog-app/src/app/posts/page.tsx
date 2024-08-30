"use client";

import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import Link from "next/link";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  TextField,
  TablePagination,
} from "@mui/material";

function AllPosts() {
  const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const tokenClaims = await getIdTokenClaims();
        const token = tokenClaims?.__raw;

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            title: titleFilter,
            page: page + 1,
            limit: rowsPerPage,
          },
        });

        setPosts(res.data.posts);
        setTotalPosts(res.data.total);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts. Please try again later.");
      }
    };

    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated, getIdTokenClaims, titleFilter, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>

      <TextField
        label="Filter by Title"
        variant="outlined"
        fullWidth
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
        style={{ margin: "16px 0" }}
      />

      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    by {post.user?.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <TablePagination
        component="div"
        count={totalPosts}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ marginTop: "16px" }}
      />
    </Container>
  );
}

export default withAuthenticationRequired(AllPosts);
