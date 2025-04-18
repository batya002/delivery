import { FaHeart } from "react-icons/fa6";
import { BsCartPlus } from "react-icons/bs";

const Hero = () => {
  return (
    <section className="py-[50px]">
      <div className="container">
        <h1 className="text-3xl mb-2.5">Hello world</h1>
        <ul className="flex items-center gap-x-[25px] gap-y-[30px] flex-wrap">
          <li className="w-full p-[8px] rounded-[15px] bg-white shadow-cardShadow border border-lightGray md:w-[48%] lg:w-[30%] xl:w-[280px]">
            <span className="inline-block bg-gray px-[4px] py-[2px] rounded-[6px] text-primary mb-[10px]">Категория</span>
            <div className="w-full bg-primary rounded-[8px] py-[10px] relative">
              <button className="absolute top-[5px] right-[5px] w-[30px] h-[30px] rounded-[50%] bg-gray flex items-center justify-center">
                <FaHeart className="text-primary" />
              </button>
              <span className="block max-w-[300px] w-[90%] h-[375px] rounded-[4px] bg-white mx-auto"></span>
            </div>
            <h3 className="text-primary mt-[10px] mb-[20px]">Title</h3>
            <div className="flex items-end justify-between">
              <div className="flex flex-col items-start">
                <del className="p-[2px] rounded-[8px] bg-yellow">Old price</del>
                <ins className="no-underline">New price</ins>
              </div>
              <button className="duration-[.3s] hover:bg-gray w-[30px] h-[30px] rounded-[50%] flex items-center justify-center">
                <BsCartPlus />
              </button>
            </div>
          </li>
          <li className="w-full p-[8px] rounded-[15px] bg-white shadow-cardShadow border border-lightGray md:w-[48%] lg:w-[30%] xl:w-[280px]">
            <span className="inline-block bg-gray px-[4px] py-[2px] rounded-[6px] text-primary mb-[10px]">Категория</span>
            <div className="w-full bg-primary rounded-[8px] py-[10px] relative">
              <button className="absolute top-[5px] right-[5px] w-[30px] h-[30px] rounded-[50%] bg-gray flex items-center justify-center">
                <FaHeart className="text-primary" />
              </button>
              <span className="block max-w-[300px] w-[90%] h-[375px] rounded-[4px] bg-white mx-auto"></span>
            </div>
            <h3 className="text-primary mt-[10px] mb-[20px]">Title</h3>
            <div className="flex items-end justify-between">
              <div className="flex flex-col items-start">
                <del className="p-[2px] rounded-[8px] bg-yellow">Old price</del>
                <ins className="no-underline">New price</ins>
              </div>
              <button className="duration-[.3s] hover:bg-gray w-[30px] h-[30px] rounded-[50%] flex items-center justify-center">
                <BsCartPlus />
              </button>
            </div>
          </li>
          <li className="w-full p-[8px] rounded-[15px] bg-white shadow-cardShadow border border-lightGray md:w-[48%] lg:w-[30%] xl:w-[280px]">
            <span className="inline-block bg-gray px-[4px] py-[2px] rounded-[6px] text-primary mb-[10px]">Категория</span>
            <div className="w-full bg-primary rounded-[8px] py-[10px] relative">
              <button className="absolute top-[5px] right-[5px] w-[30px] h-[30px] rounded-[50%] bg-gray flex items-center justify-center">
                <FaHeart className="text-primary" />
              </button>
              <span className="block max-w-[300px] w-[90%] h-[375px] rounded-[4px] bg-white mx-auto"></span>
            </div>
            <h3 className="text-primary mt-[10px] mb-[20px]">Title</h3>
            <div className="flex items-end justify-between">
              <div className="flex flex-col items-start">
                <del className="p-[2px] rounded-[8px] bg-yellow">Old price</del>
                <ins className="no-underline">New price</ins>
              </div>
              <button className="duration-[.3s] hover:bg-gray w-[30px] h-[30px] rounded-[50%] flex items-center justify-center">
                <BsCartPlus />
              </button>
            </div>
          </li>
          <li className="w-full p-[8px] rounded-[15px] bg-white shadow-cardShadow border border-lightGray md:w-[48%] lg:w-[30%] xl:w-[280px]">
            <span className="inline-block bg-gray px-[4px] py-[2px] rounded-[6px] text-primary mb-[10px]">Категория</span>
            <div className="w-full bg-primary rounded-[8px] py-[10px] relative">
              <button className="absolute top-[5px] right-[5px] w-[30px] h-[30px] rounded-[50%] bg-gray flex items-center justify-center">
                <FaHeart className="text-primary" />
              </button>
              <span className="block max-w-[300px] w-[90%] h-[375px] rounded-[4px] bg-white mx-auto"></span>
            </div>
            <h3 className="text-primary mt-[10px] mb-[20px]">Title</h3>
            <div className="flex items-end justify-between">
              <div className="flex flex-col items-start">
                <del className="p-[2px] rounded-[8px] bg-yellow">Old price</del>
                <ins className="no-underline">New price</ins>
              </div>
              <button className="duration-[.3s] hover:bg-gray w-[30px] h-[30px] rounded-[50%] flex items-center justify-center">
                <BsCartPlus />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Hero