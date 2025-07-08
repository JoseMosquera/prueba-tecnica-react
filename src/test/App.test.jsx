import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest'
import { AppProvider } from '../contex/AppContext';

describe("App", () => {

    beforeEach(() => {
        if (!HTMLDialogElement.prototype.showModal) {
            HTMLDialogElement.prototype.showModal = function () {
                this.setAttribute('open', 'true');
            };
        }

        if (!HTMLDialogElement.prototype.close) {
            HTMLDialogElement.prototype.close = function () {
                this.removeAttribute('open');
            };
        }

        vi.spyOn(HTMLDialogElement.prototype, 'showModal');
        vi.spyOn(HTMLDialogElement.prototype, 'close');
    });

    it('renders String list container', () => {
        render(
            <AppProvider>
                <App />
            </AppProvider>
        );
        const stringListContainer = screen.getByText("String List");
        expect(stringListContainer).toBeVisible();
    });

    it('renders new string modal', async () => {
        render(
            <AppProvider>
                <App />
            </AppProvider>
        );

        await userEvent.click(screen.getByRole("button", { name: "open create item modal" }));

        const dialog = screen.getByText("Add new item to the list");
        expect(dialog).toBeVisible();
    });

    it('create new item', async () => {
        render(
            <AppProvider>
                <App />
            </AppProvider>
        );

        await userEvent.click(screen.getByRole("button", { name: "open create item modal" }))

        const input = screen.getByPlaceholderText("Type the text here...");
        await userEvent.type(input, "Test 1")
        userEvent.click(screen.getByRole("button", { name: "add item" }))

        const newString = screen.getByDisplayValue("Test 1");

        expect(newString).toBeVisible();
    });

    it('add btn is disabled if no text on the input', async () => {
        render(
            <AppProvider>
                <App />
            </AppProvider>
        );

        await userEvent.click(screen.getByRole("button", { name: "open create item modal" }));
        const addStringBtn = screen.getByRole("button", { name: "add item" });

        expect(addStringBtn).toBeDisabled();
    });

    it('delete an item from the list', async () => {
        render(
            <AppProvider>
                <App />
            </AppProvider>
        );

        await userEvent.click(screen.getByText("Texto de ejemplo 2"))
        await userEvent.click(screen.getByText("Delete"))

        expect(screen.queryByText("Texto de ejemplo 2")).not.toBeInTheDocument();
    });


    it('delet more than one item at the same time', async () => {
        render(
            <AppProvider>
                <App />
            </AppProvider>
        );

        await userEvent.click(screen.getByText("Texto de ejemplo 1"))
        await userEvent.click(screen.getByText("Texto de ejemplo 2"))
        await userEvent.click(screen.getByText("Delete"))

        expect(screen.queryByText("Texto de ejemplo 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Texto de ejemplo 2")).not.toBeInTheDocument();
    });

    it('delete item with double click', async () => {
        render(
            <AppProvider>
                <App />
            </AppProvider>
        );

        await userEvent.dblClick(screen.getByText("Texto de ejemplo 2"))

        expect(screen.queryByText("Texto de ejemplo 2")).not.toBeInTheDocument();
    });

    it('delete an item and bring it back with undo btn', () => {
        render(
            <AppProvider>
                <App />
            </AppProvider>
        );

        userEvent.dblClick(screen.getByText("Texto de ejemplo 2"))
        userEvent.click(screen.getByRole("button", { name: "undo last step" }))

        expect(screen.getByText("Texto de ejemplo 2")).toBeVisible();
    });
})

