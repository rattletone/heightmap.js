const Heightmap = require("../dist/heightmap");

test("generate heightmap with size of 2 ** iterations + 1", () => {
	const iterations = 1;
	const heightmap = Heightmap.create(iterations);

	expect(heightmap.length).toBe(Math.pow(2, iterations) + 1);
});

test("throw TypeError if iterations arguments parameter is invalid", () => {
	const iterations = NaN;

	expect(() => Heightmap.create(iterations)).toThrow(TypeError);
});

test("accept an optional seed argument", () => {
	const iterations = 1;
	const seed = Math.random().toString(36);

	expect(() => Heightmap.create(iterations, seed)).not.toThrow();
});

test("generate identical corner values if seed is identical", () => {
	const iterationsA = 1;
	const iterationsB = 2;
	const seed = Math.random().toString(36);
	const heightmapA = Heightmap.create(iterationsA, seed);
	const heightmapB = Heightmap.create(iterationsB, seed);

	expect(heightmapA[0][0]).toBe(heightmapB[0][0]);
	expect(heightmapA[0][heightmapA[0].length - 1]).toBe(heightmapB[0][heightmapB[0].length - 1]);
	expect(heightmapA[heightmapA.length - 1][heightmapA[0].length - 1]).toBe(heightmapB[heightmapB.length - 1][heightmapB[0].length - 1]);
	expect(heightmapA[heightmapA.length - 1][heightmapA[heightmapA.length - 1].length - 1]).toBe(heightmapB[heightmapB.length - 1][heightmapB[heightmapB.length - 1].length - 1]);
});

test("generate identical heightmaps if iterations and seed are identical", () => {
	const iterations = 1;
	const seed = Math.random().toString(36);
	const heightmapA = Heightmap.create(iterations, seed);
	const heightmapB = Heightmap.create(iterations, seed);

	expect(heightmapA).toStrictEqual(heightmapB);
});
