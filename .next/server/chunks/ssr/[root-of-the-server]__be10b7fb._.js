module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/tools/GameManager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateCols",
    ()=>calculateCols,
    "calculateRows",
    ()=>calculateRows,
    "compareCol",
    ()=>compareCol,
    "compareRow",
    ()=>compareRow,
    "defaultGameOptions",
    ()=>defaultGameOptions,
    "executeOperation",
    ()=>executeOperation,
    "generateGame",
    ()=>generateGame,
    "inputValidate",
    ()=>inputValidate,
    "testGameData",
    ()=>testGameData
]);
const inputValidate = new RegExp("[1-9]");
function executeOperation(opperator, x, y) {
    // selects approiate operation depending on selected operator
    switch(opperator){
        case "+":
            return x + y;
        case "-":
            return x - y;
        case "x":
            return x * y;
        case "÷":
            return x / y;
        default:
            throw Error("Unknown operation");
    }
    ;
}
function defaultGameOptions() {
    // sets game options to default values
    let gameOptions = {
        gameSize: 3,
        gameOperators: [
            {
                operator: "+"
            },
            {
                operator: "-"
            }
        ]
    };
    return gameOptions;
}
function generateGame(gameOptions) {
    // setting up selected game options to use for generationg a new game
    const size = gameOptions.gameSize;
    const operators = gameOptions.gameOperators;
    // looping through lists to generate random numbers and operators
    let gameRows = [];
    for(let x = 0; x < size; x++){
        let gameCols = [];
        for(let y = 0; y < size; y++){
            let number = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
            let indexRow = Math.floor(Math.random() * operators.length);
            let indexCol = Math.floor(Math.random() * operators.length);
            let operatorRow = operators[indexRow].operator;
            let operatorCol = operators[indexCol].operator;
            // calculations start at 0
            // this ensures the first number in a row or column is added
            if (x == 0 && y == 0) {
                gameCols.push({
                    number: number,
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
            }
            ;
        }
        ;
        gameRows.push({
            gameCols
        });
    }
    ;
    let gameData = {
        gameRows: gameRows
    };
    return gameData;
}
function calculateRows(gameData) {
    let rowSums = [];
    // order of operations is iterative starting at 0 then operating on the sum of the previous operation
    gameData.gameRows.forEach((row)=>{
        let sum = 0;
        row.gameCols.forEach((col)=>{
            let number = col.number;
            let operator = col.operatorCol;
            sum = executeOperation(operator, sum, number);
        });
        rowSums.push(sum);
    });
    return rowSums;
}
function calculateCols(gameData) {
    let colSums = [];
    // order of operations is iterative starting at 0 then operating on the sum of the previous operation    
    for(let x = 0; x < gameData.gameRows.length; x++){
        let sum = 0;
        for(let y = 0; y < gameData.gameRows.length; y++){
            let number = gameData.gameRows[y].gameCols[x].number;
            let operator = gameData.gameRows[y].gameCols[x].operatorRow;
            sum = executeOperation(operator, sum, number);
        }
        ;
        colSums.push(sum);
    }
    ;
    return colSums;
}
function compareRow(row, rowSums, inputs, data) {
    let inputSum = 0;
    let inputsLength = Object.values(inputs).length;
    // loops through inputs by row to get the sum
    // if number is not 1-9 returns false
    for(let x = 0; x < inputsLength; x++){
        let number = inputs[x];
        if (inputValidate.test(number.toString())) {
            let operator = data.gameRows[row].gameCols[x].operatorCol;
            inputSum = executeOperation(operator, inputSum, number);
        } else {
            return false;
        }
        ;
    }
    ;
    // checks if the input row sum matches the generated row sum and if the length matches the generated row
    if (inputSum == rowSums[row] && inputsLength == data.gameRows[row].gameCols.length) {
        return true;
    } else {
        return false;
    }
    //TURBOPACK unreachable
    ;
}
function compareCol(col, colSums, inputs, data) {
    let inputSum = 0;
    let inputsLength = Object.values(inputs).filter((row)=>col in row).length;
    for(let x = 0; x < inputsLength; x++){
        let number = inputs[x][col];
        if (inputValidate.test(number.toString())) {
            let operator = data.gameRows[x].gameCols[col].operatorRow;
            inputSum = executeOperation(operator, inputSum, number);
        } else {
            return false;
        }
        ;
    }
    ;
    if (inputSum == colSums[col] && inputsLength == data.gameRows.length) {
        return true;
    } else {
        return false;
    }
    //TURBOPACK unreachable
    ;
}
function testGameData() {
    // testing data
    let gameData = {
        gameRows: [
            {
                gameCols: [
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 6,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "-",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    }
                ]
            },
            {
                gameCols: [
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "-"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    }
                ]
            },
            {
                gameCols: [
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    }
                ]
            },
            {
                gameCols: [
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    }
                ]
            },
            {
                gameCols: [
                    {
                        number: 7,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    }
                ]
            },
            {
                gameCols: [
                    {
                        number: 7,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    },
                    {
                        number: 1,
                        operatorCol: "+",
                        operatorRow: "+"
                    }
                ]
            }
        ]
    };
    return gameData;
}
}),
"[project]/src/components/Gamegrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/src/components/Gamegrid.tsx'\n\nExpected '</', got 'setOptions'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__be10b7fb._.js.map