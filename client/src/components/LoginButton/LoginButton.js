import "./LoginButton.css";
import Loader from "../Loader/Loader";

const LoginButton = ({
    value,
    handleLogin,
    isLoading,
    displayTrue,
    displayFalse,
}) => {
    if (isLoading) {
        return (
            <>
                <button className="login">
                    <Loader className={"Login"} />
                </button>
            </>
        );
    } else {
        return (
            <>
                <button className="login" onClick={handleLogin}>
                    {value ? displayTrue : displayFalse}
                </button>
            </>
        );
    }
}

export default LoginButton;