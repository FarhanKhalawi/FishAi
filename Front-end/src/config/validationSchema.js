import * as Yup from "yup";

/* Edit profile validation schema */
export const editProfileValidationSchema = Yup.object().shape( {
    nickname : Yup.string().required().label( "Nickname" ),
    phoneNumber : Yup.number().required().label( "Phone number" ),
    DOB : Yup.string().required().label( "Date of Birth" )
} )


/* Sign In validation schema */
export const signInValidationSchema = Yup.object().shape( {
    email : Yup.string().email().required().label( "e-mail" ),
    password : Yup.string().required().label( "password" ),
} )


/* Sign Up validation schema */
export const signUpValidationSchema = Yup.object().shape( {
    nickname : Yup.string().required().label( "nickname" ),
    phoneNumber : Yup.number().required().label( "phone number" ),    email: Yup.string().email().required().label("email"),
    password: Yup.string().required().min(8).label("password"),
    confirmPassword: Yup.string().required().min(8).oneOf([Yup.ref("password"), null], "password confirmation does not match").label("confirm password")
} )

/*forgot password validation schema */
export const forgotPasswordValidationSchema = Yup.object().shape( {
    email: Yup.string().email().required().label("email"),
} )