const decodeHTMLEntities = (text) => {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
  };
  
  export const fetchQuestions = async (category, difficulty, amount = 10) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
  
      return data.results.map((question) => ({
        ...question,
        question: decodeHTMLEntities(question.question),
        correct_answer: decodeHTMLEntities(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map(decodeHTMLEntities),
      }));
    } catch (error) {
      console.error("Error fetching trivia questions:", error);
      return [];
    }
  };
  