var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from='from';
        var text='text';
        var message = generateMessage(from,text);
        expect(message.createdAt).toBeA('number');
        expect(message.from).toBe('from');
        expect(message.text).toBe('text');
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from='from';
        var lat = 12345;
        var lng = 45678;
        var url = `https://www.google.com/maps?q=${lat},${lng}`

        var location = generateLocationMessage(from,lat,lng);
        expect(location.from).toBe('from');
        expect(location.url).toBe(url);
        expect(location.createdAt).toBeA('number');
    })
})