import { Button } from "@mui/material";
import { useQuestionsData } from "./hooks/useQuestionsData";
import { useQuestionsStore } from "./store/questions";

export const Footer = () => {
  const { correct, incorrect, notAnswered } = useQuestionsData();
  const resetGame = useQuestionsStore((state) => state.resetGame);

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} - ❌ ${incorrect} - #️⃣ ${notAnswered}`}</strong>

      <Button onClick={() => resetGame()}>Reset Game</Button>
    </footer>
  );
};
