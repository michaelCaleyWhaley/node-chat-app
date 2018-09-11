
let generateMessage = (from, text) => {
    return {
        from: from,
        text: text.text,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage};