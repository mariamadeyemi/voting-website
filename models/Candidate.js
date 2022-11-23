const Model = require("./Model");

class Candidate extends Model {

    async getElectionId(){
        let result = [] 
        let sql = `SELECT id FROM elections WHERE name = ?`
        let [rows] = await connection.execute(sql, [this.name])
        for (const row of rows) {
            result.push(new this(row));
        }
        return result
    }

    async getPartyId(){
        let result = [] 
        let sql = `SELECT id FROM parties WHERE name = ?`
        let [rows] = await connection.execute(sql, [this.name])
        for (const row of rows) {
            result.push(new this(row));
        }
        return result
    }

}

module.exports = Candidate