class ReviewDao {

    constructor(con, table) {
        this.con = con;
        this.table = table;
    }

    findAllReviews() {
        return new Promise ( (resolve, reject) => {
            this.con.query(`SELECT * FROM ${this.table}`,
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else if (results.length == 0) {
                        
                        resolve(null); 
                    } else {
                       
                        resolve(results);
                    }
                });
        });
    }

    findByPoint(region) {
        return new Promise ( (resolve, reject) => {
            this.con.query(`SELECT * FROM ${this.table} WHERE region LIKE ?`, [region],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else if (results.length == 0) {
                        
                        resolve(null); 
                    } else {
                       
                        resolve(results);
                    }
                });
        });
    }

    createReview(req) {
        return new Promise ( (resolve, reject) => {
            this.con.query(`INSERT INTO ${this.table} 
            (poi_id, review) 
            VALUES 
            (?, ?)`, 
            [
              req.poiid, req.review
            ],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else if (results.length == 0) {
                        
                        resolve(null); 
                    } else {
                       
                        resolve(results);
                    }
                });
        });
    }


    
}

module.exports = ReviewDao;