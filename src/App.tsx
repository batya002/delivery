import { Route, Routes } from "react-router-dom"
import { Home, Catalog, ProductInfo } from "./pages"
import Header from "./components/Header"
import { LogIn, SignUp } from "./auth"

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:productId" element={<ProductInfo />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App