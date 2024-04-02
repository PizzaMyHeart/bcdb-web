import prisma from "@/app/lib/prisma";

import { Article, columns } from "./columns"
import { DataTable } from "./data-table"





export default async function allArticlesDescCommentCount({ params }) {
    async function getData(): Promise<Article[]> {
        const articles = await prisma.$queryRawUnsafe(`WITH counts AS (SELECT article_id, COUNT(*) AS row_count FROM comments GROUP BY article_id ORDER BY row_count DESC) SELECT articles.*, counts.row_count AS comment_count FROM articles JOIN counts ON articles.id = counts.article_id ORDER BY counts.row_count DESC;`);

        const data = []
        //return [{"title": "test1"}, {"title": "test2"}]
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
        return [
          {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
          },
          // ...
        ]
      }
    const data = await getData();
    console.log(data)
    const tag_id = parseInt(params.tag_id);
    const articles = await prisma.$queryRawUnsafe(`WITH counts AS (SELECT article_id, COUNT(*) AS row_count FROM comments GROUP BY article_id ORDER BY row_count DESC) SELECT articles.*, counts.row_count AS comment_count FROM articles JOIN counts ON articles.id = counts.article_id ORDER BY counts.row_count DESC;`);
    //const tag = await prisma.tags.findFirst({where: {id: {equals: tag_id}}})

    return (
        <div>
            <h1>All articles (descending comment count)</h1>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        
        {/*articles.map(article => {
            return (
                <div key={article.id}>
                    <a href={`/article/${article.id}`}>{article.title}</a>
                    <p>{article.comment_count.toString()} comments</p>
                    <p>{article.published_date.toLocaleString()}</p>
                    <br/>
                </div>
            )
            
        })*/}
    

        </div>
    );
}