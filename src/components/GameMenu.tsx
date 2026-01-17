"use client";

import { GameOptions, GameOperators } from "@/tools/game.model";
import { MAX_GAME_SIZE, ALLOWED_OPERTORS } from "@/tools/GameManager";
import { useEffect, useState } from "react";

export default function GameMenu({
  options,
  setOptions,
  setGameState,
}: {
  options: GameOptions;
  setOptions: Function;
  setGameState: Function;
}) {
  // -------------------------------------------------- action events
  const onOperatorSelect = (e: any) => {
    // builds a list with selected operators
    setSelectedOperators((prev) => {
      if (prev.some((item) => item.operator == e.operator)) {
        return prev.filter((item) => item.operator != e.operator);
      } else {
        return [...prev, { operator: e.operator }];
      }
    });
  };

  const newGame = (e: any) => {
    // updates options used for a new game
    setOptions({
      gameSize: selectedSize,
      gameOperators: selectedOperators,
    });

    setGameState(1);
  };

  // ------------------------------------------ state variables
  const [selectedSize, setSelectedSize] = useState<number>();
  const [selectedOperators, setSelectedOperators] = useState<GameOperators[]>(
    [],
  );
  const [validOptions, setValidOptions] = useState<boolean>();

  useEffect(() => {
    if (options != null) {
      setSelectedSize(options.gameSize);
      setSelectedOperators(options.gameOperators);
    }
  }, [options]);

  useEffect(() => {
    if (
      selectedOperators.length == 0 ||
      selectedOperators == null ||
      selectedSize == 0 ||
      selectedSize == null
    ) {
      setValidOptions(false);
    } else {
      setValidOptions(true);
    }
  }, [selectedSize, selectedOperators]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div>Game size:</div>
        {Array.from({ length: MAX_GAME_SIZE - 1 }, (_, x) => {
          const value = x + 2;
          return (
            <div key={x}>
              <label>{value}x</label>
              <input
                type="radio"
                name="gameSize"
                id={`${value}x`}
                value={value}
                checked={selectedSize != null ? selectedSize == value : false}
                onChange={(e: any) => setSelectedSize(e.target.value)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <div>Operators:</div>
        {ALLOWED_OPERTORS.map((operators) => (
          <div key={operators.operator}>
            <label>{operators.operator}</label>
            <input
              type="checkbox"
              id={operators.operator}
              name="operators"
              value={operators.operator}
              checked={
                selectedOperators != null
                  ? selectedOperators.some(
                      (item) => item.operator == operators.operator,
                    )
                  : false
              }
              onChange={() => onOperatorSelect(operators)}
            />
          </div>
        ))}
        <span className={`text-red-600 ${validOptions ? "hidden" : "block"}`}>
          Select an operator
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`w-25 h-10 rounded-md ${
            validOptions
              ? "bg-amber-500 text-white hover:bg-amber-400"
              : "bg-white text-gray-500 border border-amber-500"
          }`}
          onClick={newGame}
          disabled={!validOptions}
        >
          New Game
        </button>
        <span
          className={`text-orange-400 ${selectedOperators.some((op) => op.operator == "x") && selectedSize != null && selectedSize > 4 ? "block" : "hidden"}`}
        >
          *Game size above 4x and using 'x'
          <br /> may have sums too large for the grid*
        </span>
      </div>
    </div>
  );
}
