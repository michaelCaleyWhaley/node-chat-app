
const expect = require('expect');
const { generateMessage } = require('./message.js');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let res = generateMessage('Mike', 'Ma message');
        expect(res.from).toBe('Mike');
        expect(res.text).toBe('Ma message');
        
    });
});