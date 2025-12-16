//--------------------------------- set options for the game generator
export interface GameOptions {
    gameSize: number;
    gameOperators: GameOperators[];
};

export interface GameOperators {
    operator: string;
};

// -------------------------------- generated data to build the game
export interface GameData {
    gameRows: GameRows[];
}

export interface GameRows {
    gameCols: GameCols[];
}

export interface GameCols {
    number: number
    operatorCol: string;
    operatorRow: string;
}

// -------------------------------- props
export interface GameProps {
    gameOptions:GameOptions;
    gameData:GameData;
};