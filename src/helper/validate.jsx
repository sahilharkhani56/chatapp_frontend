import { toast } from "react-hot-toast"
import { authenticate } from "./helper.jsx"
// validate login page username
export async function usernameValidate(values){
    var errors=userVerify({},values)
    if(values.username){
        // check user exits or not
        const {status}=await authenticate(values.username)
        if(status!==200){
            errors.exits=toast.error("User Doesn't exits")
        }
    }
    return errors
} 
//Validate Username
export async function resetPasswordValidation(values){
    var errors=passwordVerify({},values)
    if(values.password!==values.confirm_pwd){
        errors.exits=toast.error("Password Not Match..!")
        
    }
}
// validate password
export async function passwordValidate(values){
    var errors=passwordVerify({},values)
    return errors
}
// validate profile page
export async function profileValidate(values){
    const errors=emailVerify({},values)
}
// validate register form
export async function registerValidation(values){
    var errors=userVerify({},values)
    passwordVerify(errors,values)
    emailVerify(errors,values)
    return errors
}
// validate password
function passwordVerify(error={},values){
    const specialChar=/[`!@#$%^&*()_+\-=\[\]{};':"'\\\,.<>\/?~]/;
    if(!values.password){
        error.password=toast.error("Password Required...!")
        
    }
    else if(values.password[0]===" "){
        error.password=toast.error("Wrong Password...!")
    }
    else if(values.password.length<4){
        error.password=toast.error("Password must be more than 4 characters long!")
    }
    else if(!specialChar.test(values.password))
    {
        error.password=toast.error("Passwowrd must contains special character..")
    }
    return error
}

function userVerify(error={},values){
    if(!values.username){
        error.username=toast.error("Username Required...!")

    }
    else if(values.username[0]===" "){
        error.username=toast.error("Invalid Username...!")
    }
    return error
}
// validate email
function emailVerify(error={},values){
    if(!values.email){
        error.email=toast.error("Email Required...!")
    }
    else if(values.email[0]===" "){
        error.email=toast.error("Invalid Email...!")
    }
    else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email))){
        error.email=toast.error("Invalid Email...!")
    }
    return error;
}