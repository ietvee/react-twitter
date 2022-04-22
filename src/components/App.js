import React from "react";
import Signup from "./Signup.js";
import Main from "./Dashboard.js";
import Login from "./Login.js";
import PrivateRoute from "./PrivateRoute.js";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Main />
                    </PrivateRoute>
                  }
                />

                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </div>
      </Container>
      {/* <Main /> */}
    </>
  );
}

export default App;
