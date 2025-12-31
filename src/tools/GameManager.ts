
import { GameCols, GameData, GameOperators, GameOptions, GameRows } from "./game.model";

// game generation values
export const MAX_GAME_SIZE = 9;
export const ALLOWED_OPERTORS = [
    {operator:"+"},
    {operator:"-"},
    {operator:"x"}
];

// regex validation for inputs
export const INPUT_VALIDATE = new RegExp("[1-9]");

export function executeOperation(opperator:string, x:number, y:number) {
    
    // selects approiate operation depending on operator
    switch (opperator) {

        case "+": return x + y;

        case "-": return x - y;

        case "x": return x * y;

        case "÷": return x / y;

        default: throw Error("Unknown operation");
    };
};

export function defaultGameOptions() {
    
    // sets game options to default values
    let gameOptions:GameOptions = {
        gameSize: 3,
        gameOperators: [
            {operator: "+"},
            {operator: "-"},
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

export function compareRow(row:number, rowSums:number[], inputs:Record<number, number | undefined>, data:GameData) {

    let inputSum:number = 0;

    let inputsLength = Object.values(inputs).length;
    
    // loops through inputs by row to get the sum
    // if number is not 1-9 returns false
    for (let x:number = 0; x < inputsLength; x++) {
        
        if (inputs[x] != null) {

            let number:number = inputs[x]!;
    
            if (INPUT_VALIDATE.test(number.toString())) {
                let operator:string = data.gameRows[row].gameCols[x].operatorCol;
        
                inputSum = executeOperation(operator, inputSum, number);
            } else {
                return false;
            };
        };
    };

    // checks if the input row sum matches the generated row sum and if the length matches the generated row
    if (inputSum == rowSums[row] && inputsLength == data.gameRows[row].gameCols.length) {
        return true;
    } else {
        return false;
    };

};

export function compareCol(col:number, colSums:number[], inputs:Record<number, Record<number, number | undefined>>, data:GameData) {
    
    let inputSum:number = 0;

    let inputsLength = Object.values(inputs).filter( row => col in row).length;

    for (let x:number = 0; x < inputsLength; x++) {

        if (inputs[x][col] != null) {

            let number:number = inputs[x][col]!;
    
            if (INPUT_VALIDATE.test(number.toString())) {
                let operator:string = data.gameRows[x].gameCols[col].operatorRow;
    
                inputSum = executeOperation(operator, inputSum, number);
            } else {
                return false;
            };
        };
    };

    if (inputSum == colSums[col] && inputsLength == data.gameRows.length) {
        return true;
    } else {
        return false;
    };
};