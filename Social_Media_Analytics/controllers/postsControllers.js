const api = require('../api/api');

async function getLatestPosts(req, res) {
    const type = req.query.type;

    try {
        const posts = await api.fetchPosts();
        const comments = await api.fetchComments();

        if (type === 'popular') {
            const commentCount = {};
            for (let i = 0; i < comments.length; i++) {
                const postId = comments[i].postId;
                if (commentCount[postId]) {
                    commentCount[postId]++;
                } else {
                    commentCount[postId] = 1;
                }
            }

            const popularPosts = [];
            for (let j = 0; j < posts.length; j++) {
                const post = posts[j];
                post.commentCount = commentCount[post.id] || 0;
                popularPosts.push(post);
            }

            popularPosts.sort(function (a, b) {
                if (b.commentCount === a.commentCount) {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                }
                return b.commentCount - a.commentCount;
            });

            res.json(popularPosts.slice(0, 5));
        } else if (type === 'latest') {

            posts.sort(function (a, b) {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });

            res.json(posts.slice(0, 5));
        } else {
            res.status(400).json({ error: 'invalid query either use "popular" or "latest"' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}

module.exports = { getLatestPosts };