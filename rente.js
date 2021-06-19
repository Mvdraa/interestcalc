document.getElementById("bereken").onclick = verdubbelBedrag;

function verdubbelBedrag() {
	const rentePercentage = +document.getElementById("rente").value;
	let bedrag = +document.getElementById("bedrag").value;
	const gebDatum = document.getElementById("geboortedatum").value;
	if (testDatum(gebDatum) === false) {
		alert("Ongeldige datum");
	} else if (testBedrag(bedrag) === false) {
		alert("Ongeldig bedrag");
	} else if (testRente(rentePercentage) === false) {
		alert("Ongeldig rente %");
	} else if (datumGeldig(gebDatum)) {
		let jaren = 1;
		let overzicht = "";
		const dubbele = bedrag * 2;
		while (bedrag < dubbele) {
			bedrag = bedrag * (1 + rentePercentage / 100);
			overzicht += "Na " + jaren + " jaar, is het ingelegde bedrag gegroeid naar: " + bedrag.toFixed(2) + "<br>";
			jaren++;
		}
		document.getElementById("demo").innerHTML = overzicht;
	}
}

function testRente(x) {
	if (x <= 0 || isNaN(x)) {
		return false;
	} else {
		return x;
	}
}

function testBedrag(y) {
	if (isNaN(y) || y <= 0) {
		return false;
	} else {
		return y;
	}
}

function testDatum(datum) {
	let pattern = /^\d{1,2}-\d{1,2}-\d{4}$/;
	return pattern.test(datum);
}

function datumGeldig(datum) {
	const datumArray = datum.split("-");
	const dag = datumArray[0];
	const maand = datumArray[1];
	const jaar = datumArray[2];
	if (dag > 31 || dag < 1) {
		alert("Ongeldige dag");
		return false;
	}
	if (maand > 12 || maand < 1) {
		alert("Ongeldige maand");
		return false;
	}
	if (jaar < 1900 || jaar > new Date().getFullYear()) {
		alert("Vul een jaar in tussen 1900 en " + new Date().getFullYear());
		return false;
	}
	switch (+maand) {
		case 2:
			if (testJaar(jaar)) {
				if (dag > 29) {
					alert("februari " + jaar + " heeft maar 29 dagen");
					return false;
				}
			} else {
				if (dag > 28) {
					alert("februari " + jaar + " heeft maar 28 dagen");
					return false;
				}
			}
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			if (dag > 30) {
				alert("Deze maand heeft maar 30 dagen");
				return false;
			}
			break;
	}
	return true;
}

function testJaar(jaartal) {
	let schrikkeljaar = false;
	if (jaartal % 4 == 0 && jaartal % 100 != 0) {
		schrikkeljaar = true;
	} else if (jaartal % 400 == 0) {
		schrikkeljaar = true;
	}
	return schrikkeljaar;
}