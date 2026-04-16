import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { CreateBookPage } from "./pages/CreateBookPage";
import { ImagePreviewPage } from "./pages/ImagePreviewPage";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { useRef, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCCttlqMp0bJwkDEwptBMA4Ex9NHa6MqVs",
//   authDomain: "my-story-book-3719f.firebaseapp.com",
//   projectId: "my-story-book-3719f",
//   storageBucket: "my-story-book-3719f.firebasestorage.app",
//   messagingSenderId: "95629313040",
//   appId: "1:95629313040:web:33709f3df43138a0b8b695",
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const login = useRef<HTMLInputElement | null>(null);
  // const password = useRef<HTMLInputElement | null>(null);

  // const onLogin = async () => {
  //   try {
  //     console.log("--", login.current?.value, password.current?.value);
  //     if (login.current?.value && password.current?.value) {
  //       await signInWithEmailAndPassword(
  //         auth,
  //         login.current?.value,
  //         password.current?.value,
  //       );
  //       setIsLoggedIn(true);
  //     }
  //   } catch {
  //     setIsLoggedIn(false);
  //   }
  // };

  // const onSignUp = async () => {
  //   try {
  //     console.log("--", login.current?.value, password.current?.value);
  //     if (login.current?.value && password.current?.value) {
  //       await createUserWithEmailAndPassword(
  //         auth,
  //         login.current?.value,
  //         password.current?.value,
  //       );
  //     }
  //   } catch {}
  // };

  // const onSignOut = async () => {
  //   await signOut(auth);
  // };

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log("Logged in as: " + user.email);
  //     setIsLoggedIn(true);

  //     const allowed = [
  //       "przemekkozinski@gmail.com",
  //       "katharina.volkmer@gmail.com",
  //     ];
  //     if (!allowed.includes(user.email ?? "")) {
  //       console.log("Access denied");
  //       setIsLoggedIn(false);
  //     }
  //   } else {
  //     console.log("Not logged in");
  //     setIsLoggedIn(false);
  //   }
  // });

  // if (!isLoggedIn) {
  //   return (
  //     <>
  //       <header></header>
  //       <div className="auth-container">
  //         <h2>Login</h2>
  //         <input
  //           className="auth-fields"
  //           ref={login}
  //           type="email"
  //           placeholder="Email"
  //         />
  //         <br />
  //         <input
  //           className="auth-fields"
  //           ref={password}
  //           type="password"
  //           placeholder="Password"
  //         />
  //         <br />
  //         <button className="auth-buttons" onClick={onLogin}>
  //           Login
  //         </button>
  //         <button className="auth-buttons" onClick={onSignUp}>
  //           Sign Up
  //         </button>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      <header>
        <nav>
          <Link to="/"></Link>
          <Link to="/">Who are we</Link>
          <Link to="/about">Our story</Link>
          <Link to="/create-book">Resources</Link>
          <Link to="/create-book">Pricing</Link>
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
