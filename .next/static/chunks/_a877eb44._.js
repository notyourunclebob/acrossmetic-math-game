(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/tools/GameManager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Gamegrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Gamegrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$tools$2f$GameManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/tools/GameManager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Gamegrid(param) {
    let { gameData, gameOptions } = param;
    _s();
    // ---------------------------------------------------- functions
    // updates the input list with imputs maintaining their respective row and col index
    const updateInputs = (value, row, col)=>{
        setInputs((grid)=>({
                ...grid,
                [row]: {
                    ...grid[row] || {},
                    [col]: value
                }
            }));
    };
    // prevents invalid inputs by disabling key inputs
    const handleKeyDown = (e)=>{
        // allows backspace, del, tab, esc, enter and arrow keys
        if ([
            8,
            46,
            9,
            27,
            13,
            37,
            38,
            39,
            40
        ].includes(e.keyCode)) return;
        // restricts keys to 1-9
        if (e.key < "1" || e.key > "9") {
            e.preventDefault();
        }
        ;
    };
    // ---------------------------------------------------- state variables
    const [rowSums, setRowSums] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [colSums, setColSums] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    // holds a list of user inputs
    const [inputs, setInputs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [validRows, setValidRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [validCols, setValidCols] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Gamegrid.useEffect": ()=>{
            setData(gameData);
            if (data != null) {
                setRowSums((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$tools$2f$GameManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateRows"])(data));
                setColSums((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$tools$2f$GameManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCols"])(data));
                console.log(data);
            }
            ;
        }
    }["Gamegrid.useEffect"], [
        data
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Gamegrid.useEffect": ()=>{
            for(let x = 0; x < gameOptions.gameSize; x++){
                const rowLength = inputs[x] ? Object.values(inputs[x]).length : 0;
                const colLength = Object.values(inputs).filter({
                    "Gamegrid.useEffect": (row)=>x in row
                }["Gamegrid.useEffect"]).length;
                if (rowLength == gameOptions.gameSize) {
                    let isValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$tools$2f$GameManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareRow"])(x, rowSums, inputs[x], data);
                    setValidRows({
                        "Gamegrid.useEffect": (list)=>({
                                ...list,
                                [x]: isValid
                            })
                    }["Gamegrid.useEffect"]);
                }
                ;
                if (colLength == gameOptions.gameSize) {
                    let isValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$tools$2f$GameManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareCol"])(x, colSums, inputs, data);
                    setValidCols({
                        "Gamegrid.useEffect": (list)=>({
                                ...list,
                                [x]: isValid
                            })
                    }["Gamegrid.useEffect"]);
                }
                ;
            }
            ;
        }
    }["Gamegrid.useEffect"], [
        inputs
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col justify-center items-center m-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col size-fit gap-2 text-xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: gameData.gameRows.map((row, r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: row.gameCols.map((col, c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-2 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "size-10"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Gamegrid.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "size-10 content-center",
                                                    children: r > 0 ? col.operatorRow : ""
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Gamegrid.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "size-10 content-center",
                                                    children: c > 0 ? col.operatorCol : ""
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Gamegrid.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: "1",
                                                    max: "9",
                                                    onKeyDown: handleKeyDown,
                                                    onChange: (e)=>updateInputs(Number(e.target.value), r, c),
                                                    className: "size-10 bg-amber-200 rounded-md text-center"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Gamegrid.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, c, true, {
                                            fileName: "[project]/src/components/Gamegrid.tsx",
                                            lineNumber: 97,
                                            columnNumber: 41
                                        }, this))
                                }, r, false, {
                                    fileName: "[project]/src/components/Gamegrid.tsx",
                                    lineNumber: 94,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Gamegrid.tsx",
                            lineNumber: 91,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bottom-0 left-0 flex flex-col w-fit",
                            children: rowSums.map((sum, s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "size-10 col-span-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Gamegrid.tsx",
                                            lineNumber: 126,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "size-10 content-center",
                                            children: "="
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Gamegrid.tsx",
                                            lineNumber: 127,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "size-10 content-center rounded-md text-white ".concat(validRows[s] ? "bg-green-500" : "bg-gray-500"),
                                            children: sum
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Gamegrid.tsx",
                                            lineNumber: 130,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, s, true, {
                                    fileName: "[project]/src/components/Gamegrid.tsx",
                                    lineNumber: 125,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Gamegrid.tsx",
                            lineNumber: 122,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Gamegrid.tsx",
                    lineNumber: 90,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-fit gap-2",
                    children: colSums.map((sum, s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-2 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "size-10 row-span-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Gamegrid.tsx",
                                    lineNumber: 142,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "size-10 content-center",
                                    children: "="
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Gamegrid.tsx",
                                    lineNumber: 143,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "size-10 content-center rounded-md text-white ".concat(validCols[s] ? "bg-green-500" : "bg-gray-500"),
                                    children: sum
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Gamegrid.tsx",
                                    lineNumber: 146,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, s, true, {
                            fileName: "[project]/src/components/Gamegrid.tsx",
                            lineNumber: 141,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/Gamegrid.tsx",
                    lineNumber: 138,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Gamegrid.tsx",
            lineNumber: 89,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Gamegrid.tsx",
        lineNumber: 84,
        columnNumber: 9
    }, this);
}
_s(Gamegrid, "p5vQBlhwJLO3poHD3OS899ET/Kk=");
_c = Gamegrid;
var _c;
__turbopack_context__.k.register(_c, "Gamegrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_a877eb44._.js.map