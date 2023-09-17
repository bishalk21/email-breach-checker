/* eslint-disable no-undef */
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [breaches, setBreaches] = useState([]);
  const [error, setError] = useState("");

  const rootURL =
    process.env.NODE_ENV === "production"
      ? "https://email-breach-checker.vercel.app"
      : "https://email-breach-checker.vercel.app";

  const checkEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(rootURL + "/check-email", {
        email,
      });
      setBreaches(response.data);
    } catch (err) {
      setError("Error fetching breach data.");
    }
  };

  return (
    <div className="min-h-screen w-full flex gap-4 flex-col items-center justify-center">
      <h1 className="font-bold text-lg">
        Check if your email address is in a data breach
      </h1>
      <form className="w-full max-w-sm" onSubmit={(e) => checkEmail(e)}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="email"
            placeholder="Enter your email address: yrname@domain.com"
            aria-label="email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>

      <article className="w-full p-4 flex flex-col gap-4">
        {breaches.length > 0 && (
          <div>
            <h2>
              Here is an overview of the breaches associated with this email:
            </h2>
            {breaches.map((breach) => (
              <div
                key={breach.Name}
                style={{
                  border: "1px solid gray",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <img
                  src={breach.LogoPath}
                  alt={`${breach.Name} logo`}
                  width="100"
                />
                <h3>{breach?.Title}</h3>
                <p>
                  <strong>Domain:</strong> {breach?.Domain}
                </p>
                <p>
                  <strong>Breach date:</strong>{" "}
                  {new Date(breach?.BreachDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Description:</strong> {breach?.Description}
                </p>
                <p>
                  <strong>Compromised accounts:</strong>{" "}
                  {breach.PwnCount ? breach.PwnCount.toLocaleString() : "N/A"}
                </p>

                <p>
                  <strong>Compromised data:</strong>{" "}
                  {breach.DataClasses
                    ? breach.DataClasses.join(", ")
                    : "No data available"}
                </p>
              </div>
            ))}
          </div>
        )}

        {error && <p>{error}</p>}
      </article>

      <footer>
        Made by{" "}
        <a
          className="text-blue-700 font-bold"
          href="http://www.karkibishal.com"
        >
          Bishal Karki
        </a>
      </footer>
    </div>
  );
}

export default App;
