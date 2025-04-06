import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

// Add interface for decoded JWT payload
function Login() {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  // Form validation state
  const [errors, setErrors] = useState({
    signIn: {},
    signUp: {}
  });

  // Handle successful Google sign-in
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Decoded Google User:', decoded);
      setUser(decoded);

      const userExists = await checkUserExists(decoded.email);
      if (userExists) {
        const userRole = await getUserRole(decoded.email);
        localStorage.setItem('userInfo', JSON.stringify({
          name: decoded.name,
          email: decoded.email,
          role: userRole // Save the role in local storage
        }));
        navigate('/');
      } else {
        await saveToSheetBest({ name: decoded.name, email: decoded.email, password: '', role: 'user' });
        alert('Sign-up successful!');
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  const handleGoogleError = () => {
    console.error('Google Sign-In Failed');
  };

  const validateSignInForm = () => {
    const newErrors = {};
    if (!signInEmail) newErrors.email = 'Email is required';
    if (!signInPassword) newErrors.password = 'Password is required';
    return newErrors;
  };

  const validateSignUpForm = () => {
    const newErrors = {};
    if (!signUpName) newErrors.name = 'Name is required';
    if (!signUpEmail) newErrors.email = 'Email is required';
    if (!signUpPassword) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignInForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(prev => ({ ...prev, signIn: validationErrors }));
      return;
    }

    setErrors(prev => ({ ...prev, signIn: {} }));

    const userExists = await checkUserExists(signInEmail);
    if (userExists) {
      const userRole = await getUserRole(signInEmail);
      const userName = await getUserName(signInEmail); // Fetch the user's name
      localStorage.setItem('userInfo', JSON.stringify({
        name: userName,
        email: signInEmail,
        role: userRole // Save the role in local storage
      }));
      navigate('/');
    } else {
      alert('Wrong credentials!');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignUpForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(prev => ({ ...prev, signUp: validationErrors }));
      return;
    }

    setErrors(prev => ({ ...prev, signUp: {} }));

    const userExists = await checkUserExists(signUpEmail);
    if (userExists) {
      alert('User already exists! Please sign in.');
    } else {
      await saveToSheetBest({ name: signUpName, email: signUpEmail, password: signUpPassword, role: 'user' });
      alert('Sign-up successful!');
    }
  };

  const checkUserExists = async (email) => {
    const sheetBestUrl = 'https://api.sheetbest.com/sheets/14667c39-9bff-4c16-b563-ea78f2f98a77';

    const response = await fetch(sheetBestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from SheetBest');
    }

    const data = await response.json();
    return data.some(user => user.email === email);
  };

  const getUserRole = async (email) => {
    const sheetBestUrl = 'https://api.sheetbest.com/sheets/14667c39-9bff-4c16-b563-ea78f2f98a77';

    const response = await fetch(sheetBestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from SheetBest');
    }

    const data = await response.json();
    const user = data.find(user => user.email === email);
    return user ? user.role : 'user';
  };

  const getUserName = async (email) => {
    const sheetBestUrl = 'https://api.sheetbest.com/sheets/14667c39-9bff-4c16-b563-ea78f2f98a77';

    const response = await fetch(sheetBestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from SheetBest');
    }

    const data = await response.json();
    const user = data.find(user => user.email === email);
    return user ? user.name : '';
  };

  const saveToSheetBest = async (data) => {
    const sheetBestUrl = 'https://api.sheetbest.com/sheets/14667c39-9bff-4c16-b563-ea78f2f98a77';

    const response = await fetch(sheetBestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save data to SheetBest');
    }

    console.log('Data saved successfully');
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="absolute top-4 left-4 text-[#00FFFF] text-3xl z-50 hover:text-red-500 transition-colors"
        >
          <IoArrowBack />
        </button>

        {/* Cyberpunk Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://i.imgur.com/1i6wD5t.jpg')] bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>

        {/* Main Container */}
        <div className={`container bg-[#0a0a0a] border border-[#00f2ff] shadow-[0px_0px_20px_rgba(0,242,255,0.8)] rounded-lg md:w-[780px] w-[95%] min-h-[500px] flex items-center justify-center overflow-hidden transition-all duration-700 ${isActive ? 'active' : ''}`}>

          {/* Sign In Form - Mobile & Desktop Views */}
          <div className={`form-container sign-in absolute top-0 left-0 md:w-1/2 w-full h-full flex items-center justify-center transition-all duration-700 z-20 ${isActive ? 'md:translate-x-full translate-y-[-100%]' : ''}`}>
            <form onSubmit={handleSignIn} className="flex flex-col items-center justify-center px-5 md:px-10 h-full w-full max-w-[100%]">
              <h1 className="text-xl md:text-2xl font-bold mb-2 neon-text">Sign In</h1>
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  type="standard"
                  text="continue_with"
                  shape="pill"
                  width="250"
                />
              </div>
              <span className="text-sm mt-4">or use your account</span>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  className={`neon-input ${errors.signIn.email ? 'border-red-500' : ''}`}
                />
                {errors.signIn.email && <p className="text-red-500 text-xs mt-1">{errors.signIn.email}</p>}
              </div>
              <div className="w-full">
                <input
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className={`neon-input ${errors.signIn.password ? 'border-red-500' : ''}`}
                />
                {errors.signIn.password && <p className="text-red-500 text-xs mt-1">{errors.signIn.password}</p>}
              </div>
              <button
                type="submit"
                className="neon-button"
              >
                Sign In
              </button>

              {/* Mobile-only button to toggle to Sign Up */}
              <button
                type="button"
                onClick={() => setIsActive(true)}
                className="md:hidden neon-button-outline mt-4"
              >
                Create Account
              </button>
            </form>
          </div>

          {/* Sign Up Form - Mobile & Desktop Views */}
          <div className={`form-container sign-up absolute top-0 left-0 md:w-1/2 w-full h-full flex items-center justify-center transition-all duration-700 md:opacity-0 z-10 bg-black ${isActive ? 'md:translate-x-full translate-y-0 opacity-100 z-30' : 'translate-y-[100%]'}`}>
            <form onSubmit={handleSignUp} className="flex flex-col items-center justify-center px-5 md:px-10 h-full w-full max-w-[100%]">
              <h1 className="text-xl md:text-2xl font-bold mb-2 neon-text">Create Account</h1>
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  type="standard"
                  text="continue_with"
                  shape="pill"
                  width="250"
                />
              </div>
              <span className="text-sm mt-4">or use your email for registration</span>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Name"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  className={`neon-input ${errors.signUp.name ? 'border-red-500' : ''}`}
                />
                {errors.signUp.name && <p className="text-red-500 text-xs mt-1">{errors.signUp.name}</p>}
              </div>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className={`neon-input ${errors.signUp.email ? 'border-red-500' : ''}`}
                />
                {errors.signUp.email && <p className="text-red-500 text-xs mt-1">{errors.signUp.email}</p>}
              </div>
              <div className="w-full">
                <input
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  className={`neon-input ${errors.signUp.password ? 'border-red-500' : ''}`}
                />
                {errors.signUp.password && <p className="text-red-500 text-xs mt-1">{errors.signUp.password}</p>}
              </div>
              <button
                type="submit"
                className="neon-button"
              >
                Sign Up
              </button>

              {/* Mobile-only button to toggle back to Sign In */}
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className="md:hidden neon-button-outline mt-4"
              >
                Back to Sign In
              </button>
            </form>
          </div>

          {/* Toggle Container - Desktop only, hidden on mobile */}
          <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 z-30 hidden md:block"
               style={isActive ? { borderRadius: "0 150px 100px 0", transform: "translateX(-100%)" } : { borderRadius: "150px 0 0 100px" }}>
            <div className={`toggle absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-[#ff00ff] to-[#00f2ff] text-white transition-all duration-700 ${isActive ? 'translate-x-1/2' : 'translate-x-0'}`}>
              <div className={`toggle-panel toggle-left absolute top-0 w-1/2 h-full flex flex-col items-center justify-center px-8 text-center transition-all duration-700 ${isActive ? 'translate-x-0' : '-translate-x-[200%]'}`}>
                <h1 className="text-2xl font-bold mb-2 neon-text">Welcome Back!</h1>
                <p className="text-sm leading-5 tracking-wide my-5">Enter your personal details to access all features</p>
                <button
                  type="button"
                  className="neon-button-outline"
                  onClick={() => setIsActive(false)}
                >
                  Sign In
                </button>
              </div>
              <div className={`toggle-panel toggle-right absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-8 text-center transition-all duration-700 ${isActive ? 'translate-x-[200%]' : 'translate-x-0'}`}>
                <h1 className="text-2xl font-bold mb-2 neon-text">Hello, Friend!</h1>
                <p className="text-sm leading-5 tracking-wide my-5">Register with your personal details to access all features</p>
                <button
                  type="button"
                  className="neon-button-outline"
                  onClick={() => setIsActive(true)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Orbitron', sans-serif;
}

body {
  background-color: #080808;
  color: #00f2ff;
}

.container {
  background: linear-gradient(135deg, #0a0a0a, #111, #1a1a1a);
  border: 2px solid #00f2ff;
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.8);
  position: relative;
  overflow: hidden;
  transition: 0.5s ease-in-out;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  backdrop-filter: blur(10px);
}

@media (min-width: 768px) {
  /* Desktop styles */
  .container.active .sign-in {
    transform: translateX(100%);
  }

  .sign-up {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.active .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
  }
}

@media (max-width: 767px) {
  /* Mobile styles */
  .container {
    min-height: 550px; /* Slightly taller on mobile */
  }

  .form-container {
    padding: 20px 0;
    width: 100%;
  }

  .sign-in, .sign-up {
    transition: all 0.6s ease-in-out;
  }

  .container.active .sign-in {
    transform: translateY(-100%);
  }

  .sign-up {
    transform: translateY(100%);
  }

  .container.active .sign-up {
    transform: translateY(0);
    opacity: 1;
    z-index: 5;
  }
}

@keyframes move {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
}

.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 150px 100px 0;
}

.toggle {
  background: linear-gradient(to right, #ff00ff, purple);
  height: 100%;
  color: #fff;
  position: relative;
  left: -100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
  box-shadow: 0px 0px 25px rgba(255, 0, 255, 0.6);
}

.container.active .toggle {
  transform: translateX(50%);
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.toggle-left {
  transform: translateX(-200%);
}

.container.active .toggle-left {
  transform: translateX(0);
}

.toggle-right {
  right: 0;
  transform: translateX(0);
}

.container.active .toggle-right {
  transform: translateX(200%);
}

.neon-text {
  color: #00f2ff;
}

.neon-input {
  background: #111;
  border: 2px solid transparent;
  padding: 12px;
  margin: 8px 0;
  color: #00f2ff;
  outline: none;
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
  width: 100%;
}

.neon-input:focus {
  border-color: #ff00ff;
  box-shadow: 0px 0px 10px #ff00ff, 0px 0px 20px #ff00ff;
}

.neon-button {
  background: linear-gradient(90deg, #ff00ff, #00f2ff);
  padding: 12px 30px;
  margin-top: 15px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.neon-button:hover {
  box-shadow: 0px 0px 15px #ff00ff, 0px 0px 30px #ff00ff;
  transform: scale(1.05);
}

.neon-button-outline {
  background: transparent;
  border: 2px solid #00f2ff;
  color: #00f2ff;
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.neon-button-outline:hover {
  background: #00f2ff;
  color: black;
  box-shadow: 0px 0px 15px #00f2ff, 0px 0px 30px #00f2ff;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .neon-input {
    padding: 10px;
  }

  .neon-button, .neon-button-outline {
    padding: 10px 20px;
    font-size: 14px;
  }
}
`}</style>
    </GoogleOAuthProvider>
  );
}

export default Login;
