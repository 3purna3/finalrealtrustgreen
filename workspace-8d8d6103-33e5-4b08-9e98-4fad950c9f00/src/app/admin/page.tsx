'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Validate token with backend
    const validateToken = async () => {
      try {
        const response = await fetch('/api/admin/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          router.push('/admin/login');
          return;
        }

        router.push('/admin/dashboard');
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
      }
    };

    validateToken();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>
  );
}
