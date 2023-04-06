import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    Name:Yup.string().min(5).max(15).required("Please Enter Your Name"),
    Email:Yup.string().min(3).max(25).required('Please Enter Your Email'),
    Profession:Yup.string().min(2).max(15).required('Please Enter Your Profession'),
    Place:Yup.string().min(2).max(10).required('Please enter your place'),
    Vehicle:Yup.string().min(2).max(10).required('Enter your Vehicle')
})