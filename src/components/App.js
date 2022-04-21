import React from "react";
import Signup from "./Signup.js";
import Main from "./Main.js";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Signup />
        </div>
      </Container>
      {/* <Main /> */}
    </AuthProvider>
  );
}

export default App;
