const { Server } = require("socket.io");

const io = new Server(3001, {
  path: "/socket.io",
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const responses = {
  "hi": "Hello! How can I help you?",
  "help": "Here are some options:\n1. Product Info\n2. Support\n3. Contact Us",
  "1": "Our products include AI chatbots, web apps, and more.",
  "2": "Please describe your issue, and I'll assist you.",
  "3": "You can contact us at support@example.com.",
};

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit("newMessage", { text: "Server: Welcome! Type 'help' to see options.", isServer: true });

  socket.on("sendMessage", (text) => {
    console.log("Received:", text);
    const response = responses[text.toLowerCase()] || "I'm not sure, can you rephrase?";
    setTimeout(() => {
      io.emit("newMessage", { text: `Server: ${response}`, isServer: true });
    }, 1000);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
}); 

console.log("WebSocket server running on http://localhost:3001");
