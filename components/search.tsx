import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Snippet, InfiniteHits, Stats } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import Hit from './Hit';

const { searchClient } = instantMeiliSearch(
  "http://localhost:7700",
  "16316eefe4e7d1e96e0fbc0ca26e9e559017d30034dad46cf0541815ea0387a2",
  {
    placeholderSearch: false
  }
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



export default Search