// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

import { lexer, any, indent, dedent, eol, sol, eof, sof, startRule, space } from './lexer';
import { expectedScopeOperator } from './post/errors';
import { concat, lhs, rhs, back, addPairToMap, reduce, optionalTail } from './post/reducers';

export interface Token { value: any; [key: string]: any };

export interface Lexer {
  reset: (chunk: string, info: any) => void;
  next: () => Token | undefined;
  save: () => any;
  formatError: (token: Token) => string;
  has: (tokenType: string) => boolean
};

export interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any
};

export type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

export var Lexer: Lexer | undefined = lexer;

export var ParserRules: NearleyRule[] = [
    {"name": "uri", "symbols": ["url"], "postprocess": id},
    {"name": "uri", "symbols": ["authority"], "postprocess": id},
    {"name": "url", "symbols": ["urlDomainScheme", "authority"], "postprocess": reduce},
    {"name": "url", "symbols": ["urlScheme", "uriPathComponent"], "postprocess": reduce},
    {"name": "url", "symbols": ["urlScheme", "urlPath"], "postprocess": reduce},
    {"name": "urlDomainScheme", "symbols": ["urlScheme", {"literal":"/"}, {"literal":"/"}], "postprocess": reduce},
    {"name": "urlSchemes", "symbols": ["urlSchemes", "urlScheme"], "postprocess": reduce},
    {"name": "urlSchemes", "symbols": ["urlScheme"], "postprocess": id},
    {"name": "urlScheme", "symbols": ["domainComponent", {"literal":":"}], "postprocess": reduce},
    {"name": "authority", "symbols": ["urlCredentials", {"literal":"@"}, "_authority"], "postprocess": reduce},
    {"name": "authority", "symbols": ["_authority"], "postprocess": reduce},
    {"name": "_authority$ebnf$1", "symbols": ["uriPathComponent"], "postprocess": id},
    {"name": "_authority$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "_authority$ebnf$2", "symbols": ["uriQueries"], "postprocess": id},
    {"name": "_authority$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "_authority$ebnf$3", "symbols": ["uriFragment"], "postprocess": id},
    {"name": "_authority$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "_authority", "symbols": ["uriDomainComponent", "_authority$ebnf$1", "_authority$ebnf$2", "_authority$ebnf$3"], "postprocess": reduce},
    {"name": "uriQueries", "symbols": ["uriQueries", "uriQuery"], "postprocess": reduce},
    {"name": "uriQueries", "symbols": ["uriQuery"], "postprocess": id},
    {"name": "uriPathComponent", "symbols": [{"literal":"/"}, "urlPath"], "postprocess": reduce},
    {"name": "uriPathComponent", "symbols": [{"literal":"/"}], "postprocess": ([tok]) => tok.value},
    {"name": "urlCredentials", "symbols": ["urlCredentials", {"literal":":"}, "password"], "postprocess": reduce},
    {"name": "urlCredentials", "symbols": ["email"], "postprocess": id},
    {"name": "urlCredentials", "symbols": ["subdomain"], "postprocess": id},
    {"name": "urlPath", "symbols": ["urlPath", {"literal":"/"}, "urlPathName"], "postprocess": reduce},
    {"name": "urlPath", "symbols": ["urlPath", {"literal":"/"}], "postprocess": reduce},
    {"name": "urlPath", "symbols": ["urlPathName"], "postprocess": id},
    {"name": "urlPathName", "symbols": ["urlPathName", {"literal":"."}, "urlPathWord"], "postprocess": reduce},
    {"name": "urlPathName", "symbols": ["urlPathWord"], "postprocess": id},
    {"name": "urlPathWord", "symbols": ["urlPathWord", "urlPathChar"], "postprocess": reduce},
    {"name": "urlPathWord", "symbols": ["urlPathChar"], "postprocess": id},
    {"name": "urlPathChar", "symbols": [/[^ ^\/^.^?^;]/], "postprocess": ([tok]) => tok.value},
    {"name": "filePath", "symbols": ["filePath", {"literal":"/"}, "fileName"], "postprocess": reduce},
    {"name": "filePath", "symbols": ["fileName"], "postprocess": id},
    {"name": "fileName", "symbols": ["fileName", {"literal":"."}, "fileWord"], "postprocess": reduce},
    {"name": "fileName", "symbols": ["fileWord"], "postprocess": id},
    {"name": "fileWord", "symbols": ["fileWord", "fileChar"], "postprocess": reduce},
    {"name": "fileWord", "symbols": ["fileChar"], "postprocess": id},
    {"name": "fileChar", "symbols": [/[^ ^\/^.]/], "postprocess": ([tok]) => tok.value},
    {"name": "password", "symbols": ["urlSafePlusEncoded"], "postprocess": reduce},
    {"name": "email", "symbols": ["subdomain", {"literal":"@"}, "domain"], "postprocess": reduce},
    {"name": "uriDomainComponent", "symbols": ["uriDomainComponent", "uriPortComponent"], "postprocess": reduce},
    {"name": "uriDomainComponent", "symbols": ["domain"], "postprocess": reduce},
    {"name": "uriDomainComponent", "symbols": [{"literal":"["}, "ipv6", {"literal":"]"}], "postprocess": reduce},
    {"name": "uriDomainComponent", "symbols": ["ipv4"], "postprocess": id},
    {"name": "ipv6$macrocall$2", "symbols": ["ipv6Group"]},
    {"name": "ipv6$macrocall$1", "symbols": ["ipv6$macrocall$2", "ipv6$macrocall$2", "ipv6$macrocall$2", "ipv6$macrocall$2", "ipv6$macrocall$2", "ipv6$macrocall$2", "ipv6$macrocall$2"], "postprocess": reduce},
    {"name": "ipv6", "symbols": ["ipv6$macrocall$1", "ipv6Number"], "postprocess": reduce},
    {"name": "ipv6$macrocall$4", "symbols": ["ipv6Group"]},
    {"name": "ipv6$macrocall$3", "symbols": ["ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4"], "postprocess": reduce},
    {"name": "ipv6$macrocall$3", "symbols": ["ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4"], "postprocess": reduce},
    {"name": "ipv6$macrocall$3", "symbols": ["ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4"], "postprocess": reduce},
    {"name": "ipv6$macrocall$3", "symbols": ["ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4"], "postprocess": reduce},
    {"name": "ipv6$macrocall$3", "symbols": ["ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4"], "postprocess": reduce},
    {"name": "ipv6$macrocall$3", "symbols": ["ipv6$macrocall$4", "ipv6$macrocall$4", "ipv6$macrocall$4"], "postprocess": reduce},
    {"name": "ipv6$macrocall$3", "symbols": ["ipv6$macrocall$4", "ipv6$macrocall$4"], "postprocess": reduce},
    {"name": "ipv6$macrocall$3", "symbols": ["ipv6$macrocall$4"], "postprocess": reduce},
    {"name": "ipv6", "symbols": ["ipv6$macrocall$3", {"literal":":"}, "ipv6Number"], "postprocess": reduce},
    {"name": "ipv6Group", "symbols": ["ipv6Number", {"literal":":"}], "postprocess": reduce},
    {"name": "ipv6Number$macrocall$2", "symbols": ["hexDigit"]},
    {"name": "ipv6Number$macrocall$1", "symbols": ["ipv6Number$macrocall$2", "ipv6Number$macrocall$2", "ipv6Number$macrocall$2", "ipv6Number$macrocall$2"], "postprocess": reduce},
    {"name": "ipv6Number$macrocall$1", "symbols": ["ipv6Number$macrocall$2", "ipv6Number$macrocall$2", "ipv6Number$macrocall$2"], "postprocess": reduce},
    {"name": "ipv6Number$macrocall$1", "symbols": ["ipv6Number$macrocall$2", "ipv6Number$macrocall$2"], "postprocess": reduce},
    {"name": "ipv6Number$macrocall$1", "symbols": ["ipv6Number$macrocall$2"], "postprocess": reduce},
    {"name": "ipv6Number", "symbols": ["ipv6Number$macrocall$1"]},
    {"name": "ipv4", "symbols": ["ipv4Group", {"literal":"."}, "ipv4Group", {"literal":"."}, "ipv4Group", {"literal":"."}, "ipv4Group"]},
    {"name": "ipv4Group", "symbols": ["d2", "d5", "d0_5"], "postprocess": reduce},
    {"name": "ipv4Group", "symbols": ["d2", "d0_4", "d0_9"], "postprocess": reduce},
    {"name": "ipv4Group", "symbols": ["d1", "d0_9", "d0_9"], "postprocess": reduce},
    {"name": "ipv4Group", "symbols": ["d0_9", "d0_9"], "postprocess": reduce},
    {"name": "ipv4Group", "symbols": ["d0_9"], "postprocess": id},
    {"name": "d1", "symbols": [{"literal":"1"}], "postprocess": ([tok]) => tok},
    {"name": "d2", "symbols": [{"literal":"2"}], "postprocess": ([tok]) => tok},
    {"name": "d5", "symbols": [{"literal":"5"}], "postprocess": ([tok]) => tok},
    {"name": "d0_4", "symbols": [/[0-4]/], "postprocess": ([tok]) => tok},
    {"name": "d0_5", "symbols": [/[0-5]/], "postprocess": ([tok]) => tok},
    {"name": "d0_9", "symbols": [/[0-9]/], "postprocess": ([tok]) => tok},
    {"name": "domain", "symbols": ["subdomain", {"literal":"."}, "domainComponent"], "postprocess": reduce},
    {"name": "uriPortComponent", "symbols": [{"literal":":"}, "number"], "postprocess": reduce},
    {"name": "subdomain", "symbols": ["domainComponent", {"literal":"."}, "subdomain"], "postprocess": reduce},
    {"name": "subdomain", "symbols": ["domainComponent"], "postprocess": id},
    {"name": "uriQuery", "symbols": [{"literal":"?"}, "queryList"], "postprocess": reduce},
    {"name": "queryList", "symbols": ["queryList", {"literal":"&"}, "queryFragment"], "postprocess": reduce},
    {"name": "queryList", "symbols": ["queryFragment"], "postprocess": id},
    {"name": "queryFragment", "symbols": ["queryFragment", {"literal":"="}, "urlSafePlusEncoded"], "postprocess": reduce},
    {"name": "queryFragment", "symbols": ["urlSafePlusEncoded"], "postprocess": id},
    {"name": "uriFragment", "symbols": [{"literal":"#"}, "queryList"], "postprocess": reduce},
    {"name": "domainComponent$ebnf$1", "symbols": []},
    {"name": "domainComponent$ebnf$1", "symbols": ["domainComponent$ebnf$1", /[a-zA-Z0-9\-]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "domainComponent", "symbols": [/[a-zA-Z]/, "domainComponent$ebnf$1"], "postprocess": optionalTail},
    {"name": "urlSafePlusEncoded", "symbols": ["urlSafePlusEncoded", "urlSafePlusEncodedChars"], "postprocess": reduce},
    {"name": "urlSafePlusEncoded", "symbols": ["urlSafePlusEncodedChars"], "postprocess": id},
    {"name": "urlSafePlusEncodedChars", "symbols": [{"literal":"%"}, "hexDigit", "hexDigit"], "postprocess": reduce},
    {"name": "urlSafePlusEncodedChars", "symbols": [{"literal":"&"}, {"literal":"a"}, {"literal":"m"}, {"literal":"p"}, {"literal":";"}], "postprocess": reduce},
    {"name": "urlSafePlusEncodedChars", "symbols": ["urlSafeChar"], "postprocess": id},
    {"name": "nestedScope", "symbols": ["pushScope", "scope", "popScope"], "postprocess": ([push, scope]) => scope},
    {"name": "pushScope$subexpression$1", "symbols": ["inlineComment"]},
    {"name": "pushScope$subexpression$1", "symbols": ["eol"]},
    {"name": "pushScope", "symbols": ["pushScope$subexpression$1", "indent"], "postprocess": id},
    {"name": "popScope", "symbols": ["dedent"], "postprocess": id},
    {"name": "endLine", "symbols": ["inlineComment"], "postprocess": id},
    {"name": "endLine", "symbols": ["eol"], "postprocess": id},
    {"name": "inlineComment", "symbols": ["space", "comment"], "postprocess": id},
    {"name": "comment$ebnf$1", "symbols": ["_escapedString"], "postprocess": id},
    {"name": "comment$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "comment", "symbols": [{"literal":"#"}, "comment$ebnf$1", eol], "postprocess": ([operator, comment]) => (comment)},
    {"name": "number", "symbols": ["_number"], "postprocess": ([n]) => parseFloat(n)},
    {"name": "_number", "symbols": ["_float", {"literal":"e"}, "digit"], "postprocess": reduce},
    {"name": "_number", "symbols": ["_float"], "postprocess": id},
    {"name": "_float", "symbols": ["digit", {"literal":"."}, "digit"], "postprocess": reduce},
    {"name": "_float", "symbols": ["digit"], "postprocess": id},
    {"name": "digit", "symbols": ["digit", /[0-9]/], "postprocess": concat},
    {"name": "digit", "symbols": [/[0-9]/], "postprocess": ([tok]) => tok},
    {"name": "literal", "symbols": ["string"], "postprocess": id},
    {"name": "literal", "symbols": ["singleWord"], "postprocess": id},
    {"name": "literal", "symbols": ["uri"], "postprocess": id},
    {"name": "literal", "symbols": ["number"], "postprocess": id},
    {"name": "singleWord$ebnf$1", "symbols": []},
    {"name": "singleWord$ebnf$1", "symbols": ["singleWord$ebnf$1", /[a-zA-Z0-9$_]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "singleWord", "symbols": [/[a-zA-Z$_]/, "singleWord$ebnf$1"], "postprocess": optionalTail},
    {"name": "word", "symbols": ["word", "wordSafeChar"], "postprocess": concat},
    {"name": "word", "symbols": ["wordStartChar"], "postprocess": id},
    {"name": "wordSafeChar", "symbols": ["wordStartChar"], "postprocess": id},
    {"name": "wordSafeChar", "symbols": [/[0-9]/], "postprocess": ([tok]) => tok.value},
    {"name": "wordStartChar", "symbols": [/[a-zA-Z$_]/], "postprocess": ([tok]) => tok.value},
    {"name": "string", "symbols": [{"literal":"`"}, "_escapedString", {"literal":"`"}], "postprocess": function(d) {return d[1]; }},
    {"name": "_string", "symbols": [], "postprocess": function() {return ""; }},
    {"name": "_string", "symbols": ["_string", "_stringchar"], "postprocess": ([lhs, rhs]) => lhs + rhs},
    {"name": "_stringchar", "symbols": [/[^\\"]/], "postprocess": id},
    {"name": "_stringchar", "symbols": [{"literal":"\\"}, /[^]/], "postprocess": concat},
    {"name": "hexDigit", "symbols": [/[0-9a-fA-F]/], "postprocess": id},
    {"name": "urlSafe", "symbols": ["urlSafe", "urlSafeChar"], "postprocess": concat},
    {"name": "urlSafe", "symbols": ["urlSafeChar"], "postprocess": id},
    {"name": "urlSafeChar", "symbols": [/[a-zA-Z0-9\-]/], "postprocess": ([tok]) => tok.value},
    {"name": "_escapedString", "symbols": ["_escapedString", "escapedChar"], "postprocess": concat},
    {"name": "_escapedString", "symbols": ["escapedChar"], "postprocess": id},
    {"name": "escapedChar", "symbols": [space], "postprocess": ([tok]) => tok.value},
    {"name": "escapedChar", "symbols": [any], "postprocess": ([tok]) => tok.value},
    {"name": "sof", "symbols": [sof], "postprocess": ([tok]) => tok.value},
    {"name": "eof", "symbols": [eof], "postprocess": ([tok]) => tok.value},
    {"name": "sol", "symbols": [sol], "postprocess": ([tok]) => tok},
    {"name": "eol", "symbols": ["_", eol], "postprocess": ([ws, tok]) => tok},
    {"name": "indent", "symbols": [indent], "postprocess": ([tok]) => tok},
    {"name": "dedent", "symbols": [dedent], "postprocess": ([tok]) => tok},
    {"name": "space", "symbols": [space], "postprocess": ([tok]) => tok.value},
    {"name": "_", "symbols": ["_", "space"], "postprocess":  ([e]) => {
        	return e ? e + ' ': '';
        } },
    {"name": "_", "symbols": [], "postprocess": () => ''},
    {"name": "start", "symbols": ["sof", "rootScope", "eof"], "postprocess": ([sof, scope]) => scope},
    {"name": "rootScope", "symbols": ["map"], "postprocess": id},
    {"name": "rootScope$subexpression$1", "symbols": ["sol", "eol", {"literal":"string"}]},
    {"name": "rootScope$subexpression$2", "symbols": [{"literal":"/string"}]},
    {"name": "rootScope", "symbols": ["rootScope$subexpression$1", "multilineString", "rootScope$subexpression$2"], "postprocess": ([sol, scope]) => scope},
    {"name": "scope", "symbols": ["map"], "postprocess": ([layer]) => layer.data},
    {"name": "map", "symbols": ["map", "mapPairConstructor"], "postprocess":  ([_layer, nextMatch]) => {
        	const layer = {
        		data: new Map(_layer.data),
        		context: {}
        	}
        	if (nextMatch && (nextMatch[0] !== undefined)) {
        		addPairToMap(nextMatch, layer.data)
        	}
        	return layer;
        } },
    {"name": "map", "symbols": ["map", "mapList"], "postprocess":  ([_layer, list]) => {
        	const layer = {
        		data: new Map(_layer.data),
        		context: {}
        	}
        	if (list && list.length) {
        		for (let i = 0; i < list.length; i++){
        			addPairToMap([i, list[i]], layer.data)
        		}
        	}
        	return layer;
        } },
    {"name": "map", "symbols": ["mapPairConstructor"], "postprocess":  ([initialMatch]) => {
        	const layer = {
        		data: new Map(),
        		context: {}
        	}
        	if (initialMatch && (initialMatch[0] !== undefined)) {
        		addPairToMap(initialMatch, layer.data)
        	}
        	return layer;
        } },
    {"name": "map", "symbols": ["mapList"], "postprocess":  ([list]) => {
        	const layer = {
        		data: new Map(),
        		context: {}
        	}
        	if (list && list.length) {
        		for (let i = 0; i < list.length; i++){
        			addPairToMap([i, list[i]], layer.data)
        		}
        	}
        	return layer;
        } },
    {"name": "mapList$subexpression$1", "symbols": ["sol", {"literal":"-<"}, "endLine"]},
    {"name": "mapList", "symbols": ["mapList$subexpression$1", "list", {"literal":"/-<"}], "postprocess": ([prefix, list]) => list},
    {"name": "mapPairConstructor$subexpression$1$subexpression$1", "symbols": ["space", "constraintMap"]},
    {"name": "mapPairConstructor$subexpression$1", "symbols": ["mapPairConstructor$subexpression$1$subexpression$1"]},
    {"name": "mapPairConstructor$subexpression$1", "symbols": ["space"]},
    {"name": "mapPairConstructor$subexpression$2", "symbols": [{"literal":"-<"}, "pushScope"]},
    {"name": "mapPairConstructor", "symbols": ["key", "mapPairConstructor$subexpression$1", "mapPairConstructor$subexpression$2", "list", {"literal":"/-<"}, "popScope"], "postprocess":  ([key, context, mode, scope]) => {
        	if (context){
        		return [key, scope, {multiLineString: true, ...context[1]}]
        	} else {
        	  return [key, scope, {multiLineString: true}]
        	}
        } },
    {"name": "mapPairConstructor$subexpression$3$subexpression$1", "symbols": ["space", "constraintMap"]},
    {"name": "mapPairConstructor$subexpression$3", "symbols": ["mapPairConstructor$subexpression$3$subexpression$1"]},
    {"name": "mapPairConstructor$subexpression$3", "symbols": ["space"]},
    {"name": "mapPairConstructor$subexpression$4", "symbols": ["eol", {"literal":"text"}, "indent"]},
    {"name": "mapPairConstructor", "symbols": ["key", "mapPairConstructor$subexpression$3", "mapPairConstructor$subexpression$4", "multilineString", "popScope", {"literal":"/text"}], "postprocess":  ([key, context, mode, scope]) => {
        	if (context){
        		return [key, scope, {multiLineString: true, ...context[1]}]
        	} else {
        	  return [key, scope, {multiLineString: true}]
        	}
        } },
    {"name": "mapPairConstructor", "symbols": ["key", "pushTypedScope", "scope", "popScope"], "postprocess":  ([key, context, scope]) => {
        	  return [key, scope]
        } },
    {"name": "mapPairConstructor$subexpression$5$subexpression$1", "symbols": ["space", "constraintMap"]},
    {"name": "mapPairConstructor$subexpression$5", "symbols": ["mapPairConstructor$subexpression$5$subexpression$1"]},
    {"name": "mapPairConstructor$subexpression$5", "symbols": ["space"]},
    {"name": "mapPairConstructor", "symbols": ["key", "mapPairConstructor$subexpression$5", {"literal":"{"}, "scope", {"literal":"}"}, "endLine"], "postprocess":  ([key, context, bracket, scope]) => {
        	return [key, scope]
        } },
    {"name": "mapPairConstructor$subexpression$6$subexpression$1", "symbols": ["space", "constraintMap"]},
    {"name": "mapPairConstructor$subexpression$6", "symbols": ["mapPairConstructor$subexpression$6$subexpression$1"]},
    {"name": "mapPairConstructor$subexpression$6", "symbols": ["space"]},
    {"name": "mapPairConstructor", "symbols": ["key", "mapPairConstructor$subexpression$6", "statement", "mapTerminator"], "postprocess":  ([key, context, statement]) => {
        	console.log('pair', [key, statement])
        	return [key, statement]
        } },
    {"name": "mapPairConstructor$subexpression$7", "symbols": ["sol"]},
    {"name": "mapPairConstructor$subexpression$7", "symbols": ["space"]},
    {"name": "mapPairConstructor$ebnf$1$subexpression$1", "symbols": ["constraintMap"]},
    {"name": "mapPairConstructor$ebnf$1", "symbols": ["mapPairConstructor$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "mapPairConstructor$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "mapPairConstructor", "symbols": ["mapPairConstructor$subexpression$7", "mapPairConstructor$ebnf$1", "statement", "mapTerminator"], "postprocess":  ([prefix, constraintMap, statement]) => {
        	return [statement, true]
        }},
    {"name": "mapPairConstructor", "symbols": ["sol", "eol"], "postprocess": () => null},
    {"name": "mapPairConstructor", "symbols": ["sol", "comment"], "postprocess": () => null},
    {"name": "mapPairConstructor", "symbols": ["literal", "pushScope", "scope"], "postprocess": expectedScopeOperator},
    {"name": "mapTerminator$subexpression$1", "symbols": [{"literal":" "}]},
    {"name": "mapTerminator$subexpression$1", "symbols": [{"literal":","}]},
    {"name": "mapTerminator$subexpression$1", "symbols": ["endLine"]},
    {"name": "mapTerminator", "symbols": ["mapTerminator$subexpression$1"], "postprocess": id},
    {"name": "listTerminator$subexpression$1", "symbols": [{"literal":","}]},
    {"name": "listTerminator$subexpression$1", "symbols": ["endLine"]},
    {"name": "listTerminator", "symbols": ["listTerminator$subexpression$1"], "postprocess": id},
    {"name": "list", "symbols": ["list", "listConstructor"], "postprocess":  ([array, item]) => {
        	if (item){
        		return [...array, item];
        	}
        	return array;
        } },
    {"name": "list", "symbols": ["listConstructor"], "postprocess":  ([item]) => {
        	return [ item ];
        } },
    {"name": "listConstructor", "symbols": ["key", "pushTypedScope", "scope", "popScope"], "postprocess":  ([key, context, scope]) => {
        	  return scope		
        } },
    {"name": "listConstructor$subexpression$1$subexpression$1", "symbols": ["space", "constraintMap"]},
    {"name": "listConstructor$subexpression$1", "symbols": ["listConstructor$subexpression$1$subexpression$1"]},
    {"name": "listConstructor$subexpression$1", "symbols": ["space"]},
    {"name": "listConstructor", "symbols": ["key", "listConstructor$subexpression$1", {"literal":"{"}, "scope", {"literal":"}"}, "endLine"], "postprocess":  ([key, context, bracket, scope]) => {
        	return scope
        } },
    {"name": "listConstructor$subexpression$2$subexpression$1", "symbols": ["space", "constraintMap"]},
    {"name": "listConstructor$subexpression$2", "symbols": ["listConstructor$subexpression$2$subexpression$1"]},
    {"name": "listConstructor$subexpression$2", "symbols": ["space"]},
    {"name": "listConstructor", "symbols": ["key", "listConstructor$subexpression$2", "statement", "listTerminator"], "postprocess":  ([key, context, statement]) => {
        	return statement
        } },
    {"name": "listConstructor$subexpression$3", "symbols": ["sol"]},
    {"name": "listConstructor$subexpression$3", "symbols": ["space"]},
    {"name": "listConstructor$ebnf$1$subexpression$1", "symbols": ["constraintMap"]},
    {"name": "listConstructor$ebnf$1", "symbols": ["listConstructor$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "listConstructor$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "listConstructor", "symbols": ["listConstructor$subexpression$3", "listConstructor$ebnf$1", "statement", "listTerminator"], "postprocess":  ([prefix, constraintMap, statement]) => {
        	return statement
        }},
    {"name": "listConstructor", "symbols": ["sol", "eol"], "postprocess": () => null},
    {"name": "listConstructor", "symbols": ["sol", "comment"], "postprocess": () => null},
    {"name": "multilineString$ebnf$1", "symbols": []},
    {"name": "multilineString$ebnf$1", "symbols": ["multilineString$ebnf$1", "stringLine"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "multilineString", "symbols": ["stringLine", "multilineString$ebnf$1"], "postprocess":  ([head, tail]) => {
        	const [startIndent, mls] = head;
        	if (tail.length){
        		const res = tail.map(([indent, line]) => {
        				let margin = '';
        				if (indent > startIndent){
        					for (let i = 0; i < indent - startIndent; i++){
        						margin = margin + ' ';
        					}
        				}
        				if (line){
        					return margin + line;
        				}
        				return margin;
        		});
        		return [mls, ...res].join('\n');
        	}
        	return mls;
        } },
    {"name": "stringLine", "symbols": ["indent", "multilineString", "dedent"], "postprocess":  ([indent, mls]) => {
        	return [indent.indent, mls];
        } },
    {"name": "stringLine$ebnf$1", "symbols": ["_escapedString"], "postprocess": id},
    {"name": "stringLine$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "stringLine", "symbols": ["sol", "stringLine$ebnf$1", "eol"], "postprocess":  ([sol, string]) => {
        	return [sol.indent, string];
        } },
    {"name": "pushTypedScope", "symbols": ["space", "constraintMap", "indent"], "postprocess": ([space, constraintMap]) => constraintMap},
    {"name": "pushTypedScope", "symbols": ["pushScope"], "postprocess": id},
    {"name": "constraintMap", "symbols": ["constraintMap", "constraint"], "postprocess":  ([map, nextMatch]) => {
        	if (nextMatch) {
        		addPairToMap(nextMatch, map);
        	}
        	return map;
        } },
    {"name": "constraintMap", "symbols": ["constraint"], "postprocess":  ([initialMatch]) => {
        	const map = new Map();
        	if (initialMatch) {
        		addPairToMap(initialMatch, map);
        	}
        	return map;
        } },
    {"name": "constraint$subexpression$1", "symbols": ["space"]},
    {"name": "constraint$subexpression$1", "symbols": ["endLine"]},
    {"name": "constraint", "symbols": [{"literal":"@"}, {"literal":"{"}, "nestedScope", "sol", {"literal":"}"}, "constraint$subexpression$1"], "postprocess": ([directive, bracket, scope]) => scope},
    {"name": "constraint$subexpression$2", "symbols": ["space"]},
    {"name": "constraint$subexpression$2", "symbols": ["endLine"]},
    {"name": "constraint", "symbols": [{"literal":"@"}, "literal", {"literal":"{"}, "scope", {"literal":"}"}, "constraint$subexpression$2"], "postprocess": ([directive, literal, bracket, scope]) => [literal, scope]},
    {"name": "constraint$subexpression$3", "symbols": ["space"]},
    {"name": "constraint$subexpression$3", "symbols": ["endLine"]},
    {"name": "constraint", "symbols": [{"literal":"@"}, "literal", "constraint$subexpression$3"], "postprocess":  ([directive, property]) => {
        	return [property, true]
        }},
    {"name": "key$subexpression$1", "symbols": ["sol"]},
    {"name": "key$subexpression$1", "symbols": ["space"]},
    {"name": "key", "symbols": ["key$subexpression$1", "keyExpression", {"literal":":"}], "postprocess": ([pre, key]) => key},
    {"name": "keyExpression$subexpression$1", "symbols": [{"literal":"="}]},
    {"name": "keyExpression$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "keyExpression$subexpression$1", "symbols": [{"literal":"|"}]},
    {"name": "keyExpression$subexpression$1", "symbols": [{"literal":"&"}]},
    {"name": "keyExpression$subexpression$1", "symbols": [{"literal":"^"}]},
    {"name": "keyExpression$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "keyExpression", "symbols": ["keyExpression$subexpression$1", "space", "statement"], "postprocess": reduce},
    {"name": "keyExpression", "symbols": ["concat"], "postprocess": id},
    {"name": "statement", "symbols": ["concat"], "postprocess": id},
    {"name": "concat", "symbols": ["concat", "space", "boolean"], "postprocess": reduce},
    {"name": "concat", "symbols": ["boolean"], "postprocess": id},
    {"name": "boolean$subexpression$1", "symbols": [{"literal":"n"}]},
    {"name": "boolean$subexpression$1", "symbols": [{"literal":"|"}]},
    {"name": "boolean", "symbols": ["boolean", "space", "boolean$subexpression$1", "space", "add"], "postprocess": reduce},
    {"name": "boolean", "symbols": ["add"], "postprocess": id},
    {"name": "add$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "add$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "add", "symbols": ["add", "space", "add$subexpression$1", "space", "multiply"], "postprocess": reduce},
    {"name": "add", "symbols": ["multiply"], "postprocess": id},
    {"name": "multiply$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "multiply$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "multiply", "symbols": ["multiply", "space", "multiply$subexpression$1", "space", "unaryPrefix"], "postprocess": reduce},
    {"name": "multiply", "symbols": ["unaryPrefix"], "postprocess": id},
    {"name": "unaryPrefix", "symbols": [{"literal":"+"}, "group"], "postprocess": reduce},
    {"name": "unaryPrefix", "symbols": [{"literal":"-"}, "group"], "postprocess": reduce},
    {"name": "unaryPrefix", "symbols": [{"literal":"!"}, "group"], "postprocess": reduce},
    {"name": "unaryPrefix", "symbols": ["group"], "postprocess": id},
    {"name": "group", "symbols": [{"literal":"("}, "concat", {"literal":")"}], "postprocess": reduce},
    {"name": "group", "symbols": [{"literal":"$"}, {"literal":"{"}, "concat", {"literal":"}"}], "postprocess": reduce},
    {"name": "group", "symbols": ["literal"], "postprocess": id}
];

export var ParserStart: string = "start";
