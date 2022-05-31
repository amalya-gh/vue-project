<template>
    <div>
        <h3>Saved targeting rules</h3>
        <table>
            <tr>
                <th>type</th>
                <th>Rules</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(item, index) in addedData" :key="index">
                <td>{{item.type.name}}</td>
                <td>
                    <div v-if="urlValues.split(',').length>0 && item.type.name==='URL keywords'">
                        <span v-for="rule in urlValues.split(',')" :key="rule" class="single-rule">
                            {{rule}}
                            <span class="single-rule-delete" @click="deleteSingleRule(item, rule.id)">X</span>
                        </span>
                    </div>
                    <div v-else>
                        <span v-for="rule  in item.rules" :key="rule.name" class="single-rule">
                            {{rule.name}}
                            <span class="single-rule-delete" @click="deleteSingleRule(item, rule.id)">X</span>
                         </span>
                    </div>
                </td>
                <td>
                    <img alt="Recycle bin" src="../assets/bin.png" class="recycle-bin" @click="deleteRow(item, index)">
                </td>
            </tr>
        </table>
        <confirmation-popup
            v-if="showConfirmationPopup"
            :deletedItem="deletedItem"
            :deletedIndex="deletedIndex"
            :deletedIdSingle="deletedIdSingle"/>
    </div>
</template>

<script>
  import {mapState} from "vuex";
  import ConfirmationPopup from "./ConfirmationPopup";

  export default {
    name: "SavedRules",
    components: {ConfirmationPopup},
    data() {
      return {
        savedRules: null,
        deletedItem: null,
        deletedIndex: null,
        deletedIdSingle: null
      }
    },
    props: {
      urlValues: String
    },
    computed: {
      ...mapState(['addedData', 'showConfirmationPopup'])
    },
    watch: {
      addedData(val) {
        return val
      }
    },
    methods: {
      deleteRow(val, index) {
        this.$store.commit('setConfirmationPopupStatus', true)
        this.deletedItem = val
        this.deletedIndex = index
      },
      deleteSingleRule(val, id) {
        this.$store.commit('setConfirmationPopupStatus', true)
        this.deletedItem = val
        this.deletedIdSingle = id
      }
    }
  }
</script>

<style scoped lang="scss">
    h3, table {
        width: 82%;
        max-width: 100%;
        margin: 20px auto;

    }

    h3 {
        text-align: left;
    }

    table {
        border: 2px solid;

        tr {
            td, th {
                border-bottom: 1px solid;
                text-transform: capitalize;
                padding: 10px 0;

                .single-rule {
                    border: 1px solid;
                    padding: 4px 7px;
                    border-radius: 10px;
                    margin-right: 5px;

                    .single-rule-delete {
                        font-size: 13px;
                        font-weight: 800;
                    }
                }
            }

            &:last-child {
                td {
                    border: none;
                }
            }

        }

        .recycle-bin {
            height: 15px;
        }
    }
    .save-changes{
        text-align: right;
    }


</style>