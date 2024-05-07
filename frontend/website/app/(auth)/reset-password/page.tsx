import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Img from "@/components/Img";

import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Wikiculture | Reset Password',
    description: 'Reset Password',
  
  }

type Props = {};

const ResetPasswordPage = (props: Props) => {
    return (
        <React.Fragment>
            <div className="mx-auto space-y-4 w-full">
                <div className={"w-full flex items-center justify-center"}>
                    <Img/>
                </div>
                <div className="space-y-2 text-center lg:text-left">
                    <h1 className="text-3xl font-bold">Forgot Password</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Enter your email below
                    </p>
                </div>
                <div className="space-y-4 w-full">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="m@example.com"
                            required
                            type="email"

                        />
                        <p className={"text-xs text-muted-foreground"}>An reset link will be send to this email</p>
                    </div>

                    <Button className="w-full">Send</Button>

                    <Separator/>
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

export default ResetPasswordPage;
