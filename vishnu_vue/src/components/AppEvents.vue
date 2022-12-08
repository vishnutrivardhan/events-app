<template>
  <!-- App Event for loop -->
  <div class="events">
    <h1>Events</h1>
    <div class="event" v-for="event in events" :key="event.id">
      <AppEvent
        @delete-event="$emit('delete-event', event.id)"
        :app_event="event"
      />
    </div>
  </div>
</template>
<script>
import AppEvent from "./AppEvent.vue";
export default {
  name: "AppEvents",
  components: {
    AppEvent: AppEvent,
  },
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  emits: ["delete-event"],
};
</script>
