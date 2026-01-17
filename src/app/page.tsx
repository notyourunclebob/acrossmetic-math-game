export const dynamic = "force-dynamic";

import Gamegrid from "@/components/Gamegrid";
import { GameData, GameOptions } from "@/tools/game.model";
import { defaultGameOptions, generateGame } from "@/tools/GameManager";

export default function Home() {
  const gameOptions: GameOptions = defaultGameOptions();
  const gameData: GameData = generateGame(gameOptions);

  return (
    <main className="flex justify-center">
      <Gamegrid gameOptions={gameOptions} gameData={gameData} />

      <div className="m-5 fixed bottom-0 left-0 w-full">
        © James Wilson :{" "}
        <a href="https://github.com/notyourunclebob" target="_blank">
          Github
        </a>
      </div>
    </main>
  );
}
