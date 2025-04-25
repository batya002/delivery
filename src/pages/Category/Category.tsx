import { useParams } from "react-router-dom"

const Category = () => {
    const { categoryName } = useParams();
    return (
        <main>
            <section className="pt-[90px]">
                <div className="container">
                    <h1 className="text-[32px]">{categoryName}</h1>
                </div>
            </section>
        </main>
    )
}

export default Category