'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuLoaderCircle } from 'react-icons/lu';

const protectedRoutes = ['/projects/*'];

const RouteProtector: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const validateSessionAndRoute = async () => {
      const isProtectedRoute = protectedRoutes.some((route) => {
        if (route.endsWith('/*')) {
          const baseRoute = route.slice(0, -2);
          return pathname.startsWith(baseRoute);
        }
        return pathname === route;
      });

      if (!isProtectedRoute) {
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      // const sessionid = localStorage.getItem("session") || "";
      // const id = localStorage.getItem("id") || "";
      // const isSessionValid = await sessionHelper({ session: sessionid, id });

      if (isProtectedRoute || pathname === '/projects') {
        router.push('/');
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    validateSessionAndRoute();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#141415]">
        <LuLoaderCircle className="text-white text-3xl animate-spin" />
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default RouteProtector;
