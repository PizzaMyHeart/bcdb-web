"use client"

import prisma from "@/app/lib/prisma";
import { Article, columns } from "./columns"
import { DataTable } from "./data-table"
import { PaginatedDataTable } from "./data-table";
import Table from "@/components/data-table";
import { InstantSearch, SearchBox, Hits, Highlight, Snippet, InfiniteHits, Stats, SortBy, Configure } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';


const { searchClient } = instantMeiliSearch(
  "http://localhost:7700",
  "16316eefe4e7d1e96e0fbc0ca26e9e559017d30034dad46cf0541815ea0387a2"
);


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
    //const data = await getData();
    //console.log(data)
    //const tag_id = parseInt(params.tag_id);
    //const articles = await prisma.$queryRawUnsafe(`WITH counts AS (SELECT article_id, COUNT(*) AS row_count FROM comments GROUP BY article_id ORDER BY row_count DESC) SELECT articles.*, counts.row_count AS comment_count FROM articles JOIN counts ON articles.id = counts.article_id ORDER BY counts.row_count DESC;`);
    //const tag = await prisma.tags.findFirst({where: {id: {equals: tag_id}}})


    return (
        <div className="px-4">
            <InstantSearch 
                indexName="articles" 
                searchClient={searchClient}
                >
                <Configure attributesToRetrieve={["id", "title", "published_date", "num_comments"]} sortBy="published_date"/>
                <Stats />
                <SearchBox 
                    placeholder="Search articles ...."
                    autoFocus={true}
                    classNames={{
                        input: "block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1"
                    }}
                    />
                <SortBy
                    items={[
                        {label: "Date ascending", value: "articles:published_date:asc"},
                        {label: "Date descending", value: "articles:published_date:desc"}
                ]}/>
                <InfiniteHits hitComponent={ArticleHit}/>
            </InstantSearch>
            
            {/*
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data}/>
            </div>
    */}
            
        
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

const ArticleHit = ({hit}) => (
    <div key={hit.id} className="py-4">
        <h1 className="text-3xl"><a href={`/article/${hit.id}`} className="no-underline"><Highlight attribute="title" hit={hit}/></a></h1>
        
        <p className="mx-4">{hit.num_comments} comments</p>
        <div>{new Date(hit.published_date * 1000).toDateString()}</div>
    
      
            
    </div>
)

