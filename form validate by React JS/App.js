import React, { useEffect, useState } from 'react'

function App() {
    const [formValues, setFormValues] = useState({username:"", email:"", password:""});
    const [formErros, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        //console.log(name, value);
        setFormValues({...formValues, [name]: value});
        console.log(formValues);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }
    const validate = (values) => {
        const errors = {};
        const regularEx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.username){
            errors.username = "Username is required";
        }
        if(!values.email){
            errors.email = "Email is required";
        }
        else if(!regularEx.test(values.email)){
            errors.email = "this is not email format";
        }
        if(!values.password){
            errors.password = "Password is required";
        }
        else if(values.password.length < 4){
            errors.password = "Password cannot accept less than 4 characters";
        }
        else if(values.password.length > 10){
            errors.password = "Password cannot accept more than 10 characters";
        }
        return errors;
    }

    useEffect(() => {
        console.log(formErros);
        if(Object.keys(formErros).length === 0 && isSubmit){
            console.log(formValues);
        }
    }, [formErros]);

    return (
        <div className='container'>
            {Object.keys(formErros).length === 0 && isSubmit ? (
                <div className='success'>Signed in Successfully</div>
            ):(
                null
            )}
            <form onSubmit={handleSubmit}>
                <h1>Login Form</h1>
                <div>
                    <div>
                        <label>Username</label>
                        <input type='text' name='username' placeholder='Username'
                            value={formValues.username}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErros.username}</p>
                    <div>
                        <label>Email</label>
                        <input type='email' name='email' placeholder='Email'
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErros.email}</p>
                    <div>
                        <label>Password</label>
                        <input type='password' name='password' placeholder='Password'
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErros.password}</p>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default App
