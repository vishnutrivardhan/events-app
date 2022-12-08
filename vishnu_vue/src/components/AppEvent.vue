<template>
  <div class="container">
    <div class="events">
      <h1>{{ app_event.title }}</h1>
      <p>{{ app_event.description }}</p>
      <p>Date:{{ app_event.date }}</p>
      <p>Start Time:{{ app_event.start_time }}</p>
      <p>End Time:{{ app_event.end_time }}</p>
      <p>Venue:{{ app_event.venue }}</p>
      <p>Availability:{{ app_event.availability }}</p>
      <button class="delete-btn" @click="onDelete(app_event.id)">
        Delete Event
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppEvent",
  props: {
    app_event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDelete(id) {
      this.$emit("delete-event", id);
    },
  },
  emits: ["delete-event"],
};
</script>

<style scoped>
.container {
  background-color: #ccc;
  padding: 10px;
  margin: 10px auto;
}
.delete-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
