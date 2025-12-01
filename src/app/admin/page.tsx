'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/store/slices/auth-slice';

import styles from './styles.module.scss';

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      dispatch(login({ username }));
      localStorage.setItem('auth', JSON.stringify({ username }));
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Product Catalog | Admin Login</h1>

      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        showIcon={false}
      />

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        showIcon={false}
      />

      <Button type="button" onClick={handleLogin}>Login</Button>
    </div>
  );
};
