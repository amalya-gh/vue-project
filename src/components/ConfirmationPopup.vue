<template>
    <div class="confirmation-popup">
        <div class="popup-content">
            <div class="popup-header" @click="cancelDelete"> X</div>
            <div class="popup-body">
                <p>Are you sure ?</p>
            </div>
            <div class="popup-footer">
                <span @click="confirmDelete">Confirm</span>
                <span @click="cancelDelete">Cancel</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ConfirmationPopup',
    props: {
      deletedIndex: Number,
      deletedItem: Object,
      deletedIdSingle: Number

    },
    methods: {
      cancelDelete() {
        this.$store.commit('setConfirmationPopupStatus', false)
      },
      confirmDelete() {
        if(this.deletedIdSingle) {
          this.$store.dispatch('deleteTargetingRules', {
            "targeting_type_id": this.deletedItem.type.id,
            "rules": [this.deletedIdSingle]
          })
        }else {
          let rulesArrayForDel = this.deletedItem.rules.map(function (a) {
            return a.id;
          });
          this.$store.dispatch('deleteTargetingRules', {
            "targeting_type_id": this.deletedItem.type.id,
            "rules": rulesArrayForDel
          })
        }

      }
    }
  }
</script>

<style scoped lang="scss">
    .confirmation-popup {
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;

        .popup-content {
            background: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            font-size: 20px;
            width: 250px;
            border-radius:5px;
            .popup-header{
                text-align: right;
            }
            .popup-footer {
                display: flex;
                justify-content: space-between;
                span{
                    background: #42b983;
                    padding: 10px;
                    display: inline-block;
                    border-radius: 5px;
                    color: #fff;
                    cursor: pointer;
                    &:active{
                        color: #000;
                    }
                }
            }
        }
    }

</style>