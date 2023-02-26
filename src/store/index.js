import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const init = JSON.parse(localStorage.getItem('myFormVuex')) || 'Пусто';

export default new Vuex.Store({
    state: {
        form: {
            price: init?.price || 0,
            qty: init?.qty || 0,
            amount: init?.amount || 0,
        },
        logs: [],
        ls: init,
        inputsStack: ['ЦЕНА', 'КОЛ-ВО', 'СУММА'],
    },
    getters: {
        FORM: (state) => state.form,
        LOGS: (state) => state.logs,
        LS: (state) => state.ls,
    },
    actions: {
        SUBMIT({ state, commit }) {
            if (state.form.amount % 2 === 0) {
                localStorage.setItem('myFormVuex', JSON.stringify(state.form));
                state.logs.unshift(
                    `Данные записаны в LS ${JSON.stringify(state.form)}`
                );

                setTimeout(() => {
                    commit('SAVE_DATA_FROM_SERVER', JSON.stringify(state.form));
                }, 1000);
            } else {
                alert('Отказано в сохранение');
                state.logs.unshift(
                    `Отказано в сохранение, amount не четное число: ${this.form.amount} `
                );
            }
        },
    },
    mutations: {
        UPDATE_PRICE(state, newPrice) {
            state.form.price = newPrice;
        },
        UPDATE_QTY(state, newQty) {
            state.form.qty = newQty;
        },

        UPDATE_AMOUNT(state, newAmount) {
            state.form.amount = newAmount;
        },

        CALCULATE(state, [event, from]) {
            let fromIdx = state.inputsStack.indexOf(from);
            if (fromIdx) {
                state.inputsStack.splice(fromIdx, 1);
                state.inputsStack.unshift(from);
            }

            switch (state.inputsStack[2]) {
                case 'СУММА':
                    state.form.amount = +state.form.price * +state.form.qty;
                    break;
                case 'КОЛ-ВО':
                    state.form.qty = +state.form.amount / +state.form.price;
                    break;
                case 'ЦЕНА':
                    state.form.price = +state.form.amount / +state.form.qty;
                    break;
            }

            state.logs.unshift(
                `Изменено поле ${from} на: ${event.target.value}`
            );
        },

        SAVE_DATA_FROM_SERVER(state, data) {
            state.ls = data;
            state.logs.unshift(
                `Данные успешно сохранены на сервере ${state.ls}`
            );
        },
    },
});
