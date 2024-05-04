import prisma from "@/app/lib/prisma";
import { Article, columns } from "@/app/article/all/columns"
import { Badge } from "@/components/ui/badge"


export default async function allArticlesWithTag({ params }) {
    const tag_id = parseInt(params.tag_id);
    const articles = await prisma.$queryRaw`SELECT * FROM (SELECT articles.title, articles.is_closed_for_comments, articles.id AS article_id, articles.permalink AS article_permalink, articles.published_date, tags.name AS tag_name, tags.id AS tag_id, tags.permalink AS tag_permalink, articles.num_comments AS num_comments FROM articles_tags JOIN articles ON articles.id = articles_tags.article_id JOIN tags ON tags.id = articles_tags.tag_id) WHERE num_comments IS NOT NULL AND tag_id=${tag_id};`;
   
    return (
        <div>
        <div className="mb-4 ml-4">Tag: <Badge>{articles[0].tag_name}</Badge></div>
        <div className="mb-4 ml-4">{articles.length} results found.</div>
        {articles.map(article => {
            return (
                <div key={article.article_id} className="p-4">
                    <h1 className="text-3xl"><a href={`/article/${article.article_id}`} className="no-underline">{article.title}</a></h1>
                    
                    <p>{article.num_comments} comments</p>
                    <div>{new Date(article.published_date).toDateString()}</div>
                </div>
            )
            
        })}

        </div>
    );
}