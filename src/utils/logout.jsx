import settings from "../../settings.json";

async function LogOut(){
    console.log("LOGGIGN");
    await fetch(`${settings.REACT_APP_BACKEND_URI}/logout/`, {
        method: 'POST',
        credentials: "include"
    });
    window.location.reload();
}

export default LogOut;