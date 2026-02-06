import React from "react";
import { render, screen } from "@testing-library/react";

import ContractsPage from "../ContractsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders contracts page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ContractsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("contracts-datatable")).toBeInTheDocument();
    expect(screen.getByRole("contracts-add-button")).toBeInTheDocument();
});
