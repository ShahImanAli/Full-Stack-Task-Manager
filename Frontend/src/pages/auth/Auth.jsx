import React, { useState } from "react";
import SignIn from "../../components/auth/Sign-In/SignIn";
import SignUp from "../../components/auth/Sign-Up/SignUp";
import CommonButton from "../../components/common-button/CommonButton";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        {isLogin ? <SignIn /> : <SignUp />}
        {/* <div className="mt-6 text-center">
          <CommonButton
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            buttonText={isLogin ? "Switch to Sign Up" : "Switch to Sign In"}
          />
        </div> */}
      </div>
    </div>
  );
}

export default Auth;
