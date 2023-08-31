const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>{
  const totalLikes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return totalLikes
}

const favoriteBlog = (blogs) =>{
  let favBlog = null
  let maxLikes = -1
  blogs.map((blog) => {
    if(blog.likes > maxLikes) { 
      favBlog = blog 
      maxLikes = blog.likes
    }
  })

  return {
    author :favBlog.author,
    likes: favBlog.likes,
    title: favBlog.title
  }
}
  
module.exports = {
  dummy, totalLikes, favoriteBlog
}