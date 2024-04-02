import prisma from "@/app/lib/prisma";
import { Article, columns } from "@/app/article/all/columns"
import { DataTable } from "@/app/article/all/data-table";
import { Badge } from "@/components/ui/badge"


export default async function allArticlesWithTag({ params }) {
    const tag_id = parseInt(params.tag_id);
    const articles = await prisma.$queryRaw`SELECT * FROM (SELECT articles.title, articles.is_closed_for_comments, articles.id AS article_id, articles.permalink AS article_permalink, articles.published_date, tags.name AS tag_name, tags.id AS tag_id, tags.permalink AS tag_permalink FROM articles_tags JOIN articles ON articles.id = articles_tags.article_id JOIN tags ON tags.id = articles_tags.tag_id) WHERE tag_id=${tag_id};`;
    //const tag = await prisma.tags.findFirst({where: {id: {equals: tag_id}}})
    articles.map(article => {
        console.log(article.title)
    })
    const tag_name = articles[0].tag_name;
    async function getData(): Promise<Article[]> {
        const articles = await prisma.$queryRaw`SELECT * FROM (SELECT articles.title, articles.is_closed_for_comments, articles.id AS article_id, articles.permalink AS article_permalink, articles.published_date, tags.name AS tag_name, tags.id AS tag_id, tags.permalink AS tag_permalink FROM articles_tags JOIN articles ON articles.id = articles_tags.article_id JOIN tags ON tags.id = articles_tags.tag_id) WHERE tag_id=${tag_id};`;
    
        const data = []
        articles.map(article => {
            data.push(
                {
                    "title": article["title"],
                    "comments": article["comment_count"],
                    "date": article["published_date"].toLocaleString()
                }
            )
            
        });
        return data
        
      }
    const data = await getData();
    return (
        <div>
            <Badge>{tag_name}</Badge>

            <h1>Articles tagged == {tag_name} ==</h1>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        {articles.map(article => {
            return (
                <div key={article.id}>
                    <p>{article.title}</p>
                    <sup>{article.published_date.toLocaleString()}</sup>
                </div>
            )
            
        })}

        </div>
    );
}