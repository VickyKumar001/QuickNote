// import Form from "../components/Form"

// function Register() {
//     return <Form route="/api/user/register/" method="register" />
// }

// export default Register


import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

function Register() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center" }}>
            <Form route="/api/user/register/" method="register" />
            <p style={{ marginTop: "10px" }}>
                Already have an account?
                <button
                    onClick={() => navigate("/login")}
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
                    Login
                </button>
            </p>
        </div>
    );
}

export default Register;
