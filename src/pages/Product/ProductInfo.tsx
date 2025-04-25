import { Link, useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa6"
import { TbShoppingCartPlus } from "react-icons/tb"
import { useEffect, useState } from "react";
import { BackEndInstance } from "@/server/backEndAxios";
import { Product } from "@/interface/Register";

const ProductInfo = () => {
  interface ProductWithId extends Product {
    id: string
  };
  const { productId } = useParams();
  const [data, setData] = useState<ProductWithId>({
    category: "",
    title: "",
    price: 0,
    imgUrl: "",
    id: ""
  });
  const getData = async () => {
    try {
      const response = await BackEndInstance.get("/products");
      const filteredData = response.data.find((product: ProductWithId) => product.id === productId);
      if (filteredData) {
        setData(filteredData);
      } else {
        setData([]);
      };
    } catch (err) {
      console.log(err);
    };
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <main className="pt-[45px]">
      <section className="py-[25px] xl:pt-[50px]">
        <div className="container">
          <p className="text-darkGray mb-[5px]">
            <Link to={"/catalog"}>Catalog</Link>
            <span> / </span>
            <Link to={`/catalog/${data.category}`}>{data.category}</Link>
            <span> / </span>
            <Link to={`/catalog/${data.category}/${data.id}`}>{data.id}</Link>
          </p>
          <h1 className="text-[32px] font-medium mb-[10px]">{data.title}</h1>
          <div className="flex items-center gap-x-[20px] mb-[20px]">
            <ul className="flex items-center gap-x-[3px] text-gray">
              <li>
                <FaStar />
              </li>
              <li>
                <FaStar />
              </li>
              <li>
                <FaStar />
              </li>
              <li>
                <FaStar />
              </li>
              <li>
                <FaStar />
              </li>
            </ul>
            <p className="text-darkGray">0 comments</p>
            <p className="text-darkGray">0 orders</p>
          </div>
          <div className="flex flex-col gap-y-[10px] md:items-center md:flex-row md:justify-between">
            <div className="w-full bg-primary rounded-[8px] py-[10px] relative md:w-[400px] lg:w-[550px] xl:w-[700px]">
              <span className="block max-w-[300px] w-[90%] h-[375px] rounded-[4px] mx-auto lg:w-[100%-40px] lg:max-w-[90%] lg:h-[500px]
                bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${data.imgUrl})` }}></span>
            </div>
            <div className="w-full md:w-[400px]">
              <button className="p-[10px] rounded-[50%] duration-[.3s] hover:bg-gray">
                <TbShoppingCartPlus className="text-[24px]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductInfo