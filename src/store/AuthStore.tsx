import { create } from "zustand"

export const logInStore = create(set => ({
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || "false"),
    setIsLoggedIn: (newVal: boolean) => {
        localStorage.setItem("isLoggedIn", JSON.stringify(newVal));
        set((state: { isLoggedIn: boolean }) => ({ ...state, isLoggedIn: newVal }));
    },
    role: localStorage.getItem("role"),
    setRole: (newVal: string) => {
        localStorage.setItem("role", newVal);
        set((state: { role: string }) => ({ ...state, role: newVal }));
    },
}));