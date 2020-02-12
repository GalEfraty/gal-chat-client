import React, {useContext} from 'react'
import {authContext} from "../context/auth"

const MessageDisplayer = ({message}) => {
    const {currentUser} = useContext(authContext)
    const me = <i className="fas fa-user"></i>
    const others = <i className="far fa-user"></i>
    
    const avatar = currentUser.id === message["user"]["id"] ? me : others
    return (
        <div>
            {avatar} || {message["user"]["name"]} || {message["content"]}
        </div>
    )
}

export default MessageDisplayer
