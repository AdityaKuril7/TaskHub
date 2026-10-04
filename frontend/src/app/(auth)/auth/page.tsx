"use client";
import Image from "next/image";
import { Lock, LucideMail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IAuth } from "@/types/auth-types";
import useLogin from "@/hooks/auth/use-login";
import useSignup from "@/hooks/auth/use-signup";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const initialForm: IAuth = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState<IAuth>(initialForm);

  const handleChange = (key: keyof IAuth, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  function handleLogin() {
    loginMutation.mutate(form);
    console.log("Logging Done");
    router.push("/");
  }

  function handleSignup() {
    signupMutation.mutate(form);
    console.log("Signup Done");
  }

  const loading = loginMutation.isPending || signupMutation.isPending;
  const error = loginMutation.error || signupMutation.error;

  return (
    <div
      className={"h-screen w-screen flex items-center justify-center relative"}
    >
      <div className={"h-screen w-screen absolute -z-20"}>
        <Image src={"/background.jpg"} alt={"background"} fill />
      </div>

      <div
        className={
          "w-100 scale-120 h-auto p-5 bg-white/20 backdrop-blur-xl border-white/30 border-2 rounded-lg flex flex-col gap-5"
        }
      >
        <div className={"flex w-full items-center justify-center"}>
          <p className={"font-black text-xl "}>
            {isLogin ? "Welcome Back" : "Create account"}
          </p>
        </div>
        <div className={"flex flex-col gap-5"}>
          <div
            className={
              "w-full h-auto p-3 flex items-center border-black border-2 gap-3 rounded-lg"
            }
          >
            <LucideMail />
            <input
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              type="email"
              placeholder={"Enter your email"}
              className={"w-full h-full focus:outline-none"}
            />
          </div>
          <div
            className={
              "w-full h-auto p-3 flex items-center border-black border-2 gap-3 rounded-lg"
            }
          >
            <Lock />
            <input
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              type="email"
              placeholder={"●●●●●●●●"}
              className={"w-full h-full focus:outline-none"}
            />
          </div>
          <Button
            onClick={isLogin ? handleLogin : handleSignup}
            className={"p-3"}
          >
            {loading ? "Loading..." : isLogin ? "Log in" : "Sign up"}
          </Button>
          <p
            onClick={() => setIsLogin(!isLogin)}
            className={"text-center cursor-pointer font-bold"}
          >
            {isLogin
              ? "Don't have an account ? Sign up"
              : "Already have an account ? Log in"}
          </p>
          {error && <p className={"text-center"}>{error.message}</p>}
        </div>
      </div>
    </div>
  );
}
