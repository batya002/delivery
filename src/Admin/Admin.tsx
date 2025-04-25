import { Button, FormControl, FormItem, Input } from "@/components/ui";
import { FormField, FormMessage } from "@/components/ui/form";
import { Product, Register } from "@/interface/Register";
import { productFieldNames, SignUpRegist } from "@/validation/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx"
import { BackEndInstance } from "../server/BackEndAxios"

const Admin = () => {
    interface DeletedUserRegister extends Register {
        id: string
    };
    interface DeletedProduct extends Product {
        id: string
    };
    const [currentWindow, setCurrentWindow] = useState<"users" | "products">("users");
    const [usersData, setUsersData] = useState<DeletedUserRegister[]>([]);
    const [productsData, setProductsData] = useState<DeletedProduct[]>([]);
    const [isUserUpdated, setUserIsUpdated] = useState<Boolean>(false);
    const [isProductUpdated, setProductIsUpdated] = useState<Boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [productId, setProductId] = useState<string | null>(null);
    const errorMessage = null;
    const userForm = useForm<Register>({
        resolver: yupResolver(SignUpRegist),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    const productForm = useForm<Product>({
        resolver: yupResolver(productFieldNames),
        defaultValues: {
            category: "",
            title: "",
            price: 0,
            imgUrl: ""
        }
    });
    const getUser = async () => {
        try {
            const response = await BackEndInstance.get(`/users`);
            setUsersData(response.data);
        } catch (err) {
            console.log(err);
        };
    };
    const deleteUser = async (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>, obj: DeletedUserRegister) => {
        e.preventDefault();
        try {
            BackEndInstance.delete(`/users/${obj.id}`);
            setData(prev => prev.filter(val => val.password !== obj.password));
        } catch (err) {
            console.log(err);
        };
    };
    const updateUser = (obj: DeletedUserRegister) => {
        userForm.setValue("name", obj.name);
        userForm.setValue("email", obj.email);
        userForm.setValue("password", obj.password);
        setUserIsUpdated(true);
        setUserId(obj.id);
    };
    const createUser = async (obj: Register) => {
        if (isUserUpdated) {
            try {
                BackEndInstance.put(`/users/${userId}`, obj);
                setUserIsUpdated(false);
            } catch (err) {
                console.log(err);
            };
        } else {
            try {
                BackEndInstance.post("/users", obj);
            } catch (err) {
                console.log(err);
            };
        };
        userForm.reset();
    };
    const getProduct = async () => {
        try {
            const response = await BackEndInstance.get(`/products`);
            setProductsData(response.data);
        } catch (err) {
            console.log(err);
        };
    };
    const deleteProduct = async (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>, obj: DeletedProduct) => {
        e.preventDefault();
        try {
            BackEndInstance.delete(`/products/${obj.id}`);
            setProductsData(prev => prev.filter(val => val.title !== obj.title));
        } catch (err) {
            console.log(err);
        };
    };
    const updateProduct = (obj: DeletedProduct) => {
        productForm.setValue("category", obj.category);
        productForm.setValue("title", obj.title);
        productForm.setValue("price", obj.price);
        productForm.setValue("imgUrl", obj.imgUrl);
        setProductIsUpdated(true);
        setProductId(obj.id);
    };
    const createProduct = async (obj: Product) => {
        if (isProductUpdated) {
            try {
                BackEndInstance.put(`/products/${productId}`, obj);
                setProductIsUpdated(false);
            } catch (err) {
                console.log(err);
            };
        } else {
            try {
                BackEndInstance.post("/products", obj);
            } catch (err) {
                console.log(err);
            };
        };
        userForm.reset();
    };
    useEffect(() => {
        getUser();
        getProduct();
    }, []);
    return (
        <main className="pt-[90px] pb-[20px]">
            <section>
                <div className="container">
                    <ul className="flex items-center gap-x-[20px] text-[18px] mb-[20px]">
                        <li className={`${currentWindow === "users" ? "after:block" : "after:hidden"} after:w-full after:h-[1.5px] after:bg-black after:rounded-[2px] cursor-pointer`}
                            onClick={() => setCurrentWindow("users")}>
                            Users
                        </li>
                        <li className={`${currentWindow === "products" ? "after:block" : "after:hidden"} after:w-full after:h-[1.5px] after:bg-black after:rounded-[2px] cursor-pointer`}
                            onClick={() => setCurrentWindow("products")}>
                            Products
                        </li>
                    </ul>
                    <div className="flex justify-between">
                        {currentWindow === "users" ? (
                            <>
                                <table className="w-[50%] h-max">
                                    <thead>
                                        <tr>
                                            <th className="border border-darkGray font-medium py-[2px]">name</th>
                                            <th className="border border-darkGray font-medium py-[2px]">email</th>
                                            <th className="border border-darkGray font-medium py-[2px]">password</th>
                                            <th className="border border-darkGray font-medium py-[2px]">delete</th>
                                            <th className="border border-darkGray font-medium py-[2px]">update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersData.map((value: DeletedUserRegister, index: number) => (
                                            <tr key={index}>
                                                <td className="border border-darkGray py-[2px] text-center">{value.name}</td>
                                                <td className="border border-darkGray py-[2px] text-center">{value.email}</td>
                                                <td className="border border-darkGray py-[2px] text-center">{value.password}</td>
                                                <td className="border border-darkGray py-[2px] cursor-pointer"
                                                    onClick={e => deleteUser(e, value)}>
                                                    <FaTrash className="mx-auto" />
                                                </td>
                                                <td className="border border-darkGray py-[2px] cursor-pointer"
                                                    onClick={() => updateUser(value)}>
                                                    <RxUpdate className="mx-auto" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <FormProvider {...userForm}>
                                    <div className="max-w-[450px] w-full p-[15px] rounded-[15px] bg-gray">
                                        <h1 className="text-[28px] font-medium text-center">{isUserUpdated ? "Update" : "Create"} user</h1>
                                        <p className="text-red-500 mb-[10px]">{errorMessage}</p>
                                        <form className="flex flex-col gap-y-[10px]"
                                            onSubmit={userForm.handleSubmit(createUser)}>
                                            {(["name", "email", "password"] as const).map(field => (
                                                <FormField
                                                    key={field}
                                                    control={userForm.control}
                                                    name={field}
                                                    render={({ field: InputField }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input className="bg-white" {...InputField}
                                                                    placeholder={`Enter your ${field}`} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                            ))}
                                            <Button>Submit</Button>
                                        </form>
                                    </div>
                                </FormProvider>
                            </>
                        ) : (
                            <>
                                <table className="w-[50%] h-max">
                                    <thead>
                                        <tr>
                                            <th className="border border-darkGray font-medium py-[2px]">category</th>
                                            <th className="border border-darkGray font-medium py-[2px]">name</th>
                                            <th className="border border-darkGray font-medium py-[2px]">price</th>
                                            <th className="border border-darkGray font-medium py-[2px]">imgUrl</th>
                                            <th className="border border-darkGray font-medium py-[2px]">delete</th>
                                            <th className="border border-darkGray font-medium py-[2px]">update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productsData.map((value: DeletedProduct, index: number) => (
                                            <tr key={index}>
                                                <td className="border border-darkGray py-[2px] text-center">{value.category}</td>
                                                <td className="border border-darkGray py-[2px] text-center">{value.title}</td>
                                                <td className="border border-darkGray py-[2px] text-center">{value.price}</td>
                                                <td className="border border-darkGray py-[10px] text-center">
                                                    <div className="w-[200px] h-[250px] mx-auto bg-center bg-cover bg-no-repeat"
                                                        style={{ backgroundImage: `url(${value.imgUrl})` }}></div>
                                                </td>
                                                <td className="border border-darkGray py-[2px] cursor-pointer"
                                                    onClick={e => deleteProduct(e, value)}>
                                                    <FaTrash className="mx-auto" />
                                                </td>
                                                <td className="border border-darkGray py-[2px] cursor-pointer"
                                                    onClick={() => updateProduct(value)}>
                                                    <RxUpdate className="mx-auto" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <FormProvider {...productForm}>
                                    <div className="max-w-[450px] w-full h-max p-[15px] rounded-[15px] bg-gray">
                                        <h1 className="text-[28px] font-medium text-center">{isProductUpdated ? "Update" : "Create"} product</h1>
                                        <p className="text-red-500 mb-[10px]">{errorMessage}</p>
                                        <form className="flex flex-col gap-y-[10px]"
                                            onSubmit={productForm.handleSubmit(createProduct)}>
                                            {(["category", "title", "price", "imgUrl"] as const).map(field => (
                                                <FormField
                                                    key={field}
                                                    control={productForm.control}
                                                    name={field as keyof Product}
                                                    render={({ field: InputField }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input className="bg-white" {...InputField}
                                                                    placeholder={`Enter your ${field}`} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                            ))}
                                            <Button>Submit</Button>
                                        </form>
                                    </div>
                                </FormProvider>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Admin