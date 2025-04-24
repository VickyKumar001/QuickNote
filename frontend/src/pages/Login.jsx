// import Form from "../components/Form"

// function Login() {
//     return <Form route="/api/token/" method="login" />
// }

// export default Login 



import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

function Login() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center" }}>
            <Form route="/api/token/" method="login" />
            <p style={{ marginTop: "10px" }}>
                Don't have an account?
                <button
                    onClick={() => navigate("/register")}
                    style={{
                        marginLeft: "8px",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        backgroundColor: "#333",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Register
                </button>
            </p>
        </div>
    );
}

export default Login;
