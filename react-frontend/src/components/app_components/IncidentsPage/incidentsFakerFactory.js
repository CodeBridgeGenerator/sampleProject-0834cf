
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
incidentNumber: faker.lorem.sentence(1),
issueType: faker.lorem.sentence(1),
location: faker.lorem.sentence(1),
reportedDate: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
contractId: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
