

export const score = (dealsProperties: any) => {
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


