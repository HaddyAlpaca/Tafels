import { ComponentHarness } from "@angular/cdk/testing";

export class TafelsOefenenComponentHarness extends ComponentHarness {
    static hostSelector = 'app-tafels-oefenen';

    public async getVraag(): Promise<string> {
        const vraagElement = await this.locatorFor('.vraag')();
        return vraagElement.text();
    }

    public async setAntwoord(antwoord: string): Promise<void> {
        const inputElement = await this.locatorFor('input[type="number"]')();
        await inputElement.clear();
        await inputElement.sendKeys(antwoord);
    }

    public async getScore(): Promise<string> {
        const scoreElement = await this.locatorFor('.score')();
        return scoreElement.text();
    }

    public async clickResetButton(): Promise<void> {
        const resetButton = await this.locatorFor('#reset-btn')();
        await resetButton.click();
    }

    public async clickControleerButton(): Promise<void> {
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

    public async clickVolgordeCheckbox(): Promise<void> {
        const volgordeCheckbox = await this.locatorFor('#volgorde-check')();
        await volgordeCheckbox.click();
    }

    public async clickAlleTafelsButton(): Promise<void> {
        const button = await this.locatorFor('.alle-tafels')();
        await button.click();
    }

    public async kiesTafel(n: number): Promise<void> {
        const tafelButton = await this.locatorFor(`#tafel-btn-${n}`)();
        await tafelButton.click();
    }

    public async getVolgordeCheckboxState(): Promise<boolean> {
        const volgordeCheckbox = await this.locatorFor('#volgorde-check')();
        const checked = await volgordeCheckbox.getProperty<boolean>('checked');
        return checked;
    }
}