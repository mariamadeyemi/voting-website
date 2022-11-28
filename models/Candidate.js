const User = require("./User");
const connection = require('./connection');


class Candidate extends User {

   

   static async findCandidate(id){
        let sql = `SELECT * FROM candidates WHERE election_id = ? AND party_id = ?`
        let [rows] = await connection.execute(sql, [1, id]);
        if(rows.length){
            let row = rows[0];
            return new this(row)
        }
        return null;
 }

 static async findCandidates(){
    let result = [];
    let sql = `SELECT * FROM candidates WHERE election_id = ?`
    let [rows] = await connection.execute(sql, [1]);
       for(const row of rows){
           result.push(new this(row)) 
       }
       return result
}

}

module.exports = Candidate