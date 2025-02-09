<script setup lang="ts">
import { onMounted } from "vue";

import { usePostStore } from "@/stores/post.store";

import PostForm from "./PostForm.vue";

const postStore = usePostStore();

onMounted(() => {
    postStore.fetchPosts();
});
</script>

<template>
    <div>
        <h1 class="mb-5 text-3xl text-green-400">Posts</h1>

        <div class="mb-4">
            <PostForm />
        </div>

        <p v-if="postStore.isLoading">Loading posts...</p>

        <ul v-else>
            <li v-for="post in postStore.posts" :key="post.id" class="flex items-center justify-between border-b p-2">
                <div>
                    <h3 class="font-semibold">{{ post.title }}</h3>
                    <p>{{ post.body }}</p>
                </div>
                <button class="border px-2 py-1 text-white" @click="postStore.deletePost(post.id)">🗑</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
input {
    padding: 0.5rem;
    border: 1px solid #ccc;
}
</style>
