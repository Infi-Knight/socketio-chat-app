var expect = require('expect');
var {generateMessage} = require('./message');

// this test is synchronous so no need to use done
describe('# generateMessage', () => {
    it ('should generate a correct message object', () => {
        var from = 'Ravi';
        var text = 'How you doin?';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        // ES6
        expect(message).toInclude({from,text});
    });
});