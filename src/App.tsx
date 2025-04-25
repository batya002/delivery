import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Home, Catalog, ProductInfo, Category } from "./pages"
import Header from "./components/Header"
import { LogIn, SignUp } from "./auth"
import Admin from "./Admin/Admin"
import { useEffect } from "react"
import { logInStore } from "./store/AuthStore"

const App = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const isLoggedIn = logInStore((state: unknown) => state.isLoggedIn);
  const role = logInStore((state: unknown) => state.role);
  const setRole = logInStore((state: unknown) => state.setRole);
  // useEffect(() => {
  //   const publicPaths = ["/", "/login", "/signup"];
  //   const isPublic = publicPaths.includes(location.pathname);
  //   const role = localStorage.getItem("role");
  //   if (location.pathname.startsWith("/admin") && role !== "admin") {
  //     navigateTo("/", { replace: true });
  //     return;
  //   }
  //   if (role === "guest" && !isPublic) {
  //     navigateTo("/", { replace: true });
  //   };
  //   if (isLoggedIn && (location.pathname === "/login" || location.pathname === "/signup")) {
  //     navigateTo("/", { replace: true });
  //   };
  // }, [location.pathname, userRole, navigateTo]);
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (isLoggedIn) {
      if (userRole === "admin") {
        setRole("admin");
      } else if (userRole === "client") {
        setRole("client");
      } else {
        setRole("guest");
      };
    } else {
      localStorage.setItem("role", "guest");
    };
  }, []);
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole === "admin") {
      setRole("admin");
    } else if (userRole === "client") {
      setRole("client");
    } else {
      setRole("guest");
    };
    if (userRole === "guest" && !["/", "/login", "/signup"].includes(location.pathname)) {
      navigateTo("/", { replace: true });
    };
  });
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {role === "guest" ? null : (
          <>
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:productId" element={<ProductInfo />} />
            <Route path="/catalog/:categoryName" element={<Category />} />
            <Route path="/catalog/:catalogName/:productId" element={<ProductInfo />} />
          </>
        )}
        {isLoggedIn ? null : (
          <>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        {isLoggedIn && role === "admin" && (
          <Route path="/admin" element={<Admin />} />
        )}
      </Routes>
    </>
  )
}

export default App