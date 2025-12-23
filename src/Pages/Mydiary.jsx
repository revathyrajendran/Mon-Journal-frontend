import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteAPageFromDiary, getAllPagesInDiary } from '../Services/allApi'
import BASEURL from '../Services/baseURL'


const Mydiary = () => {
  //to get token 
  const[token,setToken] = useState("")
  //to get token 
  useEffect(()=>{
    const tokenisthere = sessionStorage.getItem('token')?.replace(/"/g, "")
    if(tokenisthere){
      setToken(tokenisthere)
      getAllpagesindiary(tokenisthere)
    }
  },[])
  console.log(token);

  //to fetch all pages- many elements so array
  const[pages,setPages]=useState([])
//function 
const getAllpagesindiary = async(token)=>{
  const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try{
      const result = await getAllPagesInDiary(reqHeader)
      if(result.status==200){
        setPages(result.data)
      }else{
              console.log(result);
              
        }
     } catch (err) {
            console.log(err);
    }
}
  
//DELETE A PAGE FROM DIARY
const handledeletepage=async(id)=>{
  const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try{
      const result = await deleteAPageFromDiary(id,reqHeader)
      if(result.status == 200){
        setPages(pages.filter(page=>page._id !== id))
      }

    }
    catch (err) {
            console.log(err);
    }
}
  //navigate
    const navigate = useNavigate()

  //to get a ussername - to see user's name
  const[userName,setUserName]=useState("")
  //state which decides whether the user is there or not
  const[yesUser,setYesUser]=useState(false)
  useEffect(()=>{
    //we stored user token and details in user key in session storage, so we are getting it from session and storing it into a variable called user 
    const user = sessionStorage.getItem('user')
    //if there is a value in user variable
    if(user){
      //user is there in session , so true
      setYesUser(true)
      // the user stored in session is parsed
      const parsedUser = JSON.parse(user)
      setUserName(parsedUser.userName.split(' ')[0])
    }

    
  },[])
  //DELETE A PAGE
    
  //logout function
  const handleLogout=()=>{
    sessionStorage.clear()
    navigate('/')
}
//back to write
const handleBack=()=>{
  navigate('/write')
}
  return (
    <>
       <div className='bg-emerald-100'>
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
                {/* Mydiary */}
                <div className="text-center text-bold text-8xl italic">{userName}'s Diary</div>
                <div><button type='button' onClick={handleBack} className='p-3 mx-5  my-3 rounded text-white text-bold bg-black'>Create A New Page</button></div>
              <div className="mx-5">
                <div className="md:grid grid-cols-3 gap-2 mt-5 ">
                  {/*column to be repeated */}

                  { pages.length > 0?

                   pages.map((page)=>(
                     <div key={page?._id}  className='bg-white rounded mb-2'>
                   
                    <div className='flex justify-evenly mt-3 text-2xl '>
                      <h1 className="text-bold text-black  ">{new Date(parseInt(page._id.substring(0, 8), 16) * 1000).toLocaleString()}</h1>
                      <button onClick={()=>handledeletepage(page._id)} type='button'><i className="fa-solid fa-trash-can text-red-500"></i></button>
                     
                    
                    </div>
                   
                    <div className="mx-3 my-3 p-3 shadow border border-2 border-zinc-400 ">
                        <div className=" flex-col ">
                          <img src={`${BASEURL}/uploads/${page.uploadImg}`} alt="" style={{height:"200px",width:"200px"}}/>
                          <p className='text-xl text-bold'>{page?.content}</p>
                        </div>
                    </div>
                  </div>
                   ))
                  :
                  (<p className='text-bold text-2xl text-black'>Start Creating Your Pages!!</p>)
                  }
                 
                </div>
              </div>
       </div>
    </>
  )
}

export default Mydiary