<script setup lang="ts">
import { ref } from "vue";

import { useTodoStore } from "@/stores/todo.store";

const todoStore = useTodoStore();

const todoTitle = ref<string>("");

function addTodo() {
    if (!todoTitle.value.trim()) return;
    todoStore.addTodo(todoTitle.value);
    todoTitle.value = "";
}
</script>

<template>
    <form class="mb-2" @submit.prevent="addTodo">
        <input id="todoTitle" v-model="todoTitle" class="mr-2 border p-2" type="text" placeholder="New todo" />
        <button class="bg-blue-500 px-4 py-2 text-white">Add</button>
    </form>
</template>

<style scoped>
input {
    padding: 0.5rem;
    border: 1px solid #ccc;
}
</style>
