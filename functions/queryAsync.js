  const queryAsync = (sql)=>{
    return new Promise((resolve, reject) => {
      mysql.query(sql, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }
  module.exports = queryAsync