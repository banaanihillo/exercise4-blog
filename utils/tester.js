const timesThanked = (blogs) => {
    const arrayOfThanks = blogs.map(blog => {
        return blog.thanks
    })
    console.log(arrayOfThanks)
    
    const total = (sum, individualThanks) => {
        return sum + individualThanks
    }
    return arrayOfThanks.reduce(total, 0)
}

const dummy = () => {
    return 1
}

module.exports = {
    timesThanked,
    dummy
}
