// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { loginUser, registerUser } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "login" | "register";

function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // One mutation for both modes. Registering creates the account first,
  // then both modes log in, so a new user lands inside the app right away.
  const auth = useMutation({
    mutationFn: async () => {
      if (mode === "register") {
        await registerUser({ name, email, password });
      }
      return loginUser({ email, password });
    },
    onSuccess: (data) => {
      login(data.token, data.user.name);
      navigate("/shoots");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    auth.mutate();
  };

  const switchMode = (): void => {
    auth.reset(); // clear any old error message
    setMode(mode === "login" ? "register" : "login");
  };

  const isRegister = mode === "register";
  const missingField =
    email === "" || password === "" || (isRegister && name === "");

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {isRegister ? "Create account" : "Login"}
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {isRegister && (
          <div className="grid gap-1.5">
            <Label htmlFor="name" className="text-foreground">
              Your name</Label>
            <Input id="name" value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name" autoComplete="name" />
          </div>
        )}

        <div className="grid gap-1.5">
          <Label htmlFor="email" className="text-foreground">
            Email</Label>
          <Input id="email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" autoComplete="email" />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="password" className="text-foreground">
            Password</Label>
          <Input id="password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete={isRegister ? "new-password" : "current-password"} />
        </div>

        {auth.isError && (
          <p className="text-sm text-red-700">{auth.error.message}</p>
        )}

        <Button type="submit" disabled={missingField || auth.isPending}
          className="justify-self-start">
          {auth.isPending
            ? "Please wait..."
            : isRegister
              ? "Create account"
              : "Log In"}
        </Button>
      </form>

      <button type="button" onClick={switchMode}
        className="mt-4 text-sm text-blue-600 underline dark:text-blue-400">
        {isRegister
          ? "Already have an account? Log in"
          : "No account yet? Create one"}
      </button>
    </div>
  );
}

export default LoginPage;