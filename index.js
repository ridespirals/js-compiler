const compiler = require('./modules/compiler')
const chalk = require('chalk')
const util = require('util')

const programs = [
    `(add 1 2 (mult 10 4) 15)`,
    `(store (add 5 6) "test")(print (get "test"))`
]

// print out the original code and compiled code
programs.forEach(program => compileAndPrint(program))

// compile programs step-by-step, saving each step along the way
const work = programs.map(program => {
    const steps = []
    const tokens = compiler.tokenize(program)
    const ast = compiler.parse(tokens)
    const output = compiler.emit(ast)
    return {
        input: program,
        tokens,
        ast,
        output
    }
})
console.log('----------\nFull Compilations:')
work.forEach(program => {
    console.log(`Compilation steps for ${chalk.green(program.input)}`)
    console.log(util.inspect(program, { showHidden: false, depth: null }))
})

function compileAndPrint(program) {
    const compiled = compiler.compile(program)
    console.log(`\nCompile: ${chalk.bold.magenta(program)}\n${chalk.bold.blue(compiled)}`)
}
