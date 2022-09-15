import axios from 'axios';

const fhirApi = axios.create({
    baseURL: 'http://localhost:3001/4_0_0/',
    headers: {
        'Content-Type': 'application/fhir+json'
    }
})

export default fhirApi;