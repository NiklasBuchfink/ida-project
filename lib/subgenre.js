const data = require('./genresetnew.json')
const subdata = require('./genreset.json')
const topLevelGenre = (genre) => {
    if (data[genre] == 'done') {
        return genre
    } else if (!data[genre]) {
        return 'unclassified genre' // an unknown genre
    }
    return topLevelGenre(data[genre])
}
const subLevelGenre = (genre) => {
    if (subdata[genre] == 'done') {
        return genre
    } else if (!subdata[genre]) {
        return 'unclassified genre' // an unknown genre
    }
    return subLevelGenre(subdata[genre])
}
const allGenres = Object.keys(data).reduce((obj, g, i) => {
    obj[g] = i
    return obj
}, {})
const mostPopularGenre = (genres) => {
    return genres.reduce((a, b) => {
        return (allGenres[a] < allGenres[b]) ? a : b
    })
}
const leastPopularGenre = (genres) => {
    return genres.reduce((a, b) => {
        return (allGenres[a] >  allGenres[b]) ? a : b
    })
}
module.exports = {
    topLevelGenre,
    subLevelGenre,
    allGenres,
    leastPopularGenre,
    mostPopularGenre
}