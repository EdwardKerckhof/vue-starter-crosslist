<script setup lang="ts">
import type { Attempt } from "./WordleGame.vue";

const props = defineProps<{
    attempts: Attempt[];
    currentGuess: string[];
}>();

function getLetter(row: number, col: number): string {
    return props.attempts[row]?.letters[col]?.char || "";
}

function getLetterColor(row: number, col: number): string {
    return props.attempts[row]?.letters[col]?.color || "";
}
</script>

<template>
    <div class="grid">
        <div v-for="(_i, row) in 6" :key="row" class="row">
            <div v-for="(_j, col) in 5" :key="col" class="box" :class="getLetterColor(row, col)">
                {{ getLetter(row, col) }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-rows: repeat(6, 2fr);
    gap: 5px;

    .row {
        display: flex;
        gap: 5px;

        .box {
            width: 60px;
            height: 60px;
            border: 2px solid #000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            text-transform: uppercase;
        }
    }
}

.green {
    background-color: green;
    color: white;
}

.yellow {
    background-color: orange;
    color: white;
}

.gray {
    background-color: gray;
    color: white;
}
</style>
