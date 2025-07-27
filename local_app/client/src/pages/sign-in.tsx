import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

type SignInRequest = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<SignInRequest>({
    defaultValues: {
      email: "pavansaireddy30@gmail.com",
      password: "",
    },
  });

  const signInMutation = useMutation({
    mutationFn: async (data: SignInRequest) => {
      const response = await fetch("http://127.0.0.1:8001/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: data.email,
          password: data.password,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      window.location.href = "/dashboard";
    },
    onError: (error: Error) => {
      console.error("Full login error:", error);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message || "An unexpected error occurred. Please check the console for details.",
      });
    },
  });

  const onSubmit = (data: SignInRequest) => {
    signInMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--dashboard-bg)' }}>
      <div className="max-w-md w-full mx-4">
        <Card className="bg-card rounded-2xl shadow-lg border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                Welcome Back
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Sign in to your time tracking dashboard
              </p>
            </div>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.password.message}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Remember me
                  </Label>
                </div>
                <button 
                  type="button" 
                  className="text-sm hover:underline transition-colors"
                  style={{ color: 'var(--secondary)' }}
                >
                  Forgot password?
                </button>
              </div>
              
              <Button
                type="submit"
                disabled={signInMutation.isPending}
                className="w-full py-3 px-4 rounded-xl font-medium transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{ 
                  backgroundColor: 'var(--secondary)', 
                  color: 'white',
                }}
              >
                {signInMutation.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
