const tokenizeCharacter = (type, value, input, current) => (value === input[current]) ? [1, { type, value }] : [0, null]

const tokenizeParenOpen = (input, current) => tokenizeCharacter('paren', '(', input, current)
const tokenizeParenClose = (input, current) => tokenizeCharacter('paren', ')', input, current)

const tokenizePattern = (type, pattern, input, current) => {
    let char = input[current]
    let consumedChars = 0
    if (pattern.test(char)) {
        let value = ''
        while (char && pattern.test(char)) {
            value += char
            consumedChars++
            char = input[current + consumedChars]
        }
        return [consumedChars, { type, value }]
    }
    return [0, null]
}

const tokenizeNumber = (input, current) => tokenizePattern('number', /[0-9]/, input, current)
const tokenizeName = (input, current) => tokenizePattern('name', /[a-z]/i, input, current)

const tokenizeString = (input, current) => {
    if (input[current] === '"') {
        let value = ''
        let consumedChars = 0
        consumedChars++
        char = input[current + consumedChars]
        while (char !== '"') {
            if (char === undefined) {
                throw new TypeError('unterminated string ')
            }
            value += char
            consumedChars++
            char = input[current + consumedChars]
        }
        return [consumedChars + 1, { type: 'string', value }]
    }
    return [0, null]
}

const skipWhiteSpace = (input, current) => (/\s/.test(input[current])) ? [1, null] : [0, null]

const tokenizers = [
    skipWhiteSpace, 
    tokenizeParenOpen, 
    tokenizeParenClose, 
    tokenizeString, 
    tokenizeName, 
    tokenizeNumber
]

// ====================
// the tokenizer itself
// ====================
const tokenizer = (input) => {
    let current = 0
    let tokens = []
    while (current < input.length) {
        let tokenized = false
        tokenizers.forEach(tokenizer_fn => {
            if (tokenized) return;
            let [consumedChars, token] = tokenizer_fn(input, current)
            if (consumedChars !== 0) {
                tokenized = true
                current += consumedChars
            }
            if (token) {
                tokens.push(token)
            }
        })
        if (!tokenized) {
            throw new TypeError('I dont know what this character is: ' + char)
        }
    }
    return tokens
}

module.exports = tokenizer


// tester code
if (process.argv.includes('--test')) {
    console.log('test paren open', tokenizeParenOpen('(', 0))
    console.log('test paren close', tokenizeParenClose(')', 0))

    console.log('test number', tokenizeNumber('123aad', 0))
    console.log('test name', tokenizeName('hello world', 0))

    console.log('test string', tokenizeString('"example text" trailing', 0))

    console.log('----------------------------')
    console.log('tokenizer test', tokenizer('(add 2 3)'))
    console.log('nested expression', tokenizer('(add 2 (subtract "314" 2))'))
}