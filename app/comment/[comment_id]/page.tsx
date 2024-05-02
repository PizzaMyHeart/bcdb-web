import prisma from "@/app/lib/prisma";
import Comments from "@/components/Comments";
import ArticleHeader from "@/components/ArticleHeader";

export default async function Comment({ params }) {
    const commentId = parseInt(params.comment_id)
    const comments = await prisma.$queryRaw`WITH RECURSIVE comment_tree AS (
        SELECT id, guardian_id, parent_guardian_id, author_name, author_name AS replying_to, body, 0 AS depth, date, article_id, permalink
        FROM comments
        WHERE id=${commentId}
        UNION ALL
        SELECT c.id, c.guardian_id, c.parent_guardian_id, c.author_name, ct.author_name AS replying_to, c.body, ct.depth + 1 AS depth, ct.date, c.article_id, c.permalink
        FROM comments c
        JOIN comment_tree ct ON c.parent_guardian_id = ct.guardian_id
        )
        SELECT id, guardian_id, parent_guardian_id, author_name, replying_to, body, depth, date, article_id, permalink FROM comment_tree ORDER BY id;`;
    
    return (
        <div className="px-4">
            <ArticleHeader articleId={comments[0].article_id}/>
            <div className="ml-4 mb-4 italic">You are viewing a single thread. <a href={`/article/${comments[0].article_id}`} target="_blank">See all comments</a></div>
            <Comments comments={comments}/>
        </div>
    );
      
}