import prisma from "@/app/lib/prisma";

export default async function allArticlesDescCommentCount({ params }) {
    const tag_id = parseInt(params.tag_id);
    const articles = await prisma.$queryRawUnsafe(`WITH counts AS (SELECT article_id, COUNT(*) AS row_count FROM comments GROUP BY article_id ORDER BY row_count DESC) SELECT articles.*, counts.row_count AS comment_count FROM articles JOIN counts ON articles.id = counts.article_id ORDER BY counts.row_count DESC;`);
    //const tag = await prisma.tags.findFirst({where: {id: {equals: tag_id}}})
    articles.map(article => {
        console.log(article.comment_count)
    })
    return (
        <div>
            <h1>All articles (descending comment count)</h1>
        {articles.map(article => {
            return (
                <div key={article.id}>
                    <a href={`/article/${article.id}`}>{article.title}</a>
                    <p>{article.comment_count.toString()} comments</p>
                    <p>{article.published_date.toLocaleString()}</p>
                    <br/>
                </div>
            )
            
        })}

        </div>
    );
}