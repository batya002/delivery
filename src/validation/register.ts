import * as yup from "yup"

const userSchema = yup.object({
    name: yup.string().min(3).max(128).required(),
    email: yup.string().min(6).max(256).email().required(),
    password: yup.string().min(8).max(128).required()
});

export const register = userSchema.pick(["name", "email", "password"]);