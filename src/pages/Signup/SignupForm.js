import { useState } from "react";
import Input from "../../components/form/Input.js"
import FormAction from "../../components/form/FormAction";
import signupFields from "./signupFields";

// Setup fields for useState
const formFields = signupFields;
let formFieldsState = {};
formFields.forEach(field => formFieldsState[field.id='']);

export default function SignupForm() {
    const [formData, setFormData] = useState(formFieldsState);
    const [postId, setPostId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (event) => {
        setPostId(null); setErrorMessage(null);
        const { name, value } = event.target;
        setFormData(formData => ({...formData, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        // Reset errors
        setPostId(null); setErrorMessage(null);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.company,
                user: {
                    userName: formData.email,
                    firstName: formData.firstname,
                    lastName: formData.lastname,
                    email: formData.email,
                    password: formData.password
                },
                workspace: {
                    name: formData.workspace
                }
              })
        };
        fetch('http://ec2-54-234-89-227.compute-1.amazonaws.com:4000/api/Tenants', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = data || response.status;
                    return Promise.reject(error);
                }
                setPostId(data.id);
            })
            .catch(error => {
                setErrorMessage(error.toString());
                console.error('There was an error!', errorMessage);
            });
    }

    return(
        <body className="min-h-screen bg-gradient-to-b from-gray-900 via-dark-purple to-violet-600">
            <div className="flex items-center justify-center h-screen">
                <form className="space-y-6 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white" onSubmit={handleSubmit}>
                { errorMessage &&
                 <h3 className="error"> { errorMessage } </h3>
                }
                { postId && 
                 <h3 className="success">User account created sucessfully!</h3>
                }
                <h2>Sign up!</h2>
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
                    <FormAction handleSubmit={handleSubmit} text="Signup" />
                    <a href="/login">Already have an account? Click here to login.</a>
                </form>
            </div>
        </body>
    )
}