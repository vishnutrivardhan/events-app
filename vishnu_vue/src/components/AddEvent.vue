<template>
  <div class="container">
    <h1>Add Event</h1>
    <form @submit="onSubmit">
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <div class="form-control">
        <label for="date">Date</label>
        <input type="date" id="date" v-model="date" />
      </div>
      <!-- Start time -->
      <div class="form-control">
        <label for="time">Start Time</label>
        <input type="time" id="start_time" v-model="start_time" />
      </div>
      <!-- End time -->
      <div class="form-control">
        <label for="time">End Time</label>
        <input type="time" id="end_time" v-model="end_time" />
      </div>
      <!-- Venue -->
      <div class="form-control">
        <label for="venue">Venue</label>
        <input type="text" id="venue" v-model="venue" />
      </div>
      <!-- Availability -->
      <div class="form-control">
        <label for="availability">Availability</label>
        <input type="number" id="availability" v-model="availability" />
      </div>
      <div class="form-control">
        <button class="btn" @click.prevent="onSubmit">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      date: "",
      start_time: "",
      end_time: "",
      venue: "",
      availability: "",
    };
  },
  methods: {
    onSubmit() {
      if (!this.title || !this.description || !this.date) {
        alert("Please fill in all fields");
        return;
      }
      const event = {
        title: this.title,
        description: this.description,
        date: this.date,
        start_time: this.start_time,
        end_time: this.end_time,
        venue: this.venue,
        availability: this.availability,
      };
      this.$emit("add-event", event);
      this.title = "";
      this.description = "";
      this.date = "";
      this.start_time = "";
      this.end_time = "";
      this.venue = "";
      this.availability = "";
    },
  },
  emits: ["add-event"],
};
</script>

<style scoped>
.container {
  background-color: #ccc;
  padding: 30px;
  margin: 10px auto;
  box-sizing: border-box;
}
.container form {
  width: 70%;
  min-width: 350px;
  margin: 10px auto;
}
.form-control {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.form-control label {
  margin-bottom: 5px;
  font-size: 100%;
}
.form-control input,
.form-control textarea {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.form-control button {
  background-color: green;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px auto;
}
</style>
