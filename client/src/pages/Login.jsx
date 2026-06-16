import { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import api from "../services/api";

function Login() {
  const { setUser } = useContext(AuthContext); 
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value,
    });
   }; 

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
              const response = await api.post(
                     "/auth/login",
                      formData
               );

          console.log(response.data);
          
          localStorage.setItem(
            "token",
            response.data.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
          );
          setUser(response.data.user);
          navigate("/dashboard");          

        } catch (error) {
            if (error.response) {
                 console.log(error.response.data.message);
            } else {
                 console.log(error.message);
            } 
        }
    };
  

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "400px",
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <h1>Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;