function dateConverter(value){
    let timePublish = new Date(value)
    let timeNow = new Date()
    let hours = timeNow.getHours() - timePublish.getHours()
    if(hours >= 1){
        return `${hours} hours ago`
    }
    if(hours < 1){
        let minutes = timeNow.getMinutes() - timePublish.getMinutes()
        if(minutes < 0){
            return `${minutes + 60} minutes ago`
        } else {
            return `${minutes} minutes ago`
        }
        
    }
}

module.exports = dateConverter