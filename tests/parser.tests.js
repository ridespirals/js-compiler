const chai = require('chai')
const expect = chai.expect

describe('parser', () => {

    let parser = null

    beforeEach(() => {
        parser = require('../parser')
    })

    it('should exist', () => {
        expect(parser).to.be.defined
    })

    it('should parse a simple program', () => {
        const tokens = [
            { type: 'paren', value: '(' },
            { type: 'name', value: 'add' },
            { type: 'number', value: '2' },
            { type: 'number', value: '3' },
            { type: 'paren', value: ')' },
        ]
        const result = parser(tokens)
        expect(result).to.deep.equal({
            type: 'Program',
            body: [{ 
                type: 'CallExpression', 
                name: 'add', 
                params: [
                    { type: 'NumberLiteral', value: '2' },
                    { type: 'NumberLiteral', value: '3' }
                ]
            }]
        })
    })

    it('should parse a nested program', () => {
        const tokens =  [
          { type: 'paren',  value: '(' },
          { type: 'name',   value: 'add' },
          { type: 'number', value: '2' },
          { type: 'paren',  value: '(' },
          { type: 'name',   value: 'subtract' },
          { type: 'number', value: '4' },
          { type: 'string', value: '314' },
          { type: 'paren',  value: ')' }, 
          { type: 'paren',  value: ')' }, 
        ]
        const result = parser(tokens)
        expect(result).to.deep.equal({
            type: 'Program',
            body: [{
                type: 'CallExpression',
                name: 'add',
                params: [
                    { type: 'NumberLiteral', value: '2' },
                    { 
                        type: 'CallExpression', 
                        name: 'subtract',
                        params: [
                            { type: 'NumberLiteral', value: '4' },
                            { type: 'StringLiteral', value: '314' }
                        ]
                    }
                ]
            }]
        })
    })
})