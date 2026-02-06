
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
workOrderNumber: faker.lorem.sentence(1),
incidentId: faker.lorem.sentence(1),
vendorId: faker.lorem.sentence(1),
assignedDate: faker.lorem.sentence(1),
completed: faker.lorem.sentence(1),
remarks: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
