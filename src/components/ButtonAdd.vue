<template>
    <label for="btn">
        <input :type="btnType" id="btn" :value="btnText" @click="addNewVal">
    </label>
</template>

<script>
  export default {
    name: 'ButtonAdd',
    props: {
      btnText: String,
      btnType: String,
      typeVal: Object,
      ruleVal: Array,
      urlValues: String
    },
    methods: {
      addNewVal () {
        if (this.urlValues){
          this.$store.dispatch('addNewTargetingRules', {
            "targeting_type_id": this.typeVal.id,
            "rules": [this.urlValues]
          })
        }
        this.$store.commit('setAddClicked', true)
        this.$store.commit('setAddedDataList', {type:this.typeVal, rules: this.ruleVal})
      }
    }
  }
</script>

<style scoped>
    input {
        text-transform: uppercase;
        padding: 8px 10px;
    }
</style>