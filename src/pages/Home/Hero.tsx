import { FaHeart } from "react-icons/fa6";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { Product } from "../../interface/Register"
import { BackEndInstance } from "@/server/BackEndAxios";
import { logInStore } from "@/store/AuthStore";

const Hero = () => {
  interface ProductWithId extends Product {
    id: string
  };
  const isLoggedIn = logInStore((state: unknown) => state.isLoggedIn);
  const setIsLoggedIn = logInStore((state: unknown) => state.setIsLoggedIn);
  const [data, setData] = useState<ProductWithId[]>([]);
  const getData = async () => {
    try {
      const response = await BackEndInstance.get("/products");
      setData(response.data);
    } catch (err) {
      console.log(err);
    };
  };
  useEffect(() => {
    const isLoggedIn: Boolean = JSON.parse(localStorage.getItem("isLoggedIn") || "false");
    if (isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    };
  });
  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="py-[50px]">
      <div className="container">
        <h1 className="text-3xl mb-[10px]">Hello world</h1>
        <p className={`${isLoggedIn ? "hidden" : "block"} text-red-500 mb-[10px]`}>Please log in or sign up to access other pages</p>
        <ul className="flex items-center gap-x-[25px] gap-y-[30px] flex-wrap">
          {data.map((val, i) => (
            <li className="w-full p-[8px] rounded-[15px] bg-white shadow-cardShadow border border-lightGray md:w-[48%] lg:w-[30%] xl:w-[280px] group"
              key={i}>
              <Link to={`/catalog/${val.category}/${val.id}`}>
                <span className="inline-block bg-gray px-[4px] py-[2px] rounded-[6px] text-primary mb-[10px]">{val.category}</span>
                <div className="w-full bg-primary rounded-[8px] py-[10px] relative">
                  <button className="absolute top-[5px] right-[5px] w-[30px] h-[30px] rounded-[50%] bg-gray flex items-center justify-center z-[2]">
                    <FaHeart className="text-primary" />
                  </button>
                  <span className="block group-hover:scale-[1.02] duration-[.3s] max-w-[300px] w-[90%] h-[375px] rounded-[4px] mx-auto bg-center bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${val.imgUrl})` }}></span>
                </div>
                <h3 className="text-primary mt-[10px] mb-[20px]">{val.title}</h3>
                <div className="flex items-end justify-between">
                  <div className="flex flex-col items-start">
                    <p className="no-underline">{val.price} sum</p>
                  </div>
                  <button className="duration-[.3s] hover:bg-gray w-[30px] h-[30px] rounded-[50%] flex items-center justify-center">
                    <BsCartPlus />
                  </button>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Hero