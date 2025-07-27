import { Routes, Route } from "react-router-dom";
import { Signup } from "./Signup/Signup";
import { VerifyEmail } from "./Signup/VerifyEmail";
import { Welcome } from "./Signup/Welcome";
import { Forgotpass } from "./Signup/Forgotpass";
import { Check } from "./Signup/Check";
import { Resetpass } from "./Signup/Resetpass";
import { SuccessfulReset } from "./Signup/Sucessfullreset";
import Home from "./Home";
import BookAppointment from "./Components/BookAppointment";
import RequestHelp from "./Components/RequestHelp";
import MyRequests from "./Components/MyRequests";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import AdminHomePage from "./Components/Admin/AdminHomePages";
import AdminLayout from "./Components/Admin/AdminLayout";
import OrderManagement from "./Components/Admin/OrderManagement";
import EditProduct from "./Components/Admin/EditProducts";
import ProductManagement from "./Components/Admin/ProductManagements";
import UserManagement from "./Components/Admin/UserManagements";
import { Adminlogin } from "./Components/Admin/Adminlogin";
import { Adminsignup } from "./Components/Admin/Adminsignup";

const App = () => {
  const Token = localStorage.getItem("token");
  // const Token = 'jdshakjdksjad iwqoiih kj2hkj2h kj2ehkj23hkjhkjdshakjdah'
  // const userData = localStorage.getItem('userkaData')
  console.log(Token);

  return (
    <div>
      <Routes>
        <>
          {!Token && (
            <>
            <Route path="/admin-login" element={<Adminlogin />} />
            <Route path="/admin-signup" element={<Adminsignup />} />
              <Route path="/login" element={<Welcome />} />
              <Route path="*" element={<Welcome />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpass" element={<Forgotpass />} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="/check" element={<Check />} />
              <Route path="/reset" element={<Resetpass />} />
              <Route path="/sucess" element={<SuccessfulReset />} />
            </>
          )}

          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/requesthelp" element={<RequestHelp />} />
          <Route path="/my-request" element={<MyRequests />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/setting" element={<Settings/>} />
         {/* adim layout */}
          <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="orders" element={<OrderManagement />} />
          
         
          </Route>
        </>
      </Routes>
    </div>
  );
};

export default App;
