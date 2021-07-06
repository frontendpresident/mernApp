if(process.env.NODE_ENV === 'production') {
    module.exports = require('./keqys_prod')
}
else {
    module.exports = require('./keys_dev')
}