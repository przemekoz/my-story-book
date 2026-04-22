import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { CreateBookPage } from "./pages/CreateBookPage";
import { ImagePreviewPage } from "./pages/ImagePreviewPage";
import { useRef, useState } from "react";
import { ModelsPage } from "./pages/ModelsPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const onLogin = async () => {
    console.log({
      login: login.current?.value,
      password: password.current?.value,
    });

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login.current?.value,
        password: password.current?.value,
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <header></header>
        <div className="auth-container">
          <h2>Login</h2>
          <input
            className="auth-fields"
            ref={login}
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            className="auth-fields"
            ref={password}
            type="password"
            placeholder="Password"
          />
          <br />
          <button className="auth-buttons" onClick={onLogin}>
            Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/"></Link>
          <Link to="/">Who are we</Link>
          <Link to="/about">Our story</Link>
          <Link to="/create-book">Resources</Link>
          <Link to="/create-book">Pricing</Link>
          <Link to="/models">Models</Link>
          {/* 
          <button className="auth-buttons" onClick={onSignOut}>
            Log out
          </button>
          */}
        </nav>
      </header>

      <div className="flex-column justify-content-center align-items-center">
        <div className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/create-book" element={<CreateBookPage />} />
            <Route path="/image-preview" element={<ImagePreviewPage />} />
            <Route path="/models" element={<ModelsPage />} />
          </Routes>
        </div>

        <img
          className="image-my-books"
          src="/books.png"
          width={1119}
          height={547}
          alt="My story books"
        />
      </div>

      <footer className="flex-column justify-content-center align-items-center">
        <p>
          We are passionate about turning your unique stories into beautifully
          crafted books that celebrate life's most meaningful moments.
        </p>
        <div className="icons">
          <img src="/yt37.png" width={37} height={37} alt="Youtube icon" />
          <img src="/in37.png" width={37} height={37} alt="LinkedIn icon" />
          <img src="/px37.png" width={37} height={37} alt="Platform X icon" />
        </div>
      </footer>
    </>
  );
}
