import {useState, useEffect} from "react";

const usePersistedState = (key, value) => {
    const [state, setState] = useState(() => {
        const storedValue = window.sessionStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : value;
    });

    useEffect(() => {
        window.sessionStorage.setItem(key, JSON.stringify(state))
    },[state])
    return [state, setState]
}

export default usePersistedState;