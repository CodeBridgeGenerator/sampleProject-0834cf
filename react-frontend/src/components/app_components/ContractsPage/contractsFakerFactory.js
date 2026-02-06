
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
contractNumber: faker.datatype.number(""),
title: faker.datatype.number(""),
startDate: faker.datatype.number(""),
endDate: faker.datatype.number(""),
value: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
