"use client"
import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { Separator } from "@/components/ui/separator"
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
import { signUpSchema, signUpSchemaType } from '@/schema/register.schema'
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserType } from '@/types'



type Props = {}

const RegisterPage = (props: Props) => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<signUpSchemaType>({
        resolver: zodResolver(signUpSchema), defaultValues: {
            username: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            confirmPassword: ""
        }
    })
    async function onSubmit(values: signUpSchemaType) {
        const body = JSON.stringify(values)
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/register/", {
            method: "POST",
            body: body,
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json() as UserType;
        if (data.id) {
            toast({
                title: "Authentication",
                description: "Account Created Successfully",
            })

            const res = await signIn("credentials", { username: values.username, password: values.password, redirect: false })
            if (res && res.ok) {
                router.refresh()
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
        else {

        }
    }
    return (
        <React.Fragment>
            <Form {...form}>
                <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-4 w-full">
                    <div className={"w-full flex items-center justify-center"}>
                        <Img />
                    </div>
                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold">Create an account</h2>
                        <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Navi" {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Corp" {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )} />
                        </div>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ivantom" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="support@wikiculture.cm" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is email is not displayed publicly.
                                    </FormDescription>
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
                                        <Input placeholder="*****************" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Password should be atleast 8 character(s) long
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="*****************" {...field} />
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <Button className="w-full" type="submit">
                            Sign Up
                        </Button>
                    </div>
                    <Separator />
                    <div className="space-y-4">

                        <div className="mt-4 text-center text-sm">
                            Already have an account?
                            <Link className="underline mx-1" href={"/login"}>
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>
        </React.Fragment>
    )
}

export default RegisterPage