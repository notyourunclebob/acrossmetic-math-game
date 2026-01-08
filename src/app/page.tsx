export const dynamic = "force-dynamic";

import Gamegrid from "@/components/Gamegrid";
import { GameData, GameOptions } from "@/tools/game.model";
import { defaultGameOptions, generateGame } from "@/tools/GameManager";


export default function Home() {
  const gameOptions:GameOptions = defaultGameOptions();
  const gameData:GameData = generateGame(gameOptions);

  return (
    <main>
      <Gamegrid gameOptions={gameOptions} gameData={gameData}/>
    </main>
  );
};