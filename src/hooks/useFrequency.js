
export default function useFrequency() {
    const allFrequencies = [
        { frequency: 28, note: "A0" },
        { frequency: 31, note: "B0" },
        { frequency: 33, note: "C1" },
        { frequency: 37, note: "D1" },
        { frequency: 41, note: "E1" },
        { frequency: 44, note: "F1" },
        { frequency: 49, note: "G1" },
        { frequency: 55, note: "A1" },
        { frequency: 62, note: "B1" },
        { frequency: 65, note: "C2" },
        { frequency: 73, note: "D2" },
        { frequency: 82, note: "E2" },
        { frequency: 87, note: "F2" },
        { frequency: 98, note: "G2" },
        { frequency: 110, note: "A2" },
        { frequency: 123, note: "B2" },
        { frequency: 131, note: "C3" },
        { frequency: 147, note: "D3" },
        { frequency: 165, note: "E3" },
        { frequency: 175, note: "F3" },
        { frequency: 196, note: "G3" },
        { frequency: 220, note: "A3" },
        { frequency: 247, note: "B3" },
        { frequency: 262, note: "C4" },
        { frequency: 294, note: "D4" },
        { frequency: 330, note: "E4" },
        { frequency: 349, note: "F4" },
        { frequency: 392, note: "G4" },
        { frequency: 440, note: "A4" },
        { frequency: 494, note: "B4" }
    ];

    /**
     * A Binary tree class implementation
     * @class
     * @param {number} val 
     */
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }

    /**
     * Convert an array of frequencies to a binary tree
     * @param {Array<{ frequency: number, note: string }>} frequencies Array of frequencies
     * @returns Binary tree of the frequencies
     */
    const toBST = (frequencies) => {
        // base cases
        if (frequencies.length === 1) return new TreeNode(frequencies[0])
        if (frequencies.length === 0) return null

        const n = Math.floor(frequencies.length / 2)
        let root = new TreeNode(frequencies[n])

        const leftSubtree = frequencies.slice(0, n)
        root.left = toBST(leftSubtree)

        const rightSubtree = frequencies.slice(n + 1, frequencies.length)
        root.right = toBST(rightSubtree)

        return root
    }

    const frequenciesBST = toBST(allFrequencies)

    /**
     * @description Compute the closest note of a frequency `val`
     * @param {TreeNode} tree Binary tree
     * @param {number} val Frequency to compare
     * @returns The closest note
     */
    const closestValue = (tree, val) => {
        if (tree.val.frequency === val)
            return tree
        if (val < tree.val.frequency) {
            if (!tree.left)
                return tree
            let p = closestValue(tree.left, val)
            return Math.abs(p.val.frequency - val) > Math.abs(tree.val.frequency - val) ? tree : p
        }
        else {
            if (!tree.right)
                return tree;
            let p = closestValue(tree.right, val)
            return Math.abs(p.val.frequency - val) > Math.abs(tree.val.frequency - val) ? tree : p
        }
    }

    return {
        TreeNode,
        toBST,
        frequenciesBST,
        closestValue,
    };
}

