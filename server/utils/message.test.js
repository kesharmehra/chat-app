var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from='from';
        var text='text';
        var message = generateMessage(from,text);
        expect(message.createdAt).toBeA('number');
        expect(message.from).toBe('from');
        expect(message.text).toBe('text');
    })
})