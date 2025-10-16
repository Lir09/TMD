import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../pages/Login.css";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "admin" && pw === "1234") {
      navigate("/home");
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="Login_form">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input_box">
          <input
            type="text"
            className="Login_id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <label>ID</label>
        </div>

        <div className="input_box">
          <input
            type="password"
            className="Login_pw"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        <button className="Login_btn" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;
