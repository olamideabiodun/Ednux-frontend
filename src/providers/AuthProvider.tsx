"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { mockAuthService } from '@/lib/mockAuth';

// Use mock auth service in development mode
const USE_MOCK_AUTH = true;

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyOTP: (otp: string, method: 'phone' | 'email') => Promise<void>;
  resendOTP: (method: 'phone' | 'email') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('ednux_token');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        if (USE_MOCK_AUTH) {
          // Use mock auth service
          const mockUser = await mockAuthService.getCurrentUser();
          if (mockUser) {
            setUser(mockUser);
          }
        } else {
          // Use real API
          const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.data.user) {
            setUser(response.data.user);
          }
        }
      } catch (error) {
        localStorage.removeItem('ednux_token');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (USE_MOCK_AUTH) {
        // Use mock auth service
        const result = await mockAuthService.login(email, password);
        localStorage.setItem('ednux_token', result.token);
        setUser(result.user);
      } else {
        // Use real API
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
          email,
          password,
        });
        
        const { token, user } = response.data;
        localStorage.setItem('ednux_token', token);
        setUser(user);
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    try {
      if (USE_MOCK_AUTH) {
        // Use mock auth service
        await mockAuthService.register(name, email, phone, password);
      } else {
        // Use real API
        await axios.post(`${API_BASE_URL}/api/auth/register`, {
          name,
          email,
          phone,
          password,
        });
        
        // Store email in localStorage for OTP verification
        localStorage.setItem('ednux_verification_email', email);
        localStorage.setItem('ednux_verification_phone', phone);
      }
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = async () => {
    try {
      if (USE_MOCK_AUTH) {
        // Use mock auth service
        await mockAuthService.logout();
      } else {
        // Use real API
        const token = localStorage.getItem('ednux_token');
        if (token) {
          await axios.post(
            `${API_BASE_URL}/api/auth/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('ednux_token');
      setUser(null);
      router.push('/login');
    }
  };

  const loginWithGoogle = async () => {
    if (USE_MOCK_AUTH) {
      // Use mock auth service for development
      try {
        const result = await mockAuthService.loginWithGoogle();
        localStorage.setItem('ednux_token', result.token);
        setUser(result.user);
      } catch (error) {
        throw new Error('Google login failed');
      }
    } else {
      // This would typically open a popup or redirect for Google OAuth in production
      try {
        window.open(`${API_BASE_URL}/api/auth/google`, '_self');
      } catch (error) {
        throw new Error('Google login failed');
      }
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      if (USE_MOCK_AUTH) {
        // Use mock auth service
        await mockAuthService.forgotPassword(email);
      } else {
        // Use real API
        await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
      }
    } catch (error) {
      throw new Error('Failed to send password reset email');
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      if (USE_MOCK_AUTH) {
        // Use mock auth service
        await mockAuthService.resetPassword(token, newPassword);
      } else {
        // Use real API
        await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
          token,
          password: newPassword,
        });
      }
    } catch (error) {
      throw new Error('Password reset failed');
    }
  };

  const verifyOTP = async (otp: string, method: 'phone' | 'email') => {
    try {
      if (USE_MOCK_AUTH) {
        // Use mock auth service
        const result = await mockAuthService.verifyOTP(otp, method);
        localStorage.setItem('ednux_token', result.token);
        setUser(result.user);
      } else {
        // Use real API
        const verificationData: any = {
          otp,
        };
        
        if (method === 'email') {
          verificationData.email = localStorage.getItem('ednux_verification_email');
        } else {
          verificationData.phone = localStorage.getItem('ednux_verification_phone');
        }
        
        const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, verificationData);
        
        const { token, user } = response.data;
        localStorage.setItem('ednux_token', token);
        setUser(user);
        
        // Clear verification data
        localStorage.removeItem('ednux_verification_email');
        localStorage.removeItem('ednux_verification_phone');
      }
    } catch (error) {
      throw new Error('OTP verification failed');
    }
  };

  const resendOTP = async (method: 'phone' | 'email') => {
    try {
      if (USE_MOCK_AUTH) {
        // Use mock auth service
        await mockAuthService.resendOTP();
      } else {
        // Use real API
        const verificationData: any = {};
        
        if (method === 'email') {
          verificationData.email = localStorage.getItem('ednux_verification_email');
        } else {
          verificationData.phone = localStorage.getItem('ednux_verification_phone');
        }
        
        await axios.post(`${API_BASE_URL}/api/auth/resend-otp`, verificationData);
      }
    } catch (error) {
      throw new Error('Failed to resend OTP');
    }
  };
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    loginWithGoogle,
    forgotPassword,
    resetPassword,
    verifyOTP,
    resendOTP,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext };