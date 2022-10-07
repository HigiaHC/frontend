

const ObservationParser = {
    parseObservation: (data) => {
        const resourceType = 'Observation';

        const subject = {
            display: data.subject
        };

        const issued = data.issued.replace(" ", "T").concat(":00+00:00");

        const coding = [{
            system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
            display: data.interpretation
        }];
        const interpretation = [{
            coding: coding
        }];

        const low = {
            value: data.low,
            unit: "mmol/l",
            system: "http://unitsofmeasure.org",
            code: "mmol/L"
        };
        const high = {
            value: data.high,
            unit: "mmol/l",
            system: "http://unitsofmeasure.org",
            code: "mmol/L"
        } 
        const referenceRange = {
            low: low,
            high: high
        };

        return {
            resourceType,
            subject,
            issued,
            interpretation,
            referenceRange,
        }
    }
}

export default ObservationParser;