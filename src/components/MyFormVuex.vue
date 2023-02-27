<template>
    <div>
        <div class="flex">
            <input
                @input="calculate($event, 'ЦЕНА')"
                v-model.number="price"
                placeholder="Цена"
                type="number"
            />
            <input
                @input="calculate($event, 'КОЛ-ВО')"
                v-model.number="qty"
                placeholder="Кол-во"
                type="number"
            />
            <input
                @input="calculate($event, 'СУММА')"
                v-model.number="amount"
                placeholder="Сумма"
                type="number"
            />
            <button @click="submit">Submit</button>
        </div>

        <div style="margin-top: 15px" class="flex">
            <label>Цена: {{ FORM.price }}</label>
            <label>Кол-во: {{ FORM.qty }} </label>
            <label>Сумма: {{ FORM.amount }}</label>
            <label>localStorage: {{ LS }}</label>
        </div>

        <div v-if="LOGS.length" class="logs">
            <ul>
                <li v-for="(log, i) in LOGS" :key="i">{{ log }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { debounce } from '@/utils/debounce.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {};
    },

    computed: {
        ...mapGetters(['FORM', 'LOGS', 'LS']),

        price: {
            get() {
                return this.FORM.price;
            },

            set(value) {
                this.$store.commit('UPDATE_PRICE', value);
            },
        },
        qty: {
            get() {
                return this.FORM.qty;
            },

            set(value) {
                this.$store.commit('UPDATE_QTY', value);
            },
        },
        amount: {
            get() {
                return this.FORM.amount;
            },

            set(value) {
                this.$store.commit('UPDATE_AMOUNT', value);
            },
        },
    },

    methods: {
        calculate: debounce(function (event, from) {
            this.$store.commit('CALCULATE', [event, from]);
        }, 300),

        submit() {
            this.$store.dispatch('SUBMIT');
        },
    },

    mounted() {},
};
</script>

<style scoped>
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flex input,
button,
label {
    flex: 0 1 24%;
}

.flex label {
    height: 100%;
    display: inline-block;
}
.logs {
    border: 1px solid teal;
    padding: 5px;
    margin-top: 15px;
}
</style>
