class PointDao {

    constructor(con, table) {
        this.con = con;
        this.table = table;
    }

    findAllPoints() {
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

    findByRegion(region) {
        return new Promise ( (resolve, reject) => {
            this.con.query(`SELECT * FROM pointsofinterest LEFT JOIN poi_reviews ON pointsofinterest.ID = poi_reviews.poi_id WHERE pointsofinterest.region LIKE ? `, [region],
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

    recommend(id) {
        return new Promise ( (resolve, reject) => {
            this.con.query(`UPDATE ${this.table} 
            SET recommendations= recommendations+1 
            WHERE id=?`, [id],
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

    createPoint(req) {
        return new Promise ( (resolve, reject) => {
            this.con.query(`INSERT INTO ${this.table} 
            (name, type, country, region, lon, lat, description, recommendations) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [
              req.name, req.type,
              req.country, req.region,
              req.lon, req.lat,
              req.description, req.recommendations
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

module.exports = PointDao;