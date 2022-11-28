const pluralize = require('pluralize')
const connection = require('./connection');

class Model {
    constructor(obj = {}){
        this.setProp(obj);
   }

   setProp(obj){
    for (const prop in obj) {
        this[prop] = obj[prop]
    }
   }


   static get tablename(){
    let snake_case = this.name.replace(/.[A-Z]/g, (mch) => mch[0] + '_' + mch[1])
        return pluralize(snake_case.toLowerCase());
    //return (this.name.toLowerCase())
   }

  async save(){
        let columns = Object.keys(this);

       let sql = `INSERT INTO ${this.constructor.tablename} (${columns.join(',')}) VALUE(${'?'.repeat(columns.length).split('').join(', ')})`
       let [result] = await connection.execute(sql, Object.values(this))
       this.id = result.insertId
   }

   

   static async fetch(){
       let result = [];
       let sql = `SELECT * FROM ${this.tablename}`
       let [rows] = await connection.execute(sql);
       for(const row of rows){
           result.push(new this(row)) //this- the cuurent child class that is calling this function from the parent
       }
       return result
   }

   static async fetchById(id){
       let sql = `SELECT * FROM ${this.tablename} WHERE id = ?`
       let [rows] = await connection.execute(sql, [id]);
       if(rows.length){
           let row = rows[0];
           return new this(row)
       }
       return null;

   }

   async update(){
        let {id, ...objectwithoutid} = this;
        let columns = Object.keys(objectwithoutid);
       let sql = `UPDATE ${this.constructor.tablename} SET `;
       let i = 1;
       for (const column of columns) {
         sql += `${column} = ?${(i == columns.length)? '' : ','}`
         i++
       }
       sql += `WHERE id = ?`
       let [result] = await connection.execute(sql, [...Object.values(objectwithoutid), this.id])
       return result.affectedRows > 0
     
   }

   static async delete(id){
       let sql = `DELETE FROM ${this.tablename} WHERE id = ?`
       let [result] = await connection.execute(sql, [id]);

       return result.affectedRows > 0
   }

   toString(){
    return this.name || 'No string representation of ' + this.constructor.name.replace(/.[A-Z]/g, (mch) => mch[0] + ' ' + mch[1]).toLowerCase()
}

}


module.exports = Model