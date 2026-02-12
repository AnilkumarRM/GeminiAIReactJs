import { use, useEffect } from "react"
import { useState } from "react"
import { replaceHeadingStarts } from "../helper";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

    const renderer = {
        code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter {...props}
              children={String(children).replace(/\n$/,'')}
              language={match[1]} 
              style={dark}
              PreTag="Div"/>
            ) : (
              <code className={className} {...props}>
                {children}
                </code>
            );
          }
    };

    return (
       <>
       {
       id == 0 && totalResults > 1 ? <span className="pt-2 text-lg block">{answer}</span> : 
       heading ?<span className={"pt-2 text-lg block"}>{answer}</span>:
    
        <span className="pl-5">
          <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>

            </span>
       }
       
       </>
    
    )
}

export default Answer