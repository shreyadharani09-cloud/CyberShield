function Stats({ totalNews }) {
  return (
    <div className="stats-container">

      <div className="stat-card">
        <h2>{totalNews}</h2>
        <p>Total News</p>
      </div>

      <div className="stat-card">
        <h2>24/7</h2>
        <p>Monitoring</p>
      </div>

      <div className="stat-card">
        <h2>Live</h2>
        <p>RSS Feed</p>
      </div>

    </div>
  );
}

export default Stats;