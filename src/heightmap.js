function clamp(n) {
	return Math.min(Math.max(n, 0), 1);
}

function* hash(seed) {
	let h;

	for(const i of seed) {
		h = 1779033703 ^ seed.length;
		h = Math.imul(h ^ i.charCodeAt(0), 3432918353);
		h = (h << 13) | (h >>> 19);
	}

	while(true) {
		h = Math.imul(h ^ (h >>> 16), 2246822507);
		h = Math.imul(h ^ (h >>> 13), 3266489909);

		yield (h ^= h >>> 16) >>> 0;
	}
}

function* random(aSeed, bSeed, cSeed, dSeed) {
	let a = aSeed;
	let b = bSeed;
	let c = cSeed;
	let d = dSeed;

	while(true) {
		let t;

		a >>>= 0;
		b >>>= 0;
		c >>>= 0;
		d >>>= 0;
		t = (a + b) | 0;
		a = b ^ (b >>> 9);
		b = (c + (c << 3)) | 0;
		c = (c << 21) | (c >> 11);
		d = (d + 1) | 0;
		t = (t + d) | 0;
		c = (c + t) | 0;

		yield (t >>> 0) / 4294967296;
	}
}

function create(iterations, seed) {
	const hashSeed = typeof seed === "string" ? seed : Math.random().toString(36);
	const randomSeed = hash(hashSeed);
	const randomNumber = random(randomSeed.next().value, randomSeed.next().value, randomSeed.next().value, randomSeed.next().value);

	function noise(strength) {
		return ((randomNumber.next().value * (1 - -1)) + -1) * strength;
	}

	const ubound = Math.pow(2, iterations);
	const heightmap = [];
	let i = ubound + 1;

	while(i--) {
		heightmap[i] = [];
	}

	heightmap[0][0] = randomNumber.next().value;
	heightmap[0][ubound] = randomNumber.next().value;
	heightmap[ubound][0] = randomNumber.next().value;
	heightmap[ubound][ubound] = randomNumber.next().value;

	let div = ubound;
	let noiseStrength = 1;

	while(div > 1) {
		for(let y = 0; y < ubound; y += div) {
			for(let x = 0; x < ubound; x += div) {
				const a = heightmap[y][x];
				const b = heightmap[y][x + div];
				const c = heightmap[y + div][x];
				const d = heightmap[y + div][x + div];

				heightmap[y + (div / 2)][x + (div / 2)] = clamp(((a + b + c + d) / 4) + noise(noiseStrength));
			}
		}

		for(let y = 0; y < ubound; y += div) {
			for(let x = 0; x < ubound; x += div) {
				const a = heightmap[y][x];
				const b = heightmap[y][x + div];
				const c = heightmap[y + div][x];
				const d = heightmap[y + div][x + div];
				const e = heightmap[y + (div / 2)][x + (div / 2)];

				heightmap[y][x + (div / 2)] = clamp(
					(y
						? (heightmap[y - (div / 2)][x + (div / 2)] + a + b + e) / 4
						: (a + b + e) / 3
					)
					+ noise(noiseStrength)
				);

				heightmap[y + (div / 2)][x] = clamp(
					(x
						? (heightmap[y + (div / 2)][x - (div / 2)] + a + e + c) / 4
						: (a + e + c) / 3
					)
					+ noise(noiseStrength)
				);

				heightmap[y + (div / 2)][x + div] = clamp(
					(x + div < ubound
						? (heightmap[y + (div / 2)][x + div + (div / 2)] + b + e + d) / 4
						: (b + e + d) / 3
					)
					+ noise(noiseStrength)
				);

				heightmap[y + div][x + (div / 2)] = clamp(
					(y + div < ubound
						? (heightmap[y + div + (div / 2)][x + (div / 2)] + e + c + d) / 4
						: (e + c + d) / 3
					)
					+ noise(noiseStrength)
				);
			}
		}

		div /= 2;
		noiseStrength /= 2;
	}

	return heightmap;
}

export default create;
