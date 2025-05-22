import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Mail } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
      general: ''
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      // Redirect will be handled by AuthContext
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Invalid email or password'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white py-8 px-6 shadow rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#1E2022]">Welcome Back</h1>
          <p className="text-[#989090] mt-2">Sign in to access your account</p>
        </div>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            placeholder="your@email.com"
            error={errors.email}
            icon={<Mail className="h-5 w-5 text-[#989090]" />}
          />
          
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            placeholder="••••••••"
            error={errors.password}
            icon={<Lock className="h-5 w-5 text-[#989090]" />}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#CF2D2D] focus:ring-[#CF2D2D] border-[#B0BABF] rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#989090]">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-[#CF2D2D] hover:opacity-80">
                Forgot password?
              </a>
            </div>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-[#989090]">Don't have an account?</span>{' '}
          <Link to="/signup" className="font-medium text-[#CF2D2D] hover:opacity-80">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;