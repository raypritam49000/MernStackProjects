import { db } from "../dbconfig/db.js";

class PostController {

    static getPosts = (req, res) => {
        const q = req.query.cat
            ? "SELECT * FROM posts WHERE cat=?"
            : "SELECT * FROM posts";

        db.query(q, [req.query.cat], (err, data) => {
            if (err) return res.status(500).send(err);

            return res.status(200).json(data);
        });
    };

    static getPost = (req, res) => {
        const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.image AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        });
    };

    static addPost = (req, res) => {

        const userId = req.userId;
        const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`,`uid`) VALUES (?)";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            userId,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created.");
        });

    };

    static deletePost = (req, res) => {
         const userId = 8;
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

        db.query(q, [postId, userId], (err, data) => {
            if (err) return res.status(403).json("You can delete only your post!");
            return res.json("Post has been deleted!");
        });

    };

    static updatePost = (req, res) => {
        const userId = req.userId;
        const postId = req.params.id;
        const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

        const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

        db.query(q, [...values, postId, userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated.");
        });

    };

}

export default PostController;