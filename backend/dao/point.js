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
            this.con.query(`SELECT * FROM pointsofinterest WHERE region LIKE ?`, [region],
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
            this.con.query(`UPDATE pointsofinterest 
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



    // findStudentById(id) {
    //     return new Promise ( (resolve, reject) => {
    //         this.con.query(`SELECT * FROM ${this.table} WHERE ID=?`, [id],
    //             (err, results, fields) => {
    //                 if(err) {
    //                     reject(err);
    //                 } else if (results.length == 0) {
    //                     // resolve with null if no results - this is not considered an error, so we do not reject
    //                     resolve(null); 
    //                 } else {
    //                     // only one student will be found but "results" will still be an array with one member. 
    //                     // To simplify code which makes use of the DAO, extract the one and only row from the array 
    //                     // and resolve with that.
    //                     resolve(results[0]);
    //                 }
    //             });
    //     });
    // }
                            

   
    // findStudentsByCourse(course) {
    //     return new Promise ( (resolve, reject) => {
    //         this.con.query(`SELECT * FROM ${this.table} WHERE course=?`, [course],
    //             (err, results, fields) => {
    //                 if(err) {
    //                     reject(err);
    //                 } else {
    //                     resolve(results);
    //                 }
    //             });
    //     });
    // }


    // addStudent(name, course) {
    //     return new Promise ( (resolve, reject) => {
    //         this.con.query(`INSERT INTO ${this.table} (name,course) VALUES (?,?)`, [name, course],
    //             (err, results, fields) => {
    //                 if(err) {
    //                     reject(err);
    //                 } else {
    //                     resolve(results.insertId); // resolve with the record's allocated ID
    //                 }
    //             });
    //     });
    // }


    // updateStudent(id, name, course) {
    // }


    // deleteStudent(id) {
    // }
}

module.exports = PointDao;