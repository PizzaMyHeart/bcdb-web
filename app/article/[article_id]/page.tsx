import prisma from "@/app/lib/prisma";
import Comments from "@/components/comments";
import ArticleHeader from "@/components/articleHeader";

export default async function Article({ params }) {

    const articleId = parseInt(params.article_id);
    //const articles = await prisma.$queryRaw`WITH counts AS (SELECT article_id, COUNT(*) AS row_count FROM comments GROUP BY article_id) SELECT articles.*, counts.row_count AS comment_count FROM articles JOIN counts ON articles.id = counts.article_id WHERE articles.id=${article_id};`;
    //const comments = await prisma.comments.findMany({where: {article_id: article_id}})
    const comments = await prisma.$queryRaw`WITH RECURSIVE comment_tree AS (
        SELECT id, guardian_id, parent_guardian_id, author_name, author_name AS replying_to, body, 0 AS depth, date, permalink
        FROM comments
        WHERE article_id=${articleId}
        AND parent_guardian_id IS NULL
        UNION ALL
        SELECT c.id, c.guardian_id, c.parent_guardian_id, c.author_name, ct.author_name AS replying_to, c.body, ct.depth + 1 AS depth, ct.date, ct.permalink
        FROM comments c
        JOIN comment_tree ct ON c.parent_guardian_id = ct.guardian_id
        )
        SELECT id, guardian_id, parent_guardian_id, author_name, replying_to, body, depth, date, permalink FROM comment_tree ORDER BY id;`;
  
    return (
        <div className="px-4">
        <ArticleHeader articleId={articleId}/>
        <Comments comments={comments}/>
        </div>
    );
}