import { Highlight } from "react-instantsearch";

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

export default Hit;