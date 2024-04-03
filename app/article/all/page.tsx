import prisma from "@/app/lib/prisma";

import { Article, columns } from "./columns"
import { DataTable } from "./data-table"
import { PaginatedDataTable } from "./data-table";
import Table from "@/components/data-table";


export default async function allArticlesDescCommentCount({ params }) {
    async function getData(): Promise<Article[]> {
        //const articles = await prisma.$queryRawUnsafe(`WITH counts AS (SELECT article_id, COUNT(*) AS row_count FROM comments GROUP BY article_id ORDER BY row_count DESC) SELECT articles.*, counts.row_count AS comment_count FROM articles JOIN counts ON articles.id = counts.article_id ORDER BY counts.row_count DESC;`);
        const articles = await prisma.articles.findMany({
            where: {
                is_closed_for_comments: true,
                num_comments: {not: null}
            },
            orderBy: [
                {
                    num_comments: "desc"
                }
            ]
        })
        const data = []
        articles.map(article => {
            data.push(
                {
                    "comments": article["num_comments"],
                    "title": article["title"],
                    "date": article["published_date"].toLocaleString(),
                    "article_id": article["id"]
                }
            )
            
        });
        return data
      }
    const data = await getData();
    //console.log(data)
    const tag_id = parseInt(params.tag_id);
    //const articles = await prisma.$queryRawUnsafe(`WITH counts AS (SELECT article_id, COUNT(*) AS row_count FROM comments GROUP BY article_id ORDER BY row_count DESC) SELECT articles.*, counts.row_count AS comment_count FROM articles JOIN counts ON articles.id = counts.article_id ORDER BY counts.row_count DESC;`);
    //const tag = await prisma.tags.findFirst({where: {id: {equals: tag_id}}})

    return (
        <div>
            <h1>All articles</h1>
            
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data}/>
            </div>
            
        
        {/*data.map(article => {
            return (
                <div key={article.article_id}>
                    <a href={`/article/${article.article_id}`}>{article.title}</a>
                    <p>{article.comments.toString()} comments</p>
                    <p>{article.date.toLocaleString()}</p>
                    <br/>
                </div>
            )
            
        })*/}
    

        </div>
    );
}