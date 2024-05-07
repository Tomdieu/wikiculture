import React from 'react'
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import Link from "next/link"

import {Separator} from "@/components/ui/separator"
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


type Props = {}

const RegisterPage = (props: Props) => {
    const form = useForm<signUpSchemaType>({resolver:zodResolver(signUpSchema),defaultValues:{
        username:"",
        email:"",
        password:"",
        first_name:"",
        last_name:"",
        confirmPassword:""
    }})
    async function onSubmit(values: signUpSchemaType) {}
    return (
        <React.Fragment>
            <Form {...form}>
            <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-4 w-full">
                <div className={"w-full flex items-center justify-center"}>
                <Img/>
                </div>
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Create an account</h2>
                    <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="ivantom" required type="email"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="m@example.com" required type="email"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" required type="password"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" required type="password"/>
                    </div>
                    <Button className="w-full" type="submit">
                        Sign Up
                    </Button>
                </div>
                <Separator/>
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