import prisma from "@/app/lib/prisma";
import { GetStaticProps } from "next";

export default async function Tags() {
    // Display all existing article tags
    const allTags = await prisma.tags.findMany({orderBy: [{name: "asc"}]});
    return (
        <div>
            <h1>Tags</h1>
            {allTags.map((tag) => {
                return (
                    <div key={tag.id}>
                        <a href={`/tag/${tag.id}`} target="_blank">{tag.name}</a>
                    </div>
                )
            })}
        </div>
    )
}

/*
export const getStaticProps: GetStaticProps = async () => {
    const allTags = await prisma.tags.findMany();
    console.log(allTags)
    return {
        props: { allTags }
    }
}
*/