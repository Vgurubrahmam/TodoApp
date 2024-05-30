import { useEffect, useState } from "react";

function Product(){
    let [name,setName]=useState(0)
    useEffect(()=> console.log("clcik"),[name])
    
    return(
        <div className="user">
           <App/>
        </div>
    )
}
export default Product;