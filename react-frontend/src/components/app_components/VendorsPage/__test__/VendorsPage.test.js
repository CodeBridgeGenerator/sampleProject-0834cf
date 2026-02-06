import React from "react";
import { render, screen } from "@testing-library/react";

import VendorsPage from "../VendorsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders vendors page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VendorsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("vendors-datatable")).toBeInTheDocument();
    expect(screen.getByRole("vendors-add-button")).toBeInTheDocument();
});
