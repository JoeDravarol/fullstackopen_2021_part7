const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    content: body.comment,
    blog: blog._id
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment)
  const savedBlog = await blog.save().then(blog =>
    blog
      .populate('comments', { content: 1 })
      .execPopulate()
  )

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if ( blog.user.toString() !== user.id ) {
    return response.status(401).json({
      error: 'Unauthorized token'
    })
  }
  
  await blog.remove()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  ).populate('comments', { content: 1 })

  response.json(updatedBlog)
})

module.exports = blogsRouter