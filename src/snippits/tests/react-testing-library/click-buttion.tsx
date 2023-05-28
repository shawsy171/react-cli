import { render, screen } from "@testing-library/react";
import userEvent from  '@testing-library/user-event';

const buttonElement = screen.getByRole("button", { name: /Upload Artifact/i });
    userEvent.click(buttonElement);

userEvent.click(buttonElement.firstChild as HTMLElement);