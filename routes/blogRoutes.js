import { Router } from "express";
import Blog from "../models/blogModel.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const router = Router()

router.post('/create',async(req,res)=>{
    try {
        const {title,content,author} = req.body
        if (!title || !content || !author) {
            return res.status(400).json({
                message: 'Title, content and author are required'
            });
        }

        const blog = await Blog.create({title,content,author})
        res.status(200).json({
            message: 'Blog created successfully',
            blog:blog
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
})

router.post('/edit/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Access token is required'
            });
        }

       
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const userId = decoded.id;

        const blog = await Blog.findOne({_id:req.params.id})


        
        if (blog.author !== userId) {
            return res.status(403).json({
                message: 'You are not authorized to edit this blog'
            });
        }

       
        const blogId = req.params.id;
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { title, content },
            { new: true } 
        );

        if (!updatedBlog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            message: 'Blog updated successfully',
            blog: updatedBlog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Access token is required'
            });
        }

        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const userId = decoded.id;

        const blog = await Blog.findOne({ _id: req.params.id });
        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        if (blog.author !== userId) {
            return res.status(403).json({
                message: 'You are not authorized to delete this blog'
            });
        }


        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Blog deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get('/all',async(req,res)=>{
    try {
        const blogs = await Blog.find()
        if(!blogs) {
            res.json({
                message:"No blogs created"
            })
        }

        res.status(200).json({
            message: 'All blogs',
            blogs:blogs
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
})


router.get('/:id',async(req,res)=>{
    try {
        const id = req.params.id
        if(!id){
            res.json({
                message: 'Please provide id'
            })
        }

        const blog = await Blog.findOne({_id:id})

        res.status(200).json({
            message: 'Blog found',
            blog:blog
        })
    } catch (error) {
        console.log(error.message)
    }
})


export default router