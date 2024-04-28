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
        />
    <Stats />
    <InfiniteHits hitComponent={Hit} />
    
  </InstantSearch>
);

//const Hit = ({ hit }) => <Highlight attribute="name" hit={hit} />;

const Hit = ({ hit }) => (
    <div key={hit.id} className="py-4">
        <div className="flex">
            <div className="mr-8">{hit.author_name}</div>
            <div>{new Date(hit.date * 1000).toDateString()}</div>
            
        </div>
        <div className="py-8">
            <Highlight attribute="body" hit={hit} />
        </div>
        <div><a href={`/article/${hit.article_id}`}>See all comments</a></div>
        <hr className="mt-6"/>
    </div>
  );


export default Search