import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

export default function AuthStatus() {
    let auth = useContext(AuthContext);
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user}!{' '}
            <button
                onClick={() => {
                    auth.signout(() => navigate('/'));
                }}
            >
                Sign out
            </button>
        </p>
    );
}