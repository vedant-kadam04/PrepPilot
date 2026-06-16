import { useState} from "react";
import { useNavigate } from  "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Register(){
    const[ formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
        ...formData,
       [e.target.name]: e.target.value,
    });
   };
   
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await api.post(
           "/auth/register",
            formData
        );
      toast.success("Registration successful");
      setTimeout(() => {
             navigate("/");
        }, 1500);

      console.log(response.data);
      setFormData({
        name:"",
        email:"",
        password:"",
      });

     } catch (error) {
         if(error.response){
            toast.error(error.response.data.message);
         }else{
            toast.error(error.message);
         }
     }
    };

    return(
        <form
            onSubmit={handleSubmit}
            style={{
                width:"400px",
                margin:"50px auto",
                display:"flex",
                flexDirection:"column",
                gap:"15px",
            }}

        >
            <h1>Register</h1>

            <input 
            type="text"
            name="name"
            placeholder="Name" 
            value={formData.name}
            onChange={handleChange}
            />

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

            <button type="submit">Register</button>   
        </form>
    );
}

export default Register;