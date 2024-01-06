import { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
    const {isAuthenticated, user, loading} = useContext(Context);
    return ( 
        loading ? <Loader /> : (
            <div className="profile">
            <div className="profiletop">
                <h1> Username: {user?.name} </h1>
                <h1> Email - {user?.email} </h1>
            </div>
            <div className="profilefoot">
                <h3>-by Siddhant Baranwal</h3>
                <h3>Email - siddhantbr10@gmail.com</h3>
            </div>
            </div> 
        )
    );
}
 
export default Profile;