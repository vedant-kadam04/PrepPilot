import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

function Interview() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const fetchInterview = async () => {
    try {
      const response = await api.get(`/interviews/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data);

      setInterview(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
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
        width: "800px",
        margin: "50px auto",
      }}
    >
      <h1>{interview.title}</h1>

      <p>{interview.role}</p>

      <p>{interview.difficulty}</p>

      <h2>Questions</h2>

      {interview.questions.map((question, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>Question {index + 1}:</strong>
          </p>

          <p>{question}</p>
        </div>
      ))}
    </div>
  );
}

export default Interview;
