document.addEventListener('DOMContentLoaded', () => {
    const typeInverterSystemEl = document.getElementById('typeInverterSystem');
    const DсInputVoltageEl = document.getElementById('DсInputVoltage');
    const outputVoltageEl = document.getElementById('outputVoltage');
    const loadPowerEl = document.getElementById('loadPower');
    const powerTypeEl = document.getElementById('powerType');
    const powerFactorEl = document.getElementById('powerFactor');
    const ukuEl = document.getElementById('uku');
    const bypassEl = document.getElementById('bypass');
    const typeReserveEl = document.getElementById('typeReserve');
    const buttonResultEl = document.getElementById('buttonResult');
    const form = document.querySelector('.form');
    const resultsNameEl = document.getElementById('resultsName');

    (function clear() {
        typeInverterSystemEl.options[0].selected = true;
        bypassEl.options[0].selected = true;
        DсInputVoltageEl.options[0].selected = true;
        outputVoltageEl.options[0].selected = true;
        loadPowerEl.value = '';
        powerTypeEl.options[0].selected = true;
        powerFactorEl.value = '';
        typeReserveEl.options[0].selected = true;
        resultsNameEl.value = '';
    })();

    function typeInverterBlock() {
        if (typeInverterSystemEl.value == 'monoBlockBP') {
            bypassEl.options[2].selected = true; // принудительное значение байпас - да
            bypassEl.setAttribute('disabled', ''); //блокировка выбора байпаса 
        } else if (typeInverterSystemEl.value == 'monoBlockAC' || typeInverterSystemEl.value == 'moduleAC') {
            bypassEl.options[1].selected = true; // принудительное значение байпас - нет
            bypassEl.setAttribute('disabled', ''); //блокировка выбора байпаса 
        } else {
            bypassEl.removeAttribute('disabled'); //удаление блокировки выбора байпаса 
            bypassEl.options[0].selected = true; // принудительное значение байпас - "-"
        };

        if (typeInverterSystemEl.value == 'monoBlockBP' || typeInverterSystemEl.value == 'monoBlockAC') {
            outputVoltageEl.options[1].selected = true; // принудительное значение выходного напряжения - 220
            outputVoltageEl.setAttribute('disabled', ''); //блокировка выбора выходного напряжения 
            typeReserveEl.options[2].setAttribute('disabled', ''); //блокировка выбора типа резерва - N+1
            typeReserveEl.options[3].setAttribute('disabled', ''); //блокировка выбора типа резерва - N+2
            typeReserveEl.options[4].setAttribute('disabled', ''); //блокировка выбора типа резерва - N+3
            typeReserveEl.options[0].selected = true; // принудительное значение резерва - "-"
        } else {
            outputVoltageEl.options[0].selected = true; // принудительное значение выходного напряжения - "-"
            outputVoltageEl.removeAttribute('disabled'); // удаление блокировки выбора выходного напряжения 
            typeReserveEl.options[2].removeAttribute('disabled'); //удаление блокировки выбора типа резерва - N+1
            typeReserveEl.options[3].removeAttribute('disabled'); //удаление блокировки выбора типа резерва - N+2
            typeReserveEl.options[4].removeAttribute('disabled'); //удаление блокировки выбора типа резерва - N+3

        };

        if (typeInverterSystemEl.value == 'monoBlockBP' || typeInverterSystemEl.value == 'monoBlockAC') {
            ukuEl.options[3].setAttribute('disabled', ''); //блокировка выбора УКУ - Корпус ИК
            ukuEl.options[4].setAttribute('disabled', ''); //блокировка выбора УКУ - Корпус BP
            ukuEl.options[5].setAttribute('disabled', ''); //блокировка выбора УКУ - Корпус D (дверь)
            ukuEl.options[0].selected = true; // принудительное значение УКУ - "-"
        } else if (typeInverterSystemEl.value == 'moduleAC') {
            ukuEl.options[4].setAttribute('disabled', ''); //блокировка выбора УКУ - Корпус BP
            ukuEl.options[0].selected = true; // принудительное значение УКУ - "-"
        } else {
            ukuEl.options[3].removeAttribute('disabled'); //удаление блокировки выбора УКУ - Корпус ИК
            ukuEl.options[4].removeAttribute('disabled'); //удаление блокировки выбора УКУ - Корпус BP
            ukuEl.options[5].removeAttribute('disabled'); //блокировка выбора УКУ - Корпус D (дверь)
            ukuEl.options[0].selected = true; // принудительное значение УКУ - "-"
        };
    };
    typeInverterBlock();
    typeInverterSystemEl.addEventListener('change', typeInverterBlock);

    function bybassBlock() {
        if (bypassEl.value == 'no') {
            ukuEl.options[4].setAttribute('disabled', ''); //блокировка выбора УКУ - Корпус BP
            ukuEl.options[0].selected = true; // принудительное значение УКУ - "-"
        } else if (bypassEl.value == 'yes' && outputVoltageEl.value == '380') {
            ukuEl.options[3].setAttribute('disabled', ''); //блокировка выбора УКУ - Корпус ИК
            ukuEl.options[4].setAttribute('disabled', ''); //блокировка выбора УКУ - Корпус BP
            ukuEl.options[0].selected = true; // принудительное значение УКУ - "-"
        } else if (bypassEl.value == 'yes' && outputVoltageEl.value == '220') {
            ukuEl.options[3].removeAttribute('disabled'); //удаление блокировки выбора УКУ - Корпус ИК
            ukuEl.options[4].removeAttribute('disabled'); //удаление блокировки выбора УКУ - Корпус BP
            ukuEl.options[0].selected = true; // принудительное значение УКУ - "-"
        };
    };
    bybassBlock();
    bypassEl.addEventListener('change', bybassBlock);

    function outputVoltageBlock() {
        if (outputVoltageEl.value == '380') {
            ukuEl.options[3].setAttribute('disabled', '');  //блокировка выбора УКУ - Корпус ИК
            ukuEl.options[4].setAttribute('disabled', ''); //блокировка выбора УКУ - Корпус BP
            ukuEl.options[0].selected = true; // принудительное значение УКУ - "-"
        } else if (outputVoltageEl.value == '220' && bypassEl.value == 'no') {
            ukuEl.options[4].setAttribute('disabled', ''); //блокировка выбора УКУ - Корпус BP
            ukuEl.options[3].removeAttribute('disabled'); //удаление блокировки выбора УКУ - Корпус ИК
            ukuEl.options[0].selected = true; // принудительное значение УКУ - "-"
        } else if (outputVoltageEl.value == '220' && bypassEl.value == 'yes') {
            ukuEl.options[3].removeAttribute('disabled'); //удаление блокировки выбора УКУ - Корпус ИК
            ukuEl.options[4].removeAttribute('disabled'); //удаление блокировки выбора УКУ - Корпус BP
            ukuEl.options[0].selected = true; // принудительное значение УКУ - "-"
        };
    };
    outputVoltageBlock();
    outputVoltageEl.addEventListener('change', outputVoltageBlock);

    function powerFactorOne() {
        if (powerTypeEl.value == 'Watt') {
            powerFactorEl.value = 1;  // принудительное значение cosF = 1
            powerFactorEl.setAttribute('disabled', ''); //блокировка изменения cosF
        } else {
            powerFactorEl.removeAttribute('disabled'); // разблокировка изменения cosF
            /* powerFactorEl.value = ''; */
        }
    };
    powerFactorOne();
    powerTypeEl.addEventListener('change', powerFactorOne);

    //Прайс с ценами - Price list
    const priceList = {
        DC_AC_24_220V_1000VA_2U_BP: 63360, // Цена на DC/AC-24/220B-1000BA-2U-ВР с НДС 20%
        DC_AC_24_220V_1500VA_2U_BP: 72600, // Цена на DC/AC-24/220B-1500BA-2U-ВР с НДС 20%
        DC_AC_4860_220V_1000VA_2U_BP: 59640, // Цена на DC/AC-48(60)/220B-1000BA-2U-ВР с НДС 20%
        DC_AC_4860_220V_1500VA_2U_BP: 62160, // Цена на DC/AC-48(60)/220B-1500BA-2U-ВР с НДС 20%
        DC_AC_4860_220V_3000VA_2U_BP: 75120, // Цена на DC/AC-48(60)/220B-3000BA-2U-ВР с НДС 20%
        DC_AC_110_220V_1500VA_2U_BP: 66120, // Цена на DC/AC-110/220B-1500BA-2U-ВР с НДС 20%
        DC_AC_110_220V_3000VA_2U_BP: 80400, // Цена на DC/AC-110/220B-3000BA-2U-ВР с НДС 20%
        DC_AC_220_220V_700VA_2U_BP: 62160, // Цена на DC/AC-220/220B-700BA-2U-ВР с НДС 20%
        DC_AC_220_220V_1000VA_2U_BP: 63480, // Цена на DC/AC-220/220B-1000BA-2U-ВР с НДС 20%
        DC_AC_220_220V_1500VA_2U_BP: 66120, // Цена на DC/AC-220/220B-1500BA-2U-ВР с НДС 20%
        DC_AC_220_220V_3000VA_2U_BP: 80400, // Цена на DC/AC-220/220B-3000BA-2U-ВР с НДС 20%

        DC_АС_AC_24_220_220V_1500VA_2U: 89400, // Цена на (DC-АС)/AC-(24-220)/220B-1500BA-2U с НДС 20%
        DC_АС_AC_4860_220_220V_2500VA_2U: 89400, // Цена на (DC-АС)/AC-(48(60)-220)/220B-2500BA-2U с НДС 20%
        DC_АС_AC_110_220_220V_2500VA_2U: 89400, // Цена на (DC-АС)/AC-(110-220)/220B-2500BA-2U с НДС 20%
        DC_АС_AC_220_220_220V_2500VA_2U: 89400, // Цена на (DC-АС)/AC-(220-220)/220B-2500BA-2U с НДС 20%

        DC_AC_24_220V_1500VA_3U: 71280, // Цена на DC/AC-24/220B-1500BA-3U с НДС 20%
        DC_AC_4860_220V_2500VA_3U: 75120, // Цена на DC/AC-48(60)/220B-2500BA-3U с НДС 20%
        DC_AC_110_220V_2500VA_3U: 75120, // Цена на DC/AC-110/220B-2500BA-3U с НДС 20%
        DC_AC_220_220V_2500VA_3U: 75120, // Цена на DC/AC-220/220B-2500BA-3U с НДС 20%
        Korpus_DC_AC_7500_24_4860_3U: 22080, // Цена на Корпус DC/AC-7500-24-48(60)-3U с НДС 20%
        Korpus_DC_AC_7500_110_3U: 22080, // Цена на Корпус DC/AC-7500-110-3U с НДС 20%
        Korpus_DC_AC_7500_220_3U: 22080, // Цена на Корпус DC/AC-7500-220-3U с НДС 20%

        DC_АС_AC_24_220_220V_1500VA_3U: 84240, // Цена на (DC-АС)/AC-(24-220)/220B-1500BA-3U с НДС 20%
        DC_АС_AC_4860_220_220V_2500VA_3U: 84240, // Цена на (DC-АС)/AC-(48(60)-220)/220B-2500BA-3U с НДС 20%
        DC_АС_AC_110_220_220V_2500VA_3U: 84240, // Цена на (DC-АС)/AC-(110-220)/220B-2500BA-3U с НДС 20%
        DC_АС_AC_220_220_220V_2500VA_3U: 84240, // Цена на (DC-АС)/AC-(220-220)/220B-2500BA-3U с НДС 20%
        Korpus_DC_АС_AC_7500_24_4860_3U: 23280, // Цена на Корпус (DC-АС)/AC-7500-24-48(60)-3U с НДС 20%
        Korpus_DC_АС_AC_7500_110_3U: 23280, // Цена на Корпус (DC-АС)/AC-7500-110-3U с НДС 20%
        Korpus_DC_АС_AC_7500_220_3U: 23280, // Цена на Корпус (DC-АС)/AC-7500-220-3U с НДС 20%

        BP_24_220B_10kVA_2U: 57000, // Цена на BP-24/220B-10000BA-2U с НДС 20%
        BP_24_220B_20kVA_3U: 67400, // Цена на BP-24/220B-20000BA-3U с НДС 20%
        BP_4860_220B_10kVA_2U: 57000, // Цена на BP-48(60)/220B-10000BA-2U с НДС 20%
        BP_4860_220B_10kVA_3U: 59640, // Цена на BP-48(60)/220B-10000BA-3U с НДС 20%
        BP_4860_220B_20kVA_3U: 67440, // Цена на BP-48(60)/220B-20000BA-3U с НДС 20%
        BP_4860_220B_45kVA_3U: 107520, // Цена на BP-48(60)/220B-45000BA-3U с НДС 20%
        BP_110_220B_10kVA_2U: 57000, // Цена на BP-110/220B-10000BA-2U с НДС 20%
        BP_110_220B_10kVA_3U: 59640, // Цена на BP-110/220B-10000BA-3U с НДС 20%
        BP_110_220B_20kVA_3U: 67440, // Цена на BP-110/220B-20000BA-3U с НДС 20%
        BP_110_220B_45kVA_3U: 107520, // Цена на BP-110/220B-45000BA-3U с НДС 20%
        BP_220_220B_10kVA_2U: 57000, // Цена на BP-220/220B-10000BA-2U с НДС 20%
        BP_220_220B_10kVA_3U: 59640, // Цена на BP-220/220B-10000BA-3U с НДС 20%
        BP_220_220B_20kVA_3U: 67440, // Цена на BP-220/220B-20000BA-3U с НДС 20%
        BP_220_220B_45kVA_3U: 107520, // Цена на BP-220/220B-45000BA-3U с НДС 20%

        BP_24_380B_30kVA_3U: 85560, // Цена на BP-24/380B-30000BA-3U с НДС 20%
        BP_4860_380B_30kVA_3U: 85560, // Цена на BP-48(60)/380B-30000BA-3U с НДС 20%
        BP_4860_380B_75kVA_3U: 132240, // Цена на BP-48(60)/380B-75000BA-3U с НДС 20%
        BP_110_380B_30kVA_3U: 85560, // Цена на BP-110/380B-30000BA-3U с НДС 20%
        BP_110_380B_75kVA_3U: 132240, // Цена на BP-110/380B-75000BA-3U с НДС 20%
        BP_220_380B_30kVA_3U: 85560, // Цена на BP-220/380B-30000BA-3U с НДС 20%
        BP_220_380B_75kVA_3U: 132240, // Цена на BP-220/380B-75000BA-3U с НДС 20%

        UKU_207_1214_LAN_3U: 30960, // Цена на УКУ 207.12(14)-3U с НДС 20%
        UKU_207_1214_LAN_I: 29640, // Цена на УКУ 207.12(14)-I с НДС 20%
        UKU_207_1214_LAN_BP: 27600, // Цена на УКУ 207.12(14)-BP с НДС 20%
        UKU_207_1214_LAN_D: 29880, // Цена на УКУ 207.12(14)-D с НДС 20%
    };

    let numberOfModules; // количество инверторных модулей в системе
    function searchNumberOfModules(activePowerInverterOneModele, maxPowerLoad) { // поиск количества инверторов с системе
        numberOfModules = 0;
        do { // поиск количества для 220 или 380 (для 380В количество кратно дрём модулям)
            if (outputVoltageEl.value == '220') {
                numberOfModules += 1;
            } else {
                numberOfModules += 3;
            };
            activePowerInverterSystem = activePowerInverterOneModele * numberOfModules
        } while (activePowerInverterSystem < maxPowerLoad);

        if (typeReserveEl.value != '0') { // учёт резервных модулей  
            if (outputVoltageEl.value == '220') {
                numberOfModules += +typeReserveEl.value;
            } else if (outputVoltageEl.value == '380') {
                numberOfModules += 3 * +typeReserveEl.value;
            };
        };
        return numberOfModules;
    };
    const parametersInverterModule = {
        'moduleBP': {
            '24': {
                'activePowerInverter': 1000,
                'fullPowerInverter': 1500,
                'typeInverter': 'DC/AC',
                'priceWithoutVatModule': priceList.DC_AC_24_220V_1500VA_3U,
                'priceWithoutVatBasket': priceList.Korpus_DC_AC_7500_24_4860_3U,
                'articleInverter': [],
                'articleInverterSGEP': 'Арт.15-424',
                'articleInverterNumber': {
                    '220': ['04', '05', '06', '07', '08', '09', '10', '12', '12S1', '12S2', '12S3', '12S4', '12S5', '12S6', '12S7',
                        '12S8', '12S9', '12S10', '12S11', '12S12', '12S13', '12S14', '12S15', '12S16', '12S17', '12S18', '12S19', '12S20', '12S21', '12S22'],
                    '380': ['13', '14', '15', '16', '17', '18', '18T1', '18T2', '18T3', '18T4'],
                },
            }, '48(60)': {
                'activePowerInverter': 2000,
                'fullPowerInverter': 2500,
                'typeInverter': 'DC/AC',
                'priceWithoutVatModule': priceList.DC_AC_4860_220V_2500VA_3U,
                'priceWithoutVatBasket': priceList.Korpus_DC_AC_7500_24_4860_3U,
                'articleInverter': [],
                'articleInverterSGEP': 'Арт.15-448',
                'articleInverterNumber': {
                    '220': ['06', '07', '08', '09', '10', '11', '12', '13', '14', '14S1', '14S2', '14S3', '14S4', '14S5', '14S6',
                        '14S7', '14S8', '14S9', '14S10', '14S11', '14S12', '14S13', '14S14', '14S15', '14S16', '14S17', '14S18', '14S19', '14S20', '14S21'],
                    '380': ['15', '16', '17', '18', '19', '20', '20T1', '20T2', '20T3', '20T4'],
                },
            }, '110': {
                'activePowerInverter': 2000,
                'fullPowerInverter': 2500,
                'typeInverter': 'DC/AC',
                'priceWithoutVatModule': priceList.DC_AC_110_220V_2500VA_3U,
                'priceWithoutVatBasket': priceList.Korpus_DC_AC_7500_110_3U,
                'articleInverter': [],
                'articleInverterSGEP': 'Арт.15-4110',
                'articleInverterNumber': {
                    '220': ['04', '05', '06', '07', '08', '09', '10', '12', '12S1', '12S2', '12S3', '12S4', '12S5', '12S6', '12S7',
                        '12S8', '12S9', '12S10', '12S11', '12S12', '12S13', '12S14', '12S15', '12S16', '12S17', '12S18', '12S19', '12S20', '12S21', '12S22'],
                    '380': ['13', '14', '15', '16', '17', '18', '18T1', '18T2', '18T3', '18T4'],
                },
            }, '220': {
                'activePowerInverter': 2000,
                'fullPowerInverter': 2500,
                'typeInverter': 'DC/AC',
                'priceWithoutVatModule': priceList.DC_AC_220_220V_2500VA_3U,
                'priceWithoutVatBasket': priceList.Korpus_DC_AC_7500_220_3U,
                'articleInverter': [],
                'articleInverterSGEP': 'Арт.15-4220',
                'articleInverterNumber': {
                    '220': ['07', '08', '09', '10', '11', '12', '13', '14', '15', '15S1', '15S2', '15S3', '15S4', '15S5', '15S6',
                        '15S7', '15S8', '15S9', '15S10', '15S11', '15S12', '15S13', '15S14', '15S15', '15S16', '15S17', '15S18', '15S19', '15S20', '15S21'],
                    '380': ['16', '17', '18', '19', '20', '21', '21T1', '21T2', '21T3', '21T4'],
                },
            },
        },
        'moduleAC': {
            '24': {
                'activePowerInverter': 1000,
                'fullPowerInverter': 1500,
                'typeInverter': '(DC-АС)/AC',
                'priceWithoutVatModule': priceList.DC_АС_AC_24_220_220V_1500VA_3U,
                'priceWithoutVatBasket': priceList.Korpus_DC_AC_7500_24_4860_3U,
                'articleInverter': [],
                'articleInverterSGEP': 'Арт.15-42422',
                'articleInverterNumber': {
                    '220': ['03S1', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
                        '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
                    '380': ['33', '34', '35', '36', '37', '38', '39', '40', '41', '42'],
                },
            }, '48(60)': {
                'activePowerInverter': 2000,
                'fullPowerInverter': 2500,
                'typeInverter': '(DC-АС)/AC',
                'priceWithoutVatModule': priceList.DC_АС_AC_4860_220_220V_2500VA_3U,
                'priceWithoutVatBasket': priceList.Korpus_DC_AC_7500_24_4860_3U,
                'articleInverter': [],
                'articleInverterSGEP': 'Арт.15-4486022',
                'articleInverterNumber': {
                    '220': ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
                        '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34'],
                    '380': ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44'],
                },
            }, '110': {
                'activePowerInverter': 2000,
                'fullPowerInverter': 2500,
                'typeInverter': '(DC-АС)/AC',
                'priceWithoutVatModule': priceList.DC_AC_110_220V_2500VA_3U,
                'priceWithoutVatBasket': priceList.Korpus_DC_AC_7500_110_3U,
                'articleInverter': [],
                'articleInverterSGEP': 'Арт.15-411022',
                'articleInverterNumber': {
                    '220': ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
                        '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
                    '380': ['33', '34', '35', '36', '37', '38', '39', '40', '41', '42'],
                },
            }, '220': {
                'activePowerInverter': 2000,
                'fullPowerInverter': 2500,
                'typeInverter': '(DC-АС)/AC',
                'priceWithoutVatModule': priceList.DC_АС_AC_220_220_220V_2500VA_3U,
                'priceWithoutVatBasket': priceList.Korpus_DC_AC_7500_220_3U,
                'articleInverter': '',
                'articleInverterSGEP': 'Арт.15-4220',
                'articleInverterNumber': {
                    '220': ['2204S1', '2205', '2207', '2208', '2209', '2210', '2211', '2212', '2213', '2214', '2215', '2216', '2217', '2218', '2219',
                        '2220', '2221', '2222', '2223', '2224', '2225', '2226', '2227', '2228', '2229', '2230', '2231', '2232', '2233', '2234'],
                    '380': ['3801', '3802', '3803', '3804', '3805', '3806', '3807', '3808', '3809', '3810'],
                },
            },
        },
    }

    function getArticle(numberOfModules) {

        let art = 0;
        if (outputVoltageEl.value == '220') {
            art = numberOfModules - 1;
        } else if (outputVoltageEl.value == '380') {
            art = Math.ceil(numberOfModules / 3) - 1;
        };
        const artPart1 = parametersInverterModule[typeInverterSystemEl.value][DсInputVoltageEl.value].articleInverterSGEP;
        const artPart2 = parametersInverterModule[typeInverterSystemEl.value][DсInputVoltageEl.value].articleInverterNumber[outputVoltageEl.value][art];
        return artPart1 + artPart2;
    };

    class ParameterInverterModule {
        constructor(parameterInverterModuleObj, numberOfModules) {
            this.parameterInverterModuleObj = parameterInverterModuleObj;
            this.heightInverterModule = 3; //высота корзины в 'U'
            this.numberOfModules = numberOfModules;
        };
        get fullNameInverter() {
            let voltageNameInverter;
            if (typeInverterSystemEl.value == 'moduleBP') {
                voltageNameInverter = `${DсInputVoltageEl.value}/${outputVoltageEl.value}`;
            } else if (typeInverterSystemEl.value == 'moduleAC') {
                voltageNameInverter = `(${DсInputVoltageEl.value}-${outputVoltageEl.value})/${outputVoltageEl.value}`
            };
            return `${this.parameterInverterModuleObj.typeInverter}-${voltageNameInverter}В-${this.parameterInverterModuleObj.fullPowerInverter * this.numberOfModules}ВА-${this.heightInverterModule * Math.ceil(this.numberOfModules / 3)}U`;//*3 модуля в корзину
        };
        get priceIverter() {
            return (this.parameterInverterModuleObj.priceWithoutVatModule * this.numberOfModules) + (this.parameterInverterModuleObj.priceWithoutVatBasket * Math.ceil(this.numberOfModules / 3)); //*3 модуля в корзину
        };
    };

    const parametersInverterMonobloc = { // объект со всеми типами моноблочных инверторов
        'monoBlockBP': {
            '24': {
                'activePowerInverter': [700, 1000],
                'fullPowerInverter': [1000, 1500],
                'articleInverter': ['Арт.15-42401', 'Арт.15-42402'],
                'priceWithoutVAT': [priceList.DC_AC_24_220V_1000VA_2U_BP, priceList.DC_AC_24_220V_1500VA_2U_BP],
                'fullNameInverter': ['DC/AC-24/220B-1000BA-2U-ВР', 'DC/AC-24/220B-1500BA-2U-ВР'],
            },
            '48(60)': {
                'activePowerInverter': [700, 1000, 2000],
                'fullPowerInverter': [1000, 1500, 3000],
                'articleInverter': ['Арт.15-44801', 'Арт.15-44802', 'Арт.15-44803'],
                'priceWithoutVAT': [priceList.DC_AC_4860_220V_1000VA_2U_BP, priceList.DC_AC_4860_220V_1500VA_2U_BP, priceList.DC_AC_4860_220V_3000VA_2U_BP],
                'fullNameInverter': ['DC/AC-48(60)/220B-1000BA-2U-ВР', 'DC/AC-48(60)/220B-1500BA-2U-ВР', 'DC/AC-48(60)/220B-3000BA-2U-ВР'],
            },
            '110': {
                'activePowerInverter': [1000, 2000],
                'fullPowerInverter': [1500, 3000],
                'articleInverter': ['Арт.15-411001', 'Арт.15-411002'],
                'priceWithoutVAT': [priceList.DC_AC_110_220V_1500VA_2U_BP, priceList.DC_AC_110_220V_3000VA_2U_BP],
                'fullNameInverter': ['DC/AC-110/220B-1500BA-2U-ВР', 'DC/AC-110/220B-3000BA-2U-ВР'],
            },
            '220': {
                'activePowerInverter': [500, 700, 1000, 2000],
                'fullPowerInverter': [700, 1000, 1500, 3000],
                'articleInverter': ['Арт.15-422001', 'Арт.15-422002', 'Арт.15-422003', 'Арт.15-422004'],
                'priceWithoutVAT': [priceList.DC_AC_220_220V_700VA_2U_BP, priceList.DC_AC_220_220V_1000VA_2U_BP, priceList.DC_AC_220_220V_1500VA_2U_BP, priceList.DC_AC_220_220V_3000VA_2U_BP],
                'fullNameInverter': ['DC/AC-220/220B-700BA-2U-ВР', 'DC/AC-220/220B-1000BA-2U-ВР', 'DC/AC-220/220B-1500BA-2U-ВР', 'DC/AC-220/220B-3000BA-2U-ВР'],
            },
        },
        'monoBlockAC': {
            '24': {
                'activePowerInverter': [1000],
                'fullPowerInverter': [1500],
                'articleInverter': ['Арт.15-4242203'],
                'priceWithoutVAT': [priceList.DC_АС_AC_24_220_220V_1500VA_2U],
                'fullNameInverter': ['(DC-АС)/AC-(24-220)/220B-1500BA-2U'],
            },
            '48(60)': {
                'activePowerInverter': [2000],
                'fullPowerInverter': [2000],
                'articleInverter': ['Арт.15-4486022004'],
                'priceWithoutVAT': [priceList.DC_АС_AC_4860_220_220V_2500VA_2U],
                'fullNameInverter': ['(DC-АС)/AC-(48(60)-220)/220B-2500BA-2U'],
            },
            '110': {
                'activePowerInverter': [2000],
                'fullPowerInverter': [2000],
                'articleInverter': ['Арт.15-411022002'],
                'priceWithoutVAT': [priceList.DC_АС_AC_110_220_220V_2500VA_2U],
                'fullNameInverter': ['(DC-АС)/AC-(110-220)/220B-2500BA-2U'],
            },
            '220': {
                'activePowerInverter': [2000],
                'fullPowerInverter': [2000],
                'articleInverter': ['Арт.15-422022004'],
                'priceWithoutVAT': [priceList.DC_АС_AC_220_220_220V_2500VA_2U],
                'fullNameInverter': ['(DC-АС)/AC-(220-220)/220B-2500BA-2U'],
            },
        },
    };

    class ParameterInverterMonoblocCl {
        constructor(parameterInverterMonoblocObj, maxPowerLoad) {
            this.parameterInverterMonoblocObj = parameterInverterMonoblocObj;
            this.maxPowerLoad = maxPowerLoad;
            this.powerBypass = 0
            this.i = 0;
        };
        get inverter() {
            do {
                if (this.i == this.parameterInverterMonoblocObj.activePowerInverter.length) {
                    return true;
                };
                this.powerInverter = this.parameterInverterMonoblocObj.activePowerInverter[this.i];
                this.i++;
            } while (this.powerInverter < this.maxPowerLoad);
            this.i--;
            return false;
        };
        get priceInv() {
            return this.parameterInverterMonoblocObj.priceWithoutVAT[this.i];
        };
        get articleInv() {
            return this.parameterInverterMonoblocObj.articleInverter[this.i];
        };
        get fullNameInv() {
            return this.parameterInverterMonoblocObj.fullNameInverter[this.i];
        };
    };

    const parametrsBypass = { // объект со всеми типами байпасов
        '220': {
            '24': {
                'fullPowerBypass': [10000, 20000],
                'articleBypass': ['Арт.15-42421', 'Арт.15-42422'],
                'priceBypassWithoutVAT': [priceList.BP_24_220B_10kVA_2U, priceList.BP_24_220B_20kVA_3U],
                'nameBypass': ['BP-24/220B-10000BA-2U', 'BP-24/220B-20000BA-3U'],
            },
            '48(60)': {
                'fullPowerBypass': [10000, 10000, 20000, 45000,],
                'articleBypass': ['Арт.15-44822', 'Арт.15-44822S1', 'Арт.15-44824', 'Арт.15-44825'],
                'priceBypassWithoutVAT': [priceList.BP_4860_220B_10kVA_2U, priceList.BP_4860_220B_10kVA_3U, priceList.BP_4860_220B_20kVA_3U, priceList.BP_4860_220B_45kVA_3U],
                'nameBypass': ['BP-48(60)/220B-10000BA-2U', 'BP-48(60)/220B-10000BA-3U', 'BP-48(60)/220B-20000BA-3U', 'BP-48(60)/220B-45000BA-3U'],
            },
            '110': {
                'fullPowerBypass': [10000, 10000, 20000, 45000],
                'articleBypass': ['Арт.15-411020', 'Арт.15-411020S1', 'Арт.15-411022', 'Арт.15-411023'],
                'priceBypassWithoutVAT': [priceList.BP_110_220B_10kVA_2U, priceList.BP_110_220B_10kVA_3U, priceList.BP_110_220B_20kVA_3U, priceList.BP_110_220B_45kVA_3U],
                'nameBypass': ['BP-110/220B-10000BA-2U', 'BP-110/220B-10000BA-3U', 'BP-110/220B-20000BA-3U', 'BP-110/220B-45000BA-3U'],
            },
            '220': {
                'fullPowerBypass': [10000, 10000, 20000, 45000],
                'articleBypass': ['Арт.15-422023', 'Арт.15-422025S1', 'Арт.15-422025', 'Арт.15-422026'],
                'priceBypassWithoutVAT': [priceList.BP_220_220B_10kVA_2U, priceList.BP_220_220B_10kVA_3U, priceList.BP_220_220B_20kVA_3U, priceList.BP_220_220B_45kVA_3U],
                'nameBypass': ['BP-220/220B-10000BA-2U', 'BP-220/220B-10000BA-3U', 'BP-220/220B-20000BA-3U', 'BP-220/220B-45000BA-3U'],
            },
        },
        '380': {
            '24': {
                'fullPowerBypass': [30000],
                'articleBypass': ['Арт.15-42423'],
                'priceBypassWithoutVAT': [priceList.BP_24_380B_30kVA_3U],
                'nameBypass': ['BP-24/380B-30000BA-3U'],
            },
            '48(60)': {
                'fullPowerBypass': [30000, 75000],
                'articleBypass': ['Арт.15-44826', 'Арт.15-44827'],
                'priceBypassWithoutVAT': [priceList.BP_4860_380B_30kVA_3U, priceList.BP_4860_380B_75kVA_3U],
                'nameBypass': ['BP-48(60)/380B-30000BA-3U', 'BP-48(60)/380B-75000BA-3U'],
            },
            '110': {
                'fullPowerBypass': [30000, 75000],
                'articleBypass': ['Арт.15-411024', 'Арт.15-411025'],
                'priceBypassWithoutVAT': [priceList.BP_110_380B_30kVA_3U, priceList.BP_110_380B_75kVA_3U],
                'nameBypass': ['BP-110/380B-30000BA-3U', 'BP-110/380B-75000BA-3U'],
            },
            '220': {
                'fullPowerBypass': [30000, 75000],
                'articleBypass': ['Арт.15-422027', 'Арт.15-422028'],
                'priceBypassWithoutVAT': [priceList.BP_220_380B_30kVA_3U, priceList.BP_220_380B_75kVA_3U],
                'nameBypass': ['BP-220/380B-30000BA-3U', 'BP-220/380B-75000BA-3U'],
            },
        },
    };

    class ParameterByPass {
        constructor(parametrBypassObj, maxPowerLoad) {
            this.parametrBypassObj = parametrBypassObj;
            this.maxPowerLoad = maxPowerLoad;
            this.powerBypass = 0
            this.b = 0;
        };
        get byPass() {
            do {
                if (this.b == this.parametrBypassObj.fullPowerBypass.length) {
                    return true;
                };
                this.powerBypass = this.parametrBypassObj.fullPowerBypass[this.b];
                this.b++;
            } while (this.powerBypass < this.maxPowerLoad);
            this.b--;
            return false;
        };
        get priceBypass() {
            return `${this.parametrBypassObj.priceBypassWithoutVAT[this.b]}р с НДС 20% -1шт`;
        };
        get articleBP() {
            return this.parametrBypassObj.articleBypass[this.b];
        };
        get fullNameBypass() {
            return this.parametrBypassObj.nameBypass[this.b];
        };
    };

    class ParameterUKU {
        constructor(nameUKU, typeUKU) {
            this.nameUKU = nameUKU;
            this.typeUKU = typeUKU;
            this.housing = ['I', 'D', 'BP', '3U'];
            this.priceUKUWithoutVAT = [priceList.UKU_207_1214_LAN_I, priceList.UKU_207_1214_LAN_D, priceList.UKU_207_1214_LAN_BP, priceList.UKU_207_1214_LAN_3U];
            this.articleUKU = 'Арт.15-60';
        };
        get priceUKU() {
            return this.priceUKUWithoutVAT[this.typeUKU - 1];
        };
        get fullArticleUKU() {
            return `${this.articleUKU}${this.typeUKU}${this.nameUKU}`;
        };
        get fullNameUKU() {
            return `УКУ 207.${this.nameUKU}-${this.housing[this.typeUKU - 1]}`;
        };
    };

    form.addEventListener('submit', ev => {
        ev.preventDefault();
        resultsNameEl.value = '';
        numberOfModules = 0;
        let maxPowerLoad = +loadPowerEl.value * +powerFactorEl.value; // максимальная полная потребляемая мощность нагрузки
        let n;
        if (typeReserveEl.selectedIndex == 5) { // учёт резерва N+N
            n = 2;
        } else {
            n = 1;
        };
        //проверка, что выбраны все параметры для подбора результата
        if (typeInverterSystemEl.value == 0) {
            return resultsNameEl.value = 'Не выбран тип инвертора!';
        } else if (DсInputVoltageEl.selectedIndex == 0) {
            return resultsNameEl.value = 'Не выбрано входное напряжение!';
        } else if (outputVoltageEl.value == 0) {
            return resultsNameEl.value = 'Не выбрано выходное напряжение!';
        } else if (loadPowerEl.value == '' || powerTypeEl.value == 0 || powerFactorEl.value == '') {
            return resultsNameEl.value = 'Не указанна мощность нагрузки!';
        } else if (ukuEl.value == 0) {
            return resultsNameEl.value = 'Не выбран тип мониторинга!';
        } else if (typeReserveEl.selectedIndex == 0) {
            return resultsNameEl.value = 'Не выбран тип резервирования!';
        } else if (typeReserveEl.selectedIndex == 5 && bypassEl.value == 'yes' && typeInverterSystemEl.value == 'moduleBP') {
            return resultsNameEl.value = 'Байпасы не работа в параллель!';
        };

        let valueUKU = '';
        if (ukuEl.value > 0) {
            const typeUKU = +ukuEl.value;
            var nameUKU;
            if (DсInputVoltageEl.value == '24' || DсInputVoltageEl.value == '48(60)') {
                nameUKU = 14;
            } else {
                nameUKU = 12;
            }
            const uku = new ParameterUKU(nameUKU, typeUKU);
            valueUKU = `\n${uku.fullNameUKU}, ${uku.fullArticleUKU} = ${uku.priceUKU}р с НДС 20% -1шт`;
        };

        if (typeInverterSystemEl.value == 'monoBlockBP' || typeInverterSystemEl.value == 'monoBlockAC') { //тип моноблочный инвертор или моноблочный инвертор с сетью
            const parameterInverterMonoblocObj = parametersInverterMonobloc[typeInverterSystemEl.value][DсInputVoltageEl.value]; //создание объекта с учётом выбранного фильтра: типа инвертора и входного напряжения.
            const moduleInverter = new ParameterInverterMonoblocCl(parameterInverterMonoblocObj, maxPowerLoad);
            if (moduleInverter.inverter) {
                return resultsNameEl.value = 'Мощность нагрузки слишком большая для данного инвертора';
            };
            return resultsNameEl.value = `${moduleInverter.fullNameInv}, ${moduleInverter.articleInv} = ${+moduleInverter.priceInv * n}р с НДС 20% -${n}шт${valueUKU}`;

        } else if (typeInverterSystemEl.value == 'moduleBP' || typeInverterSystemEl.value == 'moduleAC') { //тип модульная инверторная система или модульная инверторная система с сетью
            //  changeInverterParameters();
            const parameterInverterModuleObj = parametersInverterModule[typeInverterSystemEl.value][DсInputVoltageEl.value]; //создание объекта с учётом выбранного фильтра: типа инвертора и входного напряжения.
            const activePowerInverterOneModele = parameterInverterModuleObj.activePowerInverter;
            searchNumberOfModules(activePowerInverterOneModele, maxPowerLoad);
            const inverterModule = new ParameterInverterModule(parameterInverterModuleObj, numberOfModules);

            if (numberOfModules > 30 / n) {
                return resultsNameEl.value = 'Модулей в ИС не может быть больше 30! Нагрузка слишком большая!';
            } else if (ukuEl.value == 1 && Number.isInteger(numberOfModules / 3)) {
                valueUKU = `\nВ инверторной корзине нет свободных слотов для установки УКУ 207.${nameUKU}-I`
            };

            let bypassAvailability = '';
            if (bypassEl.value == 'yes') { // работа с байпасом если он есть в системе
                const parametrBypassObj = parametrsBypass[outputVoltageEl.value][DсInputVoltageEl.value]; //создание объекта с учётом выбранного фильтр: выходного и входного напряжения 

                if (ukuEl.value == 3 && bypassEl.value == 'yes' && outputVoltageEl.value == '220' && parametrBypassObj.fullPowerBypass[0] > 0) { //в байпас с выходом 220В высотой 2U нельзя установить УКУ 207.хх-BP
                    parametrBypassObj.fullPowerBypass[0] *= (-1);
                } else if (ukuEl.value == 3 && bypassEl.value == 'yes' && outputVoltageEl.value == '220' && parametrBypassObj.fullPowerBypass[0] < 0) {
                } else if (parametrBypassObj.fullPowerBypass[0] < 0) {
                    parametrBypassObj.fullPowerBypass[0] *= (-1)
                };

                const bypass = new ParameterByPass(parametrBypassObj, maxPowerLoad);
                if (bypass.byPass) {
                    return resultsNameEl.value = 'Мощность нагрузки слишком большая для данного байпаса';
                };
                bypassAvailability = `\n${bypass.fullNameBypass}, ${bypass.articleBP} = ${bypass.priceBypass}`;
            }

            return resultsNameEl.value = `${inverterModule.fullNameInverter}, ${getArticle(numberOfModules)} = ${inverterModule.priceIverter * n}р с НДС 20% -${n}шт${bypassAvailability}${valueUKU}`;
        };
    });
});