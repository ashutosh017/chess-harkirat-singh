import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const Chessboard = ({chess, setBoard, board, socket}:{
    chess: any
    setBoard:any
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
    // const[to, setTo] = useState<null| Square>(null)
    return <div>
        <div className="">
            {
                board.map((row, i)=>{
                    return <div key={i} className="flex">
                        {row.map((square, j)=>{
                            return <div key={j} onClick={()=>{
                               
                                const clickedSquare = String.fromCharCode(97+j)+String.fromCharCode(48+8-i) as Square;
                                console.log("You clicked on: ", clickedSquare);
                                if(!from){
                                    setFrom(clickedSquare );
                                }
                                else{
                                    socket.send(JSON.stringify({
                                        type:MOVE,
                                        payload:{
                                            move:{
                                                from, to: clickedSquare
                                            }
                                            
                                        }
                                    }))
                                    setFrom(null);
                                    chess.move({ 
                                        from, to: clickedSquare
                                    })
                                    setBoard(chess.board());
                                    console.log("from and to: ",{from, to: clickedSquare});
                                }
                                // console.log(square?.square??null);
                            }} className={`w-12 h-12 sm:w-24 sm:h-24 ${(i+j)%2==1?'bg-green-600':'bg-white'} flex justify-center items-center text-black`}>
                                {/* {square?square.type:""} */}
                                {/* {square?<img className="w-6 sm:w-12" src={`/${square.color==='w'?square.type.toUpperCase():square.type}.png`}/>:""} */}
                                {square?<img className="w-12 sm:w-24" src={`/${square.color}${square.type}.png`}/>:""}

                            </div> 
                        })}
                    </div>
    
                })
            }
        </div>      
    </div>
}   