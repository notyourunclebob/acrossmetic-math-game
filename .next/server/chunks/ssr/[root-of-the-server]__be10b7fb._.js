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
    "defaultGameOptions",
    ()=>defaultGameOptions,
    "executeOperation",
    ()=>executeOperation,
    "generateGame",
    ()=>generateGame,
    "testGameData",
    ()=>testGameData
]);
function executeOperation(opperator, x, y) {
    // selects approiate operation depending on selected operator
    switch(opperator){
        case "+":
            return x + y;
        case "-":
            return x - y;
        default:
            throw Error("Unknown operation");
    }
    ;
}
function defaultGameOptions() {
    // sets game options to default values
    let gameOptions = {
        gameSize: 9,
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
"[project]/src/components/Gamegrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Gamegrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$tools$2f$GameManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/tools/GameManager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function Gamegrid({ gameData, gameOptions }) {
    // ---------------------------------------------------- action events
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
    // ---------------------------------------------------- state variables
    const [rowSums, setRowSums] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [colSums, setColSums] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    // holds a list of userinputs
    const [inputs, setInputs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setData(gameData);
        if (data != null) {
            setRowSums((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$tools$2f$GameManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateRows"])(data));
            setColSums((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$tools$2f$GameManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateCols"])(data));
            console.log(data);
        }
        ;
    }, [
        data
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col justify-center items-center m-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "px-3 py-2 rounded-lg bg-amber-600 text-white",
                    children: "New Game"
                }, void 0, false, {
                    fileName: "[project]/src/components/Gamegrid.tsx",
                    lineNumber: 44,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Gamegrid.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col size-fit gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: gameData.gameRows.map((row, r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: row.gameCols.map((col, c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Gamegrid.tsx",
                                                        lineNumber: 56,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-8 content-center",
                                                        children: r > 0 ? col.operatorRow : ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Gamegrid.tsx",
                                                        lineNumber: 57,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-8 content-center",
                                                        children: c > 0 ? col.operatorCol : ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Gamegrid.tsx",
                                                        lineNumber: 60,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "1",
                                                        max: "9",
                                                        onChange: (e)=>updateInputs(Number(e.target.value), r, c),
                                                        className: "size-8 bg-amber-200 rounded-md text-center"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Gamegrid.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, c, true, {
                                                fileName: "[project]/src/components/Gamegrid.tsx",
                                                lineNumber: 55,
                                                columnNumber: 41
                                            }, this))
                                    }, r, false, {
                                        fileName: "[project]/src/components/Gamegrid.tsx",
                                        lineNumber: 52,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Gamegrid.tsx",
                                lineNumber: 49,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bottom-0 left-0 flex flex-col w-fit",
                                children: rowSums.map((sum, s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "size-8 col-span-2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Gamegrid.tsx",
                                                lineNumber: 82,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "size-8 content-center",
                                                children: "="
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Gamegrid.tsx",
                                                lineNumber: 83,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "size-8 content-center",
                                                children: sum
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Gamegrid.tsx",
                                                lineNumber: 86,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, s, true, {
                                        fileName: "[project]/src/components/Gamegrid.tsx",
                                        lineNumber: 81,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Gamegrid.tsx",
                                lineNumber: 78,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Gamegrid.tsx",
                        lineNumber: 48,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-fit gap-2",
                        children: colSums.map((sum, s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "size-8 row-span-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Gamegrid.tsx",
                                        lineNumber: 98,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "size-8 content-center",
                                        children: "="
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Gamegrid.tsx",
                                        lineNumber: 99,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "size-8 content-center",
                                        children: sum
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Gamegrid.tsx",
                                        lineNumber: 102,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, s, true, {
                                fileName: "[project]/src/components/Gamegrid.tsx",
                                lineNumber: 97,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Gamegrid.tsx",
                        lineNumber: 94,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Gamegrid.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Gamegrid.tsx",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
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