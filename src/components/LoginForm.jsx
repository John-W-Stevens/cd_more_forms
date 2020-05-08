import React, { useState, useRef } from "react"

const LoginForm = props => {
    const { users, setUsers } = props;

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
    })

    const firstNameRef = useRef("")
    const lastNameRef = useRef("")
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const confirmPasswordRef = useRef("")

    function validateNameInput(name){
        // Returns true if name only contains english letters, '-', or ' and is between 2-30 characters
        var re = /^([a-zA-Z'-]){2,30}$/
        return re.test(name)
    }

    function validateEmailFormat(email){
        // Returns true if email is valid, false otherwise
        var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return re.test(email)
    }

    function validatePasswordFormat(password){
        // Returns true if input contains at least 1 uppercase, 1 lowercase, 1 digit,
        // 1 special character, and is at between 8 and 16 characters long
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
        return re.test(password)
    }


    const validateFirstName = (firstName) => {
        if (firstName.length === 0 || validateNameInput(firstName)){setUser({...user, firstNameError: "", firstName: firstName})}
        else {setUser({...user, firstNameError: "First name must have at least 2 letters and contain only valid characters"})}
    }

    const validateLastName = lastName => {
        if (lastName.length === 0 || validateNameInput(lastName)){setUser({...user, lastNameError: "", lastName: lastName})}
        else {setUser({...user, lastNameError: "Last name must have at least 2 letters and contain only valid characters"})}
    }
    const validateEmail = email => {
        if (email.length === 0 || validateEmailFormat(email)){ setUser({ ...user, emailError: "", email: email})}
        else {setUser({...user, emailError: "Invalid email address"})}
    }
    const validatePassword = password => {
        if (password.length === 0 || validatePasswordFormat(password)){ setUser({ ...user, passwordError: "", password: password})}
        else {setUser({...user, passwordError: "Password must be between 8 and 16 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character."})}
    }

    const validateConfirmPassword = confirmPassword => {
        if (confirmPassword.length === 0 || confirmPassword === user.password){ setUser({ ...user, confirmPasswordError: "", confirmPassword: confirmPassword})}
        else {setUser({...user, confirmPasswordError: "Passwords must match."})}
    }

    const handleFirstNameInput = e => {
        setUser({...user, firstName: e.target.value})
        validateFirstName(e.target.value)
    }

    const handleLastNameInput = e => {
        setUser({...user, lastName: e.target.value})
        validateLastName(e.target.value)
    }
    const handleEmailInput = e => {
        setUser({...user, email: e.target.value})
        validateEmail(e.target.value)
    }
    const handlePasswordInput = e => {
        setUser({...user, password: e.target.value})
        validatePassword(e.target.value)
    }
    const handleConfirmPasswordInput = e => {
        setUser({...user, confirmPassword: e.target.value})
        validateConfirmPassword(e.target.value)
    } 

    const resetUser = () => {
        setUser({...user, firstName: "", lastName: "", email: "", password: "", confirmPassword: ""})
    }

    const handleSubmission = e => {
        e.preventDefault()
        if (user.firstNameError || user.lastNameError || user.emailError || user.passwordError || user.confirmPasswordError){
            alert("Invalid input, cannot complete registration")
        }
        else if (user.firstName === "" || user.lastName === "" || user.email === "" || user.password === "" || user.confirmPassword === ""){
            alert("Invalid input, cannot complete registration")
        }

        else {
            let newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                confirmPassword: user.password
            }
            setUsers(users.concat(newUser))
            resetUser()

            firstNameRef.current.value = ""
            lastNameRef.current.value = ""
            emailRef.current.value = ""
            passwordRef.current.value = ""
            confirmPasswordRef.current.value = ""
            firstNameRef.current.focus()

            console.log("New user successfully registered!")
        }
    }


    return(
        <div className="row">
            <div className="col-8 offset-2">
                <form onSubmit={ handleSubmission }>
                    <div className="form-group">
                        <label>First Name: <small style={{color: "red"}}>{user.firstNameError}</small></label>
                        <input onChange={ handleFirstNameInput } ref={ firstNameRef } type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Last Name: <small style={{color: "red"}}>{user.lastNameError}</small></label>
                        <input onChange={ handleLastNameInput } ref={ lastNameRef } type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Email: <small style={{color: "red"}}>{user.emailError}</small></label>
                        <input onChange={ handleEmailInput } ref={ emailRef } type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Password: <small style={{color: "red"}}>{user.passwordError}</small></label>
                        <input onChange={ handlePasswordInput } ref={ passwordRef } type="password" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: <small style={{color: "red"}}>{user.confirmPasswordError}</small></label>
                        <input onChange={ handleConfirmPasswordInput } ref={confirmPasswordRef} type="password" className="form-control"/>
                    </div>
                    <div className="form-group text-right">
                        <button className="btn btn-sm btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm