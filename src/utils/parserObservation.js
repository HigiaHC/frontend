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

        return {
            resourceType,
            subject,
            issued,
            interpretation
        }
    }
}

export default ObservationParser;