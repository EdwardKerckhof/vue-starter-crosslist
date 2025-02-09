<script setup lang="ts">
import { ref } from "vue";

import { useTodoStore } from "@/stores/todo.store";
import type { Todo } from "@/types";

const todoStore = useTodoStore();

const todoTitle = ref<string>("");
const editingTodoId = ref<number | null>(null);
const editedTodoTitle = ref<string>("");

function addTodo() {
    if (!todoTitle.value.trim()) return;
    todoStore.addTodo(todoTitle.value);
    todoTitle.value = "";
}

function removeTodo(id: number) {
    todoStore.removeTodo(id);
}

function startEditingTodo(todo: Todo) {
    editedTodoTitle.value = todo.title;
    editingTodoId.value = todo.id;
}

function cancelEditing() {
    editingTodoId.value = null;
    editedTodoTitle.value = "";
}

function editTodo(id: number) {
    todoStore.updateTodo(id, editedTodoTitle.value);
    cancelEditing();
}
</script>

<template>
    <div>
        <h1 class="mb-5 text-3xl text-green-400">My Todo List</h1>
        <form class="mb-2" @submit.prevent>
            <input id="todoTitle" v-model="todoTitle" type="text" placeholder="New todo" />
            <button @click="addTodo">Add</button>
        </form>
        <div>
            <div v-for="todo in todoStore.todos" :key="todo.id">
                <div class="flex items-center gap-2">
                    <input :id="`todoCompleted-${todo.id}`" v-model="todo.completed" type="checkbox" />
                    <div class="w-64">
                        <div v-if="editingTodoId !== todo.id" class="flex items-center justify-between">
                            <label :for="`todoCompleted-${todo.id}`" :class="{ 'line-through': todo.completed }">
                                {{ todo.title }}
                            </label>
                            <button v-if="!todo.completed" class="border px-2" @click="startEditingTodo(todo)">
                                🖉
                            </button>
                        </div>
                        <div v-else class="flex items-center justify-between">
                            <input :id="`todoEdit-${todo.id}`" v-model="editedTodoTitle" type="text" />
                            <button class="border px-2" @click="editTodo(todo.id)">✓</button>
                            <button class="border px-2" @click="cancelEditing">X</button>
                        </div>
                    </div>
                    <button class="border px-2 text-red-500" @click="removeTodo(todo.id)">🗑</button>
                </div>
            </div>
        </div>
    </div>
</template>
