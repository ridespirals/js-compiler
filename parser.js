const parseNumber = (tokens, current) => 
    [current + 1, { type: 'NumberLiteral', value: tokens[current].value }]

const parseString = (tokens, current) =>
    [current + 1, { type: 'StringLiteral', value: tokens[current].value }]

const parseExpression = (tokens, current) => {
    let token = tokens[++current]
    let node = {
        type: 'CallExpression',
        name: token.value,
        params: []
    }
    token = tokens[++current]
    while (!(token.type === 'paren' && token.value === ')')) {
        let [current, param] = parseToken(tokens, current)
        node.params.push(param)
        token = tokens[current]
    }
    current++
    return [current, node]
}

const parseToken = (tokens, current) => {
    let token = tokens[current]
    if (token.type === 'number') return parseNumber(tokens, current)
    if (token.type === 'string') return parseString(tokens, current)
    if (token.type === 'paren' && token.value === '(') return parseExpression(tokens, current)
    throw new TypeError(token.type)
}

const parseProgram = (tokens) => {
    let current = 0
    let ast = {
        type: 'Program',
        body: []
    }
    let node = null
    while (current < tokens.length) {
        let [current, node] = parseToken(tokens, current)
        ast.body.push(node)
    }
    return ast
}

export default parseProgram