import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { addAPage } from '../Services/allApi';


const Write = () => {
  //write diary page - to take input
  const[pageDetail,setPageDetails] = useState({
    uploadImg:"",
    content:""

  })
  console.log(pageDetail);
  
  //navigate
  const navigate = useNavigate()

  //state to check is user is there, then only logout button must appear.
  const[yesUser,setYesUser]=useState(false)
  
  //to get user name 
  const[userName,setUserName]=useState("")
  //token state
  const[token,setToken]=useState("")
  //useeffect to get username from sessionstorage
  useEffect(()=>{
    const user = sessionStorage.getItem('user')
    if(user){
      setYesUser(true)
      //convert to object
      const parsedUser = JSON.parse(user)
      setUserName(parsedUser.userName.split(' ')[0])
    }

  },[])
  //to see if user is there and we need token,
  useEffect(()=>{
    const tokenisthere = sessionStorage.getItem('token')?.replace(/"/g, "")
    if(tokenisthere){
      setToken(tokenisthere)
    }
  },[])
  console.log(token);
  
  
  
  //uploaded image state
  const[image,setImage] = useState("")

  //function to handle upload image
  const handleUploadImg=(e)=>{
       console.log(e.target.files[0])
       //file is given in pagedetails
       setPageDetails({...pageDetail,uploadImg:e.target.files[0]})
       //url of uploaded image is created using predefinrd method in js. 
       const url = URL.createObjectURL(e.target.files[0])
       setImage(url)
  }

  //logout function
  const handleLogout=()=>{
    sessionStorage.clear()
    navigate('/')
}
//handlrereset
const handleReset=()=>{
  setPageDetails({
    uploadImg:"",
    content:""
  })
  setImage("")
 
  
}

//Add new page
const AddNewPage =async()=>{
  //ensuring if all fileds are available,
  const{uploadImg,content} = pageDetail
  if(!uploadImg || !content){
    toast.info("OOPS! , Your Page is missing Something")
  }
  else{
    //bring reqBody , reqHeader 
    const reqHeader = {
      "Authorization":`Bearer ${token}`
    }
    const reqBody = new FormData()
    for(let key in pageDetail){
      reqBody.append(key,pageDetail[key])
    }
    console.log(reqBody);
    //for(var pair of reqBody.entries()){
      //console.log(pair[0]+', '+pair[1]);
      
    //}
    try{
      const result = await addAPage(reqBody,reqHeader)
      console.log(result);
      if(result.status==401){
        toast.warning(result.response.data)
        //clear all fields
        handleReset()
      }
      else if(result.status == 200){
         toast.success("Page Added Successfully To Your Diary!")
          
        //clear all fields
        handleReset()
        
      }else{
          toast.error("OOPS,There is some error!")
        //clear all fields
        handleReset()
      }
      

    }catch(err){
      console.log(err);
       
    }
    

  }
}
  return (
    <>
    {/*Header*/}
            <div className="bg-rose-600   p-5">
              
              <div className='flex'>
                <i className="fa-solid fa-book text-3xl text-white"></i>
                <h1 className='text-2xl ms-4 text-white'>Mon-Journal</h1>
                <div className="ms-auto">
                   {
                    yesUser&&
                     <button onClick={handleLogout} type='button' className='p-3 bg-black text-white text-xl text-bold rounded'> Logout </button>
                   }
                </div>
              
              </div>
            </div>

            

            {/* Write component */}

            <div className='bg-green-200 '>
              <marquee behavior="" direction="" className="text-2xl text-black italic"> ✨📖🖊️📷 Enjoy creating memories❗.</marquee>
            </div>
            {/* User Name display */}
            { userName&& 
            <h1 className='text-center font-bold text-3xl text-rose-700 italic mt-3'> It's time to write, {userName}</h1>
            }
           <div className='bg-[url(/MonAuthbg.jpeg)]  min-h-screen'>
              <div className="md:grid grid-cols-3 gap-2">
                
                <div></div>
               
                <div className='p-3 m-3 bg-white my-5'>

                  <div >
                    {/*Memory uploading */}
                    <label htmlFor="memory">
                    <input  className='hidden ' onChange={ (e)=>handleUploadImg(e)} type="file" id='memory'  />
                    {
                      !image?
                      <img  src="/memupload.jpeg" alt="" style={{height:"150px",width:"150px", marginLeft:"165px"}}  className='my-3'  />
                      :
                      <img src={image} alt="" style={{height:"200px",width:"200px", marginLeft:"165px"}}  className='my-3' />

                    }
                    </label>
                  </div>
  
                   <textarea value={pageDetail.content} onChange={e=>setPageDetails({...pageDetail,content:e.target.value})} type="text" className='w-full border border-1 border-zinc-300 text-black ' rows={20}  />
  
                  <div className="flex">
                <button onClick={AddNewPage} className="text-xl text-black bg-green-600 p-3 ">Add New Page</button>
               <Link to={'/mydiary'} className="text-xl text-black bg-blue-600 ms-auto p-3">Go To My Diary</Link>
              </div>
                   
                </div>
               
               
                <div></div>
              </div>
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

export default Write