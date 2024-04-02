import prisma from "@/app/lib/prisma";

export default async function article({ params }) {
    const article_id = parseInt(params.article_id);
    const articles = await prisma.$queryRaw`WITH counts AS (SELECT article_id, COUNT(*) AS row_count FROM comments GROUP BY article_id) SELECT articles.*, counts.row_count AS comment_count FROM articles JOIN counts ON articles.id = counts.article_id WHERE articles.id=${article_id};`;
    //const comments = await prisma.comments.findMany({where: {article_id: article_id}})
    const comments = await prisma.$queryRaw`WITH RECURSIVE comment_tree AS (
        SELECT id, guardian_id, parent_guardian_id, author_name, author_name AS replying_to, body, 0 AS depth, ARRAY[id] AS path
        FROM comments
        WHERE article_id=${article_id}
        AND parent_guardian_id IS NULL
        UNION ALL
        SELECT c.id, c.guardian_id, c.parent_guardian_id, c.author_name, ct.author_name AS replying_to, c.body, ct.depth + 1 AS depth, ct.path || ct.guardian_id
        FROM comments c
        JOIN comment_tree ct ON c.parent_guardian_id = ct.guardian_id
        )
        SELECT id, guardian_id, parent_guardian_id, author_name, replying_to, body, depth FROM comment_tree ORDER BY path;`;
    function depthPad (depth: number) {
        switch (depth) {
            case 0:
                return "pl-0"
            case 1:
                return "pl-[30px]"
            case 2:
                return "pl-[60px]"
            case 3:
                return "pl-[90px]"
            case 4:
                return "pl-[120px]"
        }
    }
    return (
        <div>
            <h1>Article {articles[0].id}</h1>
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
        <div>
            {comments.map(comment => {
                return (
                    <div className={depthPad(comment.depth)} key={comment.id}>
                        <p>{comment.guardian_id}</p>
                        <p>{comment.author_name} (replying to {comment.replying_to} {comment.parent_guardian_id})</p>
                        <div className="pl-4" dangerouslySetInnerHTML={{ __html: comment.body}}></div>
                        <br/>
                    </div>
                )
            })}
        </div>
        </div>
    );
}