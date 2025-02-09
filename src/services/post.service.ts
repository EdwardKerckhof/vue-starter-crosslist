import type { CreatePostRequest, Post } from "@/types/post.type";

import { ApiClient } from "./api-client";

const apiClient = new ApiClient("https://jsonplaceholder.typicode.com");

const PostService = {
    getPosts: () => apiClient.get<Post[]>("posts"),
    createPost: (data: CreatePostRequest) => apiClient.post<Post>("posts", data),
    deletePost: (id: number) => apiClient.delete(`posts/${id}`),
};

export default PostService;
