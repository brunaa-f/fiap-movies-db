"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import type { Comment } from "@/types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface CommentSectionProps {
  comments: Comment[]
  onAddComment: (text: string) => void
}

export default function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const { user } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    onAddComment(newComment)
    setNewComment("")
  }

  return (
    <div className="space-y-6">
      {comments.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">Be the first to leave a comment!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?text=${comment.username.charAt(0)}`} />
                <AvatarFallback>{comment.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{comment.username}</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(comment.date), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center p-4 border border-dashed rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">Please log in to leave a comment</p>
        </div>
      )}
    </div>
  )
}
