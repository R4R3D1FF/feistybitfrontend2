import { AllCards } from "../components/subCards.jsx";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import LogOut from "../utils/logout.jsx";
import settings from "../../settings.json";

const Layout = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    document.body.classList.add("bg-gray-100");

    // if (username)
    //   return;
    fetch(`${settings.REACT_APP_BACKEND_URI}/currUser/`, {
        method: "GET",
        credentials: "include" // Ensures cookies are sent
    })
    .then(response => {
      if (response.status === 403) {
        throw new Error("403 Forbidden - User not authenticated");
      }
      return response.json();
    }) // Parse JSON response
    .then(data => {
        if (data.username) {
            setUsername(data.username); // Update state with the username
        }
    })
    .catch(error => console.error("Error fetching user:", error));

  }, []);

  console.log(username);

    return (
      <div className="absolute left-0 top-0 h-full overflow-auto w-full">
        <header className="fixed bg-gray-200 w-full h-[10%] border-b border-gray-400 z-50">
          <a href="/">
            <img src="https://logos-world.net/wp-content/uploads/2023/12/Reddit-Logo.png" className="absolute h-20 inline left-[1%]" alt="Reddit Logo" />
          </a>
          <div className="absolute w-1/3 translate-x-[100%] top-[25%] bg-gray-300 p-[0.5%] rounded-full">
            <input type="text" className="search-input" placeholder="Search Reddit" autoComplete="off" />
          </div>
          <div className="inline absolute right-0 top-[33%]">
            {(username === null || username === undefined) ?
              <div className="bg-orange-700 py-2 mx-3 inline px-3 rounded-full">
                <a href = "/login/" className="!text-gray-200">
                  <b>Log In</b>
                </a>
              </div>
            :
              <div>
                <div className="inline px-5">
                  <a href = {`/u/${username}/`}>
                    {username}
                  </a>

                </div>
                <button onClick = {LogOut} className="!bg-orange-700 text-gray-300 !py-2 !mx-3 inline !px-3 !rounded-full">
                  <b>Log Out</b>
                </button>
              </div>
              
            }
            
            <div className="inline options-button">
              <b>. . .</b>
            </div>
          </div>
        </header>
        <div className="absolute top-[10%] flex space-x-1 h-full">
          <div className="w-1/6 p-4 border-gray-400 border-r overflow-auto">
            <AllCards/>
          </div>
          <div className="w-2/3 p-4 border-gray-400 border-r overflow-auto">
            <Outlet/>
            
          </div>
          <div className="w-1/6 p-4 overflow-auto">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illo tempora
              recusandae praesentium debitis laboriosam temporibus? Unde dicta eaque dolores modi
              debitis quibusdam consequuntur quae provident cum. Quos, explicabo minus!
              Our HTML editor updates the webview automatically in real-time as you write code.
            </p>
          </div>
        </div>
      </div>
    );
  };

export default Layout;
