import authProvider from "@/providers/http/auth";
import { IAuth } from "@/providers/http/auth/interface";
import { ISignUp } from "@/schema/auth.schema";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useSignIn(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: IAuth) => authProvider.signIn(data),
    getMutationOptions(queryClient, "me", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useSignUp(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ISignUp) => authProvider.signUp(data),
    getMutationOptions(queryClient, "me", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useSignOut(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    () => authProvider.signOut(),
    getMutationOptions(queryClient, "me", null, {
      onSuccess: onSuccessCallback,
    })
  );
}
