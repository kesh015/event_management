import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Mail } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const SignupForm: React.FC = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: ''
    };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

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
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await signup(formData.name, formData.email, formData.password);
      // Redirect will be handled by AuthContext
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Could not create account. Email may already be in use.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white py-8 px-6 shadow rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#1E2022]">Create an Account</h1>
          <p className="text-[#989090] mt-2">Join to discover amazing events</p>
        </div>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            placeholder="John Doe"
            error={errors.name}
            icon={<User className="h-5 w-5 text-[#989090]" />}
          />
          
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
          
          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            placeholder="••••••••"
            error={errors.confirmPassword}
            icon={<Lock className="h-5 w-5 text-[#989090]" />}
          />
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-[#CF2D2D] focus:ring-[#CF2D2D] border-[#B0BABF] rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-[#989090]">
              I agree to the <a href="#" className="text-[#CF2D2D] hover:opacity-80">Terms of Service</a> and <a href="#" className="text-[#CF2D2D] hover:opacity-80">Privacy Policy</a>
            </label>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-[#989090]">Already have an account?</span>{' '}
          <Link to="/login" className="font-medium text-[#CF2D2D] hover:opacity-80">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;