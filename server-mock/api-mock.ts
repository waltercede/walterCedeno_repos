import nock from "nock";
import axios from "axios";

export const serviceMock = async () => {
    nock('http://localhost:9095')
        .get('/')
        .delay(1000)
        .reply(200, {
            repositories: [{ "id": 1, "state": 604 }, { "id": 2, "state": 605 }, { "id": 3, "state": 606 }]
        })
    const res = await axios.get('http://localhost:9095');
    const data = res.data;
    return data;
}
