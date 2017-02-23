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
        [current, param] = parseToken(tokens, current)
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
        [current, node] = parseToken(tokens, current)
        ast.body.push(node)
    }
    return ast
}

module.exports = parseProgram


if (process.argv.includes('--test')) {
    let parser = parseProgram
    console.log('test parseNumber', parseNumber([{type:'number',value:'123'}], 0))
    console.log('test parseString', parseString([{type:'string', value:'example string'}], 0))

    // test parse expression
    const tokens = [
        { type: 'paren', value: '(' },
        { type: 'name', value: 'add' },
        { type: 'number', value: '2' },
        { type: 'number', value: '3' },
        { type: 'paren', value: ')' },
    ]
    var result = parseExpression(tokens, 0)
    console.log('test parse expression', result)
    console.log('--', result[1].params)

    // test nested expression
    const nestedTokens =  [
      { type: 'paren',  value: '('        },
      { type: 'name',   value: 'add'      },
      { type: 'number', value: '2'        },
      { type: 'paren',  value: '('        },
      { type: 'name',   value: 'subtract' },
      { type: 'number', value: '4'        },
      { type: 'number', value: '2'        },
      { type: 'paren',  value: ')'        }, 
      { type: 'paren',  value: ')'        }, 
    ]
    var nestedResult = parseExpression(nestedTokens, 0)
    console.log('test nested expr', nestedResult)

    console.log('parse program', parser(tokens))
}