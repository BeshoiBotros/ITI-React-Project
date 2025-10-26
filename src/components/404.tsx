import type React from "react";

const NotFound: React.FC = ()=>{
    return(
        <>
            <div style={{height: '100vh', display : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1 className="text-base-300 text-error text-2xl">Not Found 404</h1>
            </div>
        </>
    )
}

export default NotFound;