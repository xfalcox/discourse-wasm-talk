import * as wasm from './wasm_math_bg.wasm';

/**
* @param {number} i
* @param {number} j
* @returns {number}
*/
export function sum(i, j) {
    var ret = wasm.sum(i, j);
    return ret;
}

