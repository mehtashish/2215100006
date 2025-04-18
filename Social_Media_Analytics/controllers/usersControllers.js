const api = require('../api/api');

async function getTopUsers(req, res) {
    try {
        const users = await api.fetchUsers();
        const posts = await api.fetchPosts();
        const comments = await api.fetchComments();

        const commentCountByPost = {};
        for (let i = 0; i < comments.length; i++) {
            const postId = comments[i].postId;
            if (commentCountByPost[postId]) {
                commentCountByPost[postId]++;
            } else {
                commentCountByPost[postId] = 1;
            }
        }

        const commentCountByUser = [];
        for (let j = 0; j < users.length; j++) {
            const user = users[j];
            let totalComments = 0;

            for (let k = 0; k < posts.length; k++) {
                const post = posts[k];
                if (post.userId === user.id) {
                    totalComments += commentCountByPost[post.id] || 0;
                }
            }

            const userWithComments = {
                id: user.id,
                name: user.name,
                email: user.email,
                totalComments: totalComments
            };

            commentCountByUser.push(userWithComments);
        }

        commentCountByUser.sort(function (a, b) {
            return b.totalComments - a.totalComments;
        });

        res.json(commentCountByUser.slice(0, 5));

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch top users' });
    }
}

module.exports = { getTopUsers };