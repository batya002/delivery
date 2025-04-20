import { FormProvider, useForm } from "react-hook-form"
import { Register } from "../interface/Register"
import { FormControl, FormField, FormItem, Input } from "@/components/ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { register } from "@/validation/register"

const LogIn = () => {
    const form = useForm<Register>({
        resolver: yupResolver(register),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    return (
        <main className="pt-[90px]">
            <section>
                <div className="container">
                    <FormProvider {...form}>
                        <form className="mt-[50px] w-[430px] p-[15px] mx-auto rounded-[15px] bg-darkGray flex flex-col gap-y-[10px]">
                            {(["name", "email", "password"] as const).map(field => (
                                <FormField
                                    key={field}
                                    control={form.control}
                                    name={field}
                                    render={({ field: InputField }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input className="bg-white" {...InputField} placeholder={`Enter your ${field}`} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                            ))}
                        </form>
                    </FormProvider>
                </div>
            </section>
        </main>
    )
}

export default LogIn