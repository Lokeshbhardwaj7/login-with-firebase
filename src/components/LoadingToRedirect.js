import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const LoadingToRedirect = () => {
   const[count, setCount] = useState(5);
   const navigate = useNavigate();
   useEffect(() => {
      const interval = setInterval(() =>{
         setCount((currentCount) => --currentCount);
      }, 1000);
      count === 0 && navigate('/');
      return () => clearInterval(interval);
   }, [count, navigate]);
   return (
      <div>
         <h1>Redirecting in {count} seconds...</h1>
      </div>
   );
};
export default LoadingToRedirect;