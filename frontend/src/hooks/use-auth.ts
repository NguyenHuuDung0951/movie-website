import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "@/lib/api";
import { RootState } from "@/store";
import { clearAuth, setAuth } from "@/store/auth-slice";
import { clearToken, loginApi, persistToken, registerApi } from "@/features/auth/auth-api";
import { LoginFormInput, RegisterFormInput } from "@/features/auth/schemas";
import { User } from "@/features/auth/types";

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const loginMutation = useMutation({
    mutationFn: (payload: LoginFormInput) => loginApi(payload),
    onSuccess: (data) => {
      persistToken(data.token);
      dispatch(setAuth({ token: data.token, user: data.user }));
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterFormInput) => registerApi(payload),
  });

  const meQuery = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const token = authState.token || localStorage.getItem("token");
      if (!token) {
        return null;
      }
      const response = await api.get<{ user: User }>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setAuth({ token, user: response.data.user }));
      return response.data.user;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (meQuery.isError) {
      clearToken();
      dispatch(clearAuth());
    }
  }, [dispatch, meQuery.isError]);

  const logout = () => {
    clearToken();
    dispatch(clearAuth());
  };

  return {
    authState,
    loginMutation,
    registerMutation,
    meQuery,
    logout,
  };
};
