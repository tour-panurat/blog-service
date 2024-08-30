'use client';

import React, { useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Link from 'next/link';

function HomePage() {
  const { isLoading } = useAuth0();


  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <nav>
        <ul>
          <li><Link href="/users">Users</Link></li>
          <li><Link href="/posts">Posts</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default withAuthenticationRequired(HomePage);
