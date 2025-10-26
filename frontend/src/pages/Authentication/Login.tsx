import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/api/user/userQueries";
import { useLoginWithGoogle } from "@/api/auth/authQueries";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

export const Login = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useCurrentUser();
  const loginMutation = useLoginWithGoogle();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/", { replace: true });
    }
  }, [user, isLoading, navigate]);

  const handleGoogleLogin = (response: CredentialResponse) => {
    if (response.credential) {
      loginMutation.mutate({ idToken: response.credential });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <h1 className="text-7xl font-bold">Welcome to Timesink!</h1>

      <div className="flex flex-col gap-2 min-w-[300px] items-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.error("Google login failed")}
          size="large"
          width={"200px"}
          shape="pill"
        />

        {loginMutation.isError && <p className="text-red-500 text-sm mt-2">"Login failed"</p>}
      </div>
    </div>
  );
};
