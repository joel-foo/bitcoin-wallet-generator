<template>
  <nav>
    <ul>
      <!-- <li><router-link to="/" class="nav-link">home</router-link></li>
      <li><router-link to="/about" class="nav-link">about</router-link></li>
      <li>
        <router-link to="/download" class="nav-link">download</router-link>
      </li> -->
      <li>
        <router-link to="/playground" class="nav-link">playground</router-link>
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@200&family=Montserrat:wght@300;600&display=swap');
@import '@/assets/styles/general';

* {
  box-sizing: border-box;
}

html,
body,
div,
h1,
h2,
h5,
p,
a,
img,
ul,
li,
form,
label,
table,
canvas,
footer,
nav {
  margin: 0;
  padding: 0;
  border: 0;
}

button,
textarea {
  outline: 0;
  border: 0;
}

textarea {
  resize: none;
  outline: 1px solid rgb(143, 141, 141);
  border: 1px solid transparent;
}

textarea:focus,
input:focus {
  border: 1px solid transparent;
  outline: 1px solid steelblue;
}

button,
i {
  cursor: pointer;
}

html,
body {
  width: 100%;
}

#app {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  @include flex-col-center;
  width: 100%;
}

#app > section {
  min-height: calc(100vh - 60px);
  @include flex-col-center;
}

nav {
  background-color: #2e50d8;
  z-index: 999;
  width: 100%;
  padding: 20px;
  @include flex-row-center;
  justify-content: flex-end;
}

nav ul {
  list-style-type: none;
  display: flex;
  gap: 10px;
}

.nav-link {
  text-decoration: none;
  color: white;
  opacity: 0.75;
  position: relative;
}

.nav-link::before {
  transition: 300ms;
  height: 5px;
  width: 0%;
  bottom: -5px;
  content: '';
  position: absolute;
  background-color: #feda48;
}

.nav-link:hover::before {
  width: 100%;
}

.btn {
  margin: 20px 0 0;
  width: 150px;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  font-family: inherit;
  font-size: 16px;
  @include flex-row-center;
}

.btn:hover {
  transform: scale(1.02);
}

.grid-container {
  display: grid;
  gap: 10px;
}

.grid-container > div {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  height: 200px;
  @include flex-col-center;
  width: 90vw;
  border-radius: 5px;
}

.grid-container > div i {
  font-size: 40px;
}

// @media screen and (max-width: ) {
// }
</style>
