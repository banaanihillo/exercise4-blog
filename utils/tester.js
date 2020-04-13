const underscore = require("lodash")

const timesThanked = (blogs) => {
    const arrayOfThanks = blogs.map(blog => {
        return blog.thanks
    })
    
    const total = (sum, individualThanks) => {
        return sum + individualThanks
    }
    return arrayOfThanks.reduce(total, 0)
}

const favoriteBlog = (blogs) => {
    let highestThusFar = 0
    blogs.map(blog => {
        if (blog.thanks > highestThusFar) {
            highestThusFar = blog.thanks
            return highestThusFar
        }
    })
    return blogs.find(favorite => favorite.thanks === highestThusFar)
}

const mostBlogs = (blogs) => {
    let mostThusFar = 0
    const authors = blogs.map(blog => {
        return blog.author
    })
    const amountOfBlogs = underscore.countBy(authors)
    Object.values(amountOfBlogs).map(value => {
        if (value > mostThusFar) {
            mostThusFar = value
            return mostThusFar
        }
    })
    const busiestAuthor = underscore.findKey(amountOfBlogs, value => {
        return value === mostThusFar
    })
    const mostBusy = {
        author: busiestAuthor,
        blogs: mostThusFar
    }
    return mostBusy
}

const dummy = () => {
    return 1
}

module.exports = {
    timesThanked,
    favoriteBlog,
    mostBlogs,
    dummy
}
