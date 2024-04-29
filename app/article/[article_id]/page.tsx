import prisma from "@/app/lib/prisma";
import { useEffect } from "react";
import Comments from "@/components/comments";

export default async function Article({ params }) {

    const article_id = parseInt(params.article_id);
    const articles = await prisma.$queryRaw`WITH counts AS (SELECT article_id, COUNT(*) AS row_count FROM comments GROUP BY article_id) SELECT articles.*, counts.row_count AS comment_count FROM articles JOIN counts ON articles.id = counts.article_id WHERE articles.id=${article_id};`;
    //const comments = await prisma.comments.findMany({where: {article_id: article_id}})
    const comments = await prisma.$queryRaw`WITH RECURSIVE comment_tree AS (
        SELECT id, guardian_id, parent_guardian_id, author_name, author_name AS replying_to, body, 0 AS depth, date
        FROM comments
        WHERE article_id=${article_id}
        AND parent_guardian_id IS NULL
        UNION ALL
        SELECT c.id, c.guardian_id, c.parent_guardian_id, c.author_name, ct.author_name AS replying_to, c.body, ct.depth + 1 AS depth, ct.date
        FROM comments c
        JOIN comment_tree ct ON c.parent_guardian_id = ct.guardian_id
        )
        SELECT id, guardian_id, parent_guardian_id, author_name, replying_to, body, depth, date FROM comment_tree ORDER BY id;`;
  
    return (
        <div className="px-4">
            <div>Articles</div>
        {articles.map(article => {
            return (
                <div key={article.id}>
                    <p>{article.title}</p>
                    <p>{article.published_date.toLocaleString()}</p>
                    <p>{article.comment_count.toString()} comments</p>
                    <a href={article.permalink} target="_blank">View original</a>
                </div>
            )
            
        })}
        <Comments comments={comments}/>
        </div>
    );
}