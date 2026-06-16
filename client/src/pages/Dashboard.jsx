import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    difficulty: "Easy",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    try {
      const response = await api.post(
        "/interviews/generate-questions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  const fetchInterviews = async () => {
    try {
      const response = await api.get("/interviews", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data);

      setInterviews(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div
      style={{
        width: "800px",
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <h1>DashBoard</h1>

      <h2>Welcome, {user ? user.name : "User"}</h2>

      <h3>Create Interview</h3>

      <input
        type="text"
        name="title"
        placeholder="Interview Title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
      />

      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button type="button" onClick={handleGenerate}>
        Generate Interview
      </button>

      <h3>Previous Interviews</h3>

      {interviews.map((interview) => (
        <div
          key={interview.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{interview.title}</h4>

          <p>{interview.role}</p>

          <p>{interview.difficulty}</p>

          <button onClick={() => navigate(`/interview/${interview.id}`)}>
            View
          </button>
        </div>
      ))}
    </div>
  );
}
export default Dashboard;
