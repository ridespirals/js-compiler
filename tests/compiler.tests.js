const chai = require('chai')
const expect = chai.expect

describe('compiler', () => {

    let compiler = null

    beforeEach(() => {
        compiler = require('../compiler')
    })

    it('should exist', () => {
        expect(compiler).to.be.defined
    })

    it('should emit code for a simple program', () => {
        let program = '(add 2 5)'
        let compiled = compiler(program)
        expect(compiled).to.equal('add(2, 5);')
    })

    it('should emit code for a complex program', () => {
        let program = '(add 1 2 (mult 3 4))'
        let compiled = compiler(program)
        expect(compiled).to.equal('add(1, 2, mult(3, 4));')
    })

})