import React from 'react';
import { Outlet, Link } from "react-router-dom";


export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/Networks"> Intro to Networks Analysis</Link> |{" "}
        <Link to="/SVM"> Intro to SVMs </Link>
      </nav>
      <Outlet />
    </div>
  );
}
