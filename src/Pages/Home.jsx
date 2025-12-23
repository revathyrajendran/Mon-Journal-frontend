import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <>
       <div >
        {/*Header*/}
            <div className="bg-rose-600   p-5">
              
              <div className='flex'>
                <i className="fa-solid fa-book text-3xl text-white"></i>
                <h1 className='text-2xl ms-4 text-white'>Mon-Journal</h1>
                 
              
              
              </div>
            </div>


            {/*Auth  */}
            <div className='w-full min-h-screen bg-[url(/MonAuthbg.jpeg)] bg-center '>
              
               <div className="grid grid-cols-3 gap-5">
                <div></div>
                <div  className=" my-5 flex-col justify-center items-center  text-center border border-2 border-zinc-600 p-5 bg-zinc-800 text-white" style={{marginTop:'120px'}}>
                  <div className=" my-5 ">
                    <p className='text-xl text-lime-300 font-bold'>
                      A diary that holds your secrets securely, feels safe to share with, and helps keep your memories intact. A personal space where you can pour out your thoughts ❗.
                    </p>
                    <br />
                    <p className='text-xl text-lime-300 font-bold mb-3'>
                      Create your own diary and begin creating more memories worth cherishing. Sign up today to capture your moments, emotions, and stories📖✨.
                    </p>
                    <div className='flex '>
                    <Link to={'/register'}><button className=" me-2 p-5 bg-blue-400 text-xl font-bold">Sign Up</button></Link>
                   <Link to={'/login'} className='ms-auto'><button  className=" p-5 bg-green-400 text-xl font-bold">Login </button></Link>
                    </div>
                  </div>
                </div>
                <div></div>
               </div>
               
               </div>
        
        
         </div>
    
    </>
  )
}

export default Home