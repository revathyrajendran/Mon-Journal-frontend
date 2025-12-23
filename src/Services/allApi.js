import BASEURL from "./baseURL"
import commonAPI from "./commonAPI"

//signup API
//called By Auth component when signUp button is clicked , this API call has userName, userEmail, password so has reqBody as parameter
export const signUp= async(reqBody)=>{
    return await commonAPI("POST",`${BASEURL}/register`,reqBody)
}


//login API - it also needs reqBody, POST is used here because body needs to be passed and POST is easy here.
export const logIn = async(reqBody)=>{
    return await commonAPI("POST",`${BASEURL}/login`,reqBody)
}

//google-login
export const googleLogin = async(reqBody)=>{
    return await commonAPI("POST",`${BASEURL}/google-login`,reqBody)
}
//authorosed user api
//add page API - called by Write Component
export const addAPage = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASEURL}/add-page`,reqBody,reqHeader)
}
//view all pages API of a user in their mydiary component , reqHeader has token in it.
export const getAllPagesInDiary= async(reqHeader)=>{
    return await commonAPI("GET",`${BASEURL}/get-all-pages`,{},reqHeader)
}
//delete a page API
export const deleteAPageFromDiary = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${BASEURL}/delete-apage/${id}`,{},reqHeader)
}
