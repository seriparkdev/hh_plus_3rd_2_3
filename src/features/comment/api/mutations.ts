import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCommentApi, deleteCommentApi, updateCommentApi } from "../../../entities/comment/api"
import { NewComment, Comment } from "../../../entities/comment/model/types.ts"

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCommentApi,
    onSuccess: (newComment: NewComment) => {
      queryClient.setQueryData<Comment>(["comments", newComment.postId], (prevData) => {
        if (!prevData) return [newComment]
        return [...prevData, newComment]
      })
    },
  })
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCommentApi,
    onSuccess: (updatedComment: Comment) => {
      queryClient.setQueryData<Comment[]>(["comments", updatedComment.postId], (prevData = []) => {
        return prevData.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment))
      })
    },
  })
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: (deletedComment: Comment) => {
      queryClient.setQueryData<Comment[]>(["comments", deletedComment.postId], (old = []) => {
        return old.filter((comment) => comment.id !== deletedComment.id)
      })
    },
  })
}
