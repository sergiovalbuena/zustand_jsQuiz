import { useQuestionsStore } from "./store/questions";

export const Footer = () => {
  const questions = useQuestionsStore((state) => state.questions);

  let correct = 0;
  let incorrect = 0;
  let notAnswered = 0;

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer == null) notAnswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} - ❌ ${incorrect} - #️⃣ ${notAnswered}`}</strong>
    </footer>
  );
};
