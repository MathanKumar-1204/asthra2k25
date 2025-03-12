import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from './firebase'; // Adjust the import path as needed
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { set, ref, get } from 'firebase/database';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        // Handle Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user info in Firebase Realtime Database
        await set(ref(database, 'users/' + user.uid), {
          name: name,
          email: user.email,
        });

        localStorage.setItem('userInfo', JSON.stringify({ name, email: user.email }));
        navigate('/');
      } else {
        // Handle Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if user exists in the database
        const snapshot = await get(ref(database, 'users/' + user.uid));
        if (snapshot.exists()) {
          localStorage.setItem('userInfo', JSON.stringify({ email: user.email }));
          navigate('/');
        } else {
          setError('User does not exist in the database');
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="creds">
        <form className="form" onSubmit={handleSubmit}>
          <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
          {error && <p className="error">{error}</p>}
          {isSignUp && (
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="abc">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button type="button" className="abc" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
      <div className="logo">
        <h1>BBC</h1>
        <p>Bye Bye conductors</p>
      </div>
    </div>
  );
};

export default LoginPage;
