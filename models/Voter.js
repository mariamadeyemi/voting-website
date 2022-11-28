const Model = require("./Model");
const connection = require('./connection');


class Voter extends Model {
    async findOne(){
        let sql = `SELECT * FROM voters WHERE email_address = ?`
        let [rows] = await connection.execute(sql, [this.email]);
        if(rows.length){
            let row = rows[0];
            return new this.constructor(row)
        }
        return null;

}
}

module.exports = Voter