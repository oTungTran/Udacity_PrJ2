import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm, { LoginType } from '../components/Common/LoginForm/LoginForm';

describe("<LoginForm />", () => {
    test('renders login form', async () => {
        const handleSubmit = jest.fn((e: LoginType) => { });

        render(<LoginForm submit={handleSubmit} />);

        const inpUsername = await screen.findByLabelText('Username');
        expect(inpUsername).toBeInTheDocument();

        const inpPassword = await screen.findByLabelText('Password');
        expect(inpPassword).toBeInTheDocument();

        const btnSubmit = screen.getByRole('button', { name: /Log in/i });
        expect(btnSubmit).toBeInTheDocument();
    });

    test('input username in form', async () => {
        const handleSubmit = jest.fn((e: LoginType) => { });

        render(<LoginForm submit={handleSubmit} />);

        const inpUsername = await screen.findByLabelText('Username');
        fireEvent.change(inpUsername, { target: { value: 'test' } });

        expect(inpUsername.getAttribute('value')).toBe("test");
    });

    test('login form fail', async () => {
        const handleSubmit = jest.fn((e: LoginType) => { });

        render(<LoginForm submit={handleSubmit} />);

        const inpPassword = await screen.findByLabelText('Password');
        fireEvent.change(inpPassword, { target: { value: 'abc321' } });

        const btnSubmit = screen.getByRole('button', { name: /Log in/i });
        fireEvent.click(btnSubmit);

        const usernameError = await screen.findByText(/Username is required/i);
        expect(usernameError).toBeInTheDocument();
    });

    test('login form success', async () => {
        let data: LoginType | undefined = undefined;
        const handleSubmit = jest.fn((e: LoginType) => (data = e));

        render(<LoginForm submit={handleSubmit} />);

        const inpUsername = await screen.findByLabelText('Username');
        fireEvent.change(inpUsername, { target: { value: 'tylermcginnis' } });

        const inpPassword = await screen.findByLabelText('Password');
        fireEvent.change(inpPassword, { target: { value: 'abc321' } });

        expect(data).toBeUndefined();

        const btnSubmit = screen.getByRole('button', { name: /Log in/i });
        fireEvent.click(btnSubmit);

        expect(handleSubmit).toHaveBeenCalled();
        expect(data).toMatchObject({ username: 'tylermcginnis', password: 'abc321' });
    });

    test("snapshot", () => {
        const handleSubmit = jest.fn((e: LoginType) => { });
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const tree = render(<LoginForm submit={handleSubmit} />);
        expect(tree).toMatchSnapshot();
    });
});
