"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  GameProps,
  GameCols,
  GameRows,
  GameData,
  GameOptions,
} from "@/tools/game.model";
import {
  calculateCols,
  calculateRows,
  compareCol,
  compareRow,
  generateGame,
} from "@/tools/GameManager";
import GameMenu from "./GameMenu";

export default function Gamegrid({ gameData, gameOptions }: GameProps) {
  // ----------------------------------------------------- interface
  // object model used for focusing on a game cell
  interface FocusedCell {
    row: number;
    col: number;
  }

  // ---------------------------------------------------- action events

  // updates the input list with imputs maintaining their respective row and col index
  const updateInputs = (e: any, row: number, col: number) => {
    const value: number = Number(e.target.value);

    setInputs((grid) => ({
      ...grid,
      [row]: {
        ...(grid[row] || {}),
        [col]: value,
      },
    }));
  };

  // ---------------------------------------------------- state variables
  const [rowSums, setRowSums] = useState<number[]>([]);
  const [colSums, setColSums] = useState<number[]>([]);
  const [data, setData] = useState<GameData>();
  const [options, setOptions] = useState<GameOptions>();

  // holds a list of user inputs
  const [inputs, setInputs] = useState<
    Record<number, Record<number, number | undefined>>
  >({});
  const [validRows, setValidRows] = useState<Record<number, boolean>>({});
  const [validCols, setValidCols] = useState<Record<number, boolean>>({});

  // tracks selected elements
  const [focused, setFocused] = useState<FocusedCell>({ row: 0, col: 0 });
  // use ref to switch selection of inputs
  const inputRef = useRef<(HTMLInputElement | null)[][]>([]);

  // gameStates:
  // 0 - inital render
  // 1 - generate new game
  // 2 - game in play
  // 3 - game victory
  const [gameState, setGameState] = useState<number>(0);

  // --------------------------------------------------------------- useCallback
  // used to track arrow key selections by row and col
  // useCallback has alot of compute overhead so its only used because this function will be called often
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent, r: number, c: number) => {
      // if options arent set defaults to 1 to avoid divide by 0 errors
      const rowCount = gameData.gameRows.length;
      const colCount = gameData.gameRows[r].gameCols.length;
      let nextRow = r;
      let nextCol = c;

      switch (e.key) {
        // ------------------- arrow navigation logic
        case "ArrowUp":
          if (r > 0) nextRow = r - 1;
          e.preventDefault();
          break;
        case "ArrowDown":
          if (r < rowCount - 1) nextRow = r + 1;
          e.preventDefault();
          break;
        case "ArrowLeft":
          if (c > 0) nextCol = c - 1;
          e.preventDefault();
          break;
        case "ArrowRight":
          if (c < colCount - 1) nextCol = c + 1;
          e.preventDefault();
          break;
        // ------------------ for default browser behaviour
        case "Tab":
        case "Escape":
        case "Enter":
          return;
        // ------------------ number input logic
        default:
          e.preventDefault();
          if (e.key >= "1" && e.key <= "9") {
            (e.target as HTMLInputElement).value = e.key;
            // trigger animation when pressed
            inputPress(r, c, "valid");
            updateInputs(e, r, c);
          } else {
            inputPress(r, c, "invalid");
          }
          return;
      }

      if (nextRow !== r || nextCol !== c) {
        setFocused({ row: nextRow, col: nextCol });
        inputRef.current[nextRow]?.[nextCol]?.focus();
      }
    },
    [gameData, updateInputs],
  );

  // adds and removes a css class to trigger imput animation
  const inputPress = useCallback(
    (r: number, c: number, type: "valid" | "invalid") => {
      const input = inputRef.current[r]?.[c];
      if (!input) return;

      const cssClass = type == "valid" ? "pressed-valid" : "pressed-invalid";

      input.classList.add(cssClass);
      setTimeout(() => input.classList.remove(cssClass), 150);
    },
    [],
  );

  // ------------------------------------------------------------------- useEffect
  // initializes the 2d ref array when data changes
  useEffect(() => {
    inputRef.current = gameData.gameRows.map((row) =>
      row.gameCols.map(() => null),
    );

    inputRef.current[0]?.[0]?.focus();
  }, [gameData]);

  // sets game data to a useState and updates data when changed
  useEffect(() => {
    if (gameState == 0) {
      setOptions(gameOptions);
      setData(gameData);
      setGameState(2);
    } else if (gameState == 1) {
      if (options != null) {
        setInputs([]);
        setValidRows([]);
        setValidCols([]);
        setData(generateGame(options));
        setGameState(2);
      }
    }
  }, [options, gameState]);

  useEffect(() => {
    if (data != null) {
      setRowSums(calculateRows(data));
      setColSums(calculateCols(data));

      console.log(data);
    }
  }, [data]);

  // compares input sums to generated sums
  useEffect(() => {
    if (options != null && data != null) {
      for (let x: number = 0; x < options.gameSize; x++) {
        const rowLength = inputs[x] ? Object.values(inputs[x]).length : 0;

        if (rowLength == options.gameSize) {
          let isValid: boolean = compareRow(
            x,
            rowSums,
            rowLength,
            inputs,
            data!,
          );

          setValidRows((list) => ({
            ...list,
            [x]: isValid,
          }));
        }
      }

      for (let x: number = 0; x < options.gameSize; x++) {
        const colLength = Object.values(inputs).filter(
          (row) => x in row,
        ).length;

        if (colLength == options.gameSize) {
          let isValid: boolean = compareCol(
            x,
            colSums,
            colLength,
            inputs,
            data!,
          );

          setValidCols((list) => ({
            ...list,
            [x]: isValid,
          }));
        }
      }
    }
  }, [inputs]);

  useEffect(() => {
    if (
      options != null &&
      Object.keys(validRows).length == options.gameSize &&
      Object.keys(validCols).length == options.gameSize &&
      Object.values(validRows).every(Boolean) &&
      Object.values(validCols).every(Boolean)
    ) {
      setGameState(3);
    }
  }, [validRows, validCols]);

  return (
    <div className="w-full flex flex-col justify-center items-center m-20">
      <GameMenu
        options={options!}
        setOptions={setOptions}
        setGameState={setGameState}
      />

      <div className="min-w-300 flex flex-col gap-2 text-xl">
        <div>
          {gameState >= 2 && data != null ? (
            <div className="flex justify-center gap-2">
              <div>
                {data.gameRows.map((row: GameRows, r: number) => (
                  <div key={r} className="flex gap-2">
                    {row.gameCols.map((col: GameCols, c: number) => (
                      <div
                        key={`${r}-${c}`}
                        className="grid grid-cols-2 gap-2 font-bold text-center"
                      >
                        <div className="size-12" />
                        <div className="size-12 text-2xl content-center">
                          {r > 0 ? col.operatorRow : ""}
                        </div>
                        <div className="size-12 text-2xl content-center">
                          {c > 0 ? col.operatorCol : ""}
                        </div>
                        <input
                          ref={(el) => {
                            if (!inputRef.current[r]) {
                              inputRef.current[r] = [];
                            }
                            inputRef.current[r][c] = el;
                          }}
                          type="number"
                          min="1"
                          max="9"
                          value={inputs[r]?.[c] ?? ""}
                          onKeyDown={(e) => onKeyDown(e, r, c)}
                          onChange={(e) => updateInputs(e, r, c)}
                          onFocus={() => setFocused({ row: r, col: c })}
                          disabled={gameState == 3}
                          className="game-input"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="bottom-0 left-0 flex flex-col w-fit">
                {rowSums.map((sum: number, s: number) => (
                  <div
                    key={s}
                    className="grid grid-cols-2 gap-2 font-bold text-center"
                  >
                    <div className="size-12 col-span-2" />
                    <div className="size-12 text-2xl content-center">=</div>
                    <div
                      className={`game-sum ${validRows[s] ? "correct-sum" : ""}`}
                      style={
                        validRows[s]
                          ? { backgroundColor: "yellowgreen" }
                          : { backgroundColor: "gray" }
                      }
                    >
                      {sum}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>Spinner goes here</>
          )}
          <div className="flex w-fit gap-2 justify-self-center">
            {colSums.map((sum: number, s: number) => (
              <div
                key={s}
                className="grid grid-cols-2 gap-2 font-bold text-center"
              >
                <div className="size-12 row-span-2" />
                <div className="size-12 text-2xl content-center">=</div>
                <div
                  className={`game-sum ${validCols[s] ? "correct-sum" : ""}`}
                  style={
                    validCols[s]
                      ? { backgroundColor: "yellowgreen" }
                      : { backgroundColor: "gray" }
                  }
                >
                  {sum}
                </div>
              </div>
            ))}
            <div className="size-26" />
          </div>
        </div>
        <div className="message">{gameState == 3 ? "Winner!!!" : ""}</div>
      </div>
    </div>
  );
}
