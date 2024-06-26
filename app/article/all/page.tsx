// @ts-nocheck
"use client"
import { InstantSearch, SearchBox, Hits, Highlight, Snippet, InfiniteHits, Stats, SortBy, Configure } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

let meilisearchUrl: string = process.env.NEXT_PUBLIC_MEILISEARCH_URL!;

const { searchClient } = instantMeiliSearch(
  meilisearchUrl,
  "16316eefe4e7d1e96e0fbc0ca26e9e559017d30034dad46cf0541815ea0387a2",
);

export default async function allArticlesDescCommentCount({ params }) {
    return (
        <div className="px-4 pb-8">
            <InstantSearch 
                indexName="articles" 
                searchClient={searchClient}
                >
                <Configure attributesToRetrieve={["id", "title", "published_date", "num_comments"]} sortBy="published_date"/>
                
                <SearchBox 
                    placeholder="Search article titles ...."
                    autoFocus={true}
                    classNames={{
                        input: "block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1"
                    }}
                    />
                <Stats />
                {/*
                <SortBy
                    classNames={{
                        select: "p-4",
                    }}
                    items={[
                        {label: "Newest", value: "articles:published_date:asc"},
                        {label: "Oldest", value: "articles:published_date:desc"},
                        {label: "Most commented", value: "articles:num_comments:desc"}
                ]}/>
            */}
                <InfiniteHits hitComponent={ArticleHit} showPrevious={false} classNames={{loadMore: "rounded-full bg-zinc-300 p-2 hover:bg-zinc-600 hover:text-white"}}/>
            </InstantSearch>  
        </div>
    );
}

const ArticleHit = ({hit}) => (
    <div key={hit.id} className="py-4">
        <h1 className="text-3xl"><a href={`/article/${hit.id}`} className="no-underline"><Highlight attribute="title" hit={hit}/></a></h1>
        
        <p>{hit.num_comments} comments</p>
        <div>{new Date(hit.published_date * 1000).toDateString()}</div>
    
      
            
    </div>
)

