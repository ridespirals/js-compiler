const chai = require('chai')
const expect = chai.expect

describe('compiler', () => {

    let compiler = null

    beforeEach(() => {
        compiler = require('../modules/compiler')
    })

    it('should exist', () => expect(compiler).to.be.defined)
    it('should have a tokenize function', () => expect(compiler.tokenize).to.be.a('function'))
    it('should have a parse function', () => expect(compiler.parse).to.be.a('function'))
    it('should have an emit function', () => expect(compiler.emit).to.be.a('function'))
    it('should have a compile function', () => expect(compiler.compile).to.be.a('function'))

    it('should emit code for a simple program', () => {
        let program = '(add 2 5)'
        let compiled = compiler.compile(program)
        expect(compiled).to.equal('add(2, 5);')
    })

    it('should emit code for a complex program', () => {
        let program = '(add 1 2 (mult 3 4))'
        let compiled = compiler.compile(program)
        expect(compiled).to.equal('add(1, 2, mult(3, 4));')
    })
})
