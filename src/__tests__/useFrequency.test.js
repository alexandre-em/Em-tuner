import useFrequency from "hooks/useFrequency";

describe('useFrequency hook test', () => {
	it('Should return the right note', () => {
		const { frequenciesBST, closestValue } = useFrequency();
		const result = closestValue(frequenciesBST, 65);
		expect(result.val.note).toBe('C2');
		expect(result.val.frequency).toBe(65);
	})

	it('Should return the closest note greater than the given value', () => {
		const { frequenciesBST, closestValue } = useFrequency();
		const result = closestValue(frequenciesBST, 70);
		expect(result.val.note).toBe('D2');
		expect(result.val.frequency).toBeGreaterThan(70);
	})
})