import React from "react";
import { render, screen } from "@testing-library/react";

import IncidentsPage from "../IncidentsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders incidents page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncidentsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incidents-datatable")).toBeInTheDocument();
    expect(screen.getByRole("incidents-add-button")).toBeInTheDocument();
});
