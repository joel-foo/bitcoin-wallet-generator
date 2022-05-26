<template>
  <nav>
    <ul>
      <li><router-link to="/" class="nav-link">home</router-link></li>
      <li><router-link to="/about" class="nav-link">about</router-link></li>
      <li>
        <router-link to="/download" class="nav-link">download</router-link>
      </li>
      <li>
        <router-link to="/playground" class="nav-link">playground</router-link>
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<script setup lang="ts"></script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@200&family=Montserrat:wght@300;600&display=swap');

* {
  box-sizing: border-box;
}

body,
html {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%); */
  min-height: 100vh;
}

nav {
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 9999;
}

nav ul {
  list-style-type: none;
  display: flex;
  gap: 10px;
}

.nav-link {
  text-decoration: none;
  color: black;
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
  outline: 0;
  border: 0;
  border-radius: 5px;
  font-family: inherit;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn:hover {
  cursor: pointer;
  transform: scale(1.02);
}

.grid-container {
  display: grid;
  gap: 10px;
}

.grid-container > div {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  border-radius: 5px;
}

.grid-container > div i {
  font-size: 40px;
}
</style>
