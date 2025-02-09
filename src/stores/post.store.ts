import { defineStore } from "pinia";
import { ref } from "vue";

import PostService from "@/services/post.service";
import type { CreatePostRequest, Post } from "@/types/post.type";

export const usePostStore = defineStore("post", () => {
    const posts = ref<Post[]>([]);
    const isLoading = ref<boolean>(false);

    async function fetchPosts() {
        isLoading.value = true;
        try {
            posts.value = await PostService.getPosts();
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            isLoading.value = false;
        }
    }

    async function addPost(data: CreatePostRequest) {
        const originalPosts = [...posts.value];
        posts.value.unshift({ id: posts.value.length + 1, ...data });

        try {
            await PostService.createPost(data);
        } catch (error) {
            console.error("Error adding post:", error);
            posts.value = originalPosts;
        }
    }

    async function deletePost(id: number) {
        const originalPosts = [...posts.value];
        posts.value = posts.value.filter((post) => post.id !== id);

        try {
            await PostService.deletePost(id);
        } catch (error) {
            console.error("Error adding post:", error);
            posts.value = originalPosts;
        }
    }

    return { posts, isLoading, fetchPosts, addPost, deletePost };
});
