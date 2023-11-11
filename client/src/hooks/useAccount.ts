import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const GetCurrentUser = () => { 
    return useSelector((state: RootState) => state.user.currentUser );
}