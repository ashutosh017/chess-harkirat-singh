import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export const Landing = ()=>{
    const navigate = useNavigate();
    return <div><div className="pt-8">
        <div className="  flex flex-col sm:flex-row justify-center items-center gap-4 p-4 ">
            <div className="bg-yellow-400 max-w-96 ">
                <img src="/chess_board.png" alt="chessboard" />
            </div>
            <div className="text-white flex flex-col items-center justify-center gap-4 p-4 rounded-md max-w-96 ">
                <div>
                <h1 className="font-extrabold text-4xl px-4 py-2 text-center sm:text-start">Play Chess Online on the #3 Site!</h1>
                </div>
                <div>
                    <Button onclick={()=>navigate('/game')} children={"Play Online"}/>
                </div>
            </div>
        </div>
    </div>
    </div>
}