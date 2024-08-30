'use client';

import React, { useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

function CreatePost({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const { getIdTokenClaims } = useAuth0();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const tokenClaims = await getIdTokenClaims();
      const token = tokenClaims?.__raw;

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts`,
        { userId, title, body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Post created successfully!');
      setTitle('');
      setBody('');
      router.push(`/users/${userId}`);
    } catch (err) {
      console.error(err);
      setError('Failed to create post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Post
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Body"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={{ marginBottom: '16px' }}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
      <Button
        variant="contained"
        onClick={() => router.back()}
        style={{ marginTop: '16px', backgroundColor: '#3f51b5', color: '#fff' }}
      >
        Go Back
      </Button>
    </Container>
  );
}

export default withAuthenticationRequired(CreatePost);
