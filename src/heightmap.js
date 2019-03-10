function clamp(n) {
	return Math.min(Math.max(n, 0), 1);
}

function noise(strength) {
	return ((Math.random() * (1 - -1)) + -1) * strength;
}

function create(iterations) {
	const ubound = Math.pow(2, iterations);
	const heightmap = [];
	let i = ubound + 1;

	while(i--) {
		heightmap[i] = [];
	}

	heightmap[0][0] = Math.random();
	heightmap[0][ubound] = Math.random();
	heightmap[ubound][0] = Math.random();
	heightmap[ubound][ubound] = Math.random();

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
