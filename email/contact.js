const keys = require('../keys')
module.exports = function(email,text){
    return {
        to:email,
        from:keys.EMAIL_FROM,
        subject:'Вам поступил вопрос',
        html:`
        <h1>Вам поступил вопрос</h1>
        <p>${text}</p>
        <hr />`
    }
}