<script setup lang="ts">
import TodoForm from "@/components/TodoForm.vue";
import TodoItem from "@/components/TodoItem.vue";
import { useTodoStore } from "@/stores/todo.store";

const todoStore = useTodoStore();
</script>

<template>
    <div>
        <TodoForm />
        <div>
            <TodoItem v-for="todo in todoStore.todos" :key="todo.id" :todo="todo" />
        </div>
    </div>
</template>
