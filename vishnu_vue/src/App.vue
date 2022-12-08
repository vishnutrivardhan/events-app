<template>
  <div class="container">
    <AppHeader />
    <AppEvents @delete-event="deleteEvent" :events="events" />

    <AddEvent @add-event="addEvent"></AddEvent>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppEvents from "./components/AppEvents.vue";
import AddEvent from "./components/AddEvent.vue";
export default {
  name: "App",
  components: {
    AppHeader,
    AppEvents,
    AddEvent,
  },
  data() {
    return {
      events: [],
    };
  },
  methods: {
    async deleteEvent(id) {
      console.log("deleteEvent", id);
      await fetch("http://174.138.40.202/api/delete-event/" + id, {
        method: "DELETE",
      });
      this.fetchEvents();
    },
    async addEvent(event) {
      // Add id to event
      const id = Math.floor(Math.random() * 10000) + 1;
      const newEvent = { id, ...event };
      await fetch("http://174.138.40.202/api/add-event", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      this.fetchEvents();
    },
    async fetchEvents() {
      // Fetch events from API
      const res = await fetch("http://174.138.40.202/api/events", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      this.events = data;
      console.log("fetchEvents", data);
    },
  },
  created() {
    this.fetchEvents();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  max-width: 80%;
  margin: 0 auto;
  border: 1px solid #999;
  box-sizing: border-box;
}
</style>
