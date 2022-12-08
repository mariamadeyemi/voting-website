const Model = require("./Model");
const connection = require('./connection');


class Vote extends Model {


    static async countVotes(id){
        let result = []
    let sql = `SELECT COUNT(id) FROM votes WHERE vote = ?`

    let [rows] = await connection.execute(sql, [id]);
       for(const row of rows){
           result.push(new this(row)) 
       }
       return result
}


}

module.exports = Vote