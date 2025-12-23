import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { googleLogin, logIn, signUp } from '../Services/allApi';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

const Auth = ({register}) => {
  //navigate hook
  const navigate = useNavigate()
  //login or register form details
  const[userDetails,setUserDetails] = useState({
   userName:"",
    userEmail:"",
    password:""
  })
  //console.log(userDetails);

  // function to handle Sign up
  const handleSignUp= async()=>{
    console.log("inside handleSignUp ");
    const {userName,userEmail,password} = userDetails
    if(!userName || !userEmail || !password){
      toast.info('Your diary is waiting ✨ Please fill in all the details to begin writing your memories 📖💗')
    }
    else{
      //toast.success('Proceed to API call!')
      //here Api call is made from all APIs.
       try{
        const result = await signUp(userDetails)
        if(result.status == 200){
          toast.success("Your diary is ready! 📔 Begin your journey and capture your first memory today.❤️")
          setUserDetails({
            userName:"",
            userEmail:"",
            password:""
          })
          navigate('/login')

        }
        else if(result.status==409){
          toast.warning(result.response.data)
           setUserDetails({
            userName:"",
            userEmail:"",
            password:""
          })
        }
        else{
          console.log(result.data);
          toast.error("Something went wrong!")
           setUserDetails({userName:"",userEmail:"",password:""})
          
        }

       }catch(err){
        console.log(err);
        
       }
    }
    
  }

  //function to handle login 
  const handleLogin = async()=>{
    const{userEmail,password} = userDetails
    if(!userEmail ||!password){
      toast.info('Your diary is waiting ✨ Please fill in all the details to begin writing your memories 📖💗')
    }
    else{
      try{
        const result = await logIn(userDetails)
        if(result.status == 200){
           toast.success("🔓 Your diary is unlocked! Start writing your next page ❗.")
           //store the result of response in sessional storage , becUse in login, we placed inside user object , userdetails as well as taoken is stored, that is now stored in sessionStorage. 
           sessionStorage.setItem("user",JSON.stringify(result.data.user))
           sessionStorage.setItem("token",(result.data.token))
          //to make the alert stay for 2.5 s , setTimeout is used.
           setTimeout(()=>{
                   navigate('/write')
           },2500)

        }
        //409 during register to check if user is already registered. 404 means details is not present at all
        else if(result.status ==401){
           toast.warning(result.response.data)
           setUserDetails({userName:"",userEmail:"",password:""})
        }
        else if(result.status ==404){
          toast.warning(result.response.data)
           setUserDetails({userName:"",userEmail:"",password:""})
        }
        else{
                toast.error("Something went wrong!")
           setUserDetails({userName:"",userEmail:"",password:""})
        }
      }catch(err){
        console.log(err);
              
      }


    }
  }

  //Google Login credentialResponse output
// This credential is from credentialResponse output printed in console window, when google login button was clicked.
const handleGoogleLogin=async(credentialResponse)=>{
  const credential = credentialResponse.credential
  const decodedCredentials = jwtDecode(credential)
  console.log(decodedCredentials);
  //calling google login API
  try{
    const result = await googleLogin({userEmail:decodedCredentials.email,userName:decodedCredentials.name, password:'googlepswd'})
    console.log(result);
    

    if(result.status==200){

      toast.success("🔓 Your diary is unlocked! Start writing your next page ❗.")
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      sessionStorage.setItem("token",JSON.stringify(result.data.token))
      setTimeout(()=>{
                   navigate('/write')
      },2500)
    }else{
       toast.error("Something went wrong!")
    }

  }catch(err){
        console.log(err);
              
  }
}
  
  //eye for password
  const[viewPassword,setViewPassword] = useState(false)
  return (
    <>
      <div >
        {/*Header*/}
            <div className="bg-rose-600   p-5">
              
              <div className='flex'>
                <i className="fa-solid fa-book text-3xl text-white"></i>
                <h1 className='text-2xl ms-4 text-white'>Mon-Journal</h1>
                <div className="ms-auto">
                    <Link to={'/'} className='text-xl text-zinc' id='home'>Home</Link>
                </div>
              
              </div>
            </div>


            {/* Login  */}
            <div className='w-full min-h-screen bg-[url(/MonAuthbg.jpeg)] bg-center  '>
              
               <div className=" md:grid grid-cols-3 gap-5 flex-col ">
                <div></div>
                
                <div  className=" my-5  flex-col justify-center items-center  text-center border border-2 border-zinc-600 p-5 bg-zinc-800 text-white" style={{marginTop:'120px'}} rounded>
                  <div className=" my-5 ">
                    
                    <div className='text-center'>
                      {/* Login or Register Form */}
                      <form >
                        {
                          register&&
                            
                          <input value={userDetails.userName} onChange={e=>setUserDetails({...userDetails,userName:e.target.value})} type="text" placeholder='Enter Your Name' className='bg-zinc-300 placeholder-gray-400 text-black w-full mb-3 p-3 placeholder-text-xl rounded' />

                        }
                        <input value={userDetails.userEmail} onChange={e=>setUserDetails({...userDetails,userEmail:e.target.value})} type="text" placeholder='Enter Your Email ' className='bg-zinc-300 placeholder-gray-400 text-black w-full mb-3 p-3 placeholder-text-xl rounded' />
                    <div className='flex items-center '>
                          {/* Type is set to text is password has to be seen, else type is set to password */}
                          <input value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} type={viewPassword? "text":"password"} placeholder='Enter Your Password' className='bg-zinc-300 placeholder-gray-400 text-black w-full mb-3 p-3 placeholder-text-xl rounded' />
                          {/* initially viewpassword is false , so first eye without slash , then it becomes true, so eye with slash*/}
                          {
                           
                          !viewPassword?
                          <i className="fa-solid fa-eye text-black cursor-pointer " style={{marginLeft:'-40px'}} onClick={()=>{setViewPassword(!viewPassword)}}></i>
                          :
  
                          <i className="fa-solid fa-eye-slash text-black cursor-pointer " style={{marginLeft:'-40px'}} onClick={()=>{setViewPassword(!viewPassword)}}></i>
                          
                          }
                    </div>

                     <div>
                       { 
                          register ?
                          <button type='button' onClick={handleSignUp} className=" ms-auto p-5 bg-blue-500 text-xl font-bold mt-3">Sign UP </button>
                          :
                           <button type='button' onClick={handleLogin} className=" ms-auto p-5 bg-green-400 text-xl font-bold mt-3">Login </button>
     
                        }
                     </div>
                     {/* Google Login */}
                     <div className="text-center">
                    {!register && <p className='text-white text-2xl text-bold mt-3'>------------------------or----------------------</p>
                      }
                      {!register && 
                        <div className='mt-5 text-center flex-col justify-center items-center' style={{width:"200px", marginLeft:"150px"}}>
                          <GoogleLogin
                             onSuccess={credentialResponse => {
                              {/* Credential response must be decoded */}
                              console.log(credentialResponse);
                              handleGoogleLogin(credentialResponse)
                                  }}
                               onError={() => {
                              console.log('Login Failed');
                              }}
                             
                          />
                        </div>
                      }
                     </div>


                       
                      
                      
                      </form>
                    
                     
                    </div>
                  </div>
                </div>

            <div></div>
               
               </div>
               
              </div>

              {/* Toast for alerts */}
              <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>
        
        
         </div>
   
    
    </>
  )
}

export default Auth