


export interface DealProperties {
    numberOfContacts: number;
    numberOfSalesActivities: number;
}

export const score = (dealsProperties: DealProperties) => {
    // console.log(dealsProperties,"propertie")
    const factors = {
        contact: dealsProperties.numberOfContacts,
        salesActivities: dealsProperties.numberOfSalesActivities,
        activityContactRatio: dealsProperties.numberOfSalesActivities / Math.max(dealsProperties.numberOfContacts, 1)
    };

    let score = 0;
    let shortReasons = [];
    let detailedReasons = [];

    // Ajustes en la puntuación y razones para los contactos
    if (factors.contact > 5) {
        score += 7; // Peso alto pero equilibrado
        shortReasons.push("Red de contactos excepcional");
        detailedReasons.push("Una red de contactos extensa es un indicativo clave de potencial de mercado y oportunidades de negocio.");
    } else if (factors.contact > 3) {
        score += 4;
        shortReasons.push("Contactos sólidos");
        detailedReasons.push("Una red de contactos sólida es crucial para mantener la continuidad del negocio y explorar nuevas oportunidades.");
    } else if (factors.contact > 2) {
        score += 3;
        shortReasons.push("Contactos adecuados");
        detailedReasons.push("Una cantidad moderada de contactos sugiere una necesidad de mayor enfoque en el desarrollo de la red.");
    } else {
        score -= 2;
        shortReasons.push("Insuficientes contactos");
        detailedReasons.push("Un número bajo de contactos podría ser una señal para reevaluar estrategias de networking y engagement.");
    }

    // Ajustes en la puntuación y razones para las actividades de ventas
    if (factors.salesActivities > 15) {
        score += 6;
        shortReasons.push("Actividad de ventas alta");
        detailedReasons.push("Una actividad de ventas muy alta refleja un compromiso intenso con el seguimiento y la conversión de clientes.");
    } else if (factors.salesActivities > 7) {
        score += 2;
        shortReasons.push("Buena actividad de ventas");
        detailedReasons.push("Un nivel saludable de actividad de ventas indica un proceso de ventas activo y una buena gestión de relaciones.");
    } else if (factors.salesActivities < 5) {
        score -= 1;
        shortReasons.push("Baja actividad de ventas");
        detailedReasons.push("Una actividad de ventas baja puede señalar áreas de mejora en la estrategia de ventas y el compromiso con los clientes.");
    }
    // Interpretación final de la puntuación
    let flag = score > 5 ? "🟢" : score > 3 ? "🟠" : "🔴";
    let combinedShortReason = shortReasons
    let combinedDetailedReason = detailedReasons.join(" ");

    return { flag, shortReason: combinedShortReason, detailedReason: combinedDetailedReason,score };
};

export const evaluateAllScenarios = () => {

    const scenarios = [];

    for (let contacts = 0; contacts <= 10; contacts++) {
        for (let activities = 0; activities <= 100; activities++) {
            const result = score({ numberOfContacts: contacts, numberOfSalesActivities: activities });
            scenarios.push({
                numberOfContacts: contacts,
                numberOfSalesActivities: activities,
                flag: result.flag,
                shortReason: result.shortReason,
                detailedReason: result.detailedReason
            });
        }
    }

    return scenarios;
};




