const tokenizer = require('./tokenizer')
const parser = require('./parser')
const emitter = require('./emitter')

const compiler = input => {
    let tokens = tokenizer(input)
    let ast = parser(tokens)
    let output = emitter(ast)

    return output
}

module.exports = compiler

//if (process.argv.includes('--test')) {
    let program = "(add 1 2 (mult 3 4))"
    console.log('compile:', program)
    console.log('result:', compiler(program))
//}