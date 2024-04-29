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
            <h1 className="text-2xl my-8">Stack</h1>
            <ul className="list-disc">
                <li>Next.js website with shadcn components</li>
                <li>Postgres and Meilisearch</li>
                <li>Python for data wrangling</li>
            </ul>
        </div>
    )
}