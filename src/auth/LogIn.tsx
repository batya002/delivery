import { FormProvider, useForm } from "react-hook-form"
import { ILogIn } from "../interface/Register"
import { Button, FormControl, FormField, FormItem, Input } from "@/components/ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { LogInRegist } from "@/validation/register"
import { FormMessage } from "@/components/ui/form"
import { BackEndInstance } from "@/server/BackEndAxios"
import { useState } from "react"
import { logInStore } from "@/store/AuthStore"

const LogIn = () => {
    const setIsLoggedIn = logInStore((state: unknown) => state.setIsLoggedIn);
    const setRole = logInStore((state: unknown) => state.setRole);
    interface IAdmin extends ILogIn {
        role: string
    };
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const form = useForm<ILogIn>({
        resolver: yupResolver(LogInRegist),
        defaultValues: {
            name: "",
            password: ""
        }
    });
    const checkData = async (obj: ILogIn) => {
        try {
            const response = await BackEndInstance.get(`/users?name=${obj.name}&&password=${obj.password}`);
            if (response.data.length !== 0) {
                setErrorMessage(null);
                const isUserAdmin = response.data.some((user: IAdmin) => user.password === "megaAytishnik");
                if (isUserAdmin) {
                    setRole("admin");
                    setIsLoggedIn(true);
                } else {
                    setRole("client");
                    setIsLoggedIn(true);
                };
                form.reset();
            } else {
                setErrorMessage("No account found!");
            };
        } catch (err) {
            console.log(err);
        };
    };
    return (
        <main className="pt-[90px]">
            <section>
                <div className="container">
                    <FormProvider {...form}>
                        <div className="mt-[75px] max-w-[450px] w-full p-[15px] mx-auto rounded-[15px] bg-gray xl:mt-[150px]">
                            <h1 className="text-[26px] text-center font-medium">Log in</h1>
                            <p className="text-red-500 mb-[10px]">{errorMessage}</p>
                            <form className="flex flex-col gap-y-[10px]"
                                onSubmit={form.handleSubmit(checkData)}>
                                {(["name", "password"] as const).map(field => (
                                    <FormField
                                        key={field}
                                        control={form.control}
                                        name={field}
                                        render={({ field: InputField }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input className="bg-white" {...InputField} placeholder={`Enter your ${field}`} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                ))}
                                <Button>Submit</Button>
                            </form>
                        </div>
                    </FormProvider>
                </div>
            </section>
        </main>
    )
}

export default LogIn