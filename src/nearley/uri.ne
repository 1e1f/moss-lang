
# URL = scheme:[//authority]path[?query][#fragment]
uri
	-> url {% id %}
	| authority {% id %}

url
	-> urlDomainScheme authority {% reduce %}
	| urlScheme uriPathComponent {% reduce %}
	| urlScheme urlPath {% reduce %}

urlDomainScheme
	-> urlScheme "/" "/" {% reduce %}

urlSchemes
	-> urlSchemes urlScheme {% reduce %}
	| urlScheme {% id %}

urlScheme
	-> domainComponent ":" {% reduce %}

authority
	-> urlCredentials "@" _authority {% reduce %}
	| _authority {% reduce %}

_authority
	-> uriDomainComponent uriPathComponent:? uriQueries:? uriFragment:? {% reduce %}

uriQueries 
	-> uriQueries uriQuery {% reduce %}
	| uriQuery {% id %}

uriPathComponent 
	-> "/" urlPath {% reduce %}
	| "/" {% ([tok]) => tok.value %}

urlCredentials
	-> urlCredentials ":" password {% reduce %}
	| email {% id %}
	| subdomain {% id %}

urlPath
	-> urlPath "/" urlPathName {% reduce %}
	| urlPath "/" {% reduce %}
	| urlPathName {% id %}

urlPathName ->
	urlPathName "." urlPathWord {% reduce %}
	| urlPathWord {% id %}
	
urlPathWord
	-> urlPathWord urlPathChar {% reduce %}
	| urlPathChar {% id %}
	
urlPathChar
	-> [^ ^/^.^?^;] {% ([tok]) => tok.value %}

filePath ->
	filePath "/" fileName {% reduce %}
	| fileName {% id %}

fileName ->
	fileName "." fileWord {% reduce %}
	| fileWord {% id %}

fileWord
	-> fileWord fileChar {% reduce %}
	| fileChar {% id %}

fileChar
	-> [^ ^/^.] {% ([tok]) => tok.value %}

password
	-> urlSafePlusEncoded {% reduce %}

email
	-> subdomain "@" domain {% reduce %}

uriDomainComponent
	-> uriDomainComponent uriPortComponent {% reduce %}
	| domain {% reduce %}
	| "[" ipv6 "]" {% reduce %}
	| ipv4 {% id %}

matchSeven[x] 
	-> $x $x $x $x $x $x $x {% reduce %}

matchOneToSeven[x] 
	-> $x $x $x $x $x $x $x {% reduce %}
	| $x $x $x $x $x $x {% reduce %}
	| $x $x $x $x $x {% reduce %}
	| $x $x $x $x {% reduce %}
	| $x $x $x $x {% reduce %}
	| $x $x $x {% reduce %}
	| $x $x {% reduce %}
	| $x {% reduce %}
	
ipv6
	-> matchSeven[ipv6Group] ipv6Number {% reduce %}
	| matchOneToSeven[ipv6Group] ":" ipv6Number {% reduce %}

matchOneToFour[x]
	-> $x $x $x $x {% reduce %}
	| $x $x $x {% reduce %}
	| $x $x {% reduce %}
	| $x {% reduce %}

ipv6Group
	-> ipv6Number ":" {% reduce %}

ipv6Number
	-> matchOneToFour[hexDigit]

ipv4
	-> ipv4Group "." ipv4Group "." ipv4Group "." ipv4Group

ipv4Group
	-> d2 d5 d0_5 {% reduce %}
	| d2 d0_4 d0_9 {% reduce %}
	| d1 d0_9 d0_9 {% reduce %}
	| d0_9 d0_9 {% reduce %}
	| d0_9 {% id %}

d1 -> "1" {% ([tok]) => tok %}
d2 -> "2" {% ([tok]) => tok %}
d5 -> "5" {% ([tok]) => tok %}
d0_4 -> [0-4] {% ([tok]) => tok %}
d0_5 -> [0-5] {% ([tok]) => tok %}
d0_9 -> [0-9] {% ([tok]) => tok %}

domain
	-> subdomain "." domainComponent {% reduce %}

uriPortComponent
	-> ":" number {% reduce %}

subdomain ->
	domainComponent "." subdomain {% reduce %}
	| domainComponent {% id %}

# ! $ & ' ( ) * + , ; = 
# are permitted by generic URI syntax to be used unencoded
# in the user information, host, and path as delimiters.

uriQuery
  -> "?" queryList {% reduce %}

queryList
  -> queryList "&" queryFragment {% reduce %}
  | queryFragment {% id %}

queryFragment
  -> queryFragment "=" urlSafePlusEncoded {% reduce %}
  | urlSafePlusEncoded {% id %}

uriFragment
  -> "#" queryList {% reduce %}

domainComponent
	-> [a-zA-Z] [a-zA-Z0-9\-]:*
		{% optionalTail %}

urlSafePlusEncoded
	-> urlSafePlusEncoded urlSafePlusEncodedChars {% reduce %}
	| urlSafePlusEncodedChars {% id %}

urlSafePlusEncodedChars
	-> "%" hexDigit hexDigit {% reduce %}
	| "&" "a" "m" "p" ";" {% reduce %}
	| urlSafeChar {% id %}