import { defineStore } from "pinia";
import { ref, watch } from "vue";

import type { IStorageService } from "@/storage/interfaces/storage-service.interface";
import { LocalStorage } from "@/storage/local-storage";
import type { Todo } from "@/types";

const STORAGE_KEY = "todos";
const storage: IStorageService = new LocalStorage();

export const useTodoStore = defineStore("todo", () => {
    const todos = ref<Todo[]>(
        storage.get(STORAGE_KEY) || [
            {
                id: 1,
                title: "My first todo!",
                completed: false,
            },
            {
                id: 2,
                title: "My second todo!",
                completed: false,
            },
            {
                id: 3,
                title: "My third todo!",
                completed: false,
            },
        ]
    );

    function addTodo(title: string) {
        if (!title.trim()) return;

        todos.value.push({
            id: todos.value.length + 1,
            title,
            completed: false,
        });
    }

    function removeTodo(id: number) {
        todos.value = todos.value.filter((todo) => todo.id !== id);
    }

    function updateTodo(id: number, updatedTitle: string) {
        const todo = todos.value.find((todo) => todo.id === id);
        if (todo) todo.title = updatedTitle;
    }

    function toggleCompleted(id: number) {
        const todo = todos.value.find((todo) => todo.id === id);
        if (todo) todo.completed = !todo.completed;
    }

    watch(
        todos,
        (newTodos) => {
            storage.set(STORAGE_KEY, newTodos);
        },
        { deep: true }
    );

    return { todos, addTodo, removeTodo, updateTodo, toggleCompleted };
});
