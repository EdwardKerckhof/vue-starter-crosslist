<script setup lang="ts">
import { ref } from "vue";

import { useTodoStore } from "@/stores/todo.store";
import type { Todo } from "@/types";

const props = defineProps<{ todo: Todo }>();

const todoStore = useTodoStore();

const isEditing = ref<boolean>(false);
const newTitle = ref<string>(props.todo.title);

function editTodo() {
    todoStore.updateTodo(props.todo.id, newTitle.value);
    isEditing.value = false;
}
</script>

<template>
    <div class="flex items-center gap-2">
        <input
            :id="`todoCompleted-${todo.id}`"
            :checked="todo.completed"
            type="checkbox"
            @change="todoStore.toggleCompleted(todo.id)"
        />
        <div class="w-64">
            <div v-if="!isEditing" class="flex items-center justify-between">
                <label :for="`todoCompleted-${todo.id}`" :class="{ 'line-through': todo.completed }">
                    {{ todo.title }}
                </label>
                <button v-if="!todo.completed" @click="isEditing = true">🖉</button>
            </div>
            <div v-else class="flex items-center justify-between">
                <input v-model="newTitle" type="text" />
                <button @click="editTodo()">✓</button>
                <button @click="isEditing = false">X</button>
            </div>
        </div>
        <button @click="todoStore.removeTodo(todo.id)">🗑</button>
    </div>
</template>

<style scoped>
button {
    border: 1px solid #333;
    padding-inline: 0.5rem;
}
</style>
