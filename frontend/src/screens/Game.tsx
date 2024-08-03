import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard"
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

export const Game = ()=>{
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())
    const[isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(()=>{
        if(!socket)return;
        socket.onmessage = (event)=>{
           const message = JSON.parse(event.data);
           console.log("Debug: message from Game.tsx file: ",message);
           switch (message.type) {
            case INIT_GAME:
                setChess(new Chess())
                setBoard(chess.board())
                console.log("Game initialized");
                break;
            case MOVE:
                console.log("mesage: ",message);
                const move = message.payload;
                console.log("move from chess.move(): ",move);
                chess.move(move);
                setBoard(chess.board());
                console.log("Move made");
                break;
            case GAME_OVER:
                console.log("Game over");
                break;
           
           }

        }
    })

    if(!socket)return <div>connecting...</div>
    return <div>
        <div className="flex flex-col gap-8 p-4 sm:flex-row  items-center text-white ">
            <div className=""><Chessboard chess={chess} setBoard={setBoard} socket={socket} board={board}/></div>
            <div className="  ">{!isPlaying && <Button onclick={()=>{
                socket.send(JSON.stringify({
                    type:INIT_GAME
                }))
                setIsPlaying(true)
            }}>Play</Button>}</div>
        </div>
    </div>
}