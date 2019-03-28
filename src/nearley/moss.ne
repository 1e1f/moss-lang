@preprocessor typescript
@lexer lexer

@include "./uri.ne"
@include "./number.ne"
@include "./string.ne"
@include "./formatting.ne"

@{%
import { clone, mapToContext } from 'typed-json-transform';
import { lexer, any, indent, dedent, eol, sol, eof, sof, startRule, space } from './lexer';
import { expectedScopeOperator } from './post/errors';
import { 
	addPairToMap, addListToMap, pairToMap, listToMap, 
	kvcToPair, statementToPair,
	join, concat, operate, unaryOperate, singleWord } from './post/ast';
%}

start
	-> sof rootScope eof {% ([sof, scope]) => scope %}
	
rootScope
	-> map {% id %}

scope
	-> map {% id %}

map
	-> map mapPairConstructor {% addPairToMap %}
	| map mapList {% addListToMap %}
	| mapPairConstructor {% pairToMap %}
	| mapList {% listToMap %}

mapList 
	-> (sol "-<" endLine) list "\/-<" {% ([prefix, list]) => list %}
		
mapPairConstructor
	# nested explicitly declared list
	-> key inlineContext ("-<" pushScope) list "\/-<" popScope
  		{% ([key, context, mode, scope]) => {
			return kvcToPair(key, [scope[0], {...scope[1], ...mapToContext(context)}]]);
		} %}

	# nested map
	| key pushTypedScope scope popScope
  		{% ([key, context, scope]) => {
			  return [key, scope]
		} %}
	
	# explicit map pair, rhs is a map
	| key inlineContext "{" scope "}" endLine
  		{% ([key, c_, bracket, scope]) => {
				return [key, scope]
			} %}
			
	# default map pair, rhs is a statement
	| key inlineContext statement mapTerminator
  		{% ([key, c, s]) => kvcToPair(key, s, c) %}

	# default simple value
	| (sol | space) context:? statement mapTerminator
  		{% ([_, c, s]) => statementToPair(s, c) %}

	| sol eol {% () => null %}
	| sol comment {% () => null %}
	# error cases
	| literal pushScope scope
  		{% expectedScopeOperator %}

inlineContext
	-> space context {% ([_, d]) => {
		return d;
	} %}
	| space {% () => null %}

mapTerminator
	-> (" " | "," | endLine) {% id %}

listTerminator
	-> ("," | endLine) {% id %}


list
	-> list listConstructor
		{% ([array, item]) => {
			if (item){
				return [...array, item];
			}
			return array;
		} %}
	| listConstructor
		{% ([item]) => {
			return [ item ];
		} %}

listConstructor
	# nested constrained scope
	-> key pushTypedScope scope popScope
  		{% ([key, context, scope]) => {
			  return scope		
		} %}
		
	| key ((space context) | space) "{" scope "}" endLine
  		{% ([key, context, bracket, scope]) => {
				return scope
			} %}
			
	# default map pair, rhs is a statement
	| key ((space context) | space) statement listTerminator
  		{% ([key, context, statement]) => {
				return statement
			} %}
	
	# default simple value
	| (sol | space) (context):? statement listTerminator
  		{% ([prefix, c_, [r, r_]]) => {
			return [r, {...r_, ...c_}];
		}%}
		
	| sol eol {% () => null %}
	| sol comment {% () => null %}

multilineString
	-> stringLine stringLine:* {% ([head, tail]) => {
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
	} %}

stringLine
	-> indent multilineString dedent
		{% ([indent, mls]) => {
			return [indent.indent, mls];
		} %}
	| sol _escapedString:? eol
		{% ([sol, string]) => {
			return [sol.indent, string];
		} %}


pushTypedScope 
	-> space context indent 
		{% ([space, context]) => context %}
	| pushScope {% id %}


context
	-> context constraint
		{% addPairToMap %}
	| constraint
		{% pairToMap %}

constraint
	-> "\\" "{" nestedScope sol "}" (space | endLine)
		{% ([directive, bracket, scope]) => scope %}
	| "\\" literal "{" map "}" (space | endLine)
		{% ([directive, key, bracket, map]) => {
			return kvcToPair(key, map) 
		} %}
	| "\\" literal (space | endLine)
		{% ([directive, property]) => statementToPair(property) %}

# Map
key
	-> (sol | space) keyExpression ":" {% ([_, k]) => k %}

keyExpression
	-> ( "=" | "+" | "|" | "&" | "^" | "-" ) space statement {% join %}
	| concat {% id %}

# statement
statement
	-> concat {% id %}

# Operators

concat
	-> concat space boolean {% concat %}
	| boolean {% id %}

boolean
	-> boolean space ( "n" | "|" ) space add {% operate %}
	| add {% id %}

add
	-> add space ( "+"|"-" ) space multiply {% operate %}
	| multiply {% id %}

multiply
	-> multiply space ("*"|"/") space unaryPrefix {% operate %}
	| unaryPrefix {% id %}

unaryPrefix
	-> "+" group {% unaryOperate %}
	| "-" group {% unaryOperate %}
	| "!" group {% unaryOperate %}
	| group {% id %}

group
	-> "(" concat ")" {% ([_, g]) => g %}
	| literal {% id %}