"use client";

import { GameProps, GameCols, GameRows, GameData} from "@/tools/game.model";
import { calculateCols, calculateRows } from "@/tools/GameManager";
import { useEffect, useState } from "react";

export default function Gamegrid({ gameData, gameOptions }:GameProps) {

    // ---------------------------------------------------- action events
    
    // ---------------------------------------------------- state variables
    const [rowSums, setRowSums] = useState<number[]>([]);
    const [colSums, setColSums] = useState<number[]>([]);
    const [data, setData] = useState<GameData>();

    useEffect( () => {
        
        setData(gameData);

        if (data != null) {
            setRowSums(calculateRows(data));
            setColSums(calculateCols(data));

            console.log(data);
        };
        
    },[data]); 

    return (
        <div className="flex flex-col justify-center items-center m-20">
            <div>
                <button className="px-3 py-2 rounded-lg bg-amber-600 text-white">New Game</button>
            </div>

            <div className="flex flex-col size-fit gap-2">
                <div className="flex gap-2">
                    <div>
                        {gameData.gameRows.map(
                            (row:GameRows, r:number) =>
                                <div key={r} className="flex gap-2">
                                    {row.gameCols.map(
                                        (col:GameCols, c:number) =>
                                        <div key={c} className="grid grid-cols-2 gap-2 text-center">
                                            <div className="size-8" />
                                            <div className="size-8 content-center">
                                                {r > 0 ? col.operatorRow : ""}
                                            </div>
                                            <div className="size-8 content-center">
                                                {c > 0 ? col.operatorCol : ""}
                                            </div>
                                            <div className="size-8 bg-amber-200 rounded-md content-center">
                                                {col.number}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    </div>
                    <div className="bottom-0 left-0 flex flex-col w-fit">
                        {rowSums.map(
                            (sum:number, s:number) =>
                                <div key={s} className="grid grid-cols-2 gap-2 text-center">
                                    <div className="size-8 col-span-2"/>
                                    <div className="size-8 content-center">
                                        =
                                    </div>
                                    <div className="size-8 content-center">
                                        {sum}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="flex w-fit gap-2">
                    {colSums.map(
                        (sum:number, s:number) =>
                            <div key={s} className="grid grid-cols-2 gap-2 text-center">
                                <div className="size-8 row-span-2"/>
                                <div className="size-8 content-center">
                                    =
                                </div>
                                <div className="size-8 content-center">
                                    {sum}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};