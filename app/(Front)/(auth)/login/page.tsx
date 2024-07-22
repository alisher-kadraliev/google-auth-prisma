import { auth, signIn } from "@/auth"
import { redirect } from 'next/navigation'

const LoginPage = async () => {
    const session = await auth()
    if (session) {
        redirect("/dashboard")
    }
    return (
        <div>
            <form
                action={async () => {
                    "use server"
                    await signIn("google", { redirectTo: "/dashboard" })
                }}
            >
                <button type="submit">Signin with Google</button>
            </form>
        </div>
    )
}

export default LoginPage