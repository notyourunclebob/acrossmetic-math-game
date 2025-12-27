"use client";

import { GameOptions } from "@/tools/game.model";

export default function GameMenu( {options, setOptions} : { options:GameOptions, setOptions:Function } ) {

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <div>Game size:</div>
                <div>
                    <label>2x</label>
                    <input type="radio" id="2x" name="gameSize" value={2}/>
                </div>
                <div>
                    <label>3x</label>
                    <input type="radio" id="3x" name="gameSize" value={3}/>
                </div>
                <div>
                    <label>4x</label>
                    <input type="radio" id="4x" name="gameSize" value={4}/>
                </div>
                <div>
                    <label>5x</label>
                    <input type="radio" id="5x" name="gameSize" value={5}/>
                </div>
                <div>
                    <label>6x</label>
                    <input type="radio" id="6x" name="gameSize" value={6}/>
                </div>
                <div>
                    <label>7x</label>
                    <input type="radio" id="7x" name="gameSize" value={7}/>
                </div>
                <div>
                    <label>8x</label>
                    <input type="radio" id="8x" name="gameSize" value={8}/>
                </div>
                <div>
                    <label>9x</label>
                    <input type="radio" id="9x" name="gameSize" value={9}/>
                </div>
            </div>

            <div className="flex gap-2">
                <div>Operators:</div>
                <div>
                    <label>+</label>
                    <input type="radio" id="+" name="operators" value={"+"} />
                </div>
                <div>
                    <label>-</label>
                    <input type="radio" id="-" name="operators" value={"-"} />
                </div>
                <div>
                    <label>x</label>
                    <input type="radio" id="x" name="operators" value={"x"} />
                </div>
                <div>
                    <label>÷</label>
                    <input type="radio" id="÷" name="operators" value={"÷"} />
                </div>
            </div>

            <button className="w-25 h-10 bg-amber-500 text-white rounded-md">New Game</button>
        </div>
    );
};