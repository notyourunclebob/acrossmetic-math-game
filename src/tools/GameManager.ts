
import { GameCols, GameData, GameOperators, GameOptions, GameRows } from "./game.model";

export function executeOperation(opperator:string, x:number, y:number) {
    
    // selects approiate operation depending on selected operator
    switch (opperator) {

        case "+": return x + y;

        case "-": return x - y;

        default: throw Error("Unknown operation");
    };
};

export function defaultGameOptions() {
    
    // sets game options to default values
    let gameOptions:GameOptions = {
        gameSize: 9,
        gameOperators: [
            {operator: "+"},
            {operator: "-"}
        ]
    };

    return(gameOptions);
};

export function generateGame(gameOptions:GameOptions) {

    // setting up selected game options to use for generationg a new game
    const size:number = gameOptions.gameSize;
    const operators:GameOperators[] = gameOptions.gameOperators;

    // looping through lists to generate random numbers and operators
    let gameRows:GameRows[] = [];
    
    for (let x:number = 0; x < size; x++) {
        
        let gameCols:GameCols[] = [];
        
        for (let y:number = 0; y < size; y++) {

            let number:number = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
            
            let indexRow:number = Math.floor(Math.random() * operators.length);
            let indexCol:number = Math.floor(Math.random() * operators.length);
            
            let operatorRow:string = operators[indexRow].operator;
            let operatorCol:string = operators[indexCol].operator;

            // calculations start at 0
            // this ensures the first number in a row or column is added
            if (x == 0 && y == 0) {

                gameCols.push({
                    number:number,
                    operatorRow: "+",
                    operatorCol: "+"
                });

            } else if (x == 0) {
                
                gameCols.push({
                    number: number,
                    operatorRow: "+",
                    operatorCol: operatorCol
                });

            } else if (y == 0) {

                gameCols.push({
                    number: number,
                    operatorRow: operatorRow,
                    operatorCol: "+"
                });

            } else {

                gameCols.push({
                    number: number,
                    operatorRow: operatorRow,
                    operatorCol: operatorCol
                });
                
            };            
        };
        
        gameRows.push({gameCols});
    };
    
    let gameData:GameData = {
        gameRows: gameRows
    };

    return gameData;
};

export function calculateRows(gameData:GameData) {

    let rowSums:number[] = []; 

    // order of operations is iterative starting at 0 then operating on the sum of the previous operation
    gameData.gameRows.forEach(row => {

        let sum:number = 0;

        row.gameCols.forEach(col => {
            let number = col.number;
            let operator = col.operatorCol;       
            sum = executeOperation(operator, sum, number);
        });

        rowSums.push(sum);        
    });
    return rowSums;
};

export function calculateCols(gameData:GameData) {

    let colSums:number[] = [];

    // order of operations is iterative starting at 0 then operating on the sum of the previous operation    
    for (let x:number = 0; x < gameData.gameRows.length; x++) {

        let sum:number = 0;

        for (let y:number = 0; y < gameData.gameRows.length; y++) {
            let number:number = gameData.gameRows[y].gameCols[x].number;
            let operator:string = gameData.gameRows[y].gameCols[x].operatorRow;

            sum = executeOperation(operator, sum, number);
        };

        colSums.push(sum);
    };
    return colSums;
};

export function testGameData() {
    // testing data
    let gameData:GameData = {
        gameRows: [
            { 
                gameCols: [
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 6, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "-", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                ],
            },
            { 
                gameCols: [
                    { number: 1, operatorCol: "+", operatorRow:"-" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                ],
            },
            { 
                gameCols: [
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                ],
            },
            { 
                gameCols: [
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                ],
            },
            { 
                gameCols: [
                    { number: 7, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                ],
            },
            { 
                gameCols: [
                    { number: 7, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                    { number: 1, operatorCol: "+", operatorRow:"+" },
                ],
            },
        ]
    };

    return (gameData);
};