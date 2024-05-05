export default function About() {
    return (
        <div className="p-8">
            <h1 className="text-2xl my-8">What&apos;s this?</h1>
            <p>
                Full-text search of over 2 million user comments on book-related pages on <a href="https://www.theguardian.com/books" target="_blank">the Guardian</a>.
            </p>
            <br/>
            <p>
                Alternatively, browse by <a href="/article/all">article title</a> or <a href="/tag/all">tag</a>.
            </p>
            <h1 className="text-2xl my-8">Why?</h1>
            <p>
                Besides <a href="https://www.goodreads.com/" target="_blank">Goodreads</a> and <a href="https://www.reddit.com" target="_blank">Reddit</a>, 
                I&apos;ve found the Guardian to be a useful source of book-related discussion (there are some gems amidst the unfortunate politically-charged mudslinging, like when I was hunting for some good historical fiction). The problem is not all their book-related pages are open to comments, 
                and there isn&apos;t an easy way to search the text of the comments instead of the parent article.
            </p>
            <h1 className="text-2xl my-8">Features</h1>
            <ul className="list-none list-inside">
                <li>☑ Full-text search of comments</li>
                <li>☑ Full-text search of article titles</li>
                <li>☑ Browse articles by tag</li>
                <li className="text-gray-500">☐ Sortable results</li>
                <li className="text-gray-500">☐ Unified search interface</li>
                <li className="text-gray-500">☐ Foldable comments</li>
                <li className="text-gray-500">☐ Keyboard navigation</li>
                <li className="text-gray-500">☐ Semantic search</li>
            </ul>
            <h1 className="text-2xl my-8">Stack</h1>
            <ul className="list-disc list-inside">
                <li><a href="https://nextjs.org/" target="_blank">Next.js</a> website with <a href="https://ui.shadcn.com/" target="_blank">shadcn</a> components</li>
                <li><a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> and <a href="https://www.meilisearch.com/" target="_blank">Meilisearch</a></li>
                <li><a href="https://github.com/PizzaMyHeart/bcdb/blob/main/requirements.txt" target="_blank">Python</a> for data wrangling</li>
            </ul>
            <h1 className="text-2xl my-8">Hardware</h1>
            <p><a href="https://docs.hetzner.com/cloud/servers/overview/#pricing" target="_blank">Hetzner CX11 VPS</a> running Debian 12</p>
            <ul className="list-disc list-inside">
                <li>1 vCPU</li>
                <li>2 GB RAM</li>
                <li>20 GB SSD</li>
                <li>+ 20 GB storage volume (for Meilisearch)</li>
            </ul>
            <h1 className="text-2xl my-8">Source</h1>
            <a href="https://github.com/PizzaMyHeart/bcdb-web" target="_blank">GitHub</a> <sup>spaghetti warning🍝</sup>
            <h1 className="text-2xl my-8">Who?</h1>
            <a href="https://tachy.org" target="_blank">Me</a>
        </div>
    )
}