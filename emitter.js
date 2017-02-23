const emitNumber = node => node.value
const emitString = node => `"${node.value}"`

const emitProgram = node => node.body.map(exp => emitter(exp) + ';').join('\n')
const emitExpression = node => `${node.name}(${node.params.map(emitter).join(', ')})`

const emitter = node => {
    switch (node.type) {
        case 'Program': return emitProgram(node)
        case 'CallExpression': return emitExpression(node)
        case 'NumberLiteral': return emitNumber(node)
        case 'StringLiteral': return emitString(node)
        default: throw new TypeError(node.type)
    }
}

module.exports = emitter

if (process.argv.includes('--test')) {
    console.log('emit number', emitNumber({ type: 'number', value: '2' }))
    console.log('emit string', emitString({ type: 'string', value: 'some text' }))
    
    console.log('test emitter', emitter({
        'type': 'CallExpression',
        'name': 'subtract',
        'params': [
            { type: 'NumberLiteral', value: '4' },
            { type: 'NumberLiteral', value: '2' }
        ]
    }))

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
    console.log('emit ast:', emitter(ast))
}