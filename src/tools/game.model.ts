//--------------------------------- set options for the game generator
/** 
 * List of options for game generation.
 * @prop gameSize Number for the length of rows and columns.
 * @prop gameOperators List of operators to use.
*/
export interface GameOptions {
    gameSize: number;
    gameOperators: GameOperators[];
};

/** 
 * List of operators to use when generating a game.
 * @prop operator If this operator is present it will be used. Allowed operators are: "+", "-", "x" or "÷"
*/
export interface GameOperators {
    operator: string;
};

// -------------------------------- generated data to build the game
/** 
 * Generated two dimensional list of data used to determine the goal values of the game.
 * @prop gameRows List defineing the rows of the game.
*/
export interface GameData {
    gameRows: GameRows[];
}

/** 
 * List Defining the rows of the game.
 * @prop gameCols List defining the columns of the game.
*/
export interface GameRows {
    gameCols: GameCols[];
}

/** 
 * List defining the columns of the game.
 * @prop number Number used to calculate row and column goal sums.
 * @prop operatorCol Operator used when calculating allong columns.
 * @prop operatorRow Operator used when calculating allong rows.
*/
export interface GameCols {
    number: number;
    operatorCol: string;
    operatorRow: string;
}
// -------------------------------- props

/** 
 * Interface for all game properties.
 * @prop gameOptions List of options for game generation.
 * @prop gameData Generated two dimensional list of data used to determine the goal values of the game.
*/
export interface GameProps {
    gameOptions:GameOptions;
    gameData:GameData;
};