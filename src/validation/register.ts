import * as yup from "yup"

const userSchema = yup.object({
    name: yup.string().min(3).max(128).required(),
    email: yup.string().min(6).max(256).email().required(),
    password: yup.string().min(8).max(128).required()
});

const productSchema = yup.object({
    category: yup.string().min(3).max(48).required(),
    title: yup.string().min(5).max(64).required(),
    price: yup.number().min(1).max(10000000).required(),
    imgUrl: yup.string().min(8).max(1000).required()
});

export const SignUpRegist = userSchema.pick(["name", "email", "password"]);
export const LogInRegist = userSchema.pick(["name", "password"]);

export const productFieldNames = productSchema.pick(["category", "title", "price", "imgUrl"]);