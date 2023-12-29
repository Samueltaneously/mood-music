import React from "react";
import { useDispatch } from "react-redux";

const usePlaylist = () => {
    const dispatch = useDispatch();
    // sends the clicked mood to a saga to generate a playlist from the DB
    return async function(mood: MoodType) {
        dispatch({
        type: "CREATE_NEW_PLAYLIST",
        payload: mood,
    })
}
}

export default usePlaylist