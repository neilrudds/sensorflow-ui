const signupFields = [
    {
        labelText:"First name",
        labelFor:"firstname",
        id:"firstname",
        name:"firstname",
        type:"text",
        autoComplete:"firstname",
        isRequired:true,
        placeholder:"e.g. Joe"  
    },
    {
        labelText:"Last name",
        labelFor:"lastname",
        id:"lastname",
        name:"lastname",
        type:"text",
        autoComplete:"lastname",
        isRequired:true,
        placeholder:"e.g. Bloggs"  
    },
    {
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"e.g. joe.bloggs@domain.com"   
    },
    {
        labelText:"Name of your company/organisation",
        labelFor:"company",
        id:"company",
        name:"company",
        type:"text",
        autoComplete:"company",
        isRequired:true,
        placeholder:"e.g. the name of your company, organisation or your name"
    },
    {
        labelText:"Name of your first workspace",
        labelFor:"workspace",
        id:"workspace",
        name:"workspace",
        type:"text",
        autoComplete:"workspace",
        isRequired:true,
        placeholder:"e.g. the name of your company or your name"
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password"   
    }
]

export default signupFields