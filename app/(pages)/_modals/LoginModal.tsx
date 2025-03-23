'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Spotlight } from '@/app/_components/Spotlight';
import Image from 'next/image';
import logo from '@/app/assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { setLoginModalOpen } from '@/app/redux/reducers/basicData';
import { GitLogin, GoogleLogin } from '@/app/_services/login';
import { LuLoaderCircle } from 'react-icons/lu';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { unstable_batchedUpdates } from 'react-dom';

const LoginModal: React.FC = () => {
  const { loginModalOpen } = useSelector((state: RootState) => state.basicData);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const [gitLoad, setGitLoad] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);
  const dispatch = useDispatch();
  // const router = useRouter();
  // const user = useSession();

  const onClose = () => {
    try {
      dispatch(setLoginModalOpen(false));
    } catch (error) {
      console.log(error, 'Error closing Login modal');
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoad(true);
    await GoogleLogin();
    // if (result.success) {
    //   const name = user.data?.user?.name as String;
    //   const email = user.data?.user?.email as String;
    //   await ExecLogin({ provider: "google", name, email });
    // }
  };
  const handleGithubLogin = async () => {
    setGitLoad(true);
    const result = await GitLogin();
    if (result.success) {
      // console.log("pushed");
      // await ExecLogin({ provider: "github", name, email });
    }
  };

  // const ExecLogin = async ({ provider, email, name }: { provider: String; name: String; email: String }) => {
  //   try {
  //     console.log('1', provider, email, name);
  //     const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API}/user-data`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         provider,
  //         name,
  //         email,
  //       }),
  //     });

  //     console.log('2', apiResponse);
  //     if (apiResponse.status) {
  //       const userData = await apiResponse.json();

  //       dispatch(
  //         setAuthenticated({
  //           authStatus: true,
  //           name: userData.name as String,
  //           email: userData.email as String,
  //           projectId: userData.projectId as String,
  //         }),
  //       );

  //       // dispatch(setLoginModalOpen(false));

  //       // router.push("/projects");
  //     } else {
  //       console.error('API request failed:', await apiResponse.text());
  //     }
  //   } catch (error) {
  //     console.log('Error while login!');
  //   }
  //   unstable_batchedUpdates(() => {
  //     setGitLoad(false);
  //     setGoogleLoad(false);
  //   });
  // };

  //TODO
  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };

  // const handleEmailPassLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const result = await EmailPassLogin({ email, password });
  //   if (result.success) {
  //     dispatch(setLoginModalOpen(false));
  //   }
  //   setIsLoading(false);
  // };

  if (!loginModalOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-xl bg-[#0A0A0D] shadow-2xl md:mx-0 mx-3"
      >
        <div className="relative overflow-hidden">
          {/* Spotlight effect */}
          <div className="absolute inset-0 overflow-hidden">
            <Spotlight
              translateY={-100}
              width={400}
              height={400}
              duration={5}
              gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .05) 0, hsla(210, 100%, 55%, .01) 50%, hsla(210, 100%, 45%, 0) 80%)"
              gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .03) 0, hsla(210, 100%, 55%, .01) 80%, transparent 100%)"
              gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .02) 0, hsla(210, 100%, 45%, .01) 80%, transparent 100%)"
            />
          </div>

          {/* Content */}
          <div className="relative p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between text-balance flex-col space-y-3">
              <Image src={logo} alt="uiblocks" width={40} height={40} className="rounded-md" />
              <p className="text-sm font-sans font-medium text-white text-center">
                Join the community of 100+ devs, UI/UX designers and people whole{' '}
                <span className="underline">love UIblocks</span>!
              </p>
            </div>

            {/* Form */}
            {/* <form onSubmit={handleEmailPassLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/70"
                >
                  Email
                </label>
                <input
                  disabled={gitLoad || googleLoad || isLoading}
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="text-xs font-sans font-medium mt-1 block w-full rounded-md border-white/10 bg-white/5 p-2  text-white placeholder-white/40 shadow-sm focus:border-none focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/70"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="text-xs font-sans font-medium mt-1 block w-full rounded-md border-white/10 bg-white/5 p-2  text-white placeholder-white/40 shadow-sm focus:border-none focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={gitLoad || googleLoad || isLoading}
                className="w-full rounded-md bg-white px-4 py-2 font-medium text-black shadow-sm hover:bg-gray-100 focus:outline-none transition-colors font-sans text-xs"
              >
                {isLoading ? (
                  <LuLoaderCircle className="text-black animate-spin text-sm" />
                ) : (
                  "Continue"
                )}
              </button>
            </form> */}

            {/* Divider */}
            {/* <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="mx-2 text-xs text-white/40">OR</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div> */}

            {/* Social Login */}
            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                disabled={gitLoad || googleLoad}
                className="flex w-full items-center justify-center rounded-md bg-white/5 p-2 text-xs font-medium text-white hover:bg-white/10 focus:outline-none transition-colors"
              >
                {googleLoad ? (
                  <LuLoaderCircle className="animate-spin text-white text-sm" />
                ) : (
                  <>
                    <svg
                      className="mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              <button
                onClick={handleGithubLogin}
                disabled={gitLoad || googleLoad}
                className="flex w-full items-center justify-center rounded-md bg-white/5 p-2 text-xs font-medium text-white hover:bg-white/10 focus:outline-none transition-colors"
              >
                {gitLoad ? (
                  <LuLoaderCircle className="animate-spin text-white text-sm" />
                ) : (
                  <>
                    <svg
                      className="mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        fill="white"
                      />
                    </svg>
                    Continue with GitHub
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
