import { Request, Response } from 'express';
import Post from '../entities/Post.entity';

const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error: any) {
    console.error({ error });

    res.status(500).json({
      message: error.message,
    });
  }
};

const getPost = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findOneBy({
      id: +id,
    });

    if (!post) {
      console.log(`EL post con el id ${id} no existe`);
      return res.status(404).json({
        message: 'El post no existe',
      });
    }

    res.status(200).json(post);
  } catch (error: any) {
    console.error({ error });

    res.status(500).json({
      message: error.message,
    });
  }
};

const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const post = new Post();

  post.title = title;
  post.content = content;

  try {
    await post.save();

    res.status(201).json(post);
  } catch (error: any) {
    console.log({ error });

    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findOneBy({
      id: +id,
    });

    if (!post) {
      console.log(`EL post con el id ${id} no existe`);
      return res.status(404).json({
        message: 'El post no existe',
      });
    }

    await Post.update(
      { id: +id },
      {
        title,
        content,
      }
    );

    res.status(200).json({
      message: 'Post actualizado',
    });
  } catch (error: any) {
    console.log({ error });

    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Post.delete({ id: +id });

    res.status(200).json({
      message: 'Post eliminado',
    });
  } catch (error: any) {
    console.log({ error });

    res.status(500).json({
      message: error.message,
    });
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
