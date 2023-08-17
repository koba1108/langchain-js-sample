<script setup lang="ts">
import { SenderType, Message } from "~/types";

const loading = ref(false);
const messages = ref<Message[]>([]);
const inputText = ref("");

function loadingStart() {
  loading.value = true;
}

function loadingEnd() {
  loading.value = false;
}

function scrollToBottom() {
  const el = document.querySelector(".grow");
  if (el) {
    el.scrollTop = el.scrollHeight;
  }
}

function addUserMessage() {
  messages.value.push({
    sender: SenderType.USER,
    message: inputText.value,
    date: new Date(),
  });
}

async function fetchBotMessage() {
  try {
    loadingStart();
    await nextTick(() => {
      scrollToBottom();
    });

    const url = "http://localhost:3000/tekken";
    const { data } = await useFetch<{ text: string }>(url, {
      method: "POST",
      body: JSON.stringify({
        prompt: inputText.value,
      }),
    });

    if (data.value) {
      messages.value.push({
        sender: SenderType.BOT,
        message: data.value?.text,
        date: new Date(),
      });
      inputText.value = "";
    }
  } catch (e) {
    console.error(e);
    alert("エラーが発生しました");
  } finally {
    loadingEnd();
  }
}

async function sendMessage() {
  addUserMessage();
  await fetchBotMessage();
}
</script>

<template>
  <div class="gray-800">
    <main class="min-h-screen">
      <div class="mx-auto max-w-6xl">
        <header
          class="flex h-16 w-full items-center justify-center border-b p-5"
        >
          <span class="font-semibold">鉄拳AIちゃん</span>
        </header>
        <div class="flex h-[calc(100vh-64px)] w-full flex-col">
          <div class="grow space-y-2 overflow-y-auto p-5">
            <MessageBubble v-for="(m, idx) in messages" :key="idx" :msg="m" />
            <div v-if="loading" class="rounded-lg p-6 mb-16">
              <LoadingUI class="mt-2" />
            </div>
          </div>
          <div
            class="flex h-16 w-full shrink-0 items-center gap-3 bg-white px-3"
          >
            <input
              class="input h-10"
              type="text"
              :readonly="loading"
              v-model="inputText"
              placeholder="質問を入力してね"
            />
            <button
              type="button"
              class="h-10 w-16 btn btn-primary shrink-0"
              :disabled="loading || !inputText"
              @click="sendMessage"
            >
              送信
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
