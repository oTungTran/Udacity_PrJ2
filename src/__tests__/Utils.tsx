import React, { PropsWithChildren } from "react";
import { RenderOptions, render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { RootState } from "../plugins/store";
import { Provider } from 'react-redux';
import rootReducer from "../plugins/store/reducers";
import { BrowserRouter } from "react-router-dom";

function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
};

export type AppStore = ReturnType<typeof setupStore>;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    isRouter?: boolean,
    preloadedState?: Partial<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        isRouter = false,
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function ReduxWrapper({ children }: PropsWithChildren<{}>) {
        return (<Provider store={store}>{children}</Provider>)
    }
    function BrowserRouterWrapper({ children }: PropsWithChildren<{}>) {
        return (
            <BrowserRouter>
                <Provider store={store}>{children}</Provider>
            </BrowserRouter>
        )
    }
    return { store, ...render(ui, { wrapper: isRouter ? BrowserRouterWrapper : ReduxWrapper, ...renderOptions }) }
}

// Your test suite must contain at least one test
test('any file in __tests__ is a test', async () => {
    expect(true).toBeTruthy();
});
