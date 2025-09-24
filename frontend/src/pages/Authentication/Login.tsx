import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginWithGoogle } from "@/api/auth/authQueries";
import { useCurrentUser } from "@/api/user/userQueries";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { Button } from "@/components/ui/button";

export const Login = () => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const loginMutation = useLoginWithGoogle();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = (response: CredentialResponse) => {
    if (response.credential) {
      loginMutation.mutate({ idToken: response.credential });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <h1 className="text-7xl font-bold">Login</h1>

      <div className="flex flex-col gap-2 min-w-[300px] items-center">
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error("Google login failed")} />

        {loginMutation.isError && <p className="text-red-500 text-sm mt-2">"Login failed"</p>}

        {loginMutation.isPending && (
          <Button disabled className="mt-2">
            Logging in...
          </Button>
        )}
      </div>
    </div>
  );
};
