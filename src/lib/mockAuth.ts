// src/lib/mockAuth.ts

// Mock user data
export const mockUser = {
    id: 'mock-user-1',
    name: 'Boss Samsay',
    email: 'boss.samsay@example.com',
    avatar: '/assets/images/avatar.png',
    role: 'student',
  };
  
  // Mock authentication functions
  export const mockAuthService = {
    login: async (email: string, password: string) => {
      // Simple validation - any non-empty values will work
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Return mock user and token
      return {
        user: mockUser,
        token: 'mock-jwt-token-for-development',
      };
    },
    
    register: async (name: string, email: string, phone: string, password: string) => {
      if (!name || !email || !phone || !password) {
        throw new Error('All fields are required');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store verification data in localStorage
      localStorage.setItem('ednux_verification_email', email);
      localStorage.setItem('ednux_verification_phone', phone);
      
      return true;
    },
    
    verifyOTP: async (otp: string, method: 'phone' | 'email') => {
      if (!otp || otp.length !== 4) {
        throw new Error('Valid OTP is required');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Clear verification data
      localStorage.removeItem('ednux_verification_email');
      localStorage.removeItem('ednux_verification_phone');
      
      // Return mock user and token
      return {
        user: mockUser,
        token: 'mock-jwt-token-for-development',
      };
    },
    
    resendOTP: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    },
    
    forgotPassword: async (email: string) => {
      if (!email) {
        throw new Error('Email is required');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      return true;
    },
    
    resetPassword: async (token: string, newPassword: string) => {
      if (!token || !newPassword) {
        throw new Error('Token and new password are required');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      return true;
    },
    
    logout: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return true;
    },
    
    loginWithGoogle: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Return mock user and token
      return {
        user: mockUser,
        token: 'mock-google-auth-token-for-development',
      };
    },
    
    getCurrentUser: async () => {
      // Check if we have a token
      const token = localStorage.getItem('ednux_token');
      
      if (!token) {
        return null;
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockUser;
    }
  };