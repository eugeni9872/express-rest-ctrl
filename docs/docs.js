const PK_ROOT = './package/lib/*.js';
const {parseInputs} = require('doxdox');

parseInputs([PK_ROOT], {
    'parser': 'dox',
    'layout': 'markdown'
}).then((content) => {
    console.log(content)
});



