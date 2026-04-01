window.GS_A = true;
window.GS_B = false;
window.GS_C = 0;

setInterval(() => {
	const runtime = cr_getC2Runtime();
	if (!runtime) {
		console.log("No runtime available");
		return;
	}

	const HP = runtime.Gu?.find(a => a.name === "HP");
	if (!HP) {
		console.log("No HP available");
		return;
	}

	const currScene = runtime.ba?.name;

	if (currScene === "BattleScreen") {
		window.GS_B = true;

		if (HP.data <= 0) {
			console.log("GAME LOST");
			window.parent.postMessage({ evt: 'loss' });
			window.location.reload();
		} else {
			window.GS_C = HP.data;
		}
	} else if (currScene === "MainMenu" && window.GS_B) {
		console.log("GAME WON");
		window.parent.postMessage({ evt: 'win', hp: GS_C });
		document.getElementById("c2canvasdiv").remove();
	} else if (currScene === "MainMenu") {
		window.location.reload();
	}
}, 500);
