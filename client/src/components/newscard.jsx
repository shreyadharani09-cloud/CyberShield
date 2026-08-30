import { Link } from "react-router-dom";

function NewsCard({ news }) {

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "#ff4d4f";
      case "High":
        return "#fa8c16";
      case "Medium":
        return "#fadb14";
      case "Low":
        return "#52c41a";
      default:
        return "#58a6ff";
    }
  };

  return (
    <div className="news-card">

      <div className="news-header">
        <h2>{news.title}</h2>

        <span
          className="severity-badge"
          style={{ backgroundColor: getSeverityColor(news.severity) }}
        >
          {news.severity}
        </span>
      </div>

      <small>
        📅{" "}
        {news.publishedAt
          ? new Date(news.publishedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "Date not available"}
      </small>

      <p>{news.description}</p>

      <div className="news-footer">
        <Link
          to={`/news/${news._id}`}
          className="read-more-btn"
        >
          Read More →
        </Link>
      </div>

    </div>
  );
}

export default NewsCard;