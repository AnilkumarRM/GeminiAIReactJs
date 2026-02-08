import { useState } from 'react'
// import { geminiUrl } from './constants'
import reactMarkdown from 'react-markdown'
import Answer from './components/Answer.jsx'
import './App.css'

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const askQuestion = async () => {
  // Append the key to the URL as a query parameter
  // const apiKey = 'AIzaSyDXaGEUzAewrW4jMefXA5X8CoReR3TQX8Y';
  // const urlWithKey = `${geminiUrl}?key=${apiKey}`;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const geminiUrl = import.meta.env.VITE_GEMINI_URL;

  const urlWithKey = `${geminiUrl}?key=${apiKey}`;

  // console.log(urlWithKey);

  try {
    let response = await fetch(urlWithKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: question }]
        }]
      })
    });

    const data = await response.json();
    let dataString = data.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item)=> item.trim());
    // console.log(data.candidates[0].content.parts[0].text);
    setResult(prev => [...prev, {type: "question", text: question},{type: "answer", text: dataString}]);

 
    
    // Note: The actual text is usually at:
    // data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error("Error fetching Gemini:", error);
  }
}

  return (
   <div className='grid grid-cols-5 h-screen text-center text-white'> 
      <div className='col-span-1 bg-zinc-800'>

      </div>
      <div className='col-span-4 p-10'>
        <div className='container h-130 w-full overflow-scroll'>
          <div className='text-zinc-400'>
          {
            result && result.map((item, index)=> (
              <div key={index+Math.random()} className={item.type === "question" ? "text-right" : "text-left"}>
                {
                  item.type === "question" ? <span className='text-right p-1 border-1 border-zinc-500 bg-zinc-700 rounded-3xl '>Q: {item.text}</span> : 
                  item.type === "answer" ? item.text.map((ans, id) => <Answer key={id} ans={ans} totalResults={result.length} id={id} />) : null
                }
              </div>
            )) 
          }
          {/* <ul>
          {
            result && result.map((ans, index)=> (
             <li key={index} className='text-left '><Answer ans={ans} totalResults={result.length} id={index} /></li>
            ))
          }
          </ul> */}
        </div>
        </div>
        <div className='bg-zinc-800 w-1/2 text-white m-auto rounded-4xl border border-zinc-700 flex p-4 mt-4 mb-4 h-16'>
          <input type="text" value={question} onChange={(event)=>setQuestion(event.target.value)} className='w-full h-full outline-none bg-transparent'  placeholder='Type your prompt here...' />
          <button onClick={askQuestion}>Ask</button>
        </div>
        
      </div>
   </div>
  )
}

export default App
