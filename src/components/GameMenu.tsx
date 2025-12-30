"use client";

import { GameOptions, GameOperators } from "@/tools/game.model";
import { MAX_GAME_SIZE, ALLOWED_OPERTORS } from "@/tools/GameManager";
import { useState } from "react";

export default function GameMenu( {options, setOptions, setGameState} : { options:GameOptions, setOptions:Function, setGameState:Function } ) {

    const onOperatorSelect = (e:any) => {

        setSelectedOperators(prev => {
            if (prev.some(item => item.operator == e.operator)) {
                return prev.filter(item => item.operator != e.operator);
            } else {
                return [...prev, { operator: e.operator }];
            };
        });
    };

    const newGame = (e:any) => {
        setOptions({
            gameSize: selectedSize,
            gameOperators: selectedOperators
        });

        setGameState(1);
    };

    // ------------------------------------------ state variables
    const [selectedSize, setSelectedSize] = useState<number>();
    const [selectedOperators, setSelectedOperators] = useState<GameOperators[]>([]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <div>Game size:</div>
                {Array.from({ length: MAX_GAME_SIZE - 1 }, (_, x) => {
                    const value  = x + 2;
                    return (
                        <div key={x}>
                            <label>{value}x</label>
                            <input 
                                type="radio" 
                                name="gameSize" 
                                id={`${value}x`} 
                                value={value}
                                onChange={(e:any) => setSelectedSize(e.target.value)}
                            />
                        </div>
                    );
                })}                
            </div>

            <div className="flex gap-2">
                <div>Operators:</div>
                {ALLOWED_OPERTORS.map((operators) =>
                    <div key={operators.operator}>
                        <label>{operators.operator}</label>
                        <input 
                            type="checkbox" 
                            id={operators.operator} 
                            name="operators" 
                            value={operators.operator}
                            // checked={options.gameOperators.some(item => item.operator == operators.operator)}
                            onChange={() => onOperatorSelect(operators)}
                        />
                    </div>
                )}
            </div>

            <button 
                className="w-25 h-10 bg-amber-500 text-white rounded-md"
                onClick={newGame}
            >New Game</button>
        </div>
    );
};