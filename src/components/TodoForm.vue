<script setup lang="ts">
import { ref } from "vue";

import { useTodoStore } from "@/stores/todo.store";

const todoStore = useTodoStore();

const todoTitle = ref<string>("");

function add() {
    if (!todoTitle.value.trim()) return;
    todoStore.addTodo(todoTitle.value);
    todoTitle.value = "";
}
</script>

<template>
    <form class="mb-2" @submit.prevent>
        <input id="todoTitle" v-model="todoTitle" type="text" placeholder="New todo" />
        <button @click="add">Add</button>
    </form>
</template>
