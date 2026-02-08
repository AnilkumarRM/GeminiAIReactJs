import { use, useEffect } from "react"
import { useState } from "react"
import { replaceHeadingStarts } from "../helper";

const Answer = ({ ans, totalResults, id}) => {
    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);

    useEffect   (() => {
        if(checkHeading(ans)) {
            setHeading(ans);
            setAnswer(replaceHeadingStarts(ans));
        }
    }, []);

    function checkHeading(line) {
        return /^(\*)(\*)(.*)\*$/.test(line);
    }

    return (
       <>
       {
       id == 0 && totalResults > 1 ? <span className="pt-2 text-lg block">{answer}</span> : 
       heading ?<span className={"pt-2 text-lg block"}>{answer}</span>:
    
        <span className="pl-5">{answer}</span>
       }
       
       </>
    
    )
}

export default Answer