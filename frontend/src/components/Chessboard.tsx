import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const Chessboard = ({board, socket}:{
    board:(
        {
            square: Square;
            type: PieceSymbol;
            color: Color;
        } | null)[][];
        socket:WebSocket
})=>{
    console.log(board);
    const[from, setFrom] = useState<null| Square>(null)
    const[to, setTo] = useState<null| Square>(null)
    return <div>
        <div>
            {
                board.map((row, i)=>{
                    return <div key={i} className="flex">
                        {row.map((square, j)=>{
                            return <div key={j} onClick={()=>{
                               
                                const clickedSquare = String.fromCharCode(97+j)+String.fromCharCode(49+i)
                                console.log("You clicked on: ", clickedSquare);
                                if(!from){
                                    setFrom(clickedSquare as Square);
                                }
                                else{
                                    setTo(clickedSquare as Square); 
                                    socket.send(JSON.stringify({
                                        type:MOVE,
                                        payload:{
                                            move:{
                                                from,to: clickedSquare as Square
                                            }
                                        }
                                    }))
                                    setFrom(null);
                                    console.log("from and to: ",from, to);
                                }
                                // console.log(square?.square??null);
                            }} className={`w-8 h-8 sm:w-16 sm:h-16 ${(i+j)%2==1?'bg-green-500':'bg-yellow-50'} flex justify-center items-center text-black`}>
                                {square?square.type:""}
                            </div> 
                        })}
                    </div>
    
                })
            }
        </div>      
    </div>
}   