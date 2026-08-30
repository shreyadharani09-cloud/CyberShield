import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import api from "../services/api";

function NewsDetails() {

  const { id } = useParams();

  const [news, setNews] = useState(null);

  useEffect(() => {

    api.get(`/news/${id}`)
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  if (!news) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>{news.title}</h1>

        <div className="details-info">

          <p>
            📅 <strong>Published Date:</strong>{" "}
            {news.publishedAt
              ? new Date(news.publishedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Not Available"}
          </p>

          <p>
            🚨 <strong>Severity:</strong> {news.severity}
          </p>

          <p>
            📂 <strong>Category:</strong> {news.category}
          </p>

        </div>

        <hr />

        <h2>📌 Incident Happened</h2>

        <p>{news.description}</p>

        <hr />

        <h2>🤖 AI Summary</h2>

        <p>{news.aiSummary}</p>

        <hr />

        <h2>🛡 Recommended Precautions</h2>

        <ul>
          {news.precautions &&
            news.precautions.split("\n").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>

        <hr />

        <h2>🔗 Courtesy</h2>

        <a
          href={news.link}
          target="_blank"
          rel="noreferrer"
        >
          Read Original Article
        </a>

      </div>
    </>
  );
}

export default NewsDetails;