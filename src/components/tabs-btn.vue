<template>
    <div id="dynamic-component-demo" class="demo">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
      >
        {{ tab }}
      </button>    

      <component v-bind:is="currentTabComponent" class="tab"></component>
    </div>
</template>


<script>

export default {
    data() {
        return {
            currentTab: "first",
            tabs: ["first", "second"]
        }
    },
    computed: {
        currentTabComponent: function() {
            return "tab-" + this.currentTab.toLowerCase();
        }
    }
}

</script>
