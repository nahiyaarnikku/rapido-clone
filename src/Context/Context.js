import {createContext, useState } from "react";
const DataContext = createContext(null);

export const DataProvider = ({children}) => {
  const [active,setActive] = useState(localStorage.getItem("nav"))
  
      const [toggleActive,setToggleActive] = useState("Customers")
      const [toggleActive1,setToggleActive1] = useState("Customers")
      const [safetyNav,setSafetyNav] = useState("Overview")
      const [formData,setFormData] = useState({
      name :"",
      email:"",
      mobile:"",
      role:"",
      query:"",
      comment:""
      })  
      const [elementError,setElementError] = useState({})
      const handleChange = (e) => {
          const {name , value} = e.target;
          setFormData({...formData,[name]:value})
      }

      const validForm = () => {
        const inputError = { name :"",
        email:"",
        mobile:"",
        role:"",
        query:"",
        comment:""}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileNumRegex = /^[0-9]{10}$/;
 if(formData.name ===  ""){
  inputError.name = "Enter your name";
 }else{
  inputError.name = "";

 }
  if(formData.email === "" || !emailRegex.test(formData.email)){
    inputError.email = "Enter a valid email";
  }else{
    inputError.email = "";
  }
  if(formData.mobile === "" || !mobileNumRegex.test(formData.mobile) ){
    inputError.mobile = "Enter a valid mobile number";
  }else{
    inputError.mobile = "";
  
  }
  if(formData.role === ""){
    inputError.role = "Please select your role(captain/customer)";
  }else{
    inputError.role = "";
  }
  if(formData.query === ""){
    inputError.query = "Please select query";
  }else{
    inputError.query = "";
  }
  if(formData.comment === ""){
    inputError.comment = "Enter your comment";
  }else{
    inputError.comment = "";
  }
  setElementError(inputError)
      }
      const handleSubmit = (e) => {
        e.preventDefault();
       validForm();
       const result = Object.entries(elementError).every((obj) => obj[1]==="")
       if(result){
        console.log("Form Validation Success !");
       }
      }

     return(
        <DataContext.Provider value={{
          active,setActive,toggleActive,setToggleActive,toggleActive1,setToggleActive1,safetyNav,setSafetyNav,handleChange,handleSubmit,formData,elementError
        }}>
            {children}
        </DataContext.Provider>
     )
}

export default DataContext