import prisma from "@/app/lib/prisma";

export default async function Tags() {
    // Display all existing article tags
    const allTags = await prisma.tags.findMany({orderBy: [{name: "asc"}]});
    return (
        <div className="p-4">
            <h1 className="text-gray-500 mb-4">Browse articles by tags</h1>
            <div className="flex flex-wrap space-x-4 space-y-4">
            {allTags.map((tag) => {
                return (
                    <div key={tag.id}>
                        <a href={`/tag/${tag.id}`} target="_blank">{tag.name}</a>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
