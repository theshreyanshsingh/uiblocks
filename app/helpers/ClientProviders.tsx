'use client';

import { ReactNode } from 'react';
import { PostHogProvider } from './PosthogProvider';
import { SessionProvider } from 'next-auth/react';
import ReduxProvider from '../redux/ReduxProvider';
import NotificationModal from '../(pages)/_modals/NotificationModal';
import RouteProtector from './RouteProtector';
import AllModals from '../(pages)/_modals/AllModals';

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <PostHogProvider>
      <SessionProvider>
        <ReduxProvider>
          <NotificationModal />
          <AllModals />
          <RouteProtector>{children}</RouteProtector>
        </ReduxProvider>
      </SessionProvider>
    </PostHogProvider>
  );
}
