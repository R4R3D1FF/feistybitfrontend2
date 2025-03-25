import settings from "../../settings.json";

function LogOut(){
    console.log("LOGGIGN");
    fetch(`${settings.REACT_APP_BACKEND_URI}/logout/`, {
        method: 'POST',
        credentials: "include"
    });
    window.location.reload();
}

export default LogOut;
