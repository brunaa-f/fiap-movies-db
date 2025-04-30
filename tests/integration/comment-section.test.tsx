import CommentSection from "@/components/comment-section";
import { Comment } from "@/types";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, vi, it } from "vitest";

const mockComments: Comment[] = [
    {
        id: "comment-1",
        movieId: "movie-1",
        userId: "user-1",
        username: "johndoe",
        text: "Filme muito legal",
        date: "2023-01-15T12:30:00Z"
    },
    {
        id: "comment-2",
        movieId: "movie-1",
        userId: "user-2",
        username: "janedoe",
        text: "The visual effects are amazing. Christopher Nolan is a genius!",
        date: "2023-02-20T15:45:00Z",
    },
]

vi.mock("@/context/auth-context", () => ({
    useAuth: () => ({
        user: { id: "user-3", username: "joao" },
    })
}))

describe("Integração da seção de comentários", () => {
    it("deve renderizar um comentário ao enviar um novo comentário", async () => {
        const CommentSectionWrapper = () => {
            const [comments, setComments] = useState<Comment[]>(mockComments)
    
            const handleNewComment = (text: string) => {
                const newComment: Comment ={
                    id: `comment-${comments.length + 1}`,
                    movieId: "movie-1",
                    userId: "user-3",
                    username: "joao",
                    text,
                    date: new Date().toISOString(),
                }
    
                setComments([...comments, newComment])
            }

            return <CommentSection comments={comments} onAddComment={handleNewComment} />
        }

        render(<CommentSectionWrapper />)

        expect(screen.getByText("Filme muito legal")).toBeInTheDocument();
        expect(screen.getByText("The visual effects are amazing. Christopher Nolan is a genius!")).toBeInTheDocument();

        const commentTextArea = screen.getByPlaceholderText("Add a comment...")
        const commentButton = screen.getByText("Post Comment")
        const newCommentText = "Incrível!"

        fireEvent.change(commentTextArea, { target: { value: newCommentText } })
        fireEvent.click(commentButton)

        expect(screen.getByText(newCommentText)).toBeInTheDocument()
        expect(screen.getByText("joao")).toBeInTheDocument()
        expect(screen.getByText("less than a minute ago")).toBeInTheDocument()
    })
})