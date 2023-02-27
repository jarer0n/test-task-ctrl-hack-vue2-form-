<template>
    <div>
        <div class="flex">
            <input
                @input="calculate($event, 'ЦЕНА')"
                v-model.number="form.price"
                placeholder="Цена"
                type="number"
            />
            <input
                @input="calculate($event, 'КОЛ-ВО')"
                v-model.number="form.qty"
                placeholder="Кол-во"
                type="number"
            />
            <input
                @input="calculate($event, 'СУММА')"
                v-model.number="form.amount"
                placeholder="Сумма"
                type="number"
            />
            <button @click="submit">Submit</button>
        </div>

        <div style="margin-top: 15px" class="flex">
            <label>Цена: {{ form.price }}</label>
            <label>Кол-во: {{ form.qty }} </label>
            <label>Сумма: {{ form.amount }}</label>
            <label>localStorage: {{ ls }}</label>
        </div>

        <div v-if="logs.length" class="logs">
            <ul>
                <li v-for="(log, i) in logs" :key="i">{{ log }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { debounce } from '@/utils/debounce.js';
export default {
    data() {
        return {
            ls: JSON.parse(localStorage.getItem('myForm')) || 'Пусто',
            form: {
                price: 0,
                qty: 0,
                amount: 0,
            },

            inputsStack: ['ЦЕНА', 'КОЛ-ВО', 'СУММА'],

            logs: [],
        };
    },

    methods: {
        calculate: debounce(function (event, from) {
            let fromIdx = this.inputsStack.indexOf(from);
            if (fromIdx) {
                this.inputsStack.splice(fromIdx, 1); //убираем из очереди текущий инпут
                this.inputsStack.unshift(from); //ставим его в конец очереди
            }

            switch (
                this.inputsStack[2] //меняем самый старый
            ) {
                case 'СУММА':
                    this.form.amount = +this.form.price * +this.form.qty;
                    break;
                case 'КОЛ-ВО':
                    this.form.qty = +this.form.amount / +this.form.price;
                    break;
                case 'ЦЕНА':
                    this.form.price = +this.form.amount / +this.form.qty;
                    break;
            }

            this.saveLog(`Изменено поле ${from} на: ${event.target.value}`);
        }, 300),

        submit() {
            if (this.form.amount % 2 === 0) {
                localStorage.setItem('myForm', JSON.stringify(this.form));

                this.saveLog(
                    `Данные записаны в LS ${JSON.stringify(this.form)}`
                );

                setTimeout(() => {
                    this.ls = JSON.stringify(this.form);
                    this.saveLog(
                        `Данные успешно сохранены на сервере ${this.ls}`
                    );
                }, 1000);
            } else {
                alert('Отказано в сохранение');
                this.saveLog(
                    `Отказано в сохранение, amount не четное число: ${this.form.amount} `
                );
            }
        },

        saveLog(log) {
            this.logs.unshift(log);
        },
    },

    mounted() {
        if (this.ls !== 'Пусто') this.form = { ...this.ls };
    },
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
