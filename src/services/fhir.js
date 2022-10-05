import axios from 'axios';

const fhirApi = axios.create({
    baseURL: 'http://ec2-3-94-107-103.compute-1.amazonaws.com:3001/4_0_0/',
    headers: {
        'Content-Type': 'application/fhir+json'
    }
})

export default fhirApi;