<script lang="ts" setup>
import dayjs from "dayjs";
import { SenderType, Message } from "~/types";

defineProps<{ msg: Message }>();

function isUser(msg: Message): boolean {
  return msg.sender === SenderType.USER;
}
</script>

<template>
  <div
    class="max-w-[60%] rounded-lg p-3 border border-gray-300"
    :class="isUser(msg) ? 'ml-auto bg-gray-300/20' : ''"
  >
    <div>
      <p class="text-sm break-words whitespace-pre-wrap">{{ msg.message }}</p>
      <p class="mt-2 text-xs text-gray-400">
        {{ dayjs(msg.date).format("YYYY/MM/DD HH:mm:ss") }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
