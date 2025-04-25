import { logInStore } from "@/store/AuthStore";
import { useEffect } from "react"
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom"

const Header = () => {
    const isLoggedIn = logInStore((state: unknown) => state.isLoggedIn);
    const setIsLoggedIn = logInStore((state: unknown) => state.setIsLoggedIn);
    const role = logInStore((state: unknown) => state.role);
    const setRole = logInStore((state: unknown) => state.setRole);
    useEffect(() => {
        setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn") || "false"));
    });
    const logOut = () => {
        setIsLoggedIn(false);
        setRole("guest");
    };
    return (
        <header className="py-[20px] bg-[#00000025] fixed w-full z-10">
            <div className="container">
                <div className="flex justify-between items-center">
                    <Link to={"/"}
                        className="w-[50px] h-[50px] rounded-[14px] bg-gray">
                        logo
                    </Link>
                    {isLoggedIn && role === "admin" ? (
                        <div className="flex items-center gap-x-[20px]">
                            <Link to={"/admin"}
                                className="w-[100px] py-[10px] rounded-[8px] bg-gray text-darkGray text-center flex items-center justify-center gap-x-[6px]">
                                Admin panel
                            </Link>
                            <button
                                className="w-[100px] py-[10px] rounded-[8px] bg-darkGray text-white text-center flex items-center justify-center gap-x-[6px]"
                                onClick={logOut}>
                                Log out <TbLogout />
                            </button>
                        </div>
                    ) : isLoggedIn && role === "client" ? (
                        <button
                            className="w-[100px] py-[10px] rounded-[8px] bg-darkGray text-white text-center flex items-center justify-center gap-x-[6px]"
                            onClick={logOut}>
                            Log out <TbLogout />
                        </button>
                    ) : (
                        <div className="flex items-center gap-x-[15px]">
                            <Link
                                className="w-[100px] py-[10px] rounded-[8px] bg-red-500 text-white text-center"
                                to={"/login"}
                            >
                                <button>Log in</button>
                            </Link>
                            <Link
                                className="w-[100px] py-[10px] rounded-[8px] bg-blue-500 text-white text-center"
                                to={"/signup"}
                            >
                                <button>Sign up</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header