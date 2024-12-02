import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './components/Signup';
import { AuthContext } from './contects/AuthProvider';

// Mock auth context to simulate createUser and loginwithGoogle
const mockAuthContext = {
  createUser: jest.fn().mockResolvedValue({ user: { email: 'validemail@example.com' } }), // Resolves a mock user object
  loginwithGoogle: jest.fn().mockResolvedValue({ user: { email: 'googleuser@example.com' } }), // Mock Google login
};

describe('Signup Component', () => {
  beforeEach(() => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Router>
          <Signup/>
        </Router>
      </AuthContext.Provider>
    );
  });

  test('renders signup form correctly', () => {
    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  test('signup with valid email and password', async () => {
    // Fill out the form with valid inputs
    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'validemail@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'validPassword123' } });

    // Submit the form
    fireEvent.click(screen.getByText('Sign up'));

    // Wait for async createUser function to be called
    await waitFor(() => {
      expect(mockAuthContext.createUser).toHaveBeenCalledWith('validemail@example.com', 'validPassword123');
    });
  });

  test('signup with invalid email (boundary value)', async () => {
    // Test with invalid email
    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'validPassword123' } });

    // Submit the form
    fireEvent.click(screen.getByText('Sign up'));

    // Wait for error to appear, createUser should not be called
    await waitFor(() => {
      expect(mockAuthContext.createUser).not.toHaveBeenCalled();
      expect(screen.getByText('Invalid email format')).toBeInTheDocument(); // Check for error message
    });
  });

  test('signup with short password (boundary value)', async () => {
    // Test with password that's too short (e.g., boundary condition)
    fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'validemail@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123' } });  // Too short

    // Submit the form
    fireEvent.click(screen.getByText('Sign up'));

    // Wait for error to appear, createUser should not be called
    await waitFor(() => {
      expect(mockAuthContext.createUser).not.toHaveBeenCalled();
      expect(screen.getByText('Password must be between 6 and 20 characters')).toBeInTheDocument(); // Check for error message
    });
  });

  test('signup using Google', async () => {
    // Test for Google sign-up
    fireEvent.click(screen.getByText('Login with Google'));

    // Wait for async loginwithGoogle function to be called
    await waitFor(() => {
      expect(mockAuthContext.loginwithGoogle).toHaveBeenCalled();
    });
  });
});
