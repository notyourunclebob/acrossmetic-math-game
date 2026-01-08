
import { GameCols, GameData, GameOperators, GameOptions, GameRows } from "./game.model";

// game generation values

/**
 * Set value for the maximum allowed length of the game grid in game generation.
 * Directly controls the options available to the player.
 */
export const MAX_GAME_SIZE = 9;

/** 
 * Set list of operators used in game generation.
 * Directly controls the options available to the player.
*/
export const ALLOWED_OPERTORS = [
    {operator:"+"},
    {operator:"-"},
    {operator:"x"}
];

/** 
 * Regular Experssion used for input validation
*/
export const INPUT_VALIDATE = new RegExp("[1-9]");

/** 
 * Runs a simple operation using parameters.
 * @param opperator Used to select which operation to use based on a string. "+", "-", "x" or "÷"
 * @param x First operand used in the operation.
 * @param y Second operand used in the operation.
*/
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

/** 
 * Sets game generation options to default values and returns them in a JSON list.
*/
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

/** 
 * Takes GameOptions and uses it to generate a psudo random two dimensional list of operators and operands.
 * @param gameOptions Data in JSON format
*/
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

/** 
 * Calculates each row in GameData and reurns a list of each sum to serve as a game goal.
 * @param gameData Data in JSON format.
*/
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

/** 
 * Calculates each coulmn in GameData by the column position in each row and reurns a list of each sum to serve as a game goal.
 * @param gameData Data in JSON format.
*/
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

/** 
 * Takes a set of parameters from game inputs to calculate and compare sums with rowSums returning true if the sums match.
 * @param row The index of the active game row being compared.
 * @param rowSums A list of sums to match for the game goal. The inputs sum at the row index must match the sum at the index here to return true.
 * @param rowLength The length of the row being compared. The length of inputs must match the length of rowSums before the function can return true.
 * @param inputs A record list of input numbers to calculate and compare for the game goal.
 * @param data GameData needed to select the correct operations to calculate.
*/
export function compareRow(row:number, rowSums:number[], rowLength:number, inputs:Record<number, Record<number, number | undefined>>, data:GameData) {

    let inputSum:number = 0;
    
    // loops through inputs by row to get the sum
    // if number is not 1-9 returns false
    for (let x:number = 0; x < rowLength; x++) {
        
        if (inputs[row][x] != null) {

            let number:number = inputs[row][x]!;
    
            if (INPUT_VALIDATE.test(number.toString())) {
                let operator:string = data.gameRows[row].gameCols[x].operatorCol;
        
                inputSum = executeOperation(operator, inputSum, number);
            } else {
                return false;
            };
        };
    };

    // checks if the input row sum matches the generated row sum and if the length matches the generated row
    if (inputSum == rowSums[row] && rowLength == data.gameRows[row].gameCols.length) {
        return true;
    } else {
        return false;
    };

};

/** 
 * Takes a set of parameters from game inputs to calculate and compare sums with colSums returning true if the sums match.
 * @param row The index of the active game column being compared.
 * @param rowSums A list of sums to match for the game goal. The inputs sum at the column index must match the sum at the index here to return true.
 * @param rowLength The length of the column being compared. The length of inputs must match the length of colSums before the function can return true.
 * @param inputs A record list of input numbers to calculate and compare for the game goal.
 * @param data GameData needed to select the correct operations to calculate.
*/
export function compareCol(col:number, colSums:number[], colLength:number,  inputs:Record<number, Record<number, number | undefined>>, data:GameData) {
    
    let inputSum:number = 0;

    for (let x:number = 0; x < colLength; x++) {

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

    if (inputSum == colSums[col] && colLength == data.gameRows.length) {
        return true;
    } else {
        return false;
    };
};