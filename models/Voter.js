const User = require("./User");
const connection = require('./connection');


class Voter extends User {
    async findOne(){
        let sql = `SELECT * FROM voters WHERE email_address = ?`
        let [rows] = await connection.execute(sql, [this.email]);
        if(rows.length){
            let row = rows[0];
            return new this.constructor(row)
        }
        return null;

}

async findToken(){
    let sql = `SELECT * FROM voters WHERE token = ?`
    let [rows] = await connection.execute(sql, [this.token]);
    if(rows.length){
        let row = rows[0];
        return new this.constructor(row)
    }
    return null;

}
}

module.exports = Voter