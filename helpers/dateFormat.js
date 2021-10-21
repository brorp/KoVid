function formatDate(value){
    return new Date().getFullYear() - Number(value.slice(0,4)) + " years old"
}

module.exports = formatDate;