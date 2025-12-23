//import axios
import axios from 'axios'
//async await and axios is there, async has detaisl about baseURL, httpmethod, rebody and reqheader if needed. , I am using reheader because I am uploading a image here.
const commonAPI = async(httpmethod,url,reBody,reqHeader)=>{

    //creating reqConfig , whuich is an object,  to create axios instance
    const reqConfig ={
       method:httpmethod,
       url,
       data:reBody,
       //every API calls wont invlve media files, in that case reqHeader will be an empty object
       headers:reqHeader
    }

    //return is for getting output , await is for async,
    return await axios(reqConfig).then(res=>{
        return res
        
    }).catch(err=>{
        return err
    })

}
export default commonAPI