const chai = require('chai')
const expect = chai.expect

describe('tokenizer', () => {

    let tokenizer = null

    beforeEach(() => {
        tokenizer = require('../tokenizer')
    })
    
    it('should exist', () => {
        expect(tokenizer).to.be.defined
    })
    
    it('should tokenize parenthesis', () => {
        const token = tokenizer('()')
        expect(token).to.deep.equal([
            { type: 'paren', value: '(' },
            { type: 'paren', value: ')' }
        ])
    })

    it('should tokenize a simple expression', () => {
        const tokens = tokenizer('(add 2 3)')
        expect(tokens).to.deep.equal([
            { type: 'paren', value: '(' },
            { type: 'name', value: 'add' },
            { type: 'number', value: '2' },
            { type: 'number', value: '3' },
            { type: 'paren', value: ')' },
        ])
    })

    it('should tokenize nested expressions', () => {
        const tokens = tokenizer('(add 2 (subtract "314" 2))')
        expect(tokens).to.deep.equal([
            { type: 'paren', value: '(' },
            { type: 'name', value: 'add' },
            { type: 'number', value: '2' },
            { type: 'paren', value: '(' },
            { type: 'name', value: 'subtract' },
            { type: 'string', value: '314' },
            { type: 'number', value: '2' },
            { type: 'paren', value: ')' },
            { type: 'paren', value: ')' },
        ])
    })
})