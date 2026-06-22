import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar/Navbar";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
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
    <>
      <Navbar />
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📋</div>

          <h2>{interviews.length}</h2>

          <h4>Total Interviews</h4>

          <p>Practice sessions created</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>

          <h2>{interviews.length}</h2>

          <h4>Interview History</h4>

          <p>Your previous mock interviews</p>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome back, {user ? user.name : "User"} 👋</h1>

          <p>
            Practice AI-powered interviews and sharpen your technical skills.
          </p>
        </div>
        <div className="create-card">
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

          <button type="button" onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Interview"}
          </button>
        </div>
        <h2 className="section-title">History</h2>

        {interviews.map((interview) => (
          <div className="interview-card" key={interview.id}>
            <div className="interview-info">
              <h3>{interview.title}</h3>

              <p>{interview.role}</p>

              <span
                className={`difficulty-badge ${interview.difficulty.toLowerCase()}`}
              >
                {interview.difficulty}
              </span>
            </div>

            <button
              className="view-btn"
              onClick={() => navigate(`/interview/${interview.id}`)}
            >
              View →
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default Dashboard;
