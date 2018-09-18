
const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message.js');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let res = generateMessage('Mike', 'Ma message');
        expect(res.from).toBe('Mike');
        expect(res.text).toBe('Ma message');
        // Both these lines do the same thing
        // expect(!isNaN(res.createdAt)).toBeTruthy();
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let res = generateLocationMessage('Mike', 1, 1);
        expect(res.from).toBe('Mike');
        expect(res.url).toBe('https://www.google.com/maps?q=1,1');
        expect(typeof res.createdAt).toBe('number');
    });
});