import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  React.useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question.id !== id)
          );
        } else console.error("Failed to delete question");
      })
      .catch((error) => console.error("Error deleting question", error));
  };
  const questionsToRender = questions.map((question) => {
    console.log(question);
    return (
      <QuestionItem
        key={question.id}
        question={question}
        onDelete={handleDelete}
      />
    );
  });
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsToRender}</ul>
    </section>
  );
}

export default QuestionList;
