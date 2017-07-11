var generateMessage = (from, text) => {
    return {
        // ES6 syntax for referring from and text properties
        from, 
        text,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage};