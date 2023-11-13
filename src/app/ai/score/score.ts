// let mendel = {
//     contact: 6,
//     interactions: 120
// };

// export const score = (dealsProperties : any) => {
//     let redFlagContact = 0;
//     let neutraFlagContact = 0;
//     let greenFlagContact = 0;
//     let redFlagInteractions = 0;
//     let neutraFlagInteractions = 0;
//     let greenFlagInteractions = 0;

//     const reasons = {
//         red: [] as string[],
//         neutra: [] as string[],
//         green: [] as string[],
//     };

//     // Evaluar la categoría de contacto
//     if (dealsProperties.partnerContact <= 2) {
//         redFlagContact++;
//         reasons.red.push("Contacto menor o igual a 2.");
//     } else if (dealsProperties.partnerContact >= 3 && dealsProperties.partnerContact <= 5) {
//         neutraFlagContact++;
//         reasons.neutra.push("Contacto entre 3 y 5.");
//     } else if (dealsProperties.partnerContact > 5) {
//         greenFlagContact++;
//         reasons.green.push("Contacto mayor a 5.");
//     }

//     // Evaluar la categoría de interacciones
//     // if (mendel.interactions < 10) {
//     //     redFlagInteractions++;
//     //     reasons.red.push("Interacciones menores a 10.");
//     // } else if (mendel.interactions >= 10 && mendel.interactions <= 20) {
//     //     neutraFlagInteractions++;
//     //     reasons.neutra.push("Interacciones entre 10 y 20.");
//     // } else if (mendel.interactions > 20) {
//     //     greenFlagInteractions++;
//     //     reasons.green.push("Interacciones mayores a 20.");
//     // }

//     // Calcular la puntuación ponderada
//     const contactWeight = 0.5; // Peso para la categoría de contacto
//     const interactionsWeight = 0.5; // Peso para la categoría de interacciones

//     const redFlag = redFlagContact * contactWeight + redFlagInteractions * interactionsWeight;
//     const neutraFlag = neutraFlagContact * contactWeight + neutraFlagInteractions * interactionsWeight;
//     const greenFlag = greenFlagContact * contactWeight + greenFlagInteractions * interactionsWeight;

//     // Encontrar la bandera predominante
//     let maxFlag = Math.max(redFlag, neutraFlag, greenFlag);

//     if (maxFlag === redFlag) {
//         return { stateFlag: redFlag, flagReason: reasons.red, flag: "🔴" };
//     } else if (maxFlag === neutraFlag) {
//         return { stateFlag: neutraFlag, flagReason: reasons.neutra, flag: "🟠" };
//     } else {
//         return { stateFlag: greenFlag, flagReason: reasons.green, flag: "🟢" };
//     }
// };


let mendel = {
    contact: 6,
    interactions: 9
};

export const score = (dealsProperties: any) => {
    console.log(dealsProperties,"sa")
    const factors = {
        contact: dealsProperties
       
        // interactions: mendel.interactions
    };

    const rules = [
        {
            condition: (factors: any) => factors.contact <= 2 ,
            flag: "🔴",
            reason: "Contacto bajo "
        },
        {
            condition: (factors: any) => factors.contact >= 3 && factors.contact <= 5,
            flag: "🟠",
            reason: "Contacto moderado y pocas interacciones."
        },
        {
            condition: (factors: any) => factors.contact > 5,
            flag: "🟢",
            reason: "Contacto alto y pocas interacciones."
        },
        {
            condition: (factors: any) => factors.contact <= 2 && factors.interactions >= 10,
            flag: "🟠",
            reason: "Contacto bajo y interacciones moderadas."
        },
        {
            condition: (factors: any) => factors.contact >= 3 && factors.contact <= 5,
            flag: "🔴",
            reason: "Contacto moderado y interacciones moderadas."
        },
        {
            condition: (factors: any) => factors.contact > 5 ,
            flag: "🟢",
            reason: "Contacto alto y interacciones moderadas."
        },
        {
            condition: (factors: any) => factors.contact <= 2,
            flag: "🟢",
            reason: "Contacto bajo y muchas interacciones."
        },
        {
            condition: (factors: any) => factors.contact >= 3 && factors.contact <= 5,
            flag: "🟢",
            reason: "Contacto moderado y muchas interacciones."
        },
        {
            condition: (factors: any) => factors.contact > 5,
            flag: "🟢",
            reason: "Contacto alto y muchas interacciones."
        }
    ];

    let result = {
        flag: "🟠",
        reason: "No se pudo determinar el estado."
    };

    for (const rule of rules) {
        if (rule.condition(factors)) {
            result = {
                flag: rule.flag,
                reason: rule.reason
            };
            break;
        }
    }

    return result;
};


