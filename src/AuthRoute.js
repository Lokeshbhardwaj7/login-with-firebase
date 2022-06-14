import React from 'react'

function AuthRoute() {
   
   const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null; 
   if(user) {
      return <Redirect to="/dashboard/app" />;
   }else{
      return <Redirect to="/" />;
   }
}
export default AuthRoute