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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(formData => ({...formData, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
        </form>
    )
}