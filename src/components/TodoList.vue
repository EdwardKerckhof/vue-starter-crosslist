<script setup lang="ts">
import TodoForm from "@/components/TodoForm.vue";
import TodoItem from "@/components/TodoItem.vue";
import { useTodoStore } from "@/stores/todo.store";

const todoStore = useTodoStore();
</script>

<template>
    <div>
        <h1 class="mb-5 text-3xl text-green-400">My Todo List</h1>
        <TodoForm />
        <div>
            <TodoItem v-for="todo in todoStore.todos" :key="todo.id" :todo="todo" />
        </div>
    </div>
</template>
