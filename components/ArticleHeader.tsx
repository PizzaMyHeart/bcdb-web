import prisma from "@/app/lib/prisma";
import { Badge } from "./ui/badge";

export default async function ArticleHeader({ articleId }) {
    const articles = await prisma.$queryRaw`WITH counts AS (SELECT article_id, COUNT(*) AS row_count FROM comments GROUP BY article_id) SELECT articles.*, counts.row_count AS comment_count FROM articles JOIN counts ON articles.id = counts.article_id WHERE articles.id=${articleId};`;
    const tags = await prisma.articles_tags.findMany({
        where: {
            article_id: articleId,
        },
        include: {
            tags: true
        }
    });
    console.log(tags)

    return (
        <div>
        {articles.map(article => {
            return (
                <div key={article.id}>
                    <h1 className="text-3xl"><a href={`/article/${article.id}`} className="no-underline">{article.title}</a></h1>
                    <div className="flex mb-8">
                        <p className="mr-4">{article.published_date.toLocaleString()}</p>
                        <p className="mx-4">{article.comment_count.toString()} comments</p>
                        <p><a href={article.permalink} target="_blank" className="ml-4">View original</a>⤴</p>
                    </div>
                </div>
            )
            
        })}
        <div className="flex space-x-4 mb-4">
        {tags.map(tag => {
            return (
                
                    <div key={tag.id}>
                        <Badge><a href={`/tag/${tag.tags.id}`} target="_blank" className="no-underline">{tag.tags.name}</a></Badge>
                    </div>
                
            )
        })}
        </div>
        </div>
    )
}