const Model = require("./Model");
const connection = require('./connection');


class Vote extends Model {


    static async countVotes(id){
        let result = []
    let sql = `SELECT COUNT(id) AS 'count' FROM votes WHERE vote = ?`

    let [rows] = await connection.execute(sql, [id]);
       for(const row of rows){
           result.push(new this(row)) 
       }
       return result
}

async totalVotes(){
let sql = `SELECT COUNT(*) AS 'count' FROM votes`

let [rows] = await connection.execute(sql);
if(rows.length){
    let row = rows[0].count;
    return new this.constructor(row)
}
return null;
}


}

module.exports = Vote