import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MultiplicationTablesComponent } from "./multiplication-tables.component";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MultiplicationTablesComponentHarness } from "./multiplication-tables.component.harness";

describe('MultiplicationTablesComponent tests', () => {
    let fixture: ComponentFixture<MultiplicationTablesComponent>;
    let component: MultiplicationTablesComponent;

    beforeEach(async () => {
        fixture = TestBed.createComponent(MultiplicationTablesComponent);
        component = fixture.componentInstance;
    });

    it('check initial state', async () => {
        const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, MultiplicationTablesComponentHarness);
        expect(await harness.getSelectedTable()).toBe('1');
        expect(await harness.isAllTablesSelected()).toBeFalse();
        expect(await harness.getOrderedCheckboxState()).toBeFalse();
        expect(await harness.getQuestion()).toContain('Wat is 1 x 1?');
        expect(await harness.getScore()).toBe('Score: 0 / 0');
        expect(await harness.isFeedbackVisible()).toBeFalse();
    });

    it('table in order go from 1 to 10 and back to 1', async () => {
        const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, MultiplicationTablesComponentHarness);
        await harness.clickOrderedCheckbox();
        
        for (let i = 1; i <= 10; i++) {
            expect(await harness.getQuestion()).toContain(`Wat is ${i} x 1?`);
            await harness.setAnswer(`${i}`);
            await harness.clickCheckButton();
            expect(await harness.getFeedback()).toBe('Goed gedaan!');
            component.generateQuestion();
            expect(await harness.getScore()).toBe(`Score: ${i} / ${i}`);
        }
        
        expect(await harness.getQuestion()).toContain('Wat is 1 x 1?');
    });

    it('feedback after wrong answer', async () => {
        const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, MultiplicationTablesComponentHarness);
        await harness.setAnswer('5');
        await harness.clickCheckButton();
        expect(await harness.getFeedback()).toBe('Helaas, het juiste antwoord is 1');
    });

    it('selecting a table generates a question', async () => {
        const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, MultiplicationTablesComponentHarness);

        for (let i = 1; i <= 10; i++) {
            await harness.selectTable(i);

            const question = component.question();

            expect(await harness.getQuestion()).toContain(`Wat is ${question.multiplier} x ${i}?`);
            await harness.setAnswer(`${question.multiplier * i}`);
            await harness.clickCheckButton();
            expect(await harness.getFeedback()).toBe('Goed gedaan!');
        }
    });

    it('reset button resets the game', async () => {
        const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, MultiplicationTablesComponentHarness);
        
        await harness.selectTable(7);
        expect(await harness.getSelectedTable()).toBe('7');
        await harness.clickOrderedCheckbox();
        expect(await harness.getOrderedCheckboxState()).toBeTrue();
        expect(await harness.getQuestion()).toContain('Wat is 1 x 7?');

        await harness.clickResetButton();
        
        expect(await harness.getSelectedTable()).toBe('1');
        expect(await harness.getQuestion()).toContain('Wat is 1 x 1?');
        expect(await harness.getScore()).toBe('Score: 0 / 0');
        expect(await harness.isFeedbackVisible()).toBeFalse();
    });

    it('random table selection', async () => {
        const harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, MultiplicationTablesComponentHarness);
        
        await harness.clickAllTablesButton();
        expect(await harness.getSelectedTable()).toBe('Alle tafels door elkaar');
        
        const question = component.question();
        expect(await harness.getQuestion()).toContain(`Wat is ${question.multiplier} x ${question.table}?`);
        expect(question.table).toBeGreaterThanOrEqual(1);
        expect(question.table).toBeLessThanOrEqual(10);
    });
});