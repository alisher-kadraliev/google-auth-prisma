"use client"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import {
    CardContent, CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { login } from "@/actions/login"
import { useState } from "react"
const LoginForm = () => {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        try {
            await login(values)
            setSuccess("Login successful");

        } catch (error: any) {
            setError("Error" + error);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel >Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} name="email" type="email" placeholder="example@example.com" />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-600" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel >Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} name="password" type="password" placeholder="********" />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-600" />
                                </FormItem>
                            )}
                        />
                    </div>

                </CardContent>
                <CardFooter className="flex flex-col gap-2 justify-center items-center">
                    <Button className="w-full" type="submit">Sign in</Button>
                    {error && <div className="text-destructive bg-destructive/15 p-3">{error} </div>}
                    {success && <div className="text-green-600 w-full rounded-lg text-center bg-green-400/15 p-3">{success} </div>}

                </CardFooter>
            </form>
        </Form>
    )
}

export default LoginForm