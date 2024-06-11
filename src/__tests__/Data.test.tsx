const { _saveQuestion, _saveQuestionAnswer } = require('../plugins/api/_DATA');

describe('saveQuestion', () => {
    test('new question', async () => {
        const data = {
            optionOneText: 'Option One Text',
            optionTwoText: "Option Two Text",
            author: 'tylermcginnis'
        };
        const result = await _saveQuestion(data);
        expect(result.id).not.toBeUndefined();
        expect(typeof result.timestamp).toBe('number');
        expect(result.title).toEqual('Would You Rather');
        expect(result.author).toEqual('tylermcginnis');
        expect(result.optionOne).toBeDefined();
        expect(result.optionOne).toStrictEqual({ votes: [], text: data.optionOneText });
        expect(result.optionTwo).toStrictEqual({ votes: [], text: data.optionTwoText });
    });

    test('will return error', async () => {
        const data = {
            optionOneText: 'Option One Text',
            optionTwoText: "Option Two Text"
        };
        await expect(_saveQuestion(data)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    });

});

describe('saveQuestionAnswer', () => {
    it('answer of question', async () => {
        const data = {
            authedUser: "tylermcginnis",
            qid: "vthrdm985a262al8qx3do",
            answer: "optionOne"
        };
        const result = await _saveQuestionAnswer(data);
        expect(result).toBeTruthy();
    });

    test('will return error', async () => {
        const data = {
            authedUser: "tylermcginnis",
            qid: "vthrdm985a262al8qx3do"
        };
        await expect(_saveQuestionAnswer(data)).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
});
