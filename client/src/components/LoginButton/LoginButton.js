import "./LoginButton.css";

const LoginButton = ({
    value,
    handleLogin,
    displayTrue,
    displayFalse,
}) => {
    return (
        <button className="login" onClick={handleLogin}>
            {value ? displayTrue : displayFalse}
        </button>
    );
}

export default LoginButton;