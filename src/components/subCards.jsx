import { useEffect, useState } from "react";
import SubCard from "./subCard.jsx";
import settings from "../../settings.json";

const SubCards = 
({ subs }) => {
    console.log("SUBS WERE", subs);
    const items = subs.map((item, index) => {
        return <SubCard key={index} sub={item} /> // Create an 'Item' component for each item
  
    });
  
  
  
    return (
  
      <div>
  
        {items}
  
      </div>
  
    );
  
};

const AllCards = () => {
    const [subs, setSubs] = useState([]); // State to store fetched data
  
    useEffect(() => {
      const fetchSubs = async () => {
        const resp = await fetch(`${settings.REACT_APP_BACKEND_URI}/subreddits/`);
        const data = await resp.json();
        console.log("RESPONDED", data);
        setSubs(data); // Store the data in state
      };
  
      fetchSubs(); // Call fetch function when component mounts
    }, []); // Empty dependency array to run once when the component mounts
  
    return <SubCards subs={subs} />; // Render SubCards with fetched subs
  };

export {SubCards, AllCards};
