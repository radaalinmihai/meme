import { useState } from "react";
import { useSelector } from "react-redux";

export default function useUser() {
    const [user, setUser] = useState();
    const [isLogged, setIsLogged] = useState(false);
    const state = useSelector(state => {
        console.log(state);
        return state;
    });


    return {isLogged, user};
}