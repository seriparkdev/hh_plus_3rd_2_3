import { highlightText } from "../../../shared/lib/highlightText.tsx"
import { Button } from "../../../shared/ui"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { usePostParams } from "../../post/model/usePostParams.ts"
import { useCommentDialog } from "../model/useCommentDialog.ts"
import { Comment } from "../../../entities/comment/model/types.ts"
import { useDeleteCommentMutation, useLikeCommentMutation } from "../api/mutations.ts"

interface Props {
  comment: Comment
}

export default function CommentItem({ comment }: Props) {
  const { mutate: deleteComment } = useDeleteCommentMutation()
  const { mutate: likeComment } = useLikeCommentMutation()
  const { searchQuery } = usePostParams()
  const { setSelectedComment, setShowEditCommentDialog } = useCommentDialog()

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => likeComment({ id: comment.id, likes: comment.likes })}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedComment(comment)
            setShowEditCommentDialog(true)
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
