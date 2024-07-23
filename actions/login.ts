"use server"
import * as z from "zod"

import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return validatedFields.error
    }
    const { email, password } = validatedFields.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        })
        return { success: "login successful" }
    } catch (error) {
        return { error: "invalid credentials" }
    }
}