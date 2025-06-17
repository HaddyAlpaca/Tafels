import { ComponentHarness } from "@angular/cdk/testing";

export class MultiplicationTablesComponentHarness extends ComponentHarness {
    static hostSelector = 'app-multiplication-tables';

    public async getSelectedTable(): Promise<string | null> {
        const selectedTableButton = await this.locatorForOptional('.table-selection button.selected')();

        if (!selectedTableButton) {
            return null;
        }

        return selectedTableButton.text();
    }

    public async isAllTablesSelected(): Promise<boolean> {
        const allTablesButton = await this.locatorForOptional('.all-tables.selected')();
        return !!allTablesButton;
    }

    public async getQuestion(): Promise<string> {
        const element = await this.locatorFor('.question')();
        return element.text();
    }

    public async setAnswer(answer: string): Promise<void> {
        const inputElement = await this.locatorFor('input[type="number"]')();
        await inputElement.clear();
        await inputElement.sendKeys(answer);
    }

    public async getScore(): Promise<string> {
        const scoreElement = await this.locatorFor('.score')();
        return scoreElement.text();
    }

    public async clickResetButton(): Promise<void> {
        const resetButton = await this.locatorFor('#reset-btn')();
        await resetButton.click();
    }

    public async clickCheckButton(): Promise<void> {
        const checkButton = await this.locatorFor('#check-btn')();
        await checkButton.click();
    }
    
    public async isFeedbackVisible(): Promise<boolean> {
        const feedbackElement = await this.locatorForOptional('.feedback')();
        return !!feedbackElement;
    } 

    public async getFeedback(): Promise<string> {
        const feedbackElement = await this.locatorFor('.feedback')();
        return feedbackElement.text();
    }

    public async clickOrderedCheckbox(): Promise<void> {
        const checkbox = await this.locatorFor('#ordered-check')();
        await checkbox.click();
    }

    public async getOrderedCheckboxState(): Promise<boolean> {
        const checkbox = await this.locatorFor('#ordered-check')();
        const checked = await checkbox.getProperty<boolean>('checked');
        return checked;
    }

    public async clickAllTablesButton(): Promise<void> {
        const button = await this.locatorFor('.all-tables')();
        await button.click();
    }

    public async selectTable(n: number): Promise<void> {
        const button = await this.locatorFor(`#table-btn-${n}`)();
        await button.click();
    }
}
