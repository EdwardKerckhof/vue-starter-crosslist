<script setup lang="ts">
import { ref } from "vue";

import { usePostStore } from "@/stores/post.store";

const postStore = usePostStore();

const title = ref("");
const body = ref("");

function addPost() {
    if (!title.value.trim() || !body.value.trim()) return;
    postStore.addPost({ userId: 1, title: title.value, body: body.value });
    title.value = "";
    body.value = "";
}
</script>

<template>
    <form @submit.prevent="addPost">
        <input v-model="title" placeholder="Title" class="mr-2 border p-2" />
        <input v-model="body" placeholder="Body" class="mr-2 border p-2" />
        <button class="bg-blue-500 px-4 py-2 text-white">Add Post</button>
    </form>
</template>

<style scoped>
input {
    padding: 0.5rem;
    border: 1px solid #ccc;
}
</style>
