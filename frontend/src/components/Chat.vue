<template>
  <div
    class="w-full h-full bg-gray-100 overflow-y-scroll pt-4"
    ref="chatContainer"
  >
    <div v-for="message in messages" :key="message.id">
      <p v-if="message.isAI" class="text-chatin relative">
        <span class="text-lead absolute top-0 left-0 pl-2 pt-1"
          >gpt-3.5-turbo</span
        >
        {{ message.content }}
      </p>
      <p v-else class="text-chatout relative">
        <span class="text-lead absolute top-0 left-0 pl-2 pt-1">You</span>
        {{ message.content }}
      </p>
    </div>
    <p v-if="buffer" class="text-chatin relative">
      <span class="text-lead absolute top-0 left-0 pl-2 pt-1"
        >gpt-3.5-turbo</span
      >
      {{ buffer }}
    </p>
  </div>

  <form
    @submit.prevent="sendMessage"
    class="w-full flex flex-row overflow-hidden"
  >
    <input
      class="w-full m-0"
      type="text"
      placeholder="Messages for gpt-3.5-turbo here..."
      v-model="userMessage"
      required
    />
    <button class="btn-success m-0">Send</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      buffer: "",
      messages: [],
      userMessage: "",
      apiKey: "REDACTED",
      endpoint: "https://api.openai.com/v1/chat/completions",
    };
  },
  methods: {
    async sendMessage() {
      const STREAM = true;

      // Add user message to the chat
      this.messages.push({
        id: Date.now(),
        content: this.userMessage,
        isAI: false,
      });

      // Call the API to get AI response
      const body = {
        model: "gpt-3.5-turbo",
        temperature: 0.1,
        messages: [{ role: "user", content: this.userMessage }],
        stream: STREAM,
      };
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
      };
      const requestData = {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify(body),
      };

      // Clear the input field
      this.userMessage = "";

      if (STREAM) {
        const response = await fetch(this.endpoint, requestData);
        const decoder = new TextDecoder("utf-8");
        const reader = response.body.getReader();
        while (true) {
          const chunk = await reader.read();
          const { done, value } = chunk;
          if (done) break;

          const decodedChunk = decoder.decode(value);
          const lines = decodedChunk.split("\n");
          const parsedLines = lines
            .map((line) => line.replace(/^data: /, "").trim())
            .filter((line) => line !== "" && line !== "[DONE]")
            .map((line) => JSON.parse(line));

          for (const parsedLine of parsedLines) {
            const { choices } = parsedLine;
            const { delta } = choices[0];
            const { content } = delta;
            if (content) {
              this.buffer += content;
              this.$refs.chatContainer.scrollTop =
                this.$refs.chatContainer.scrollHeight;
            }
          }
        }
        this.messages.push({
          id: Date.now(),
          content: this.buffer.trim(),
          isAI: true,
        });
      }

      if (!STREAM) {
        try {
          const response = await axios.post(this.endpoint, body, options);
          console.log(response);
          this.messages.push({
            id: Date.now(),
            content: response.data.choices[0].message.content.trim(),
            isAI: true,
          });
        } catch (error) {
          this.messages.push({
            id: Date.now(),
            content: JSON.parse(error.request.response).error.message,
            isAI: true,
          });
        }
      }

      this.$nextTick(() => {
        this.buffer = "";
        this.$refs.chatContainer.scrollTop =
          this.$refs.chatContainer.scrollHeight;
      });
    },
  },
};
</script>
