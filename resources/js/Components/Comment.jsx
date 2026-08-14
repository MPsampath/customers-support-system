export default function Comment({ comments }) {
    return (
        <>
            <h3 className="mt-6 text-sm font-semibold text-gray-900">
                Replies
            </h3>
            {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
            ) : (
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index} className="mb-2">
                            <p className="text-gray-800">{comment.comment}</p>
                            <p className="text-gray-500 text-sm">
                                By {comment.agent} on{" "}
                                {new Date(comment.created_at).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
