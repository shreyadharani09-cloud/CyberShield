import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/navbar";
import NewsCard from "../components/NewsCard";
import Stats from "../components/Stats";

function Home() {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    api
      .get("/news")
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGetAlerts = () => {
    navigate("/register");
  };

  const filteredNews = news
    .filter((item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((item) =>
      category === "All"
        ? true
        : item.category === category
    );

  return (
    <>
      <Navbar />

      <div className="container">

        {/* Page Heading */}
        <h1>Latest Cyber Security News</h1>

        {/* ============================= */}
        {/* GET CYBER ALERTS */}
        {/* ============================= */}

        <div className="cyber-alert-box">

          <div className="alert-content">

            <div className="alert-icon">
              🔔
            </div>

            <h2>Stay Updated with Cyber Alerts</h2>

            <p>
              Get the latest cybersecurity news, threats,
              vulnerabilities and important security alerts
              directly through your email.
            </p>

          </div>

          <button
            className="alert-button"
            onClick={handleGetAlerts}
          >
            Get Cyber Alerts →
          </button>

        </div>


        {/* ============================= */}
        {/* SEARCH */}
        {/* ============================= */}

        <div className="search-box">

          <input
            type="text"
            placeholder="🔍 Search cybersecurity news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {/* ============================= */}
        {/* STATISTICS */}
        {/* ============================= */}

        <Stats totalNews={news.length} />


        {/* ============================= */}
        {/* CATEGORY FILTERS */}
        {/* ============================= */}

        <div className="filter-buttons">

          {[
            "All",
            "Malware",
            "Phishing",
            "Ransomware",
            "Vulnerability",
            "General",
          ].map((cat) => (

            <button
              key={cat}
              className={
                category === cat
                  ? "active-filter"
                  : ""
              }
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>

          ))}

        </div>


        {/* ============================= */}
        {/* NEWS */}
        {/* ============================= */}

        {filteredNews.length > 0 ? (

          filteredNews.map((item) => (

            <NewsCard
              key={item._id}
              news={item}
            />

          ))

        ) : (

          <div className="news-card">

            <h2>No News Found</h2>

            <p>
              No cybersecurity news matches your
              current search or category filter.
            </p>

          </div>

        )}

      </div>
    </>
  );
}

export default Home;