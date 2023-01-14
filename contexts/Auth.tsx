import { AuthError, User } from '@supabase/supabase-js';
import React, { createContext, FC, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../api/supabase';

export type SignInPayload = { email: string; password: string };
export type UserProps = { email: string; name: string; id: string };
export interface AuthContextProps {
  user?: UserProps | null;
  signIn(arg0: SignInPayload): Promise<unknown>;
  signUp(arg0: SignInPayload): Promise<unknown>;
  signOut(): Promise<unknown>;
  setupUser: (payload: User | null) => void;
}
export const AuthContext = createContext<AuthContextProps>({
  signIn: (arg0: SignInPayload) => Promise.resolve(),
  signUp: (arg0: SignInPayload) => Promise.resolve(),
  signOut: () => Promise.resolve(),
  setupUser: () => {}
});

const checkError = ({
  data,
  error
}: {
  data?: {
    user: User | null;
  };
  error: AuthError | null;
}) => {
  if (error) throw error;
  else return data;
};

const handleError = (error: AuthError | null) => {
  if (error) Alert.alert('Authentication Error', error.message);
};

export const AuthContextProvider: FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<UserProps | null | undefined>();

  // setupUser - formats and setup user in context
  const setupUser = (payload: User | null) => {
    const { id, email, user_metadata } = payload! as User & {
      data: { name: string };
    };
    if (email) setUser({ id, email, name: user_metadata.name });
  };

  const signUp = (payload: SignInPayload) =>
    new Promise((res, rej) =>
      supabase.auth
        .signUp(payload)
        .then(checkError)
        .then(res)
        .catch((error) => {
          handleError(error);
          rej(error);
        })
    );

  const signIn = (payload: SignInPayload) =>
    new Promise((res, rej) =>
      supabase.auth
        .signInWithPassword(payload)
        .then(checkError)
        .then((data) => {
          if (data) setupUser(data.user);
        })
        .then(res)
        .catch((error) => {
          handleError(error);
          rej(error);
        })
    );

  const signOut = () =>
    new Promise((res, rej) =>
      supabase.auth
        .signOut()
        .then(checkError)
        .then(() => setUser(null))
        .then(res)
        .catch((error) => {
          handleError(error);
          rej(error);
        })
    );

  useEffect(() => {
    // - Check user persistence
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setupUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, setupUser }}>
      {children}
    </AuthContext.Provider>
  );
};
