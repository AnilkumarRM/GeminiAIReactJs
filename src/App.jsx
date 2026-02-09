import { useEffect, useRef, useState } from "react";
// import { geminiUrl } from './constants'
import reactMarkdown from "react-markdown";
import Answer from "./components/Answer.jsx";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || [],
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAnswer = useRef();
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim() && !selectedHistory) return;

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const geminiUrl = import.meta.env.VITE_GEMINI_URL;

    const urlWithKey = `${geminiUrl}?key=${apiKey}`;

    const questionData = question ? question : selectedHistory;
    const playLoad = JSON.stringify({
          contents: [
            {
              parts: [{ "text": questionData }],
            },
          ],
        });
        setLoading(true);

    try {
      let response = await fetch(urlWithKey, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: playLoad,
      });

      const data = await response.json();
      let dataString = data.candidates[0].content.parts[0].text;
      dataString = dataString.split("* ");
      dataString = dataString.map((item) => item.trim());
      // console.log(data.candidates[0].content.parts[0].text);
      setResult((prev) => [
        ...prev,
        { type: "question", text: question? question : selectedHistory },
        { type: "answer", text: dataString },
      ]);
      setQuestion("");

      setTimeout(() => {
        scrollToAnswer.current.scrollTop = scrollToAnswer.current.scrollHeight;
      }, 100);
      setLoading(false);

      // Note: The actual text is usually at:
      // data.candidates[0].content.parts[0].text
    } catch (error) {
      console.error("Error fetching Gemini:", error);
    }
  };
  const clearHistory = () => {
    localStorage.removeItem("history");
    setRecentHistory([]);
  };
  const isEnter = () => (event) => {
    if (event.key === "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    
      askQuestion();
    
  }, [selectedHistory]);

  return (
    <div className="grid grid-cols-5 h-screen text-center text-white">
      <div className="col-span-1 bg-zinc-800">
        <h4 className="text-2xl font-bold p-4 border-b border-zinc-700 flex justify-center items-center">
          <span>Recent History</span>
          <button
            onClick={clearHistory}
            className="ml-2 p-1 bg-red-500 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </h4>
        <div className="p-4 text-left">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <div
                key={index}
                className="p-2  truncate border-zinc-700"
                onClick={() => {
                  setSelectedHistory(item);
                }}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
      <div className="col-span-4 p-10">
        {
        loading ?
       <div class="text-center">
    <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>:null
        }

        {/* below scroll should not show bar with arrows */}
        <div ref={scrollToAnswer} className="container h-150 w-full overflow-scroll scrollbar-hide  ">
          <div className="text-zinc-400 p-2">
            {result &&
              result.map((item, index) => (
                <div
                  key={index + Math.random()}
                  className={
                    item.type === "question" ? "text-right pt-4" : "text-left"
                  }
                >
                  {item.type === "question" ? (
                    <span className="text-right p-2 border-1 border-zinc-500 bg-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl">
                      {item.text}
                    </span>
                  ) : item.type === "answer" ? (
                    item.text.map((ans, id) => (
                      <Answer
                        key={id}
                        ans={ans}
                        totalResults={result.length}
                        id={id}
                      />
                    ))
                  ) : null}
                </div>
              ))}
            {/* <ul>
          {
            result && result.map((ans, index)=> (
             <li key={index} className='text-left '><Answer ans={ans} totalResults={result.length} id={index} /></li>
            ))
          }
          </ul> */}
          </div>
        </div>
        <div className="bg-zinc-800 w-1/2 text-white m-auto rounded-4xl border border-zinc-700 flex p-4 mt-4 mb-4 h-16">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full h-full outline-none bg-transparent"
            placeholder="Type your prompt here..."
            onKeyDown={isEnter()}
          />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;
