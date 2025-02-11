<script setup lang="ts">
import { onMounted, ref } from "vue";

import WordleBoard from "@/components/WordleBoard.vue";

export interface Letter {
    char: string;
    color: "green" | "yellow" | "gray" | "";
}

export interface Attempt {
    letters: Letter[];
}

import allWordsJson from "@/data/all_words.json";
import puzzleWordsJson from "@/data/puzzle_words.json";

const MAX_ATTEMPTS = 6;
const MAX_LETTERS = 5;

const secretWord = ref<string>("");
const allWords = ref<string[]>([]);

const guess = ref<string>("");
const attempts = ref<Attempt[]>([]);
const message = ref<string>("");
const gameOver = ref<boolean>(false);
const currentGuess = ref<string[]>([]);

function isValidWord(word: string): boolean {
    return allWords.value.includes(word.toLowerCase());
}

function submitGuess() {
    if (gameOver.value || guess.value.length !== MAX_LETTERS) return;

    if (!isValidWord(guess.value)) {
        message.value = "Ongeldig woord!";
        return;
    }

    message.value = "";

    // const guess = currentGuess.value.join("");

    const attempt: Attempt = { letters: [] };
    for (let i = 0; i < MAX_LETTERS; i++) {
        if (guess.value[i] === secretWord.value[i]) {
            attempt.letters.push({ char: guess.value[i], color: "green" });
        } else if (secretWord.value.includes(guess.value[i])) {
            attempt.letters.push({ char: guess.value[i], color: "yellow" });
        } else {
            attempt.letters.push({ char: guess.value[i], color: "gray" });
        }
    }

    attempts.value.push(attempt);

    if (guess.value === secretWord.value) {
        gameOver.value = true;
        message.value = "Gewonnen!";
    } else if (attempts.value.length >= MAX_ATTEMPTS) {
        gameOver.value = true;
        message.value = `Verloren! Het woord was: ${secretWord.value}`;
    }
    guess.value = "";
    currentGuess.value = [];
}

function handleKeyInput(event: KeyboardEvent) {
    if (gameOver.value) return;

    if (event.key === "Enter") {
        submitGuess();
    }
}

function loadWords() {
    try {
        const puzzleWords: string[] = puzzleWordsJson.puzzel_woorden;
        secretWord.value = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];

        allWords.value = allWordsJson.alle_woorden;
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

onMounted(() => {
    loadWords();
    window.addEventListener("keydown", handleKeyInput);
});

// CORS ISSUE
// async function fetchWords() {
//     try {
//         const secretWordsResponse = await fetch("https://api-334903298972.uscentral1.run.app/puzzel_woorden", {
//             // Only use this in development!
//             mode: "no-cors",
//         });
//         const secretWords = await secretWordsResponse.json();
//         secretWord.value = secretWords[Math.floor(Math.random() * secretWords.length)];
//
//         const allWordsResponse = await fetch("https://api-334903298972.uscentral1.run.app/woorden", {
//             mode: "no-cors",
//         });
//         allWords.value = await allWordsResponse.json();
//     } catch (error) {
//         console.error("Error fetching words:", error);
//     }
// }
</script>

<template>
    <!-- <div> -->
    <!--     <pre>SECRET: {{ secretWord }}</pre> -->
    <!-- </div> -->

    <input v-model="guess" maxlength="5" @keyup.enter="submitGuess" />
    <button @click="submitGuess">Submit</button>
    <p>{{ message }}</p>
    <WordleBoard :attempts="attempts" :current-guess="currentGuess" />
</template>

<style lang="scss" scoped>
input {
    border: 1px solid black;
    margin: 20px 0px;
}
</style>
