import { FC } from "react";

//components
import Navigation from "@/components/layout/Navigation";


const PagePingPong: FC = (props) => {
    return ( <>
    <Navigation />
    <hr />  
    <div>Page PingPongGame</div>    
    <p>https://www.dhiwise.com/post/designing-stunning-artwork-with-react-canvas-draw</p>
    <p>https://embiem.github.io/react-canvas-draw/</p>
    <p>https://golangbot.com/go-websocket-server/</p>
    <canvas></canvas>

    </> )
}

export default PagePingPong;

