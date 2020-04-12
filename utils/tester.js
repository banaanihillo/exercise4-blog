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

const dummy = () => {
    return 1
}

module.exports = {
    timesThanked,
    favoriteBlog,
    dummy
}
