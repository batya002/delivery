import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="py-[20px] bg-[#00000025] fixed w-full">
            <div className="container">
                <div className="flex justify-between items-center">
                    <Link to={"/"}
                        className="w-[50px] h-[50px] rounded-[14px] bg-gray">
                        logo
                    </Link>
                    <div className="flex items-center gap-x-[15px]">
                        <Link className="w-[100px] py-[10px] rounded-[8px] bg-red-500 text-white text-center"
                            to={"/login"}>
                            <button>
                                Log in
                            </button>
                        </Link>
                        <Link className="w-[100px] py-[10px] rounded-[8px] bg-blue-500 text-white text-center"
                            to={"/signup"}>
                            <button>
                                Sign up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header