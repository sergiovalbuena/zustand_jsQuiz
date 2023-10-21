import { useQuestionsData } from "./hooks/useQuestionsData";

export const Footer = () => {
  const { correct, incorrect, notAnswered } = useQuestionsData();

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} - ❌ ${incorrect} - #️⃣ ${notAnswered}`}</strong>
    </footer>
  );
};
