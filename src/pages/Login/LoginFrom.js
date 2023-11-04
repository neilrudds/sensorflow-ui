import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../components/form/Input.js"
import FormAction from "../../components/form/FormAction";
import loginFields from "./loginFields.js";
import AuthStatus from "../../components/ui/AuthStatus.js";
import AuthContext from "../../context/auth-context.js"


// Setup fields for useState
const formFields = loginFields;
let formFieldsState = {};
formFields.forEach(field => formFieldsState[field.id='']);

export default function LoginForm() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useContext(AuthContext);
    const [formData, setFormData] = useState(formFieldsState);

    let from = location.state?.from?.pathname || '/';

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(formData => ({...formData, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let username = formData.email;

        console.log(username);

        auth.signin(username, () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, { replace: true });
        });
    }

    return(
        <body className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <div className="flex items-center justify-center h-screen">
                <form className="space-y-6 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white" onSubmit={handleSubmit}>
                    {
                        formFields.map(field =>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={formData[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                            />
                        
                        )
                    }
                    <FormAction handleSubmit={handleSubmit} text="Login" />       
                </form>
            </div>
        </body>
    )
}