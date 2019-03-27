
export const joinExpressionOperator = ([lhs, s1, op, s2, rhs]) => lhs + s1 + op + s2 + rhs
export const joinSeparatedChunks = ([lhs, op, rhs]) => lhs + op + rhs
export const concat = ([lhs, rhs]) => lhs + rhs
export const lhs = ([lhs, rhs]) => lhs
export const rhs = ([lhs, rhs]) => rhs
export const back = (d) => d[d.length - 1]

export function addPairToMap([key, value], map){
	console.log('add to layer', [key, value], map);
	if (map.get(key)){
		throw new Error(`duplicate key ${key}`);
	}
	map.set(key, value);
}

export function addPairToDataAndContext([key, data, context], [dataMap, contextMap]){
	addPairToMap([key, data], dataMap);
	addPairToMap([key, context], contextMap)
}

export function join(list, rhs){
	if (!list) return rhs;
	if (!rhs) return list;
	if (typeof list == 'string'){
		return list + rhs;
	}
	return list + rhs;
}

export function reduce(list){
	if (list.length == 1){
		return list[0];
	}
	let memo;
	for (const item of list){
		memo = join(memo, item);
	}
	return memo;
}

export function optionalTail(list){
	const [head, tail] = list;
	if (tail && tail.length){
		return head.value + reduce(tail);
	}
	return head.value; f
}

export function map2Object(map){
	const object = {};
	for (const pair of map){
		const [key] = pair;
		object[key] = map.get(key);
	}
	return object;
}