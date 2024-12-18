import { useEffect } from "react";
import Loader from "./loader/loader";

const gameLogo = "./gameLogo.png";

function App() {

  useEffect(() => {
    // Redirect to the desired URL
    window.location.href = "https://namethattune.vercel.app/";
  }, []);

  return (
    <main className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
      <h3 style={{color: "#646cff", paddingTop: "1rem"}}>Redirecting...</h3>
      <Loader />
    </main>
  );
};

export default App;