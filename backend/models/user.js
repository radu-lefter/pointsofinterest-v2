class UserDao {

    constructor(con, table) {
        this.con = con;
        this.table = table;
    }

    login(username, password) {
        return new Promise ( (resolve, reject) => {
            this.con.query(`SELECT * FROM ${this.table} WHERE username = ? AND password = ?`,
            [username, password],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else if (results.length == 0) {
                        
                        resolve(null); 
                    } else {
                       //console.log(results);
                        resolve(results);
                    }
                });
        });
    }

    findById(id) {
        return new Promise ( (resolve, reject) => {
            this.con.query(`SELECT * FROM ${this.table} WHERE id = ?`,
            [id],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else if (results.length == 0) {
                        
                        resolve(null); 
                    } else {
                       console.log(results);
                        resolve(results);
                    }
                });
        });
    }

    
}

module.exports = UserDao;