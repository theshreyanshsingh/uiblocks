'use client';

import { signIn } from 'next-auth/react';

export const GitLogin = async () => {
  try {
    const prompt = sessionStorage.getItem('input');
    const projectId = sessionStorage.getItem('projectId');
    if (prompt && projectId) {
      await signIn('github', {
        redirect: false,
        callbackUrl: `/projects/${projectId}`,
      });
    } else {
      await signIn('github', {
        redirect: false,
        callbackUrl: `/`,
      });
    }
    return {
      success: true,
      message: 'Authentication initiated successfully',
      redirectUrl: '/',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Authentication failed',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const GoogleLogin = async () => {
  try {
    const prompt = sessionStorage.getItem('input');
    const projectId = sessionStorage.getItem('projectId');
    if (prompt && projectId) {
      await signIn('google', {
        redirect: false,
        callbackUrl: `/projects/${projectId}`,
      });
    } else {
      await signIn('google', {
        redirect: false,
        callbackUrl: `/`,
      });
    }

    return {
      success: true,
      message: 'Authentication initiated successfully',
      redirectUrl: '/',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Authentication failed',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const EmailPassLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      message: 'Authentication initiated successfully',
      redirectUrl: '/',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Authentication failed',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const JoinBeta = async ({ email, name }: { email: string; name: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/join-beta`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name }),
  });
  const responseData = await response.json();

  return response.ok && responseData.success
    ? { success: true, message: 'Request success!', redirectUrl: '/' }
    : {
        success: false,
        message: responseData.message,
        error: response.statusText,
      };
};
export const VerifyBeta = async ({ email, name, otp }: { email: string; name: string; otp: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/verify-beta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, otp }),
    });
    const result = await response.json();
    return {
      success: result.success,
      message: result.message,
      redirectUrl: result.redirectUrl ?? '/',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong!',
      error: error instanceof Error ? error.message : String(error),
      redirectUrl: '/',
    };
  }
};
