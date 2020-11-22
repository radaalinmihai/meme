import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useUser() {
    const [isLogged, setIsLogged] = useState(false);
    const user = useSelector(({user}) => user);

    return {isLogged, user};
}