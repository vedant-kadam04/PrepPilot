import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import InterviewRecorder from "../components/InterviewRecorder";

function Interview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const fetchInterview = async () => {
    try {
      const response = await api.get(`/interviews/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setInterview(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  const submitInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      for (let i = 0; i < interview.questions.length; i++) {
        await api.post(
          `/interviews/${interview.id}/answers`,
          {
            question: interview.questions[i],
            answer: answers[i] || "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      alert("Interview submitted successfully!");
      navigate(`/report/${interview.id}`);
    } catch (error) {
      console.error(error);
    }
    
  };

  useEffect(() => {
    fetchInterview();
  }, []);

  if (!interview) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        width: "900px",
        margin: "40px auto",
      }}
    >
      <h1>{interview.title}</h1>

      <p>
        <strong>Role:</strong> {interview.role}
      </p>

      <p>
        <strong>Difficulty:</strong> {interview.difficulty}
      </p>

      <hr />

      <h2>
        Question {currentQuestion + 1} of {interview.questions.length}
      </h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        {interview.questions[currentQuestion]}
      </div>

      <InterviewRecorder
        onAnswerRecorded={(answer) => {
          setAnswers((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[currentQuestion] = answer;
            return updatedAnswers;
          });
        }}
      />

      <br />
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid gray",
          borderRadius: "8px",
        }}
      >
        <h3>Saved Answer</h3>

        <p>{answers[currentQuestion] || "No answer recorded yet."}</p>
      </div>

      <button
        onClick={() => setCurrentQuestion((prev) => prev - 1)}
        disabled={currentQuestion === 0}
      >
        Previous
      </button>

      <button
        style={{ marginLeft: "10px" }}
        onClick={() => setCurrentQuestion((prev) => prev + 1)}
        disabled={currentQuestion === interview.questions.length - 1}
      >
        Next
      </button>
      <button
        style={{
          marginLeft: "10px",
          backgroundColor: "green",
          color: "white",
        }}
        onClick={submitInterview}
      >
        Finish Interview
      </button>
    </div>
  );
}

export default Interview;
