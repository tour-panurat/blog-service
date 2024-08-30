"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import PostAddIcon from "@mui/icons-material/PostAdd"; // Example icon
import PeopleIcon from "@mui/icons-material/People"; // Example icon
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Example icon
import LoginIcon from "@mui/icons-material/Login"; // Example icon

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Blog Admin
        </Typography>
        {isAuthenticated ? (
          <>
            <Button
              color="inherit"
              component={Link}
              href="/users"
              startIcon={<PeopleIcon />}
            >
              Users
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/posts"
              startIcon={<PostAddIcon />}
            >
              Posts
            </Button>

            <Button
              color="inherit"
              onClick={() => logout()}
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={() => loginWithRedirect()}
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
