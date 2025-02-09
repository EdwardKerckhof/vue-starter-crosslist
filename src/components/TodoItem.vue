<script setup lang="ts">
import type { Todo } from "@/types";

defineProps<{ todo: Todo }>();
</script>

<template>
    <div class="flex items-center gap-2">
        <input :id="`todoCompleted-${todo.id}`" v-model="todo.completed" type="checkbox" />
        <div class="w-64">
            <div v-if="editingTodoId !== todo.id" class="flex items-center justify-between">
                <label :for="`todoCompleted-${todo.id}`" :class="{ 'line-through': todo.completed }">
                    {{ todo.title }}
                </label>
                <button v-if="!todo.completed" class="border px-2" @click="startEditingTodo(todo)">🖉</button>
            </div>
            <div v-else class="flex items-center justify-between">
                <input :id="`todoEdit-${todo.id}`" v-model="editedTodoTitle" type="text" />
                <button class="border px-2" @click="editTodo(todo.id)">✓</button>
                <button class="border px-2" @click="cancelEditing">X</button>
            </div>
        </div>
        <button class="border px-2 text-red-500" @click="removeTodo(todo.id)">🗑</button>
    </div>
</template>
