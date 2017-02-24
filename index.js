const compiler = require('./modules/compiler')

let programs = [
    `(add 1 2 (mult 10 4) 15)`,
    `(store (add 5 6) "test")(print (get "test"))`
]
programs.forEach(program => {
    compileAndPrint(program)
})

function compileAndPrint(program) {
    const compiled = compiler(program)
    console.log(`\nCompile: "${program}"\n=====\n${compiled}`)
}
