<script>
export default {
  watch: {
    todos: {
      handler() {
        console.log("todos changed");
      },
    },
  },
  methods: {
    onTodoChange(todo) {
      this.todos = this.todos.map((lastTodo) => {
        if (lastTodo.id === todo.id)
          return {
            ...lastTodo,
            isComplete: !lastTodo.isComplete,
          };

        return lastTodo;
      });
    },
  },
  data() {
    return {
      todos: [
        {
          id: 0,
          text: "Go to the grocery store",
          isComplete: false,
        },
        {
          id: 1,
          text: "Learn Vue",
          isComplete: true,
        },
        {
          id: 2,
          text: "Sleep 8 hours a night",
          isComplete: false,
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <h1>Todos</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="todo">
        <input
          type="checkbox"
          :checked="todo.isComplete"
          v-on:change="onTodoChange(todo)"
        />
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo {
  color: dodgerblue;
}
</style>
