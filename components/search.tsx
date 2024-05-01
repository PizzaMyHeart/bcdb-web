import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Snippet, InfiniteHits, Stats } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';


const { searchClient } = instantMeiliSearch(
  "http://localhost:7700",
  "16316eefe4e7d1e96e0fbc0ca26e9e559017d30034dad46cf0541815ea0387a2"
);

const Search = () => (
  <InstantSearch
    indexName="comments"
    searchClient={searchClient}
  >
    <SearchBox 
        placeholder="Search comments ...."
        autoFocus={true}
        classNames={{
            input: "block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1"
        }}
        />
    <Stats />
    <InfiniteHits hitComponent={Hit} />
    
  </InstantSearch>
);

//const Hit = ({ hit }) => <Highlight attribute="name" hit={hit} />;

const Hit = ({ hit }) => (
    <div key={hit.id} className="py-4">
      <div className="text-gray-500">
        <div>{hit.author_name}</div>
        <div>{new Date(hit.date * 1000).toDateString()}</div>
        <div>on: <a href={`/article/${hit.article_id}`} target="_blank">{hit.article_title}</a></div>
      </div>     
      
            
      <div className="py-8">
          <Highlight attribute="body" hit={hit} />
      </div>
      <div><a href={`/comment/${hit.id}`} target="_blank">View thread</a></div>
      <hr className="mt-6"/>
    </div>
  );


export default Search