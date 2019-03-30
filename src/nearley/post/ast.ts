import { clone, get, set, mapToObject } from 'typed-json-transform';


// const expand = (d: any[]) => ({
//     $: d[0],
//     _: d[1]
// });

export const unaryOperate = ([op, rhs]: Nearley.TokenList) => ({ [op]: rhs });

export const operate = ([lhs, s1, op, s2, rhs]: Nearley.TokenList) => ({ [op]: [lhs, rhs] })

export const concat = ([lhs, s1, rhs]: Nearley.TokenList) => ({ '<<': [lhs, rhs] })

type ASTMap = Map<string | number, ASTPair>
type ASTObject = { [x: string]: any }
type ASTPair = Array<Map<string | number, any> | ASTObject>


export const _addPair = ([l, l_]: ASTPair, [[k, k_], [v, v_]]: Nearley.TokenList) => {
    if (l.get(k)) {
        throw new Error(`duplicate key ${k}`);
    }
    l.set(k, v);
    (l_ as ASTObject)[k] = v_;
}

export const listToMap = ([r]: Nearley.TokenList) => {
    const [list, context] = r;
    const l = [
        new Map(),
        { map: true, ...context }
    ];
    if (list && list.length) {
        for (let i = 0; i < list.length; i++) {
            _addPair(l, [i, list[i]])
        }
    }
    return l;
}

export const addPairToMap = ([_l, r]: Nearley.TokenList) => {
    if (!r) return _l;
    const l = clone(_l);
    _addPair(l, r)
    return l;
}

export const pairToMap = ([r]: Nearley.TokenList) => {
    const l = [
        new Map(),
        { map: true }
    ];
    _addPair(l, r);
    return l;
}

export const kvcToPair = ([k, k_]: any, statement: any, cPair: any) => {
    if (cPair) {
        const [c, c_] = cPair;
        console.log({cPair});
        const context = mapToObject(c);
        return [[k, { key: true, ...k_ }], [statement[0], { ...statement[1], ...context }]];
    }
    console.log('no context', statement);
    return [[k, { key: true, ...k_ }], statement];
}

export const statementToPair = ([s, s_]: any, c_: any) => {
    const pair = [[s, { key: true, ...s_ }], [true, { boolean: true, ...c_ }]];
    return pair;
}

export const addListToMap = ([_l, r]: Nearley.TokenList) => {
    const l = clone(_l);
    const [list, context] = r;
    console.log('add list to map', list);
    l.context = { ...l.context, ...context };
    if (list && list.length) {
        for (let i = 0; i < list.length; i++) {
            _addPair(l, [[i], list[i]])
        }
    }
    return l;
}

export function join(list: string[]) {
    if (list.length == 1) {
        return list[0];
    }
    let memo = '';
    for (const item of list) {
        memo = memo + item;
    }
    return memo;
}

const char = (t: Nearley.Token) => t.text;
const chars = (list: Nearley.Token[]) => list.map(char).join('');

export function singleWord(list: Nearley.Token[]) {
    const head: Nearley.Token = list[0];
    const tail = <any>list[1] as Nearley.Token[];

    let data;
    if (tail && tail.length) {
        data = head.value + chars(tail);
    } else {
        data = head.value
    }
    return data;
}