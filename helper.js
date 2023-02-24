module.exports = {
    limit: function (ar, max) {
        let db = ar.slice(0, max);
        return db;
    }
}