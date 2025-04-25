import { Button, FormControl, FormField, FormItem, Input } from "@/components/ui"
import { FormMessage } from "@/components/ui/form"
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form"
import { Register } from "../interface/Register"
import { SignUpRegist } from "@/validation/register"
import { BackEndInstance } from "@/server/BackEndAxios";
import { logInStore } from "@/store/AuthStore"

const SignUp = () => {
  const setIsLoggedIn = logInStore((state: unknown) => state.setIsLoggedIn);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  interface IUserRole extends Register {
    role: string
  };
  const form = useForm<Register>({
    resolver: yupResolver(SignUpRegist),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  const sendData = async (obj: Register) => {
    try {
      const response = await BackEndInstance.get(`/users?name=${obj.name}&&email=${obj.email}&&password=${obj.password}`);
      if (response.data.length !== 0) {
        setErrorMessage("This user already exists");
      } else {
        await BackEndInstance.post("/users", obj);
        setIsLoggedIn(true);
        if (response.data.some((user: IUserRole) => user.role === "admin")) {
          localStorage.setItem("role", "admin");
        } else {
          localStorage.setItem("role", "client");
        }
        setErrorMessage(null);
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
              <h1 className="text-[26px] text-center font-medium">Sign up</h1>
              <p className="text-red-500 mb-[10px]">{errorMessage}</p>
              <form className="flex flex-col gap-y-[10px]"
                onSubmit={form.handleSubmit(sendData)}>
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

export default SignUp