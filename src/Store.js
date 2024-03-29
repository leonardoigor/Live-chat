import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();



const initState = {
    geral: [
        { from: 'Admin', msg: 'Bem vindo ao chat geral' },
    ],
    Privado1: [
        { from: 'Admin', msg: 'Bem vindo ao chat Privado 1' },

    ],
    Privado2: [
        { from: 'Admin', msg: 'Bem vindo ao chat Privado 2' },

    ],
    Privado3: [
        { from: 'Admin', msg: 'Bem vindo ao chat Privado 3' },

    ],
    Privado4: [
        { from: 'Admin', msg: 'Bem vindo ao chat Privado 4' },

    ],
}

function reducer(state, action) {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    { from, msg }
                ]
            }
        default:
            return state
    }
}
let socket;
function sendChatAction(value) {
    socket.emit('chat message', value)
}


export default function Store(props) {
    const [allChats, dispatch] = React.useReducer(reducer, initState)
    if (!socket) {
        socket = io(":3001")
        socket.on('chat message', msg => {
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg })
        })
    }
    const user = 'user ' + Math.random(100).toFixed(2)
    return (
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    )
}