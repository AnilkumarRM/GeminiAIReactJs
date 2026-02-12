import Answer from "./Answer";
const QuestionAnswer = ({ result, item, index }) => {
  return (
    <div
      key={index + Math.random()}
      className={item.type === "question" ? "text-right pt-4" : "text-left"}
    >
      {item.type === "question" ? (
        <span className="text-right p-2 border-1 border-zinc-500 bg-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl">
          {item.text}
        </span>
      ) : item.type === "answer" ? (
        item.text.map((ans, id) => (
          <Answer key={id} ans={ans} totalResults={result.length} id={id} />
        ))
      ) : null}
    </div>
  );
};

export default QuestionAnswer;
