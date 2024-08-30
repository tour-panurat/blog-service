'use client';

import React, { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';

function CreateUser() {
  const router = useRouter();
  const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleGeoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        geo: {
          ...prev.address.geo,
          [name]: value,
        },
      },
    }));
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    try {
      const tokenClaims = await getIdTokenClaims();
      const token = tokenClaims?.__raw;

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('User created successfully!');
      setError(null);
      setUserData({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: '',
          },
        },
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
      });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to create user. Please try again later.');
      setSuccess(null);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create User
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Website"
          name="website"
          value={userData.website}
          onChange={handleChange}
          margin="normal"
        />
        <Typography variant="h6" gutterBottom>
          Address
        </Typography>
        <TextField
          fullWidth
          label="Street"
          name="street"
          value={userData.address.street}
          onChange={handleAddressChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Suite"
          name="suite"
          value={userData.address.suite}
          onChange={handleAddressChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="City"
          name="city"
          value={userData.address.city}
          onChange={handleAddressChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Zipcode"
          name="zipcode"
          value={userData.address.zipcode}
          onChange={handleAddressChange}
          required
          margin="normal"
        />
        <Typography variant="h6" gutterBottom>
          Geo
        </Typography>
        <TextField
          fullWidth
          label="Latitude"
          name="lat"
          value={userData.address.geo.lat}
          onChange={handleGeoChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Longitude"
          name="lng"
          value={userData.address.geo.lng}
          onChange={handleGeoChange}
          margin="normal"
        />
        <Typography variant="h6" gutterBottom>
          Company
        </Typography>
        <TextField
          fullWidth
          label="Company Name"
          name="name"
          value={userData.company.name}
          onChange={handleCompanyChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Catch Phrase"
          name="catchPhrase"
          value={userData.company.catchPhrase}
          onChange={handleCompanyChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="BS"
          name="bs"
          value={userData.company.bs}
          onChange={handleCompanyChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Create User
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

export default withAuthenticationRequired(CreateUser);
