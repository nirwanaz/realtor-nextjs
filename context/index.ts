import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import Errorhandler from "@/backend/utils/errorHandler";

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Errorhandler("useAuth must be used within an AuthProvider", 500);
    }

    return context;
}