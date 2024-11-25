<template>
    <div id="app">
        <h1>My App</h1>
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<style>
/* Animasi fade */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
