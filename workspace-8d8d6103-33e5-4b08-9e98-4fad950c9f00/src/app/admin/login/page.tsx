'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Shield, Lock, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        toast({
          title: 'Login Successful',
          description: 'Welcome to REAL TRUST Admin Panel!',
        });
        router.push('/admin/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">RT</span>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                REAL TRUST
              </div>
              <div className="text-sm text-slate-500">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-emerald-100">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-emerald-600" />
              Admin Login
            </CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Username
                </label>
                <Input
                  required
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-base font-semibold"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login to Dashboard'}
              </Button>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-emerald-800">
                      Default Admin Credentials
                    </p>
                    <p className="text-sm text-emerald-700">
                      Username: <span className="font-bold">admin</span>
                    </p>
                    <p className="text-sm text-emerald-700">
                      Password: <span className="font-bold">RealTrust@2025</span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
