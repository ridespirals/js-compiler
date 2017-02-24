const chai = require('chai')
const expect = chai.expect

describe('emitter', () => {

    let emitter = null

    beforeEach(() => {
        emitter = require('../modules/emitter')
    })

    it('should exist', () => {
        expect(emitter).to.be.defined
    })

    it('should emit numbers', () => {
        let result = emitter({ type: 'NumberLiteral', value: '2' })
        expect(result).to.equal('2')
        result = emitter({ type: 'NumberLiteral', value: '535643' })
        expect(result).to.equal('535643')
    })

    it('should emit strings', () => {
        let result = emitter({ type: 'StringLiteral', value: 'some text' })
        expect(result).to.equal(`"some text"`)
    })

    it('should emit call expressions', () => {
        let result = emitter({ type: 'CallExpression', name: 'map', params: [] })
        expect(result).to.equal('map()')

        result = emitter({
            type: 'CallExpression',
            name: 'map',
            params: [
                { type: 'NumberLiteral', value: '5' },
                { type: 'StringLiteral', value: 'quux' }
            ]
        })
        expect(result).to.equal(`map(5, "quux")`)
    })

    it('should emit a program from AST', () => {
        let ast = {
          "type": "Program",
          "body": [
            {
              "type": "CallExpression",
              "name": "print",
              "params": [
                {
                  "type": "StringLiteral",
                  "value": "Hello"
                },
                {
                  "type": "NumberLiteral",
                  "value": "2"
                }
              ]
            },
            {
              "type": "CallExpression",
              "name": "add",
              "params": [
                {
                  "type": "NumberLiteral",
                  "value": "2"
                },
                {
                  "type": "CallExpression",
                  "name": "subtract",
                  "params": [
                    {
                      "type": "NumberLiteral",
                      "value": "4"
                    },
                    {
                      "type": "NumberLiteral",
                      "value": "2"
                    }
                  ]
                }
              ]
            }
          ]
        }
        let program = emitter(ast)
        let expected = [`print("Hello", 2);`, `add(2, subtract(4, 2));`].join('\n')
        expect(program).to.equal(expected)
    })
})
