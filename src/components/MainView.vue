<template>
    <div>
        <h2>Ad Targeting</h2>
        <section class="add-type-rules__block">
            <!--            Types select -->
            <div>
                <label class="typo__label">Type</label>
                <multiselect v-model="value"
                             :options="typesState"
                             :close-on-select="true"
                             :clear-on-select="false"
                             :preserve-search="true"
                             placeholder="Pick some"
                             label="name"
                             track-by="name"
                             :preselect-first="true"
                             @input="checkNewSelectedType"
                             @select="checkSelectedValue">
                    <template slot="selection" slot-scope="{ values, isOpen }">
                    <span class="multiselect__single"
                          v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                    </template>
                </multiselect>
            </div>

            <!-- Rules select -->
            <div>
                <label class="typo__label">Rules</label>
                <div v-if="isDisabled" class="rules-multiselect">
                    <multiselect v-model="ruleValue" :options="targetingTypeList"
                                 :multiple="true"
                                 :group-select="true"
                                 placeholder="Type to search"
                                 track-by="name"
                                 label="name"
                    >
                        <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                    </multiselect>
                    <span @click="deleteSelectedRules">x</span>
                </div>
                <div v-else>
                    <input style="height: 25px;" v-model="urlValues">
                    <p> free-type the rules in comma-separated format</p>
                </div>
            </div>
            <div class="buttons__block">
                <button @click="resetData">Reset</button>
                <button-add
                    :btnType="submit"
                    :btnText="add"
                    :typeVal="value"
                    :ruleVal="ruleValue"
                    :urlValues="urlValues"
                    :disble="disableBtn"
                ></button-add>
            </div>
        </section>
        <saved-rules v-if="isAddClicked" :urlValues="urlValues"/>
        <cant-select v-if="cantSelectStatus" @removeSelectedType="removeSelectedType"></cant-select>
    </div>
</template>

<script>

  import Multiselect from 'vue-multiselect'
  import {mapState, mapGetters} from "vuex";
  import ButtonAdd from "./ButtonAdd";
  import SavedRules from "./SavedRules";
  import CantSelect from "./CantSelect";

  export default {
    name: 'MainView',
    components: {CantSelect, SavedRules, ButtonAdd, Multiselect},
    data() {
      return {
        value: null,
        ruleValue: null,
        options: [],
        isDisabled: true,
        add: 'Add rule',
        submit: 'submit',
        reset: 'reset',
        urlValues: '',
        disableBtn: true,
        typesList: null
      }
    },
    props: {
      msg: String,
    },
    watch: {
      value() {
        return this.value
      },
      ruleValue() {
        return this.ruleValue
      },
      urlValues(val) {
        return val
      },
      getTypesList(val) {
        return val
      }
    },
    methods: {
      removeSelectedType(val){
       this.value= val
      },
      checkNewSelectedType() {
        this.ruleValue = []
        if (this.value.name === 'URL keywords') {
          this.isDisabled = false
        } else {
          this.isDisabled = true
          this.$store.dispatch('getListOfTargetingTypes', this.value.name)
        }
      },
      resetData() {
        this.ruleValue = []
        this.value = []
      },
      deleteSelectedRules() {
        this.ruleValue = []
      },
      checkSelectedValue(val) {
        if (this.getAddedData.length > 0) {
          for (let i = 0; i < this.getAddedData.length; i++) {
            if (this.getAddedData[i].type.name === val.name) {
              this.$store.commit('setCantSelectPopupStatus', true)
            }
          }
        }
      }
    },
    computed: {
      ...mapState(['typesState', 'targetingTypeList', 'isAddClicked', 'cantSelectStatus']),
      ...mapGetters(['getAddedData', 'getTypesList'])
    },
    mounted() {
      this.$store.dispatch('getTypesAction')
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h2 {
        text-align: left;
        width: 82%;
        max-width: 100%;
        margin: 20px auto;
    }

    .add-type-rules__block {
        border: 2px solid;
        padding: 15px;
        width: 80%;
        max-width: 100%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;

        .rules-multiselect {
            position: relative;

            span {
                display: flex;
                position: absolute;
                top: 50%;
                right: 45px;
                transform: translate(50%, -50%);
                font-weight: 700;
                height: 20px;
                width: 20px;
                background: #ccc;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                &:active {
                    color: #fff;
                }
            }
        }

        div {
            text-align: left;

            .typo__label {
                display: inline-block;
                margin-bottom: 10px;
            }
        }

        .buttons__block {
            grid-column: 2;
            text-align: right;

           button {
                margin-right: 10px;
                text-transform: uppercase;
                padding: 8px 10px;

            }
        }
    }

</style>
