import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Login from './components/Login';
import { AuthContext } from './contexts/AuthProvider'; // Import AuthContext for mocking

// Mock auth context to simulate login and loginwithGoogle functions
const mockAuthContext = {
  login: jest.fn(),
  loginwithGoogle: jest.fn(),
};

// Test case phân lớp tương đương
describe('Login Form - Equivalent Partitioning Tests', () => {
  beforeEach(() => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>
    );
  });

  test('should show error for invalid email format', () => {
    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    // Nhập email không hợp lệ
    fireEvent.change(emailInput, { target: { value: 'userexample.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validPassword123' } });
    fireEvent.click(loginButton);

    // Kiểm tra thông báo lỗi email không hợp lệ
    expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    expect(mockAuthContext.login).not.toHaveBeenCalled(); // Ensure login is not called
  });

  test('should show error for password too short', () => {
    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    // Nhập email hợp lệ nhưng mật khẩu quá ngắn
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.click(loginButton);

    // Kiểm tra thông báo lỗi độ dài mật khẩu
    expect(screen.getByText(/Password must be between 6 and 20 characters/i)).toBeInTheDocument();
    expect(mockAuthContext.login).not.toHaveBeenCalled(); // Ensure login is not called
  });

  test('should login successfully with valid email and password', () => {
    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    // Nhập email và mật khẩu hợp lệ
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validPassword123' } });
    fireEvent.click(loginButton);

    // Kiểm tra rằng không có thông báo lỗi (login thành công)
    expect(screen.queryByText(/Invalid email format/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Password must be between 6 and 20 characters/i)).not.toBeInTheDocument();

    // Kiểm tra xem login có được gọi với email và mật khẩu hợp lệ không
    expect(mockAuthContext.login).toHaveBeenCalledWith('user@example.com', 'validPassword123');
  });
});

// Test case giá trị biên
describe('Login Form - Boundary Value Analysis Tests', () => {
  test('should login with boundary value for email', () => {
    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    // Email gần ranh giới hợp lệ (ví dụ user@x.co)
    fireEvent.change(emailInput, { target: { value: 'user@x.co' } });
    fireEvent.change(passwordInput, { target: { value: 'validPassword123' } });
    fireEvent.click(loginButton);

    // Kiểm tra rằng không có thông báo lỗi (email hợp lệ)
    expect(screen.queryByText(/Invalid email format/i)).not.toBeInTheDocument();
    expect(mockAuthContext.login).toHaveBeenCalledWith('user@x.co', 'validPassword123');
  });

  test('should show error for password length just below 6 characters', () => {
    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    // Mật khẩu quá ngắn (giá trị biên dưới 6 ký tự)
    fireEvent.change(passwordInput, { target: { value: 'passw' } });
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.click(loginButton);

    // Kiểm tra thông báo lỗi mật khẩu ngắn
    expect(screen.getByText(/Password must be between 6 and 20 characters/i)).toBeInTheDocument();
    expect(mockAuthContext.login).not.toHaveBeenCalled(); // Ensure login is not called
  });

  test('should login with password length exactly 6 characters', () => {
    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    // Mật khẩu có đúng 6 ký tự (giá trị biên hợp lệ)
    fireEvent.change(passwordInput, { target: { value: 'passw1' } });
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.click(loginButton);

    // Kiểm tra rằng không có thông báo lỗi (login thành công)
    expect(screen.queryByText(/Password must be between 6 and 20 characters/i)).not.toBeInTheDocument();
    expect(mockAuthContext.login).toHaveBeenCalledWith('user@example.com', 'passw1');
  });
});
