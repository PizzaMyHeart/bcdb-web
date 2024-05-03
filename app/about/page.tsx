export default function About() {
    return (
        <div className="p-8">
            <h1 className="text-2xl my-8">What's this?</h1>
            <p>
                Full-text search of over 2 million user comments on book-related pages on <a href="https://www.theguardian.com/books" target="_blank">the Guardian</a>.
            </p>
            <br/>
            <p>
                Alternatively, browse by <a href="/article/all">article title</a> or <a href="/tag/all">tag</a>.
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
            <h1 className="text-2xl my-8">Source</h1>
            <a href="https://github.com/PizzaMyHeart/bcdb-web" target="_blank">GitHub</a>
        </div>
    )
}