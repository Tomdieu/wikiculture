import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <React.Fragment>
      <div className="mx-auto space-y-4">
        <div className="space-y-2 text-center lg:text-left">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
          </div>
          <Button className="w-full">Login</Button>
          <Link
            className="inline-block w-full text-center text-sm underline"
            href="#"
          >
            Forgot your password?
          </Link>
          <Separator />
            <div className="space-y-4">
              
              <div className="mt-4 text-center text-sm">
                Don't have an account?
                <Link className="underline mx-1" href={"/register"}>
                  Register
                </Link>
              </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
