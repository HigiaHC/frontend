const Parser = {


    parsePatient: (data) => {
        const resourceType = 'Patient';

        const active = data.active;

        const nameArr = data.name.split('\s');

        const name = [{
            use: "official",
            family: nameArr[-1],
            given: nameArr.splice(-1)
        }];

        const gender = data.gender;

        const birthDate = data.birthDate;

        const telecom = [
            {
                system: 'phone',
                value: data.phone,
                use: "home",
                rank: 1
            },
            {
                system: 'email',
                value: data.email,
                use: "home",
                rank: 2
            }
        ];

        const address = [
            {
                use: "home",
                type: "both",
                text: data.address,

            }
        ]

        return {
            resourceType,
            active,
            name,
            gender,
            birthDate,
            telecom,
            address
        }
    },

    parseDiagnostic: (data) => {
        const resourceType = 'DiagnosticReport';

        const active = data.active;

        const subject = {
            display: data.subject
        };

        const issued = data.issued;//.replace(" ", "T").concat(":00+00:00");

        const conclusion = data.acticonclusionve;

        return {
            resourceType,
            active,
            subject,
            issued,
            conclusion
        }
    }
}

export default Parser;