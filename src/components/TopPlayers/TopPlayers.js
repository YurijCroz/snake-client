import React, { useEffect, useState } from "react";
import http from "../../api/http";
import "./TopPlayers.css";

function TopPlayers() {
  const [top, setTop] = useState(null);

  const getTopPlayers = async () => {
    try {
      const { data } = await http.get("score/getTopPlayers");
      if (data) {
        const remainingSlots = 10 - data.length;
        for (let i = 0; i < remainingSlots; i++) {
          data.push(`-`.repeat(20));
        }
        setTop(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const updateInterval = setInterval(getTopPlayers, 5000);
    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <div className="top-container">
      <div className="top-header">Top 10 Players:</div>
      <ol>
        {top &&
          top.map((p, i) =>
            typeof p === "object" ? (
              <li key={i}>
                {p.nickName}: {p.score}
              </li>
            ) : (
              <li key={i}>{p}</li>
            )
          )}
      </ol>
    </div>
  );
}

export default TopPlayers;
