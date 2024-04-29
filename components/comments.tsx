export default function Comments({comments}) {
    return (
        <div className="px-4">
        <div>
            {comments.map(comment => {
                return (
                    <div className={depthPad(comment.depth)} key={comment.id}>
                        <p>{depthPad(comment.depth)} || {comment.depth}</p>
                        <p>{comment.guardian_id}</p>
                        <p>{comment.author_name} (replying to {comment.replying_to} {comment.parent_guardian_id})</p>
                        <div className="pl-4" dangerouslySetInnerHTML={{ __html: comment.body}}></div>
                        <br/>
                    </div>
                )
            })}
        </div>
        </div>
    )
}

function depthPad (depth: number) {
    // Pain
    switch (depth) {
        case 0:
            return "pl-0"
        case 1:
            return "pl-[1vw]"
        case 2:
            return "pl-[2vw]"
        case 3:
            return "pl-[3vw]"
        case 4:
            return "pl-[4vw]"
        case 5:
            return "pl-[5vw]"
        case 6:
            return "pl-[6vw]"
        case 7:
            return "pl-[7vw]"
        case 8:
            return "pl-[8vw]"
        case 9:
            return "pl-[9vw]"
        case 10: 
            return "pl-[10vw]"
        case 11: 
            return "pl-[11vw]"
        case 12: 
            return"pl-[12vw]"
        case 13: 
            return"pl-[13vw]"
        case 14: 
            return"pl-[14vw]"
        case 15: 
            return"pl-[15vw]"
        case 16: 
            return"pl-[16vw]"
        case 17: 
            return"pl-[17vw]"
        case 18: 
            return"pl-[18vw]"
        case 19: 
            return"pl-[19vw]"
        case 20: 
            return"pl-[20vw]"
    }

};