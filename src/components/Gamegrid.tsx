"use client";

import { useEffect, useState } from "react";
import { GameProps, GameCols, GameRows, GameData, GameOptions} from "@/tools/game.model";
import { calculateCols, calculateRows, compareCol, compareRow } from "@/tools/GameManager";
import GameMenu from "./GameMenu";

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

    // note to self - concider looking into using key presses to change a value rather then using inputs

    // prevents invalid inputs by disabling key inputs
    const onKeyDown = (e:any) => {
        // allows backspace, del, tab, esc, enter and arrow keys
        if ([8, 46, 9 ,27, 13, 37, 38, 39, 40].includes(e.keyCode)) return;

        // restricts keys to 1-9
        if (e.key < "1" || e.key > "9") {
            e.preventDefault();
        };

        // restricts inputs to one character
        if (e.target.value >= 1) {
            e.preventDefault();
            return;
        };
    };
    
    // ---------------------------------------------------- state variables
    const [rowSums, setRowSums] = useState<number[]>([]);
    const [colSums, setColSums] = useState<number[]>([]);
    const [data, setData] = useState<GameData>();
    const [options, setOptions] = useState<GameOptions>();

    // holds a list of user inputs
    const [inputs, setInputs] = useState<Record<number, Record<number, number>>>({});
    const [validRows, setValidRows] = useState<Record<number, boolean>>({});
    const [validCols, setValidCols] = useState<Record<number, boolean>>({});

    // sets game data to a useState and updates data when changed
    useEffect( () => {
        
        setData(gameData);

        if (data != null) {
            setRowSums(calculateRows(data));
            setColSums(calculateCols(data));

            console.log(data);
        };
        
    },[data]);

    // sets game options to a use state and updates when changed
    useEffect( () => {

        setOptions(gameOptions);

    },[options]);
    
    // compares input sums to generated sums
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

            <GameMenu options={options!} setOptions={setOptions}/>

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
                                            <input 
                                                type="number" 
                                                min="1" 
                                                max="9"
                                                onKeyDown={onKeyDown}
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