import tokenizer from './tokenizer'
import parser from './parser'
import emitter from './emitter'

const compiler = input => {
    let tokens = tokenizer(input)
    let ast = parser(tokens)
    let output = emitter(ast)

    return output
}

export default compiler