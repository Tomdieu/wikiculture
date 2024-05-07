"use client"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import Img from "@/components/Img";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"


type Props = {};


const LoginPage = (props: Props) => {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })


    async function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
        const res = await signIn("credentials", { username: values.username, password: values.password, redirect: false })
        console.log("Response : ", { ...res })
        if (res && res.ok) {
            router.refresh()
            console.log("Url : ", res.url)
            toast({
                title: "Authentication",
                description: "Login Successfully",
              })
            if (res.url) {
                const url = new URL(res.url);
                const callbackUrl = url.searchParams.get('callbackUrl');
                if (callbackUrl) {
                    const decodedCallbackUrl = decodeURIComponent(callbackUrl);

                    router.push(decodedCallbackUrl)
                }
                else {
                    router.push("/dashboard")
                }
            }

        }
    }

        return (
            <React.Fragment>
                <Form {...form}>
                    <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-4 w-full">
                        <div className={"w-full flex items-center justify-center"}>
                            <Img />
                        </div>
                        <div className="space-y-2 text-center lg:text-left">
                            <h1 className="text-3xl font-bold text-center">Login</h1>
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Enter your email below to login to your account
                            </p>
                        </div>
                        <div className="space-y-4">

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {/* <ol className="list-disc ml-5">
                                            <li>Should be atleast 8 characters long</li>
                                            <li>Different from your username</li>
                                        </ol> */}

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            <Button type="submit" className="w-full">Login</Button>
                            <Link
                                className="inline-block w-full text-center text-sm underline"
                                href={"/reset-password"}
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
                    </form>
                </Form>
            </React.Fragment>
        );
    };

    export default LoginPage;
