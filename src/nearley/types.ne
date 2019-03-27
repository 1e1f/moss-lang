# Formatting
nestedScope
	-> pushScope scope popScope {% ([push, scope]) => scope %}

pushScope
	-> (inlineComment | eol) indent {% id %}

popScope
	-> dedent {% id %}
	
endLine
	-> inlineComment {% id %}
	| eol {% id %}

inlineComment
	-> space comment {% id %}

comment
	-> "#" _escapedString:? %eol {% ([operator, comment]) => (comment) %}
	
# Numbers

number
	-> _number {% ([n]) => parseFloat(n) %}

_number
	-> _float "e" digit {% reduce %}
 	| _float {% id %}

_float
	-> digit "." digit {% reduce %}
	| digit {% id %}

digit
	-> digit [0-9] {% concat %}
	| [0-9] {% ([tok]) => tok %}

# Words

literal
	-> string {% id %}
	| singleWord {% id %}
	| uri {% id %}
	| number {% id %}

	
singleWord
	-> [a-zA-Z$_] [a-zA-Z0-9$_]:*
		{% optionalTail %}

word
	-> word wordSafeChar {% concat %}
	| wordStartChar {% id %}

wordSafeChar
	-> wordStartChar {% id %}
	| [0-9] {% ([tok]) => tok.value %}

wordStartChar
	-> [a-zA-Z$_] {% ([tok]) => tok.value %}

string
	-> "`" _escapedString "`" {% function(d) {return d[1]; } %}

_string
	-> null {% function() {return ""; } %}
	| _string _stringchar {% ([lhs, rhs]) => lhs + rhs %}

_stringchar
	-> [^\\"] {% id %}
	| "\\" [^] {% concat %}



hexDigit -> [0-9a-fA-F] {% id %}

urlSafe
	-> urlSafe urlSafeChar {% concat %}
	| urlSafeChar {% id %}

urlSafeChar -> [a-zA-Z0-9\-] {% ([tok]) => tok.value %}

_escapedString
	-> _escapedString escapedChar {% concat %}
	| escapedChar {% id %}

escapedChar
	-> %space {% ([tok]) => tok.value %}
	| %any {% ([tok]) => tok.value %}

# syntactic whitespace
sof -> %sof {% ([tok]) => tok.value %}
eof -> %eof {% ([tok]) => tok.value %}
sol -> %sol {% ([tok]) => tok %}
eol -> _ %eol {% ([ws, tok]) => tok %}
indent
	-> %indent {% ([tok]) => tok %}
dedent
	-> %dedent {% ([tok]) => tok %}
space -> %space {% ([tok]) => tok.value %}

# ignored whitespace or chars
_
	-> _ space {% ([e]) => {
			return e ? e + ' ': '';
		} %}
	| null {% () => '' %}