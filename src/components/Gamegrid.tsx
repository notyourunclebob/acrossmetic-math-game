"use client";

import { GameProps, GameCols, GameRows, GameData} from "@/tools/game.model";
import { calculateCols, calculateRows, compareCol, compareRow } from "@/tools/GameManager";
import { useEffect, useState } from "react";

export default function Gamegrid({ gameData, gameOptions }:GameProps) {

    // ---------------------------------------------------- functions

    // updates the input list with imputs maintaining their respective row and col index
    const updateInputs = (value:number, row:number, col:number) => {

        setInputs(grid => ({
            ...grid, [row]: {
                ...(grid[row] || {}), [col]: value
            }
        }));
    };

    // prevents invalid inputs by disabling key inputs
    const handleKeyDown = (e:any) => {
        // allows backspace, del, tab, esc, enter and arrow keys
        if ([8, 46, 9 ,27, 13, 37, 38, 39, 40].includes(e.keyCode)) return;

        // restricts keys to 1-9
        if (e.key < "1" || e.key > "9") {
            e.preventDefault();
        };
    };
    
    // ---------------------------------------------------- state variables
    const [rowSums, setRowSums] = useState<number[]>([]);
    const [colSums, setColSums] = useState<number[]>([]);
    const [data, setData] = useState<GameData>();

    // holds a list of user inputs
    const [inputs, setInputs] = useState<Record<number, Record<number, number>>>({});
    const [validRows, setValidRows] = useState<Record<number, boolean>>({});
    const [validCols, setValidCols] = useState<Record<number, boolean>>({});

    useEffect( () => {
        
        setData(gameData);

        if (data != null) {
            setRowSums(calculateRows(data));
            setColSums(calculateCols(data));

            console.log(data);
        };
        
    },[data]);
    
    useEffect( () => {

        for (let x:number = 0; x < gameOptions.gameSize; x++) {

            const rowLength = inputs[x] ? Object.values(inputs[x]).length : 0;
            const colLength = Object.values(inputs).filter(row => x in row).length;
            
            if (rowLength == gameOptions.gameSize) {

                let isValid = compareRow(x, rowSums, inputs[x], data!);

                setValidRows(list => ({
                    ...list, [x]: isValid
                }));
            };

            if (colLength == gameOptions.gameSize) {

                let isValid = compareCol(x, colSums, inputs, data!);

                setValidCols(list => ({
                    ...list, [x]: isValid
                }));
            };
        };

    },[inputs]);

    return (
        <div className="flex flex-col justify-center items-center m-20">
            {/* <div>
                <button className="px-3 py-2 rounded-lg bg-amber-600 text-white">New Game</button>
            </div> */}

            <div className="flex flex-col size-fit gap-2 text-xl">
                <div className="flex gap-2">
                    <div>
                        {gameData.gameRows.map(
                            (row:GameRows, r:number) =>
                                <div key={r} className="flex gap-2">
                                    {row.gameCols.map(
                                        (col:GameCols, c:number) =>
                                        <div key={c} className="grid grid-cols-2 gap-2 text-center">
                                            <div className="size-10" />
                                            <div className="size-10 content-center">
                                                {r > 0 ? col.operatorRow : ""}
                                            </div>
                                            <div className="size-10 content-center">
                                                {c > 0 ? col.operatorCol : ""}
                                            </div>
                                            {/* <div className="size-8 bg-amber-200 rounded-md content-center">
                                                {col.number}
                                            </div> */}
                                            <input 
                                                type="number" 
                                                min="1" 
                                                max="9"
                                                onKeyDown={handleKeyDown}
                                                onChange={(e) => updateInputs(Number(e.target.value), r, c)}
                                                className="size-10 bg-amber-200 rounded-md text-center" 
                                            />
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
                                    <div className="size-10 col-span-2"/>
                                    <div className="size-10 content-center">
                                        =
                                    </div>
                                    <div className={`size-10 content-center rounded-md text-white ${validRows[s] ? "bg-green-500" : "bg-gray-500"}`}>
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
                                <div className="size-10 row-span-2"/>
                                <div className="size-10 content-center">
                                    =
                                </div>
                                <div className={`size-10 content-center rounded-md text-white ${validCols[s] ? "bg-green-500" : "bg-gray-500"}`}>
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