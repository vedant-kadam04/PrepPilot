import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Report() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/interviews/${id}/report`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!report) return <h2 style={{ textAlign: "center" }}>Loading Report...</h2>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "25px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2563eb" }}>
        Interview Report
      </h1>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          background: "#f9fafb",
        }}
      >
        <h2>{report.title}</h2>

        <p><strong>Role:</strong> {report.role}</p>
        <p><strong>Difficulty:</strong> {report.difficulty}</p>
        <p><strong>Performance:</strong> {report.performance}</p>

        <hr />

        <p><strong>Average Score:</strong> {report.averageScore}/10</p>
        <p><strong>Highest Score:</strong> {report.highestScore}</p>
        <p><strong>Lowest Score:</strong> {report.lowestScore}</p>
        <p><strong>Total Questions:</strong> {report.totalQuestions}</p>
        <p><strong>Total Answers:</strong> {report.totalAnswers}</p>
      </div>

      <h2 style={{ marginTop: "40px" }}>Question-wise Analysis</h2>

      {report.answers.map((item, index) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "20px",
            background: "#fff",
          }}
        >
          <h3>Question {index + 1}</h3>

          <p>
            <strong>Question:</strong>
            <br />
            {item.question}
          </p>

          <p>
            <strong>Your Answer:</strong>
            <br />
            {item.answer || "No answer submitted"}
          </p>

          <p>
            <strong>Score:</strong>{" "}
            <span
              style={{
                color:
                  item.score >= 8
                    ? "green"
                    : item.score >= 5
                    ? "orange"
                    : "red",
                fontWeight: "bold",
              }}
            >
              {item.score}/10
            </span>
          </p>

          <p>
            <strong>Feedback:</strong>
            <br />
            {item.feedback}
          </p>

          <p>
            <strong>Improvement:</strong>
            <br />
            {item.improvement}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Report;