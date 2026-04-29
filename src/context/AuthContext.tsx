import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type AuthSession, type TelegramAuthPayload } from "@/types/auth";

type AuthContextValue = {
  session: AuthSession | null;
  isHydrated: boolean;
  isAuthenticating: boolean;
  signInWithTelegram: (payload: TelegramAuthPayload) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchAuthSession() {
  try {
    const { data } = await axios.get<{ session: AuthSession | null }>(
      "/api/auth/me",
      {
        withCredentials: true,
      },
    );
    return data.session;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const refreshSession = async () => {
    const nextSession = await fetchAuthSession();
    setSession(nextSession);
  };

  useEffect(() => {
    void (async () => {
      await refreshSession();
      setIsHydrated(true);
    })();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isHydrated,
      isAuthenticating,
      refreshSession,
      signInWithTelegram: async (payload) => {
        setIsAuthenticating(true);

        try {
          const { data } = await axios.post<{ session: AuthSession }>(
            "/api/auth/telegram/verify",
            payload,
            {
              withCredentials: true,
            },
          );
          setSession(data.session);
        } finally {
          setIsAuthenticating(false);
        }
      },
      signOut: async () => {
        await axios.post(
          "/api/auth/logout",
          {},
          {
            withCredentials: true,
          },
        );
        setSession(null);
      },
    }),
    [isAuthenticating, isHydrated, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
