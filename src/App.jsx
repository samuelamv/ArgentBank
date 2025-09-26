import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/header.jsx";
import Footer from "./component/footer.jsx";
import Home from "./page/index.jsx";
import SignIn from "./page/sign-in.jsx";
import User from "./page/user.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import PrivateRoute from "./component/privateRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
