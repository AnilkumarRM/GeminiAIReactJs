import { use, useEffect } from "react"
import { useState } from "react"
import { replaceHeadingStarts } from "../helper";

const Answer = ({ ans, key}) => {
    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);

    useEffect   (() => {
        if(checkHeading(ans)) {
            setHeading(true);
            setAnswer(replaceHeadingStarts(ans));
        }
    }, []);

    function checkHeading(line) {
        return /^(\*)(\*)(.*)\*$/.test(line);
    }

    return (
       <>
       {
       index == 0 ? <span className="pt-2 text-lg block">{answer}</span> : 
       heading ?<span className={"pt-2 text-lg block"}>{answer}</span>:
    
        <span className="pl-5">{answer}</span>
       }
       
       </>
    
    )
}

export default Answer