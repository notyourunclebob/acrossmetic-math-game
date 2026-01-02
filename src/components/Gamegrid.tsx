"use client";

import { useEffect, useState } from "react";
import { GameProps, GameCols, GameRows, GameData, GameOptions} from "@/tools/game.model";
import { calculateCols, calculateRows, compareCol, compareRow, generateGame } from "@/tools/GameManager";
import GameMenu from "./GameMenu";

export default function Gamegrid({ gameData, gameOptions }:GameProps) {

    // ---------------------------------------------------- functions

    // updates the input list with imputs maintaining their respective row and col index
    const updateInputs = (e:any, row:number, col:number) => {

        setInputs(grid => ({
            ...grid, [row]: {
                ...(grid[row] || {}), [col]: e.target.value
            }
        }));
    };

    // prevents invalid inputs by disabling key inputs and sets value to key pressed instead of normal input behaviour
    const onKeyDown = (e:any, row:number, col:number) => {
        // allows backspace, del, tab, esc, enter and arrow keys
        if ([8, 46, 9 ,27, 13, 37, 38, 39, 40].includes(e.keyCode)) return;
        
        e.preventDefault();

        if (e.key >= "1" && e.key <= "9") {
            e.target.value = e.key;
            updateInputs(e, row, col);
            console.log(e.target.value);
        };
    };
    
    // ---------------------------------------------------- state variables
    const [rowSums, setRowSums] = useState<number[]>([]);
    const [colSums, setColSums] = useState<number[]>([]);
    const [data, setData] = useState<GameData>();
    const [options, setOptions] = useState<GameOptions>();

    // holds a list of user inputs
    const [inputs, setInputs] = useState<Record<number, Record<number, number | undefined>>>({});
    const [validRows, setValidRows] = useState<Record<number, boolean>>({});
    const [validCols, setValidCols] = useState<Record<number, boolean>>({});

    const [gameState, setGameState] = useState<number>(0);

    // sets game data to a useState and updates data when changed
    useEffect( () => {

        if (gameState == 0) {
            setOptions(gameOptions);
            setData(gameData);

        } else if (gameState == 1) {
            if (options != null) {
                setInputs([]);
                setValidRows([]);
                setValidCols([]);
                setData(generateGame(options));
                setGameState(2);
            }
        };
        
    },[options, gameState]);
    
    useEffect( () => {

        if (data != null) {
            setRowSums(calculateRows(data));
            setColSums(calculateCols(data));

            console.log(data);
        };

    },[data]);

    // compares input sums to generated sums
    useEffect( () => {

        if (options != null && data != null) {

            for (let x:number = 0; x < options.gameSize; x++) {
    
                const rowLength = inputs[x] ? Object.values(inputs[x]).length : 0;
                
                if (rowLength == options.gameSize) {
                    
                    let isValid:boolean = compareRow(x, rowSums, rowLength, inputs, data!);
    
                    setValidRows(list => ({
                        ...list, [x]: isValid
                    }));
                };
            };
            
            for (let x:number = 0; x < options.gameSize; x++) {
                
                const colLength = Object.values(inputs).filter(row => x in row).length;
                
                if (colLength == options.gameSize) {
    
                    let isValid:boolean = compareCol(x, colSums, colLength, inputs, data!);
    
                    setValidCols(list => ({
                        ...list, [x]: isValid
                    }));
                };
            };
        };

    },[inputs]);

    return (
        <div className="flex flex-col justify-center items-center m-20">

            <GameMenu options={options!} setOptions={setOptions} setGameState={setGameState}/>

            <div className="flex flex-col size-fit gap-2 text-xl">
                <div className="flex gap-2">
                    <div>
                        {data != null ?
                            data.gameRows.map(
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
                                                    value={inputs[r]?.[c] ?? ""}
                                                    onKeyDown={(e) => onKeyDown(e, r, c)}
                                                    onChange={(e) => updateInputs(e, r, c)}
                                                    className="size-10 bg-amber-200 rounded-md text-center" 
                                                />
                                            </div>
                                        )}
                                    </div>
                                )                            
                            :
                            <></>
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