<template>
    <div class="confirmation-popup">
        <div class="popup-content">
            <div class="popup-body">
                <p>Please select other option, this one is already selected</p>
            </div>
            <div class="popup-footer">
                <span @click="cancelDelete">OK</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'CantSelect',
    methods: {
      cancelDelete() {
        this.$store.commit('setCantSelectPopupStatus', false)
        this.$emit('removeSelectedType', null)
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
            .popup-footer {
                display: flex;
                justify-content: center;
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