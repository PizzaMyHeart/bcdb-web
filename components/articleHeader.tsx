export default function ArticleHeader({ articles }) {
    return (
        <div>
        {articles.map(article => {
            return (
                <div key={article.id}>
                    <h1 className="text-3xl">{article.title}</h1>
                    <div className="flex mb-8">
                        <p className="mr-4">{article.published_date.toLocaleString()}</p>
                        <p className="mx-4">{article.comment_count.toString()} comments</p>
                        <a href={article.permalink} target="_blank" className="mx-4">View original</a>
                    </div>
                </div>
            )
            
        })}
        </div>
    )
}