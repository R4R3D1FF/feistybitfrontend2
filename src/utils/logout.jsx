function LogOut(){
    console.log("LOGGIGN");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    fetch("https://feistybit.onrender.com/logout/");
    window.location.reload();
}

export default LogOut;