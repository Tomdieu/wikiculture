import React from 'react'
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import Link from "next/link"

import {Separator} from "@/components/ui/separator"
import Img from "@/components/Img";

type Props = {}

const RegisterPage = (props: Props) => {
    return (
        <React.Fragment>
            <div className="mx-auto space-y-4 w-full">
                <div className={"w-full flex items-center justify-center"}>
                <Img/>
                </div>
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Create an account</h2>
                    <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="Ivan" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Tom" required/>
                        </div>
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
            </div>
        </React.Fragment>
    )
}

export default RegisterPage